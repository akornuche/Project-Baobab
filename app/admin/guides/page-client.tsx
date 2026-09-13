'use client';

import { useState, useEffect } from 'react';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

interface Guide {
  id: string;
  title: string;
  slug: string;
  domain: string;
  subdomain: string;
  published: boolean;
  publishedAt: string;
  createdAt: string;
  reviewer?: {
    name: string;
  };
}

export default function AdminGuidesClient() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const data = await prisma.guide.findMany({
        where: { isDeleted: false },
        include: {
          domain: true,
          subdomain: true,
          reviewer: true,
        },
        orderBy: { createdAt: 'desc' },
        take: 50,
      });

      setGuides(
        data.map((g) => ({
          id: g.id,
          title: g.title,
          slug: g.slug,
          domain: g.domain.name,
          subdomain: g.subdomain.name,
          published: g.published,
          publishedAt: g.publishedAt?.toISOString() || g.createdAt.toISOString(),
          createdAt: g.createdAt.toISOString(),
          reviewer: g.reviewer ? { name: g.reviewer.name || '' } : undefined,
        }))
      );
    } catch (error) {
      console.error('Error fetching guides:', error);
    } finally {
      setLoading(false);
    }
  };

  const togglePublished = async (guideId: string, currentStatus: boolean) => {
    try {
      await prisma.guide.update({
        where: { id: guideId },
        data: { published: !currentStatus },
      });
      fetchGuides();
    } catch (error) {
      console.error('Error updating guide:', error);
    }
  };

  const filteredGuides = guides.filter((g) =>
    g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Manage Guides</h1>
        <Link
          href="/admin/guides/new"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New Guide
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search guides..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="text-3xl font-bold text-blue-600">{guides.length}</div>
          <div className="text-sm text-gray-600">Total Guides</div>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="text-3xl font-bold text-green-600">
            {guides.filter((g) => g.published).length}
          </div>
          <div className="text-sm text-gray-600">Published</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-3xl font-bold text-gray-600">
            {guides.filter((g) => !g.published).length}
          </div>
          <div className="text-sm text-gray-600">Draft</div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading guides...</p>
        </div>
      ) : filteredGuides.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No guides found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredGuides.map((guide) => (
                <tr key={guide.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <Link href={`/guides/${guide.slug}`} className="text-blue-600 hover:underline">
                      {guide.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">{guide.domain} / {guide.subdomain}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        guide.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {guide.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">{guide.reviewer?.name || 'Admin'}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(guide.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/admin/guides/${guide.id}/edit`}
                        className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => togglePublished(guide.id, guide.published)}
                        className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                      >
                        {guide.published ? 'Unpublish' : 'Publish'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

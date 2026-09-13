'use client';

export const revalidate = 0; // Disable caching for admin pages

import { useState, useEffect } from 'react';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

interface Directory {
  id: string;
  name: string;
  category: string;
  state: string;
  city: string;
  verified: boolean;
  premium: boolean;
  createdAt: string;
}

export default function AdminDirectoriesPage() {
  const [directories, setDirectories] = useState<Directory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVerified, setFilterVerified] = useState<string>('all');
  const [filterPremium, setFilterPremium] = useState<string>('all');

  useEffect(() => {
    fetchDirectories();
  }, []);

  const fetchDirectories = async () => {
    try {
      const data = await prisma.directoryListing.findMany({
        where: { isDeleted: false },
        orderBy: { createdAt: 'desc' },
        take: 100,
      });

      setDirectories(
        data.map((d) => ({
          id: d.id,
          name: d.name,
          category: d.category,
          state: d.state,
          city: d.city,
          verified: d.verified,
          premium: d.premium,
          createdAt: d.createdAt.toISOString(),
        }))
      );
    } catch (error) {
      console.error('Error fetching directories:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleVerified = async (directoryId: string, currentStatus: boolean) => {
    try {
      await prisma.directoryListing.update({
        where: { id: directoryId },
        data: { verified: !currentStatus },
      });
      fetchDirectories();
    } catch (error) {
      console.error('Error updating directory:', error);
    }
  };

  const togglePremium = async (directoryId: string, currentStatus: boolean) => {
    try {
      await prisma.directoryListing.update({
        where: { id: directoryId },
        data: { premium: !currentStatus },
      });
      fetchDirectories();
    } catch (error) {
      console.error('Error updating directory:', error);
    }
  };

  const deleteDirectory = async (directoryId: string) => {
    if (!confirm('Are you sure you want to delete this directory listing?')) {
      return;
    }

    try {
      await prisma.directoryListing.update({
        where: { id: directoryId },
        data: { isDeleted: true },
      });
      fetchDirectories();
    } catch (error) {
      console.error('Error deleting directory:', error);
    }
  };

  const filteredDirectories = directories.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.state.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesVerified =
      filterVerified === 'all' ||
      (filterVerified === 'true' && d.verified) ||
      (filterVerified === 'false' && !d.verified);
    
    const matchesPremium =
      filterPremium === 'all' ||
      (filterPremium === 'true' && d.premium) ||
      (filterPremium === 'false' && !d.premium);

    return matchesSearch && matchesVerified && matchesPremium;
  });

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Directory Listings</h1>
        <Link
          href="/admin/directories/new"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New Listing
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Search directories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        
        <div className="flex flex-wrap gap-4">
          <select
            value={filterVerified}
            onChange={(e) => setFilterVerified(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Status</option>
            <option value="true">Verified Only</option>
            <option value="false">Unverified Only</option>
          </select>

          <select
            value={filterPremium}
            onChange={(e) => setFilterPremium(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Types</option>
            <option value="true">Premium Only</option>
            <option value="false">Standard Only</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="text-3xl font-bold text-blue-600">{directories.length}</div>
          <div className="text-sm text-gray-600">Total Listings</div>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="text-3xl font-bold text-green-600">
            {directories.filter((d) => d.verified).length}
          </div>
          <div className="text-sm text-gray-600">Verified</div>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="text-3xl font-bold text-purple-600">
            {directories.filter((d) => d.premium).length}
          </div>
          <div className="text-sm text-gray-600">Premium</div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading directories...</p>
        </div>
      ) : filteredDirectories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No directories found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Premium</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDirectories.map((directory) => (
                <tr key={directory.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <Link href={`/directory/${directory.id}`} className="text-blue-600 hover:underline">
                      {directory.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">{directory.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">
                      {directory.city}, {directory.state}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        directory.verified
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {directory.verified ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        directory.premium
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {directory.premium ? 'Premium' : 'Standard'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/admin/directories/${directory.id}/edit`}
                        className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => toggleVerified(directory.id, directory.verified)}
                        className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                      >
                        {directory.verified ? 'Unverify' : 'Verify'}
                      </button>
                      <button
                        onClick={() => togglePremium(directory.id, directory.premium)}
                        className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                      >
                        {directory.premium ? 'Remove Premium' : 'Make Premium'}
                      </button>
                      <button
                        onClick={() => deleteDirectory(directory.id)}
                        className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Premium Upgrade Info */}
      <div className="mt-8 p-6 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-lg">
        <h3 className="text-xl font-bold text-white mb-2">Premium Directory Listings</h3>
        <p className="text-purple-100 mb-4">
          Premium listings appear first in search results and show a verified badge.
        </p>
        <div className="grid grid-cols-3 gap-4 text-center text-sm text-white/90">
          <div>
            <div className="font-bold">₦50,000/year</div>
            <div>Premium Listing</div>
          </div>
          <div>
            <div className="font-bold">Priority Display</div>
            <div>First in Search</div>
          </div>
          <div>
            <div className="font-bold">Verified Badge</div>
            <div>Trust Signal</div>
          </div>
        </div>
      </div>
    </div>
  );
}

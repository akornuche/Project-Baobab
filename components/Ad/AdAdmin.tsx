'use client';

import { useState } from 'react';

interface Ad {
  id: string;
  zone: 'header' | 'sidebar' | 'content' | 'footer' | 'infeed';
  size: 'leaderboard' | 'medium_rectangle' | 'skyscraper' | 'square' | 'half_page';
  imageUrl?: string;
  alt: string;
  link?: string;
  startTime: Date;
  endTime: Date;
  impressionCount: number;
  clickCount: number;
  premium: boolean;
}

interface AdAdminProps {
  ads: Ad[];
  onAddAd: (ad: Omit<Ad, 'id' | 'impressionCount' | 'clickCount' | 'createdAt'>) => void;
  onDeleteAd: (id: string) => void;
}

export function AdAdmin({ ads, onAddAd, onDeleteAd }: AdAdminProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAd, setNewAd] = useState<Partial<Ad>>({
    zone: 'content',
    size: 'medium_rectangle',
    alt: '',
    premium: false,
  });

  const handleAddAd = () => {
    if (newAd.alt && newAd.zone && newAd.size) {
      onAddAd({
        zone: newAd.zone as any,
        size: newAd.size as any,
        alt: newAd.alt!,
        imageUrl: newAd.imageUrl,
        link: newAd.link,
        startTime: newAd.startTime || new Date(),
        endTime: newAd.endTime || new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        premium: newAd.premium || false,
      });
      setNewAd({ zone: 'content', size: 'medium_rectangle', alt: '', premium: false });
      setShowAddForm(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Ad Management</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {showAddForm ? 'Cancel' : 'Add New Ad'}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Zone</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              value={newAd.zone}
              onChange={(e) => setNewAd({ ...newAd, zone: e.target.value as any })}
            >
              <option value="header">Header</option>
              <option value="sidebar">Sidebar</option>
              <option value="content">Content</option>
              <option value="footer">Footer</option>
              <option value="infeed">In-Feed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Size</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              value={newAd.size}
              onChange={(e) => setNewAd({ ...newAd, size: e.target.value as any })}
            >
              <option value="leaderboard">Leaderboard (728x90)</option>
              <option value="medium_rectangle">Medium Rectangle (300x250)</option>
              <option value="skyscraper">Skyscraper (300x600)</option>
              <option value="square">Square (250x250)</option>
              <option value="half_page">Half Page (300x600)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Alt Text</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              value={newAd.alt}
              onChange={(e) => setNewAd({ ...newAd, alt: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Premium</label>
            <input
              type="checkbox"
              className="mt-1 h-5 w-5 text-blue-600"
              checked={newAd.premium}
              onChange={(e) => setNewAd({ ...newAd, premium: e.target.checked })}
            />
          </div>

          <button
            onClick={handleAddAd}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Add Ad
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Zone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Premium</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Impressions</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ads.map((ad) => (
              <tr key={ad.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ad.zone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ad.size}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    ad.premium ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {ad.premium ? 'Premium' : 'Standard'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ad.impressionCount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onDeleteAd(ad.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
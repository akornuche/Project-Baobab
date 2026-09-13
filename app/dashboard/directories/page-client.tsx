import { useState, useEffect } from 'react';

interface DirectoryListing {
  id: string;
  name: string;
  category: string;
  state: string;
  city: string;
  verified: boolean;
  premium: boolean;
}

export default function DirectoryDashboard() {
  const [directories, setDirectories] = useState<DirectoryListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    // Fetch directories from API
    const fetchDirectories = async () => {
      try {
        const response = await fetch('/api/directories');
        const data = await response.json();
        setDirectories(data.directories);
      } catch (error) {
        console.error('Error fetching directories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDirectories();
  }, []);

  const filteredDirectories = directories.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(filter.toLowerCase()) ||
      d.category.toLowerCase().includes(filter.toLowerCase());
    const matchesCategory = !filterCategory || d.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Directory Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage business listings, verify vendors, and upgrade to premium
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Search directories..."
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <select
            className="rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="accountant">Accountant</option>
            <option value="registration-agent">Registration Agent</option>
            <option value="business-lawyer">Business Lawyer</option>
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-sm text-gray-600">Total Listings</div>
            <div className="text-2xl font-bold">{directories.length}</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-sm text-gray-600">Verified</div>
            <div className="text-2xl font-bold text-green-600">
              {directories.filter(d => d.verified).length}
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-sm text-gray-600">Premium</div>
            <div className="text-2xl font-bold text-blue-600">
              {directories.filter(d => d.premium).length}
            </div>
          </div>
        </div>

        {/* Directory List */}
        {loading ? (
          <div className="text-center py-8">Loading directories...</div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredDirectories.length === 0 ? (
                <li className="p-4 text-center text-gray-500">No directories found</li>
              ) : (
                filteredDirectories.map((directory) => (
                  <li key={directory.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">{directory.name}</h3>
                        <p className="text-sm text-gray-500">
                          {directory.category} - {directory.city}, {directory.state}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {directory.verified && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Verified
                          </span>
                        )}
                        {directory.premium && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Premium
                          </span>
                        )}
                        <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                          View
                        </button>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
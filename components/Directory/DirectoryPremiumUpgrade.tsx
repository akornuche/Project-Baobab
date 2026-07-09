'use client';

import { useState } from 'react';

interface DirectoryPremiumUpgradeProps {
  listingId: string;
  onUpgrade: (listingId: string) => void;
  className?: string;
}

export function DirectoryPremiumUpgrade({
  listingId,
  onUpgrade,
  className = '',
}: DirectoryPremiumUpgradeProps) {
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpgrade = () => {
    setIsProcessing(true);
    onUpgrade(listingId);
    setIsProcessing(false);
    setShowModal(false);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <button
        onClick={() => setShowModal(true)}
        className="w-full py-2 px-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-sm"
      >
        ⭐ Upgrade to Premium
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Upgrade to Premium</h3>
            <div className="space-y-4 mb-6">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">Premium Benefits:</h4>
                <ul className="space-y-2 text-sm text-yellow-800">
                  <li>✓ Priority placement in search results</li>
                  <li>✓ Verified badge with gold highlight</li>
                  <li>✓ Featured in directory listings</li>
                  <li>✓ Enhanced visibility to users</li>
                  <li>✓ Business profile optimization</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Pricing:</h4>
                <div className="text-2xl font-bold text-gray-900">
                  ₦50,000 <span className="text-sm text-gray-500 font-normal">/year</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Includes verified badge and premium placement
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpgrade}
                disabled={isProcessing}
                className="flex-1 py-2 px-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'Upgrade Now'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
'use client';

import { useState } from 'react';

export default function ResellDashboard() {
  const [activeTab, setActiveTab] = useState('inventory');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Reseller Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Inventory</h3>
            <p className="text-3xl font-bold text-penny">24</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Active Listings</h3>
            <p className="text-3xl font-bold text-penny">18</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Sales</h3>
            <p className="text-3xl font-bold text-penny">$1,240</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Profit</h3>
            <p className="text-3xl font-bold text-green-600">$320</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('inventory')}
                className={`flex-1 py-4 px-6 text-center font-semibold ${
                  activeTab === 'inventory'
                    ? 'border-b-2 border-penny text-penny'
                    : 'text-gray-600 hover:text-penny'
                }`}
              >
                Inventory
              </button>
              <button
                onClick={() => setActiveTab('listings')}
                className={`flex-1 py-4 px-6 text-center font-semibold ${
                  activeTab === 'listings'
                    ? 'border-b-2 border-penny text-penny'
                    : 'text-gray-600 hover:text-penny'
                }`}
              >
                Listings
              </button>
              <button
                onClick={() => setActiveTab('sales')}
                className={`flex-1 py-4 px-6 text-center font-semibold ${
                  activeTab === 'sales'
                    ? 'border-b-2 border-penny text-penny'
                    : 'text-gray-600 hover:text-penny'
                }`}
              >
                Sales
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'inventory' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Your Inventory</h3>
                <p className="text-gray-600">Inventory management coming soon...</p>
              </div>
            )}
            {activeTab === 'listings' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Active Listings</h3>
                <p className="text-gray-600">Listings management coming soon...</p>
              </div>
            )}
            {activeTab === 'sales' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Recent Sales</h3>
                <p className="text-gray-600">Sales tracking coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

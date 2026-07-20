'use client';

import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ResellDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [inventory, setInventory] = useState([
    { id: 1, name: 'LED Light Bulb', quantity: 5, purchasePrice: 2.50, status: 'listed' },
    { id: 2, name: 'Paint Roller Set', quantity: 3, purchasePrice: 5.00, status: 'pending' },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    productId: '',
    quantity: '',
    purchasePrice: '',
    purchaseDate: new Date().toISOString().split('T')[0]
  });

  const handleAddInventory = async (e) => {
    e.preventDefault();
    try {
      const userId = JSON.parse(localStorage.getItem('user'))?.id;
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/inventory`, {
        resellerId: userId,
        ...formData
      });
      toast.success('Item added to inventory!');
      setShowAddForm(false);
      setFormData({ productId: '', quantity: '', purchasePrice: '', purchaseDate: new Date().toISOString().split('T')[0] });
    } catch (error) {
      toast.error('Failed to add item');
    }
  };

  const stats = [
    { label: 'Total Inventory', value: '24', color: 'text-blue-600' },
    { label: 'Active Listings', value: '18', color: 'text-green-600' },
    { label: 'Total Sales', value: '$1,240', color: 'text-purple-600' },
    { label: 'Profit', value: '$320', color: 'text-emerald-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Reseller Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your inventory and track your earnings</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 text-sm font-semibold mb-2">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <div className="flex flex-wrap">
              {['overview', 'inventory', 'listings', 'sales', 'analytics'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-semibold capitalize ${
                    activeTab === tab
                      ? 'border-b-2 border-penny text-penny'
                      : 'text-gray-600 hover:text-penny'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-2">📊 Quick Stats</h3>
                  <p className="text-blue-700">You've made $320 profit this month with 12 sales</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-semibold text-green-900 mb-2">🎯 Top Seller Tips</h3>
                  <ul className="text-green-700 space-y-2">
                    <li>• Price competitively to increase sales velocity</li>
                    <li>• List items on multiple channels for better reach</li>
                    <li>• Update inventory regularly to avoid overselling</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Inventory Tab */}
            {activeTab === 'inventory' && (
              <div>
                <div className="mb-6 flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Your Inventory</h3>
                  <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="btn-primary"
                  >
                    + Add Item
                  </button>
                </div>

                {showAddForm && (
                  <form onSubmit={handleAddInventory} className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
                    <h4 className="font-semibold mb-4">Add New Item to Inventory</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="number"
                        placeholder="Product ID"
                        value={formData.productId}
                        onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                        required
                      />
                      <input
                        type="number"
                        placeholder="Quantity"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                        required
                      />
                      <input
                        type="number"
                        placeholder="Purchase Price"
                        value={formData.purchasePrice}
                        onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                        required
                      />
                      <input
                        type="date"
                        value={formData.purchaseDate}
                        onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div className="flex gap-4 mt-4">
                      <button type="submit" className="btn-primary">Add Item</button>
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Product</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Quantity</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Cost</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventory.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{item.quantity}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">${(item.purchasePrice * item.quantity).toFixed(2)}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              item.status === 'listed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <button className="text-penny hover:text-emerald-700 font-semibold">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Listings Tab */}
            {activeTab === 'listings' && (
              <div>
                <h3 className="text-lg font-semibold mb-6">Active Listings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-semibold">Sample Product {i}</h4>
                          <p className="text-sm text-gray-600">Amazon • eBay</p>
                        </div>
                        <span className="text-penny font-bold">$15.99</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 btn-secondary text-sm">Edit</button>
                        <button className="flex-1 btn-secondary text-sm">Delist</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sales Tab */}
            {activeTab === 'sales' && (
              <div>
                <h3 className="text-lg font-semibold mb-6">Recent Sales</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:bg-gray-50">
                      <div>
                        <p className="font-semibold">Sale #{i}</p>
                        <p className="text-sm text-gray-600">Sold on Amazon • 2 days ago</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-penny">+$8.50</p>
                        <p className="text-sm text-gray-600">Profit</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div>
                <h3 className="text-lg font-semibold mb-6">Analytics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Average Profit Per Sale</p>
                    <p className="text-3xl font-bold text-penny">$26.67</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Conversion Rate</p>
                    <p className="text-3xl font-bold text-emerald-600">8.3%</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Best Performing Store</p>
                    <p className="text-3xl font-bold">Amazon</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Total Items Sold</p>
                    <p className="text-3xl font-bold">45</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

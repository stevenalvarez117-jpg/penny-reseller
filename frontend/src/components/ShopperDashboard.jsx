import Link from 'next/link';

export default function ShopperDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Saved Deals */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📌 Saved Deals</h2>
            <p className="text-gray-600 mb-4">You have 5 saved deals</p>
            <Link href="/marketplace" className="btn-primary">
              Browse More Deals
            </Link>
          </div>

          {/* Purchase History */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🛍️ Purchase History</h2>
            <p className="text-gray-600 mb-4">You haven't made any purchases yet</p>
            <Link href="/marketplace" className="btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

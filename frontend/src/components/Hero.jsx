import Link from 'next/link';

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-penny to-emerald-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">💰 Buy Low, Sell High</h1>
          <p className="text-xl md:text-2xl mb-8 text-emerald-50">
            Find penny items and clearance deals from Walmart, Lowe's & Home Depot<br />
            Resell on Amazon, eBay & our marketplace
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/marketplace" className="btn-primary bg-white text-penny hover:bg-gray-100">
              Browse Deals
            </Link>
            <Link href="/auth/register" className="btn-primary border-2 border-white">
              Start Reselling
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

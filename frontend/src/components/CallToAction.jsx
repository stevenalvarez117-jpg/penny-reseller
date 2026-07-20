import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="bg-gradient-to-r from-penny to-emerald-700 text-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Start Making Money?</h2>
        <p className="text-xl mb-8 text-emerald-50">
          Join hundreds of resellers finding deals and building their business
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/auth/register" className="btn-primary bg-white text-penny hover:bg-gray-100">
            Get Started Free
          </Link>
          <Link href="/marketplace" className="btn-primary border-2 border-white">
            Browse Marketplace
          </Link>
        </div>
      </div>
    </section>
  );
}

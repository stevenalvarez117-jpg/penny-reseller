'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ProductDetailsPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`);
      setProduct(response.data);
      
      // Fetch listings for this product
      const listingsResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/listings?product=${params.id}`);
      setListings(listingsResponse.data.listings || []);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

  const bestPrice = listings.length > 0 ? Math.min(...listings.map(l => l.current_price)) : product.current_price;
  const discount = ((product.original_price - product.current_price) / product.original_price * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/marketplace" className="text-penny hover:text-emerald-700 mb-6 inline-block">← Back to Marketplace</Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-lg shadow-md p-8 flex items-center justify-center h-96">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover rounded" />
            ) : (
              <span className="text-8xl">📦</span>
            )}
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-500 text-sm uppercase mb-2">{product.store} • {product.category}</p>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Pricing */}
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-5xl font-bold text-penny">${product.current_price.toFixed(2)}</span>
                {product.original_price > product.current_price && (
                  <span className="text-2xl text-gray-400 line-through">${product.original_price.toFixed(2)}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full font-bold">-{discount}%</span>
                <span className="text-gray-600">You save ${(product.original_price - product.current_price).toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <button className="btn-primary w-full mb-4">Add to Cart</button>
            <button className="btn-secondary w-full">Save for Later</button>

            {/* Product Info */}
            <div className="mt-8 border-t pt-8">
              <h3 className="font-semibold text-lg mb-4">Product Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">SKU:</span>
                  <span className="font-semibold">{product.sku}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Store:</span>
                  <span className="font-semibold capitalize">{product.store.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-semibold">{product.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Available Listings */}
        {listings.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Available on Other Platforms</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <div key={listing.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-penny">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-lg capitalize">{listing.channel}</span>
                    <span className="text-2xl font-bold text-penny">${listing.current_price.toFixed(2)}</span>
                  </div>
                  <p className="text-gray-600 mb-4">Quantity: {listing.quantity}</p>
                  <a
                    href="#"
                    className="btn-primary inline-block"
                  >
                    Buy on {listing.channel.charAt(0).toUpperCase() + listing.channel.slice(1)}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

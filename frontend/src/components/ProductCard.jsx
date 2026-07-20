import Link from 'next/link';

export default function ProductCard({ product }) {
  const discount = product.discount_percentage || ((product.original_price - product.current_price) / product.original_price * 100).toFixed(0);

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer">
        <div className="relative h-48 bg-gray-200 flex items-center justify-center">
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl">📦</span>
          )}
          {discount > 0 && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              -{discount}%
            </div>
          )}
        </div>

        <div className="p-4">
          <p className="text-xs text-gray-500 uppercase mb-1">{product.store} • {product.category}</p>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-bold text-penny">${product.current_price.toFixed(2)}</span>
            {product.original_price > product.current_price && (
              <span className="text-lg text-gray-400 line-through">${product.original_price.toFixed(2)}</span>
            )}
          </div>

          <button className="w-full btn-primary text-sm">
            View Deal
          </button>
        </div>
      </div>
    </Link>
  );
}

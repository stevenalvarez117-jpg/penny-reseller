'use client';

const stores = ['walmart', 'lowes', 'home_depot'];
const categories = ['Electronics', 'Tools', 'Home Decor', 'Garden', 'Outdoor', 'Kitchen'];

export default function Filters({ filters, setFilters }) {
  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value, page: 1 });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Filters</h3>

      <div className="space-y-6">
        {/* Store Filter */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Store</label>
          <select
            value={filters.store}
            onChange={(e) => handleFilterChange('store', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
          >
            <option value="">All Stores</option>
            {stores.map((store) => (
              <option key={store} value={store}>
                {store.replace('_', ' ').toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Category</label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Min Price</label>
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            placeholder="$0"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Max Price</label>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            placeholder="$1000"
          />
        </div>
      </div>
    </div>
  );
}

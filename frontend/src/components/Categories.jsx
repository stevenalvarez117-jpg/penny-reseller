import Link from 'next/link';

const categories = [
  { name: 'Electronics', emoji: '📱', color: 'bg-blue-100' },
  { name: 'Tools', emoji: '🔨', color: 'bg-orange-100' },
  { name: 'Home Decor', emoji: '🏠', color: 'bg-purple-100' },
  { name: 'Garden', emoji: '🌿', color: 'bg-green-100' },
  { name: 'Outdoor', emoji: '⛺', color: 'bg-teal-100' },
  { name: 'Kitchen', emoji: '🍳', color: 'bg-red-100' },
];

export default function Categories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <Link key={cat.name} href={`/marketplace?category=${cat.name.toLowerCase()}`}>
              <div className={`${cat.color} rounded-lg p-8 text-center hover:shadow-lg transition-shadow cursor-pointer`}>
                <div className="text-4xl mb-3">{cat.emoji}</div>
                <h3 className="font-semibold text-gray-900">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

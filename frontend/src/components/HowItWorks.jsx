export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'Find Deals',
      description: 'Browse penny items and clearance products from major retailers',
      icon: '🔍'
    },
    {
      number: 2,
      title: 'Purchase',
      description: 'Buy items at the lowest prices available',
      icon: '💳'
    },
    {
      number: 3,
      title: 'List',
      description: 'Automatically list on Amazon, eBay, or our marketplace',
      icon: '📤'
    },
    {
      number: 4,
      title: 'Profit',
      description: 'Sell for profit and track your earnings',
      icon: '💰'
    },
  ];

  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

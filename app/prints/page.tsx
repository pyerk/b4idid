export default function PrintsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Print Shop
        </h1>
        <p className="text-xl text-gray-600">
          Purchase high-quality prints of your favorite photographs
        </p>
      </div>

      <div className="text-center py-20">
        <p className="text-gray-500 text-lg mb-4">
          Print shop coming soon!
        </p>
        <p className="text-gray-400">
          Browse available prints and purchase them directly through our secure checkout.
        </p>
        <a
          href="/"
          className="inline-block mt-8 bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          View Portfolio
        </a>
      </div>
    </div>
  )
}


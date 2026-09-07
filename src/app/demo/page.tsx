export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 text-gray-800">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-md">
            W
          </div>
          <h1 className="text-3xl font-bold mb-4 text-gray-900">Welcome to Your Website</h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            This is a simple demo website running locally. You can use this space to build and preview your web components!
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-sm">
            Get Started
          </button>
        </div>
        <div className="bg-gray-50 p-6 border-t border-gray-100 flex justify-center gap-8 text-sm text-gray-500">
          <span className="hover:text-blue-600 cursor-pointer transition-colors">Features</span>
          <span className="hover:text-blue-600 cursor-pointer transition-colors">Pricing</span>
          <span className="hover:text-blue-600 cursor-pointer transition-colors">Contact</span>
        </div>
      </div>
    </div>
  );
}

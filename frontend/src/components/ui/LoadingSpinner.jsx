// Create a LoadingSpinner component
const LoadingSpinner = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    <p className="ml-3 text-lg font-medium text-gray-700">Loading...</p>
  </div>
);

export default LoadingSpinner;

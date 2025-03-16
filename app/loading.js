export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
      <span className="text-4xl font-bold text-gray-700 dark:text-gray-300 animate-pulse">
        <span className="animate-bounce">.</span>
        <span className="animate-bounce delay-200">.</span>
        <span className="animate-bounce delay-400">.</span>
      </span>
    </div>
  );
}

export default function RestaurantsListSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-row h-48 opacity-50 bg-gray-200 animate-pulse rounded-lg"
        >
          <div className="w-2/5 md:w-1/4 lg:w-2/5 xl:w-1/4 bg-gray-300 rounded-l-lg"></div>
          <div className="flex flex-col justify-between p-2 w-3/5 md:w-3/4 lg:w-3/5 xl:w-3/4">
            <div>
              <div className="flex flex-row gap-2 items-center mb-2">
                <div className="h-6 w-24 bg-gray-300 rounded"></div>
              </div>
              <div className="mb-2">
                <p className="h-4 w-3/4 bg-gray-300 rounded mb-2"></p>
                <p className="h-4 w-3/4 bg-gray-300 rounded mb-2"></p>
              </div>
              <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
              <div className="h-4 w-16 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

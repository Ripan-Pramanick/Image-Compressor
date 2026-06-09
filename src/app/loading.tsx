import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
      return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                  {/* Hero Section Skeleton */}
                  <div className="text-center mb-16">
                        <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
                        <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
                        <Skeleton className="h-8 w-48 mx-auto rounded-full" />
                  </div>

                  {/* Tools Grid Skeleton */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                              <div key={i} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                                    <div className="flex items-start gap-4 mb-4">
                                          <Skeleton className="w-12 h-12 rounded-xl" />
                                          <div className="flex-1">
                                                <Skeleton className="h-5 w-3/4 mb-2" />
                                                <Skeleton className="h-4 w-full" />
                                          </div>
                                    </div>
                                    <div className="flex gap-2">
                                          <Skeleton className="h-6 w-16 rounded-full" />
                                          <Skeleton className="h-6 w-20 rounded-full" />
                                          <Skeleton className="h-6 w-14 rounded-full" />
                                    </div>
                              </div>
                        ))}
                  </div>
            </div>
      );
}
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
    variant?: 'text' | 'circular' | 'rectangular';
    }

    export function Skeleton({ className, variant = 'rectangular' }: SkeletonProps) {
      const variants = {
          text: 'h-4 w-full rounded',
              circular: 'rounded-full',
                  rectangular: 'rounded-lg',
                    };

                      return (
                          <div
                                className={cn(
                                        'skeleton',
                                                variants[variant],
                                                        className
                                                              )}
                                                                  />
                                                                    );
                                                                    }
import { MetadataRoute } from 'next';
import { tools } from '@/config/tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fileforge.app';

    const staticRoutes = [
        {
              url: baseUrl,
                    lastModified: new Date(),
                          changeFrequency: 'daily' as const,
                                priority: 1,
                                    },
                                        {
                                              url: `${baseUrl}/about`,
                                                    lastModified: new Date(),
                                                          changeFrequency: 'monthly' as const,
                                                                priority: 0.5,
                                                                    },
                                                                        {
                                                                              url: `${baseUrl}/privacy`,
                                                                                    lastModified: new Date(),
                                                                                          changeFrequency: 'monthly' as const,
                                                                                                priority: 0.5,
                                                                                                    },
                                                                                                      ];

                                                                                                        const toolRoutes = tools.map((tool) => ({
                                                                                                            url: `${baseUrl}${tool.route}`,
                                                                                                                lastModified: new Date(),
                                                                                                                    changeFrequency: 'weekly' as const,
                                                                                                                        priority: 0.8,
                                                                                                                          }));

                                                                                                                            return [...staticRoutes, ...toolRoutes];
                                                                                                                            }
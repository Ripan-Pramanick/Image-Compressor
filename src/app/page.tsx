'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { tools } from '@/config/tools';
import { ImageIcon, FileText, Repeat, Scissors, Maximize2, Crop, FileDown, Combine, FileUp, FileImage } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
        ImageIcon: <ImageIcon className="w-6 h-6" />,
        Repeat: <Repeat className="w-6 h-6" />,
        Maximize2: <Maximize2 className="w-6 h-6" />,
        Crop: <Crop className="w-6 h-6" />,
        FileDown: <FileDown className="w-6 h-6" />,
        Combine: <Combine className="w-6 h-6" />,
        Scissors: <Scissors className="w-6 h-6" />,
        FileUp: <FileUp className="w-6 h-6" />,
        Image: <ImageIcon className="w-6 h-6" />,
};

export default function HomePage() {
        return (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        {/* Hero Section */}
                        <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center mb-16"
                        >
                                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent mb-6">
                                        File Processing Made Simple
                                </h1>
                                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                                        Your privacy-first file processing toolkit. All operations happen directly in your browser.
                                        No uploads, no accounts, no tracking.
                                </p>
                                <div className="flex items-center justify-center gap-3">
                                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                                Processing happens locally
                                        </span>
                                </div>
                        </motion.div>

                        {/* Tools Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                                {tools.map((tool, index) => (
                                        <motion.div
                                                key={tool.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                        >
                                                <Link href={tool.route}>
                                                        <Card hover className="h-full cursor-pointer group">
                                                                <div className="flex items-start gap-4 mb-4">
                                                                        <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-xl group-hover:scale-110 transition-transform">
                                                                                {iconMap[tool.icon] || <ImageIcon className="w-6 h-6" />}
                                                                        </div>
                                                                        <div>
                                                                                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                                                                                        {tool.name}
                                                                                </h3>
                                                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                                        {tool.description}
                                                                                </p>
                                                                        </div>
                                                                </div>
                                                                <div className="flex flex-wrap gap-2">
                                                                        {tool.features.slice(0, 3).map((feature) => (
                                                                                <span
                                                                                        key={feature}
                                                                                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full"
                                                                                >
                                                                                        {feature}
                                                                                </span>
                                                                        ))}
                                                                </div>
                                                        </Card>
                                                </Link>
                                        </motion.div>
                                ))}
                        </div>

                        {/* Dashboard Section */}
                        <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                        >
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                        Your Activity Dashboard
                                </h2>
                                <Dashboard />
                        </motion.div>
                </div>
        );
}
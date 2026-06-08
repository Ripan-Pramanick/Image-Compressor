'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';

export default function ToasterClient() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          color: '#1a1a1a',
          fontSize: '14px',
        },
      }}
    />
  );
}

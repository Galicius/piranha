'use client';

import React from 'react';

export default function DevToolsPage() {
  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Dev Tools</h1>
          <p className="text-muted-foreground">
            Development tools are only available in development mode.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Development Tools</h1>
          <p className="text-muted-foreground">
            Tools for managing and migrating your Piranha Cocktail Bureau assets
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-card rounded-lg p-6 border">
            <h2 className="text-xl font-semibold mb-4">Vercel Blob Migration</h2>
            <p className="text-muted-foreground mb-4">
              The image migration tool is available but requires additional setup for Next.js.
              Please refer to the migration documentation for manual setup instructions.
            </p>
            <div className="bg-muted p-4 rounded-md">
              <h3 className="font-medium mb-2">Quick Setup:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Add your BLOB_READ_WRITE_TOKEN to .env.local</li>
                <li>Run the development server: npm run dev</li>
                <li>Use the Vercel dashboard to upload images manually</li>
                <li>Update the mock data with blob URLs</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
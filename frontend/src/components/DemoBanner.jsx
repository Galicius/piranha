import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function DemoBanner({
  enabled = true,
  message = "Stran še ni aktivna - demo verzija"
}) {
  // Don't render if disabled
  if (!enabled) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-red-600 text-white w-full">
      <div className="flex items-center justify-center gap-2 py-2 text-sm font-medium">
        <AlertTriangle size={16} />
        <span>{message}</span>
      </div>
    </div>
  );
}
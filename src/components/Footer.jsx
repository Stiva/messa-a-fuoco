import React from 'react';
import { RotateCcw } from 'lucide-react';

export default function Footer({ resetState }) {
  return (
    <footer className="mt-8 py-6 flex justify-center border-t-2 border-yellow-500/20">
      <button 
        onClick={resetState}
        className="flex items-center gap-2 text-yellow-700 hover:text-red-600 transition-colors font-semibold text-sm px-4 py-2 rounded-2xl hover:bg-yellow-200/50"
      >
        <RotateCcw size={16} />
        Azzera il sentiero
      </button>
    </footer>
  );
}

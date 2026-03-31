import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

interface AspectRatioSelectorProps {
  aspectRatio: string;
  onChange: (ratio: string) => void;
}

const RATIOS = [
  { value: '16/9', label: '16:9', desc: '1920x1080', w: 64, h: 36 },
  { value: '3/2', label: '3:2', desc: '1920x1280', w: 60, h: 40 },
  { value: '4/3', label: '4:3', desc: '1920x1440', w: 56, h: 42 },
  { value: '5/4', label: '5:4', desc: '1920x1536', w: 50, h: 40 },
  { value: '1/1', label: '1:1', desc: '1920x1920', w: 48, h: 48 },
  { value: '4/5', label: '4:5', desc: '1080x1350', w: 40, h: 50 },
  { value: '3/4', label: '3:4', desc: '1080x1440', w: 42, h: 56 },
  { value: '2/3', label: '2:3', desc: '1080x1620', w: 40, h: 60 },
  { value: '9/16', label: '9:16', desc: '1080x1920', w: 36, h: 64 },
];

export function AspectRatioSelector({ aspectRatio, onChange }: AspectRatioSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const currentRatio = RATIOS.find(r => r.value === aspectRatio) || { label: 'Auto' };

  return (
    <div className="relative" ref={popoverRef}>
      <div className="flex items-center justify-between">
        <label className="text-xs text-zinc-400">Aspect ratio</label>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-3 py-1.5 bg-zinc-900 border border-zinc-700 hover:border-zinc-500 rounded-md text-xs text-zinc-300 transition-colors"
        >
          {currentRatio.label}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-10 w-80 bg-[#1a1a1a] border border-zinc-800 rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-4 border-b border-zinc-800/50 flex items-center justify-between">
              <span className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
                Aspect ratio <span className="text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded">Experimental</span>
              </span>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-zinc-800 rounded-md text-zinc-400 hover:text-zinc-100 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4">
              <button
                onClick={() => { onChange('auto'); setIsOpen(false); }}
                className={cn(
                  "w-full py-2 mb-4 rounded-lg border text-sm font-medium transition-colors",
                  aspectRatio === 'auto' ? "bg-zinc-800 border-zinc-600 text-zinc-100" : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                )}
              >
                Auto
              </button>

              <div className="grid grid-cols-3 gap-3">
                {RATIOS.map((ratio) => (
                  <button
                    key={ratio.value}
                    onClick={() => { onChange(ratio.value); setIsOpen(false); }}
                    className={cn(
                      "flex flex-col items-center justify-center p-3 rounded-xl border transition-all group",
                      aspectRatio === ratio.value 
                        ? "bg-indigo-500/10 border-indigo-500 text-indigo-400" 
                        : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-800"
                    )}
                  >
                    <div 
                      className={cn(
                        "border-2 rounded-md mb-2 transition-colors",
                        aspectRatio === ratio.value ? "border-indigo-500" : "border-zinc-600 group-hover:border-zinc-400"
                      )}
                      style={{ width: ratio.w, height: ratio.h }}
                    />
                    <span className="text-xs font-medium mb-1">{ratio.label}</span>
                    <span className="text-[10px] opacity-60">{ratio.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

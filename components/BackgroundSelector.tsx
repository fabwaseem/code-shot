import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Link as LinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';

interface BackgroundSelectorProps {
  background: string;
  onChange: (bg: string) => void;
}

const GRADIENTS = [
  'linear-gradient(140deg, rgb(165, 142, 251), rgb(233, 191, 248))',
  'linear-gradient(140deg, rgb(255, 207, 115), rgb(255, 122, 47))',
  'linear-gradient(140deg, rgb(142, 199, 251), rgb(28, 85, 170))',
  'linear-gradient(140deg, rgb(255, 142, 165), rgb(204, 43, 94))',
  'linear-gradient(140deg, rgb(142, 251, 199), rgb(28, 170, 85))',
  'linear-gradient(140deg, rgb(251, 142, 251), rgb(170, 28, 170))',
  'linear-gradient(140deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
  'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
  'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
  'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
  'linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)',
  'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)',
  'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(120deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(120deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(120deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(120deg, #30cfd0 0%, #330867 100%)',
  'linear-gradient(120deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(120deg, #5ee7df 0%, #b490ca 100%)',
  'linear-gradient(120deg, #d299c2 0%, #fef9d7 100%)',
  'linear-gradient(120deg, #ebc0fd 0%, #d9ded8 100%)',
  'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
  'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)',
  'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)',
];

const COLORS = [
  '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff',
  '#f87171', '#fb923c', '#fbbf24', '#a3e635', '#4ade80', '#34d399', '#2dd4bf', '#22d3ee',
  '#38bdf8', '#60a5fa', '#818cf8', '#a78bfa', '#c084fc', '#e879f9', '#f472b6', '#fb7185',
  '#94a3b8', '#9ca3af', '#a1a1aa', '#a8a29e', '#1e293b', '#1f2937', '#27272a', '#292524',
];

export function BackgroundSelector({ background, onChange }: BackgroundSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<'gradient' | 'color' | 'custom'>('gradient');
  const [customUrl, setCustomUrl] = useState('');
  const popoverRef = useRef<HTMLDivElement>(null);

  // Custom gradient state
  const [gradColor1, setGradColor1] = useState('#a58efb');
  const [gradColor2, setGradColor2] = useState('#e9bff8');
  const [gradAngle, setGradAngle] = useState(140);

  // Custom color state
  const [customColor, setCustomColor] = useState('#ffffff');

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onChange(`url(${result})`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrl) {
      onChange(`url(${customUrl})`);
    }
  };

  const applyCustomGradient = () => {
    onChange(`linear-gradient(${gradAngle}deg, ${gradColor1}, ${gradColor2})`);
  };

  return (
    <div className="relative" ref={popoverRef}>
      <div className="flex items-center justify-between">
        <label className="text-xs text-zinc-400">Background</label>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-8 h-8 rounded-md border border-zinc-700 hover:border-zinc-500 transition-all flex items-center justify-center overflow-hidden"
          style={{ background: background.includes('url') ? `${background} center/cover` : background }}
        >
          {background === 'transparent' && (
            <div className="w-full h-full bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYNgBxV1j4zh6mBZY502Y8I8xC67AmOOSvCEY9YBh1ARwJIw2E4bOBgA71w/1zZ0YgQAAAABJRU5ErkJggg==')] opacity-50" />
          )}
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
              <span className="text-sm font-semibold text-zinc-100">Background</span>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-zinc-800 rounded-md text-zinc-400 hover:text-zinc-100 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 max-h-[400px] overflow-y-auto custom-scrollbar">
              <div className="flex p-1 bg-zinc-900/50 rounded-lg mb-4">
                {(['gradient', 'color', 'custom'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={cn(
                      "flex-1 py-1.5 text-xs font-medium rounded-md transition-all capitalize",
                      tab === t ? "bg-zinc-700 text-zinc-100 shadow-sm" : "text-zinc-400 hover:text-zinc-200"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {tab === 'gradient' && (
                <div className="space-y-4">
                  <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800/50 space-y-3">
                    <div className="text-xs font-medium text-zinc-300 mb-2">Custom Gradient</div>
                    <div className="flex items-center gap-2">
                      <input 
                        type="color" 
                        value={gradColor1} 
                        onChange={(e) => { setGradColor1(e.target.value); applyCustomGradient(); }}
                        className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0"
                      />
                      <input 
                        type="color" 
                        value={gradColor2} 
                        onChange={(e) => { setGradColor2(e.target.value); applyCustomGradient(); }}
                        className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0"
                      />
                      <div className="flex-1 px-2">
                        <Slider
                          value={[gradAngle]}
                          onValueChange={(v) => {
                            const n = Array.isArray(v) ? v[0] : v
                            setGradAngle(typeof n === "number" ? n : Number(n))
                            applyCustomGradient()
                          }}
                          min={0}
                          max={360}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      <span className="text-xs text-zinc-400 w-8 text-right">{gradAngle}°</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {GRADIENTS.map((bg, i) => (
                      <button
                        key={i}
                        onClick={() => onChange(bg)}
                        className={cn(
                          "w-8 h-8 rounded-full transition-all hover:scale-110 border-2",
                          background === bg ? "border-indigo-500" : "border-transparent"
                        )}
                        style={{ background: bg }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {tab === 'color' && (
                <div className="space-y-4">
                  <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800/50 flex items-center gap-3">
                    <input 
                      type="color" 
                      value={customColor} 
                      onChange={(e) => { setCustomColor(e.target.value); onChange(e.target.value); }}
                      className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0"
                    />
                    <span className="text-xs font-medium text-zinc-300">Custom Color</span>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {COLORS.map((color, i) => (
                      <button
                        key={i}
                        onClick={() => onChange(color)}
                        className={cn(
                          "w-8 h-8 rounded-full transition-all hover:scale-110 border-2",
                          background === color ? "border-indigo-500" : "border-transparent"
                        )}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {tab === 'custom' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-zinc-400 mb-2 block">Upload Image</label>
                    <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-zinc-700 hover:border-zinc-500 rounded-lg cursor-pointer bg-zinc-900/50 transition-colors">
                      <div className="flex flex-col items-center gap-2 text-zinc-400">
                        <Upload className="w-5 h-5" />
                        <span className="text-xs">Click to upload</span>
                      </div>
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                    </label>
                  </div>
                  
                  <div>
                    <label className="text-xs text-zinc-400 mb-2 block">Or enter URL</label>
                    <form onSubmit={handleUrlSubmit} className="flex gap-2">
                      <div className="relative flex-1">
                        <LinkIcon className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                        <input
                          type="url"
                          value={customUrl}
                          onChange={(e) => setCustomUrl(e.target.value)}
                          placeholder="https://..."
                          className="w-full bg-zinc-900 border border-zinc-700 rounded-md pl-9 pr-3 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <button type="submit" className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs rounded-md transition-colors">
                        Apply
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

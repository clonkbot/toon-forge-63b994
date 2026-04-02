import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Cartoon styles available
const cartoonStyles = [
  { id: 'comic', name: 'Comic Book', emoji: '💥' },
  { id: 'anime', name: 'Anime Style', emoji: '✨' },
  { id: 'chibi', name: 'Chibi Cute', emoji: '🌸' },
  { id: 'retro', name: 'Retro 80s', emoji: '📼' },
  { id: 'pixel', name: 'Pixel Art', emoji: '👾' },
  { id: 'sketch', name: 'Pencil Sketch', emoji: '✏️' },
];

// Pre-generated cartoon images (SVG-based for this demo)
const generatedCartoons = [
  { id: 1, style: 'comic', colors: ['#FF1493', '#00D4FF', '#FFE135'] },
  { id: 2, style: 'anime', colors: ['#FF6B9D', '#C44569', '#F8B500'] },
  { id: 3, style: 'chibi', colors: ['#A8E6CF', '#DCEDC1', '#FFD3B6'] },
  { id: 4, style: 'retro', colors: ['#7B68EE', '#FF6347', '#00CED1'] },
  { id: 5, style: 'pixel', colors: ['#2ECC71', '#3498DB', '#E74C3C'] },
  { id: 6, style: 'sketch', colors: ['#34495E', '#7F8C8D', '#BDC3C7'] },
];

function CartoonCharacter({ colors, style }: { colors: string[]; style: string }) {
  const [c1, c2, c3] = colors;

  if (style === 'pixel') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <rect fill={c1} x="30" y="20" width="10" height="10" />
        <rect fill={c1} x="60" y="20" width="10" height="10" />
        <rect fill={c2} x="20" y="30" width="60" height="10" />
        <rect fill={c2} x="20" y="40" width="60" height="20" />
        <rect fill={c3} x="40" y="60" width="20" height="10" />
        <rect fill={c1} x="30" y="70" width="10" height="20" />
        <rect fill={c1} x="60" y="70" width="10" height="20" />
        <rect fill="#1A1A2E" x="35" y="35" width="8" height="8" />
        <rect fill="#1A1A2E" x="57" y="35" width="8" height="8" />
        <rect fill="#FF1493" x="43" y="50" width="14" height="5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Head */}
      <circle cx="50" cy="40" r="30" fill={c1} stroke="#1A1A2E" strokeWidth="3" />
      {/* Eyes */}
      <ellipse cx="40" cy="35" rx="8" ry="10" fill="white" stroke="#1A1A2E" strokeWidth="2" />
      <ellipse cx="60" cy="35" rx="8" ry="10" fill="white" stroke="#1A1A2E" strokeWidth="2" />
      <circle cx="42" cy="36" r="4" fill="#1A1A2E" />
      <circle cx="62" cy="36" r="4" fill="#1A1A2E" />
      <circle cx="43" cy="34" r="1.5" fill="white" />
      <circle cx="63" cy="34" r="1.5" fill="white" />
      {/* Mouth */}
      <path d="M 40 50 Q 50 60 60 50" fill="none" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" />
      {/* Body */}
      <ellipse cx="50" cy="80" rx="20" ry="15" fill={c2} stroke="#1A1A2E" strokeWidth="3" />
      {/* Arms */}
      <ellipse cx="25" cy="75" rx="8" ry="12" fill={c3} stroke="#1A1A2E" strokeWidth="2" />
      <ellipse cx="75" cy="75" rx="8" ry="12" fill={c3} stroke="#1A1A2E" strokeWidth="2" />
      {/* Blush */}
      <ellipse cx="30" cy="45" rx="5" ry="3" fill="#FF9999" opacity="0.6" />
      <ellipse cx="70" cy="45" rx="5" ry="3" fill="#FF9999" opacity="0.6" />
    </svg>
  );
}

function HalftoneBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#FFF8E7]" />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(circle, #1A1A2E 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />
      <div
        className="absolute -top-1/2 -right-1/2 w-full h-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #FF1493 0%, transparent 50%)',
        }}
      />
      <div
        className="absolute -bottom-1/2 -left-1/2 w-full h-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #00D4FF 0%, transparent 50%)',
        }}
      />
    </div>
  );
}

function ActionBurst({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -z-10 scale-150">
        <polygon
          points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35"
          fill="#FFE135"
          stroke="#1A1A2E"
          strokeWidth="2"
        />
      </svg>
      {children}
    </div>
  );
}

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('comic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<typeof generatedCartoons[0] | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setShowResult(false);

    // Simulate generation
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * generatedCartoons.length);
      setGeneratedImage({ ...generatedCartoons[randomIndex], style: selectedStyle });
      setIsGenerating(false);
      setShowResult(true);
    }, 2000);
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen min-h-[100dvh] relative overflow-x-hidden">
      <HalftoneBackground />

      <div className="relative z-10 px-4 py-6 md:px-8 md:py-12 flex flex-col min-h-screen min-h-[100dvh]">
        {/* Header */}
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={mounted ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: 'backOut' }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-block relative">
            <motion.h1
              className="font-bangers text-5xl md:text-7xl lg:text-8xl text-[#1A1A2E] tracking-wide"
              style={{
                textShadow: '4px 4px 0px #FF1493, 8px 8px 0px #00D4FF',
                WebkitTextStroke: '2px #1A1A2E',
              }}
            >
              TOON FORGE
            </motion.h1>
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={mounted ? { scale: 1, rotate: 12 } : {}}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="absolute -top-2 -right-4 md:-top-4 md:-right-8"
            >
              <ActionBurst className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
                <span className="text-lg md:text-2xl">POW!</span>
              </ActionBurst>
            </motion.div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="font-comic text-lg md:text-xl text-[#1A1A2E] mt-4 max-w-md mx-auto"
          >
            Transform your ideas into amazing cartoon characters!
          </motion.p>
        </motion.header>

        {/* Main Content */}
        <main className="flex-1 max-w-4xl mx-auto w-full">
          {/* Input Section */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={mounted ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="bg-white border-4 border-[#1A1A2E] rounded-2xl p-4 md:p-6 mb-6 md:mb-8 shadow-[8px_8px_0px_#1A1A2E]"
          >
            <label className="block font-bangers text-xl md:text-2xl text-[#1A1A2E] mb-3">
              Describe Your Character
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A happy robot wearing a chef's hat..."
              className="w-full h-24 md:h-32 p-4 font-comic text-base md:text-lg border-3 border-[#1A1A2E] rounded-xl focus:outline-none focus:ring-4 focus:ring-[#00D4FF] resize-none bg-[#FFF8E7]"
              style={{ borderWidth: '3px' }}
            />

            {/* Style Selection */}
            <div className="mt-4 md:mt-6">
              <label className="block font-bangers text-lg md:text-xl text-[#1A1A2E] mb-3">
                Choose Your Style
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
                {cartoonStyles.map((style) => (
                  <motion.button
                    key={style.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`p-3 md:p-4 rounded-xl border-3 font-comic text-sm md:text-base transition-all ${
                      selectedStyle === style.id
                        ? 'bg-[#FF1493] text-white border-[#1A1A2E] shadow-[4px_4px_0px_#1A1A2E]'
                        : 'bg-white border-[#1A1A2E] hover:bg-[#FFF8E7]'
                    }`}
                    style={{ borderWidth: '3px' }}
                  >
                    <span className="block text-xl md:text-2xl mb-1">{style.emoji}</span>
                    <span className="block text-xs md:text-sm whitespace-nowrap">{style.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full mt-6 py-4 md:py-5 font-bangers text-xl md:text-2xl bg-[#00D4FF] text-[#1A1A2E] border-4 border-[#1A1A2E] rounded-xl shadow-[6px_6px_0px_#1A1A2E] hover:shadow-[4px_4px_0px_#1A1A2E] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="inline-block"
                  >
                    ⚡
                  </motion.span>
                  CREATING MAGIC...
                </span>
              ) : (
                'GENERATE CARTOON! ✨'
              )}
            </motion.button>
          </motion.div>

          {/* Result Section */}
          <AnimatePresence>
            {showResult && generatedImage && (
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="relative"
              >
                {/* Comic Panel Frame */}
                <div className="bg-white border-4 border-[#1A1A2E] rounded-2xl p-4 md:p-8 shadow-[8px_8px_0px_#1A1A2E] relative overflow-hidden">
                  {/* Action lines background */}
                  <div className="absolute inset-0 opacity-10">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute bg-[#1A1A2E]"
                        style={{
                          height: '200%',
                          width: '2px',
                          left: '50%',
                          top: '-50%',
                          transform: `rotate(${i * 30}deg)`,
                          transformOrigin: 'center center',
                        }}
                      />
                    ))}
                  </div>

                  {/* Generated Character */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative z-10"
                  >
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="w-48 h-48 md:w-64 md:h-64 bg-[#FFF8E7] border-4 border-[#1A1A2E] rounded-xl p-4 shadow-inner">
                        <CartoonCharacter colors={generatedImage.colors} style={generatedImage.style} />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <motion.div
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          <h3 className="font-bangers text-2xl md:text-3xl text-[#1A1A2E] mb-2">
                            YOUR CARTOON IS READY!
                          </h3>
                          <p className="font-comic text-base md:text-lg text-[#666] mb-4">
                            "{prompt}"
                          </p>
                          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            <span className="px-3 py-1 bg-[#FFE135] border-2 border-[#1A1A2E] rounded-full font-comic text-sm">
                              {cartoonStyles.find(s => s.id === selectedStyle)?.name}
                            </span>
                            <span className="px-3 py-1 bg-[#FF1493] text-white border-2 border-[#1A1A2E] rounded-full font-comic text-sm">
                              HD Quality
                            </span>
                          </div>
                        </motion.div>

                        {/* Action buttons */}
                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.6 }}
                          className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start"
                        >
                          <button className="px-4 md:px-6 py-3 font-bangers text-base md:text-lg bg-[#00D4FF] border-3 border-[#1A1A2E] rounded-xl shadow-[4px_4px_0px_#1A1A2E] hover:shadow-[2px_2px_0px_#1A1A2E] hover:translate-x-[2px] hover:translate-y-[2px] transition-all" style={{ borderWidth: '3px' }}>
                            DOWNLOAD 📥
                          </button>
                          <button className="px-4 md:px-6 py-3 font-bangers text-base md:text-lg bg-[#FFE135] border-3 border-[#1A1A2E] rounded-xl shadow-[4px_4px_0px_#1A1A2E] hover:shadow-[2px_2px_0px_#1A1A2E] hover:translate-x-[2px] hover:translate-y-[2px] transition-all" style={{ borderWidth: '3px' }}>
                            SHARE 🔗
                          </button>
                          <button
                            onClick={() => { setShowResult(false); setPrompt(''); }}
                            className="px-4 md:px-6 py-3 font-bangers text-base md:text-lg bg-white border-3 border-[#1A1A2E] rounded-xl shadow-[4px_4px_0px_#1A1A2E] hover:shadow-[2px_2px_0px_#1A1A2E] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                            style={{ borderWidth: '3px' }}
                          >
                            NEW ➕
                          </button>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* POW burst decoration */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  className="absolute -top-6 -left-4 md:-top-8 md:-left-6"
                >
                  <ActionBurst className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                    <span className="font-bangers text-sm md:text-base text-[#1A1A2E]">WOW!</span>
                  </ActionBurst>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Gallery Preview */}
          {!showResult && (
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={mounted ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              <h2 className="font-bangers text-2xl md:text-3xl text-[#1A1A2E] text-center mb-6">
                RECENT CREATIONS
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {generatedCartoons.map((cartoon, index) => (
                  <motion.div
                    key={cartoon.id}
                    initial={{ scale: 0, rotate: -10 }}
                    animate={mounted ? { scale: 1, rotate: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1, type: 'spring' }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="aspect-square bg-white border-4 border-[#1A1A2E] rounded-xl p-3 md:p-4 shadow-[4px_4px_0px_#1A1A2E] cursor-pointer hover:shadow-[6px_6px_0px_#FF1493] transition-shadow"
                  >
                    <CartoonCharacter colors={cartoon.colors} style={cartoon.style} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-8 md:mt-12 text-center">
          <p className="font-comic text-xs md:text-sm text-[#999]">
            Requested by @PauliusX · Built by @clonkbot
          </p>
        </footer>
      </div>
    </div>
  );
}

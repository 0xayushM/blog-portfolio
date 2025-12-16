export default function YouTube() {
  return (
    <section id="youtube" className="py-20 bg-[#0d1425]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">
          🎥 Learn Sales on YouTube – Free Forever
        </h2>
        <p className="text-xl text-gray-400 text-center mb-12">
          Daily short videos, long trainings, real sales stories and motivation.
        </p>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1e293b]/50 p-8 rounded-xl border border-white/10">
            <div className="aspect-video bg-black/50 rounded-lg mb-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">▶️</div>
                <p className="text-gray-400">YouTube Video Embed</p>
                <p className="text-sm text-gray-500 mt-2">Add your YouTube video ID to embed</p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-xl text-gray-300 mb-6">
                👉 Subscribe to <span className="text-red-400 font-bold">"Seekho Sales by Abhishek Upadhyay"</span>
              </p>
              
              <a 
                href="https://www.youtube.com/@seekhosales"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg transition-colors font-semibold text-lg"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Subscribe on YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

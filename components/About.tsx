export default function About() {
  const missionPoints = [
    { icon: '✔', text: 'Make sales simple' },
    { icon: '✔', text: 'Build field salesman confidence' },
    { icon: '✔', text: 'Provide quality sales training without cost' },
  ];

  const brands = ['Dabur', 'HUL', 'GSK', 'Piramal'];

  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center">Why Seekho Sales?</h2>
        
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-[#1e293b]/50 p-8 rounded-xl border border-white/10">
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              There are many who teach sales in India,<br />
              <span className="text-white font-semibold">but very few who explain the ground reality.</span>
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              I'm <span className="text-blue-400 font-semibold">Abhishek Upadhyay</span>, working in FMCG, Pharma and Corporate Sales Training for 15+ years.
            </p>
            
            <p className="text-lg text-gray-300 mb-4">
              I have worked with sales teams of these brands:
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              {brands.map((brand) => (
                <span
                  key={brand}
                  className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full border border-blue-500/30 font-semibold"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-500/10 to-green-500/10 p-8 rounded-xl border border-white/10">
            <h3 className="text-2xl font-bold mb-6 text-center">Seekho Sales Mission</h3>
            <div className="space-y-4">
              {missionPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-green-400 text-2xl">{point.icon}</span>
                  <span className="text-lg text-gray-200">{point.text}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-xl text-gray-300 italic">
                Because I believe
              </p>
              <p className="text-2xl font-bold text-white mt-2">
                Everyone deserves to learn sales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

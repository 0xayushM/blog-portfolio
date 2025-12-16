export default function WhyFree() {
  const notOffered = [
    { icon: '❌', text: 'Expensive Courses – NO' },
    { icon: '❌', text: 'Fake Motivation – NO' },
  ];

  const offered = [
    { icon: '✅', text: 'Real Sales Training – YES' },
    { icon: '✅', text: '100% FREE on YouTube – YES' },
  ];

  return (
    <section id="why-free" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          "Why is Everything FREE on Seekho Sales?"
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-red-500/10 to-green-500/10 p-8 rounded-xl border border-white/10">
            <p className="text-xl text-gray-300 leading-relaxed mb-6 text-center">
              India's salesman works the hardest,<br />
              <span className="text-white font-semibold">but has to pay the most to learn.</span>
            </p>
            
            <p className="text-xl text-blue-400 font-semibold text-center mb-8">
              That's why I decided:
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {notOffered.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 bg-red-500/10 p-4 rounded-lg">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-lg text-gray-200">{item.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                {offered.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 bg-green-500/10 p-4 rounded-lg">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-lg text-gray-200">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-xl text-gray-300 italic">
                If you want to learn,
              </p>
              <p className="text-2xl font-bold text-green-400 mt-2">
                Seekho Sales is with you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Courses() {
  const topics = [
    { icon: '📖', title: 'Basics of Sales', description: 'Beginner Friendly' },
    { icon: '🏪', title: 'FMCG & Pharma Sales', description: 'Techniques' },
    { icon: '🤝', title: 'Retailer Handling', description: '& Objection Handling' },
    { icon: '💬', title: 'Negotiation Skills', description: 'Master the art' },
    { icon: '🧠', title: 'Sales Motivation', description: '& Mindset' },
    { icon: '🏢', title: 'Modern Trade', description: '& B2B Selling' },
    { icon: '🎯', title: 'Target Pressure', description: 'Handling' },
    { icon: '📚', title: 'Real Field Stories', description: '& Case Studies' },
  ];

  return (
    <section id="courses" className="py-20 bg-[#0d1425]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">What You Will Learn</h2>
        <p className="text-xl text-gray-400 text-center mb-12">Free Sales Training Topics</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((topic, index) => (
            <div 
              key={index} 
              className="bg-[#1e293b]/50 p-6 rounded-xl border border-white/10 hover:border-green-500/50 transition-all hover:transform hover:scale-105"
            >
              <div className="text-4xl mb-4">{topic.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{topic.title}</h3>
              <p className="text-gray-400">{topic.description}</p>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-green-400">✔</span>
                <span className="text-sm text-green-400">FREE</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-2xl font-bold text-white">
            👉 No theory… <span className="text-red-400">only practical sales.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

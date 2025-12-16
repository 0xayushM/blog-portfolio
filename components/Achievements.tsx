export default function Achievements() {
  const achievements = [
    { icon: '📚', value: '15+', label: 'Years Field Experience' },
    { icon: '🏢', value: '4+', label: 'Top Brands Trained' },
    { icon: '🎥', value: '100%', label: 'FREE Training' },
    { icon: '💪', value: '1000+', label: 'Salespeople Trained' },
  ];

  return (
    <section id="achievements" className="py-20 bg-[#0d1425]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Seekho Sales Impact</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-[#1e293b]/50 p-8 rounded-xl border border-white/10 text-center">
              <div className="text-4xl mb-2">{achievement.icon}</div>
              <div className="text-4xl font-bold text-red-400 mb-2">{achievement.value}</div>
              <div className="text-gray-400">{achievement.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

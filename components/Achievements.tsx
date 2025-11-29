export default function Achievements() {
  const achievements = [
    { icon: '📈', value: '300%+', label: 'Revenue Growth' },
    { icon: '👥', value: '50+', label: 'Team Members Managed' },
    { icon: '🌍', value: '12', label: 'New Markets Penetrated' },
    { icon: '🎯', value: '98%', label: 'Client Retention Rate' },
  ];

  return (
    <section className="py-20 bg-[#0d1425]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Key Achievements</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-[#1e293b]/50 p-8 rounded-xl border border-white/10 text-center">
              <div className="text-4xl mb-2">{achievement.icon}</div>
              <div className="text-4xl font-bold text-blue-400 mb-2">{achievement.value}</div>
              <div className="text-gray-400">{achievement.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function About() {
  const careerJourney = [
    {
      icon: '💼',
      title: 'VP of Global Sales, TechCorp Inc.',
      period: '2020 - Present',
      achievements: [
        'Spearheaded a 100% increase in annual recurring revenue',
        'Expanded sales operations into 5 new international markets',
        'Built and led a team of 50+ sales professionals',
      ],
    },
    {
      icon: '💼',
      title: 'Sales Director, Innovate Solutions',
      period: '2016 - 2020',
      achievements: [
        'Grew the enterprise sales team from 10 to 50+ representatives',
        'Exceeded sales targets by an average of 40% year-over-year',
        'Developed strategic partnerships with Fortune 500 companies',
      ],
    },
    {
      icon: '💼',
      title: 'Regional Sales Manager, Enterprise Co.',
      period: '2012 - 2016',
      achievements: [
        'Secured the company\'s largest-ever contract, valued at $50M',
        'Achieved Top Regional Manager award for two consecutive years',
      ],
    },
  ];

  const skills = [
    'Strategic Planning',
    'Global Market Expansion',
    'P&L Management',
    'C-Level Negotiation',
    'Team Leadership',
    'Salesforce CRM',
    'Go-to-Market Strategy',
    'SaaS Sales',
    'Channel Partnerships',
    'Data-Driven Strategy',
  ];

  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12">Career Journey</h2>
        <div className="space-y-8">
          {careerJourney.map((job, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-8 py-4">
              <div className="flex items-start gap-4">
                <div className="text-3xl">{job.icon}</div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{job.title}</h3>
                  <p className="text-blue-400 mb-3">{job.period}</p>
                  <ul className="space-y-2 text-gray-300">
                    {job.achievements.map((achievement, idx) => (
                      <li key={idx}>• {achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-3xl font-bold mb-8">Skills & Expertise</h3>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full border border-blue-500/30"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-[#0d1425]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Let's Connect</h2>
        <p className="text-gray-400 mb-8 text-lg">
          Interested in collaboration or consulting? Reach out to discuss how we can drive growth together.
        </p>
        <div className="flex justify-center gap-4 mb-8">
          <a href="#" className="w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
            <span className="text-xl">in</span>
          </a>
          <a href="#" className="w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
            <span className="text-xl">𝕏</span>
          </a>
          <a href="#" className="w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
            <span className="text-xl">@</span>
          </a>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg transition-colors font-semibold text-lg">
          Get In Touch
        </button>
      </div>
    </section>
  );
}

import { stats } from "../lib/data";

export default function StatCards() {
  return (
    <section
      id="challenge"
      className="border-b border-[#E5E5E5] bg-[#F8F8F8]"
      aria-label="FAA Modernization Challenge"
    >
      <div className="section-container">
        <p className="section-title">THE CHALLENGE</p>
        <h2 className="font-mono text-2xl md:text-3xl font-bold text-black mb-12">
          FAA MODERNIZATION AT SCALE
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border border-[#E5E5E5] mb-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-6 md:p-8 border-r border-b border-[#E5E5E5] last:border-r-0 bg-white"
            >
              <p className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-2">
                {stat.value}
              </p>
              <p className="font-mono text-xs font-medium tracking-wider uppercase text-black/60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <p className="font-sans text-base md:text-lg text-black/70 max-w-2xl">
          Reducing sustainment costs. Eliminating duplication across Lines of
          Business. Cloud-native. Interoperable. Secure.
        </p>
      </div>
    </section>
  );
}

import { objectiveStrengths, objectiveLimitations } from "../lib/data";

export default function ObjectiveAssessment() {
  return (
    <section
      id="assessment"
      className="border-b border-[#E5E5E5]"
      aria-label="Objective Assessment"
    >
      <div className="section-container">
        <p className="section-title">HONEST POSTURE</p>
        <h2 className="font-mono text-2xl md:text-3xl font-bold text-black mb-12">
          OBJECTIVE ASSESSMENT
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Strengths */}
          <div className="border border-[#E5E5E5] p-6 md:p-8 bg-white">
            <h3 className="font-mono text-sm font-bold tracking-wider text-black mb-6">
              STRENGTHS
            </h3>
            <ul className="list-none m-0 p-0 space-y-0">
              {objectiveStrengths.map((item) => (
                <li
                  key={item.title}
                  className="py-4 border-b border-[#E5E5E5] last:border-b-0"
                >
                  <span className="font-mono text-xs font-bold text-black block mb-1">
                    {item.title}
                  </span>
                  <span className="font-sans text-sm text-black/70">
                    {item.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Limitations */}
          <div className="border border-[#E5E5E5] border-l-0 p-6 md:p-8 bg-[#F8F8F8]">
            <h3 className="font-mono text-sm font-bold tracking-wider text-black mb-6">
              KNOWN LIMITATIONS
            </h3>
            <ul className="list-none m-0 p-0 space-y-0">
              {objectiveLimitations.map((item) => (
                <li
                  key={item.title}
                  className="py-4 border-b border-[#E5E5E5] last:border-b-0"
                >
                  <span className="font-mono text-xs font-bold text-black block mb-1">
                    {item.title}
                  </span>
                  <span className="font-sans text-sm text-black/70">
                    {item.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

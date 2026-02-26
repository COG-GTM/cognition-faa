import { selfImprovingSteps, selfImprovingTimeline } from "../lib/data";

export default function SelfImproving() {
  return (
    <section
      id="self-improving"
      className="border-b border-[#E5E5E5]"
      aria-label="Self-Improving System"
    >
      <div className="section-container">
        <p className="section-title">COMPOUND ENGINEERING</p>
        <h2 className="font-mono text-2xl md:text-3xl font-bold text-black mb-4">
          CONTINUOUS IMPROVEMENT
        </h2>
        <p className="font-sans text-base text-black/60 mb-12 max-w-2xl">
          DevinClaw doesn&apos;t just modernize &mdash; it learns.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 mb-12">
          {selfImprovingSteps.map((step, i) => (
            <div
              key={i}
              className="border border-[#E5E5E5] p-6 md:p-8 bg-white"
            >
              <span className="font-mono text-2xl font-bold text-[#003B71] block mb-3">
                {i + 1}.
              </span>
              <p className="font-sans text-sm text-black/80 leading-relaxed">
                {step}
              </p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="border-2 border-black p-6 md:p-8 bg-white">
          <h3 className="font-mono text-sm font-bold tracking-wider text-black mb-6">
            COMPOUND IMPROVEMENT
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {selfImprovingTimeline.map((entry, i) => (
              <div
                key={i}
                className="p-4 md:p-6 border-b md:border-b-0 md:border-r border-[#E5E5E5] last:border-b-0 last:border-r-0"
              >
                <p className="font-mono text-xs font-bold tracking-wider text-[#003B71] mb-2">
                  {entry.session}
                </p>
                <p className="font-mono text-lg font-bold text-black">
                  {entry.result}
                </p>
              </div>
            ))}
          </div>
          <p className="font-mono text-xs font-bold tracking-wider text-black/50 mt-6 pt-6 border-t border-[#E5E5E5]">
            THIS IS COMPOUND ENGINEERING AT GOVERNMENT SCALE.
          </p>
        </div>
      </div>
    </section>
  );
}

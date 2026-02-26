import { useCases } from "../lib/data";

export default function UseCases() {
  return (
    <section
      id="use-cases"
      className="border-b border-[#E5E5E5] bg-[#F8F8F8]"
      aria-label="FAA Modernization Use Cases"
    >
      <div className="section-container">
        <p className="section-title">PROVEN SCENARIOS</p>
        <h2 className="font-mono text-2xl md:text-3xl font-bold text-black mb-4">
          FAA MODERNIZATION USE CASES
        </h2>
        <p className="font-sans text-sm text-black/60 mb-12 max-w-2xl">
          Each scenario maps to a pre-configured skill with complete Spec-Driven
          Design &rarr; Test-Driven Design &rarr; Build &rarr; Review pipeline.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {useCases.map((uc) => (
            <div
              key={uc.id}
              className="border border-[#E5E5E5] p-6 md:p-8 bg-white"
            >
              <div className="flex items-start gap-4">
                <span className="font-mono text-2xl font-bold text-[#003B71] shrink-0">
                  #{uc.id}
                </span>
                <div>
                  <h3 className="font-mono text-sm font-bold tracking-wider text-black mb-2">
                    {uc.title}
                  </h3>
                  <p className="font-sans text-sm text-black/70 mb-2">
                    {uc.description}
                  </p>
                  <p className="font-mono text-xs text-black/50">
                    &rarr; {uc.tools}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

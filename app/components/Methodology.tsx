import { methodologyPhases, methodologyBenefits } from "../lib/data";

export default function Methodology() {
  return (
    <section
      id="methodology"
      className="border-b border-[#E5E5E5] bg-[#F8F8F8]"
      aria-label="Methodology"
    >
      <div className="section-container">
        <p className="section-title">OUR PROCESS</p>
        <h2 className="font-mono text-2xl md:text-3xl font-bold text-black mb-4">
          SDLC CONSTITUTION
        </h2>
        <p className="font-sans text-sm text-black/60 mb-12 max-w-2xl">
          Deterministic stage boundaries. Every stage produces paired markdown +
          JSON outputs. Machine-verifiable proof of correctness.
        </p>

        {/* Pipeline flow */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {[
            "Spec",
            "Design",
            "Build",
            "Test",
            "Review",
            "Evidence Pack",
            "Deliver",
          ].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold tracking-wider px-4 py-2 border-2 border-black bg-white text-black">
                {step.toUpperCase()}
              </span>
              {i < 6 && (
                <span
                  className="font-mono text-black/40 text-lg"
                  aria-hidden="true"
                >
                  &rarr;
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Phase table */}
        <div className="overflow-x-auto mb-12">
          <table className="data-table" role="table">
            <thead>
              <tr>
                <th scope="col">Phase</th>
                <th scope="col">Output</th>
                <th scope="col">Validation</th>
              </tr>
            </thead>
            <tbody>
              {methodologyPhases.map((row) => (
                <tr key={row.phase}>
                  <td className="font-mono text-sm font-semibold">
                    {row.phase}
                  </td>
                  <td className="font-mono text-sm">{row.output}</td>
                  <td>{row.validation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Benefits */}
        <div>
          <h3 className="font-mono text-sm font-bold tracking-wider text-black mb-6">
            WHY THIS MATTERS FOR FAA
          </h3>
          <ul className="list-none m-0 p-0 space-y-0">
            {methodologyBenefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-3 py-3 border-b border-[#E5E5E5] last:border-b-0"
              >
                <span
                  className="font-mono text-xs text-[#003B71] font-bold shrink-0"
                  aria-hidden="true"
                >
                  &bull;
                </span>
                <span className="font-sans text-sm text-black/80">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

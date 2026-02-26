import { verificationFeatures } from "../lib/data";

export default function VerificationSystem() {
  return (
    <section
      id="verification"
      className="border-b border-[#E5E5E5] bg-[#F8F8F8]"
      aria-label="Verification and Trust System"
    >
      <div className="section-container">
        <p className="section-title">TRUST</p>
        <h2 className="font-mono text-2xl md:text-3xl font-bold text-black mb-4">
          VERIFICATION &amp; TRUST
        </h2>
        <p className="font-sans text-sm text-black/60 mb-12 max-w-2xl">
          In federal contexts, the failure mode is not slow delivery&mdash;it&rsquo;s
          loss of trust. Every output is verified, every claim is evidenced,
          every contradiction is surfaced.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {verificationFeatures.map((feature) => (
            <div
              key={feature.title}
              className="border border-[#E5E5E5] p-6 md:p-8 bg-white"
            >
              <h3 className="font-mono text-sm font-bold tracking-wider text-black mb-4">
                {feature.title}
              </h3>
              <p className="font-sans text-sm text-black/80 leading-relaxed mb-6">
                {feature.description}
              </p>
              <ul className="list-none m-0 p-0 space-y-0">
                {feature.details.map((detail) => (
                  <li
                    key={detail}
                    className="flex items-start gap-3 py-2 border-b border-[#E5E5E5] last:border-b-0"
                  >
                    <span
                      className="font-mono text-xs text-[#003B71] font-bold shrink-0"
                      aria-hidden="true"
                    >
                      &bull;
                    </span>
                    <span className="font-sans text-xs text-black/70">
                      {detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

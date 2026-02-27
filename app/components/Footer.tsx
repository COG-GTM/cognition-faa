import USFlag from "./USFlag";

export default function Footer() {
  return (
    <footer className="bg-black text-white" role="contentinfo">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Left */}
          <div>
            <p className="font-mono text-sm font-bold tracking-[0.3em] text-white mb-6 flex items-center gap-3">
              <USFlag />
              COGNITION <span className="text-[#4A90D9]">//</span> FAA
            </p>
            <p className="font-sans text-sm text-white/60 mb-1">
              Powered by Devin AI
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
              {["devin.ai", "deepwiki.com", "windsurf.com"].map(
                (site) => (
                  <span
                    key={site}
                    className="font-mono text-xs text-white/40"
                  >
                    {site}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Right */}
          <div>
            <p className="font-mono text-sm font-bold tracking-wider text-white mb-2">
              FEDERAL AVIATION ADMINISTRATION
            </p>
            <p className="font-sans text-sm text-white/60">
              Application and Database Modernization
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6">
          <p className="font-mono text-xs text-white/30">
            Data source: SAM.gov &mdash; FAA ChBA Modernization Initiative
          </p>
        </div>
      </div>
    </footer>
  );
}

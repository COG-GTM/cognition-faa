import { capabilities } from "../lib/data";

export default function CapabilitiesGrid() {
  return (
    <section
      id="capabilities"
      className="border-b border-[#E5E5E5]"
      aria-label="Enterprise Capabilities"
    >
      <div className="section-container">
        <p className="section-title">WHAT WE DELIVER</p>
        <h2 className="font-mono text-2xl md:text-3xl font-bold text-black mb-12">
          ENTERPRISE CAPABILITIES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="border border-[#E5E5E5] p-6 md:p-8 bg-white"
            >
              <h3 className="font-mono text-sm font-bold tracking-wider text-black mb-4">
                {cap.title}
              </h3>
              <ul className="list-none m-0 p-0 space-y-2">
                {cap.items.map((item, i) => (
                  <li
                    key={i}
                    className="font-sans text-sm text-black/70 leading-relaxed"
                  >
                    {item}
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

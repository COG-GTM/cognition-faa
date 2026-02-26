import { sdlcPhases } from "../lib/data";

export default function SDLCMapping() {
  return (
    <section
      id="sdlc"
      className="border-b border-[#E5E5E5] bg-[#F8F8F8]"
      aria-label="SDLC Mapping"
    >
      <div className="section-container">
        <p className="section-title">DEVELOPMENT LIFECYCLE</p>
        <h2 className="font-mono text-2xl md:text-3xl font-bold text-black mb-12">
          FULL SOFTWARE DEVELOPMENT LIFECYCLE COVERAGE
        </h2>

        <div className="overflow-x-auto">
          <table className="data-table" role="table">
            <thead>
              <tr>
                <th scope="col">Phase</th>
                <th scope="col">Tool</th>
                <th scope="col">Capability</th>
              </tr>
            </thead>
            <tbody>
              {sdlcPhases.map((row) => (
                <tr key={row.phase}>
                  <td className="font-mono text-sm font-semibold">
                    {row.phase}
                  </td>
                  <td className="font-mono text-sm">{row.tool}</td>
                  <td>{row.capability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

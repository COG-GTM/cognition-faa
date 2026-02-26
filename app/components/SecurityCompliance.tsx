import { securityPlatforms, complianceFrameworks } from "../lib/data";

export default function SecurityCompliance() {
  return (
    <section
      id="security"
      className="border-b border-[#E5E5E5]"
      aria-label="Federal Security Compliance"
    >
      <div className="section-container">
        <p className="section-title">COMPLIANCE</p>
        <h2 className="font-mono text-2xl md:text-3xl font-bold text-black mb-12">
          FEDERAL SECURITY COMPLIANCE
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Platform Authorization Table */}
          <div>
            <h3 className="font-mono text-sm font-bold tracking-wider text-black mb-6">
              PLATFORM AUTHORIZATION
            </h3>
            <div className="overflow-x-auto">
              <table className="data-table" role="table">
                <thead>
                  <tr>
                    <th scope="col">Platform</th>
                    <th scope="col">FedRAMP Status</th>
                    <th scope="col">IL Level</th>
                  </tr>
                </thead>
                <tbody>
                  {securityPlatforms.map((row) => (
                    <tr key={row.platform}>
                      <td className="font-mono text-sm font-semibold">
                        {row.platform}
                      </td>
                      <td className="font-mono text-sm">{row.fedramp}</td>
                      <td className="font-mono text-sm">{row.il}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Compliance Framework Coverage */}
          <div>
            <h3 className="font-mono text-sm font-bold tracking-wider text-black mb-6">
              COMPLIANCE FRAMEWORK COVERAGE
            </h3>
            <ul className="list-none m-0 p-0 space-y-0">
              {complianceFrameworks.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 py-3 border-b border-[#E5E5E5] last:border-b-0"
                >
                  <span
                    className="font-mono text-sm text-success font-bold shrink-0"
                    aria-hidden="true"
                  >
                    &#10003;
                  </span>
                  <span className="font-sans text-sm text-black/80">
                    {item}
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

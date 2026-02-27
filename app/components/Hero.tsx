import USFlag from "./USFlag";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center border-b border-[#E5E5E5] pt-14"
      aria-label="Hero"
    >
      <div className="section-container w-full">
        <p className="font-mono text-sm font-bold tracking-[0.3em] text-[#003B71] mb-8 flex items-center gap-3">
          <USFlag />
          COGNITION // FAA
        </p>
        <h1 className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-black mb-6 max-w-4xl">
          AI-Powered Application and Database Modernization
        </h1>
        <p className="font-sans text-lg md:text-xl text-black/70 mb-4 max-w-2xl">
          for the Federal Aviation Administration.
        </p>
        <p className="font-mono text-base md:text-lg text-black mb-12">
          200+ applications. 3,000 databases. One framework.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#architecture"
            className="inline-block font-mono text-xs font-bold tracking-wider uppercase px-8 py-4 bg-black text-white border-2 border-black no-underline hover:bg-[#003B71] hover:border-[#003B71] transition-colors text-center"
          >
            EXPLORE ARCHITECTURE
          </a>
          <a
            href="#capabilities"
            className="inline-block font-mono text-xs font-bold tracking-wider uppercase px-8 py-4 bg-white text-black border-2 border-black no-underline hover:bg-[#F8F8F8] transition-colors text-center"
          >
            VIEW CAPABILITIES
          </a>
        </div>
      </div>
    </section>
  );
}

"use client"

const ServicePill = ({ children }: { children: React.ReactNode }) => (
  <div className="px-4 py-3 text-center rounded-md font-semibold uppercase tracking-widest text-white text-xs sm:text-sm lg:text-base bg-white/5 backdrop-blur-[5px] border border-white/30 select-none cursor-default">
    {children}
  </div>
)

const serviceCategories = [
  {
    title: "Brand & Identity",
    services: ["BRANDING", "LOGO DESIGN", "IDENTITY DESIGN"]
  },
  {
    title: "Digital Design",
    services: ["UI/UX DESIGN", "PRODUCT DESIGN", "AD DESIGN"]
  },
  {
    title: "Content & Media",
    services: ["SOCIAL-MEDIA DESIGN", "VIDEO & MOTION AD"]
  }
]

export default function WeCreateDigital() {
  return (
    <div className="h-full p-4 sm:p-8 lg:p-12 flex flex-col lg:flex-row justify-between items-stretch gap-8 lg:gap-20 mb-36">
      <div className="mb-8 lg:mb-0 font-display font-regular tracking-tight-medium font-bold text-left w-full lg:w-auto">
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold leading-relaxed mb-6 text-white">
            WE CREATE
          </h1>
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold leading-relaxed mb-6 text-blue-600">
            DIGITAL
          </h1>
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold leading-relaxed text-white">
            EXPERIENCES
          </h1>
      </div>

      <div className="relative h-full overflow-visible rounded-lg bg-transparent w-full lg:w-auto text-base md:text-lg uppercase tracking-widest text-white font-thin leading-loose select-none cursor-default flex flex-col gap-8">
        {serviceCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-4">
            <h3 className="text-sm font-bold text-blue-400 tracking-wider pl-2">
              {category.title}
            </h3>
            <div className={`grid gap-3 sm:gap-4 ${
              categoryIndex === serviceCategories.length - 1 
                ? 'grid-cols-1 sm:grid-cols-2' 
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            }`}>
              {category.services.map((service, serviceIndex) => (
                <ServicePill key={serviceIndex}>
                  ✦ {service}
                </ServicePill>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
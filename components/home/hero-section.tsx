import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative z-0 flex min-h-[calc(100vh-110px)] flex-col items-center justify-center px-4 py-16 text-center md:px-8 lg:px-16">
      <h1 className="max-w-6xl text-5xl font-bold leading-tight text-primary-gray md:text-6xl lg:text-8.5xl font-display font-regular tracking-tight-medium -mt-56">
        <span className="font-semibold-italic">Our Design</span>
        <span className="inline-flex items-center whitespace-nowrap">
          <span className="tracking-tight-extreme">that</span> 
          <Image
            src="./lightning.png"
            width={64}
            height={64}
            alt="Battery icon"
            className="ml-2 inline-block h-20 w-20 md:h-32 md:w-32"
          /> 
          supercharge
        </span> <br />
        <span className="tracking-tight-extreme">your</span> Brand
      </h1>
    </section>
  )
}

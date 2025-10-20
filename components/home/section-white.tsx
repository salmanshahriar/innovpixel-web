import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ProjectCardProps {
  title: string
  image: string
  tags: string[]
  className?: string
}

function ProjectCard({ title, image, tags, className = "" }: ProjectCardProps) {
  return (
    <div className={`group relative overflow-hidden rounded-3xl cursor-pointer ${className}`}>
      <div className="aspect-[4/5] relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Tags */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-white/20"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <div className="absolute bottom-6 left-6 right-6">
          <h3 className="text-white text-xl lg:text-2xl font-semibold text-balance">{title}</h3>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <main className="px-4 md:px-8  bg-white">
      {/* Featured Projects Grid */}
      <section id="projects" className="py-12 lg:py-16">
        <div className="mx-auto px-4 lg:px-8">
          <div>
            <ProjectCard
              title="Meta X Gentle Monster"
              image="/blue-jellyfish-3d-render-futuristic.jpg"
              tags={["V", "3D Motion"]}
              className="h-[500px]"
            />
          </div>
        </div>
      </section>

      {/* More Projects */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard title="Project: Sizzle & Slip" image="/pink-toy-car-playground-3d.jpg" tags={["JIF", "3D Motion"]} />
            <ProjectCard
              title="Project: InnovTech"
              image="/luxury-watch-closeup-silver.jpg"
              tags={["AP", "3D Motion"]}
            />
            <ProjectCard
              title="Project: HexCode"
              image="/modern-building-palm-trees-car.jpg"
              tags={["Hyundai", "Mixed Reality"]}
            />
          </div>

          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              className="bg-white hover:bg-white text-black rounded-full px-8"
            >
              All projects
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
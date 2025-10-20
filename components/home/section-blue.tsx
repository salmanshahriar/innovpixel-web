import { Palette, Pen, Award as IdCard, Sparkles, Package, ImageIcon, Share2, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const expertiseItems = [
  {
    icon: Palette,
    title: "Branding",
    description:
      "Unique brand identity that resonates with your audience, ensuring a consistent and memorable presence.",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    icon: Sparkles,
    title: "UI/UX Design",
    description: "User-friendly interfaces that ensure smooth experiences and maximize engagement.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    icon: Package,
    title: "Product Design",
    description: "Comprehensive product design solutions that bring your vision to life with attention to detail.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    icon: ImageIcon,
    title: "Ad Design",
    description: "Eye-catching advertisement designs that capture attention and drive engagement across all platforms.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    icon: Pen,
    title: "Logo Design",
    description: "Distinctive logos that represent your brand's essence and create lasting impressions.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    icon: Share2,
    title: "Social-Media Design",
    description: "Engaging social media content that resonates with your audience and builds community.",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    icon: IdCard,
    title: "Identity Design",
    description: "Complete visual identity systems that establish your brand across all touchpoints.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    icon: Video,
    title: "Video & Motion Ad",
    description: "Dynamic video content and motion graphics that tell your story and captivate your audience.",
    className: "md:col-span-2 md:row-span-1",
  },
]

export default function ExpertiseSection() {
  return (
    <section className="w-full py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Expertise</h2>
         <p className="text-white/80 text-base md:text-lg max-w-3xl mx-auto">
            Comprehensive design services that elevate your brand. From visual identity to digital experiences, we bring creativity and strategy together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-fr gap-4 md:gap-6">
          {/* Branding - spans 2 rows */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 md:p-8 hover:bg-white/10 transition-colors md:row-span-2">
            <Palette className="w-8 h-8 text-white/60 mb-4" />
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{expertiseItems[0].title}</h3>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">{expertiseItems[0].description}</p>
          </div>

          {/* UI/UX Design */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 md:p-8 hover:bg-white/10 transition-colors">
            <Sparkles className="w-8 h-8 text-white/60 mb-4" />
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{expertiseItems[1].title}</h3>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">{expertiseItems[1].description}</p>
          </div>

          {/* Product Design */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 md:p-8 hover:bg-white/10 transition-colors">
            <Package className="w-8 h-8 text-white/60 mb-4" />
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{expertiseItems[2].title}</h3>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">{expertiseItems[2].description}</p>
          </div>

          {/* Logo Design */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 md:p-8 hover:bg-white/10 transition-colors">
            <Pen className="w-8 h-8 text-white/60 mb-4" />
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{expertiseItems[4].title}</h3>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">{expertiseItems[4].description}</p>
          </div>

          {/* Social-Media Design - spans 2 rows */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 md:p-8 hover:bg-white/10 transition-colors md:row-span-2">
            <Share2 className="w-8 h-8 text-white/60 mb-4" />
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{expertiseItems[5].title}</h3>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">{expertiseItems[5].description}</p>
          </div>

          {/* Identity Design */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 md:p-8 hover:bg-white/10 transition-colors">
            <IdCard className="w-8 h-8 text-white/60 mb-4" />
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{expertiseItems[6].title}</h3>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">{expertiseItems[6].description}</p>
          </div>

          {/* Ad Design */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 md:p-8 hover:bg-white/10 transition-colors">
            <ImageIcon className="w-8 h-8 text-white/60 mb-4" />
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{expertiseItems[3].title}</h3>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">{expertiseItems[3].description}</p>
          </div>

          {/* Video & Motion Ad - spans 2 columns */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 md:p-8 hover:bg-white/10 transition-colors md:col-span-2">
            <Video className="w-8 h-8 text-white/60 mb-4" />
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{expertiseItems[7].title}</h3>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">{expertiseItems[7].description}</p>
          </div>

          {/* CTA Button */}
          <div className="bg-primary-blue rounded-lg p-6 md:p-8 flex items-center justify-center transition-colors">
            <Button
              size="lg"
              className="bg-transparent hover:bg-white/10 text-white text-lg font-medium border-0 shadow-none"
            >
              Book a 30 min call
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

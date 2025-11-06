import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

interface FeaturedItem {
  title: string;
  subtitle: string;
  image: string;
}

const featured: FeaturedItem[] = [
  {
    title: "New Arrivals",
    subtitle: "Latest Drops",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80",
  },
  {
    title: "Limited Edition",
    subtitle: "Exclusive Release",
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80",
  },
  {
    title: "Performance Series",
    subtitle: "Pro Athletes Choice",
    image: "https://images.unsplash.com/photo-1612902456551-333ac5afa26e?w=800&q=80",
  },
];

const FeaturedGrid = () => {
  return (
    <section className="py-20 bg-background text-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((item, index) => (
            <FeaturedCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// New Component for individual cards to encapsulate motion logic
const FeaturedCard = ({ item, index }: { item: FeaturedItem; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transforms for image (moves opposite to mouse)
  const imageX = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const imageY = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);

  // Transforms for text (moves with mouse)
  const textX = useTransform(mouseX, [-0.5, 0.5], [10, -10]);
  const textY = useTransform(mouseY, [-0.5, 0.5], [10, -10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const { width, height, left, top } = rect;
    const mousePxX = e.clientX - left;
    const mousePxY = e.clientY - top;

    // Normalize mouse position to -0.5 to 0.5 relative to the center
    mouseX.set(mousePxX / width - 0.5);
    mouseY.set(mousePxY / height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset motion values smoothly
    motion(mouseX).to(0, { type: "spring", stiffness: 300, damping: 30 });
    motion(mouseY).to(0, { type: "spring", stiffness: 300, damping: 30 });
  };

  const handleMouseEnter = () => setIsHovered(true);

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-lg aspect-[3/4] cursor-pointer"
      // Initial animation for card (slide-in from bottom)
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // Add a slight lift effect on hover
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image with Parallax */}
      <motion.img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover"
        style={{ x: imageX, y: imageY }} // Apply parallax transform
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />

      {/* Overlay Gradient (more subtle) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content with Parallax */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10"
        style={{ x: textX, y: textY }} // Apply parallax transform
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <p className="text-xs tracking-[0.3em] text-accent uppercase mb-2">
          {item.subtitle}
        </p>
        <h3 className="text-2xl md:text-3xl font-bold text-white">
          {item.title}
        </h3>
      </motion.div>

      {/* Accent Line on Hover */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1 bg-accent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ transformOrigin: "bottom left" }}
      />
    </motion.div>
  );
};

export default FeaturedGrid;
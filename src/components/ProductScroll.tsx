import { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
  animate,
} from "framer-motion";

// --- PRODUCT DATA ---
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "AeroMax Pro",
    price: 189,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    category: "Running",
  },
  {
    id: 2,
    name: "Urban Sprint",
    price: 159,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
    category: "Lifestyle",
  },
  {
    id: 3,
    name: "Apex Trainer",
    price: 199,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
    category: "Training",
  },
  {
    id: 4,
    name: "Flow Runner",
    price: 179,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",
    category: "Running",
  },
  {
    id: 5,
    name: "Street Edge",
    price: 149,
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&q=80",
    category: "Casual",
  },
  {
    id: 6,
    name: "Velocity Elite",
    price: 229,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80",
    category: "Performance",
  },
];

// --- CARD ROTATE COMPONENT ---
// This is taken directly from your second code block
function CardRotate({
  children,
  onSendToBack,
  sensitivity,
}: {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  function handleDragEnd(_: any, info: { offset: { x: number; y: number } }) {
    if (
      Math.abs(info.offset.x) > sensitivity ||
      Math.abs(info.offset.y) > sensitivity
    ) {
      onSendToBack();
    } else {
      // Reset to center
      animate(x, 0, { type: "spring", stiffness: 260, damping: 20 });
      animate(y, 0, { type: "spring", stiffness: 260, damping: 20 });
    }
  }

  return (
    <motion.div
      className="absolute cursor-grab"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

// --- MAIN PRODUCT STACK COMPONENT ---
// This combines the logic from your ProductScroll and Stack components
const ProductStack = () => {
  const [cards, setCards] = useState(products);

  // Card dimensions
  const cardWidth = 320;
  const cardHeight = 420; // Taller to fit content
  const sensitivity = 150; // How far to drag to "flick"

  const sendToBack = (id: number) => {
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((card) => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card); // Add to the beginning (back of the stack)
      return newCards;
    });
  };

  return (
    <section className="py-20 bg-background relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm tracking-[0.3em] text-accent uppercase mb-4">
            Featured Collection
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Performance Pack
          </h2>
        </div>

        {/* --- Stack Container --- */}
        <div
          className="relative flex items-center justify-center"
          style={{
            width: cardWidth,
            height: cardHeight,
            perspective: 800, // 3D perspective
            margin: "0 auto", // Center the stack
          }}
        >
          <AnimatePresence>
            {cards.map((product, index) => {
              const randomRotate = Math.random() * 6 - 3; // Random initial tilt
              const isTopCard = index === cards.length - 1;

              return (
                <CardRotate
                  key={product.id}
                  onSendToBack={() => sendToBack(product.id)}
                  sensitivity={sensitivity}
                >
                  <motion.div
                    className="rounded-lg overflow-hidden shadow-lg bg-card"
                    // Animation for stacking (from your Stack component)
                    initial={false}
                    animate={{
                      rotateZ: isTopCard ? 0 : randomRotate,
                      scale: 1 + index * 0.04 - cards.length * 0.04,
                      transformOrigin: "bottom center",
                      // Allow drag only on the top card
                      pointerEvents: isTopCard ? "auto" : "none",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    style={{
                      width: cardWidth,
                      height: cardHeight,
                    }}
                  >
                    {/* --- Product Card Content --- */}
                    <div>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover pointer-events-none"
                      />
                      <div className="p-6">
                        <p className="text-xs tracking-wider text-muted-foreground uppercase mb-2">
                          {product.category}
                        </p>
                        <h3 className="text-xl font-bold text-foreground mb-2 truncate">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-accent">
                            ${product.price}
                          </span>
                          <div className="px-4 py-2 bg-accent/10 text-accent text-sm font-semibold tracking-wider">
                            VIEW
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CardRotate>
              );
            })}
          </AnimatePresence>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-8">
          Drag or "flick" the card to see the next one
        </p>
      </div>
    </section>
  );
};

export default ProductStack;
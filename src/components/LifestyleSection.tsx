import PixelTransition from './PixelTransition';

const LifestyleSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          
          {/* Image with Gradient Fade Wrapper */}
          <div className="animate-fade-in-up">
            {/* This new wrapper div applies the gradient fade.
              - maskImage: Fades the content on the right edge.
              - linear-gradient(...): Starts fully opaque (white) and
                fades to fully transparent from 85% to 100% of the width.
            */}
            <div
              style={{
                maskImage: 'linear-gradient(to right, white 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, white 85%, transparent 100%)',
              }}
            >
              <PixelTransition
                firstContent={
                  <img
                    src="../public/shoestyle.webp" // Make sure this path is correct
                    alt="Lifestyle"
                    className="w-full h-full object-cover"
                  />
                }
                secondContent={
                  <img
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
                    alt="Lifestyle Alternate"
                    className="w-full h-full object-cover"
                  />
                }
                className="!bg-transparent !border-0 !w-full"
                style={{ maxWidth: '80%' }}
                aspectRatio="125%"
                pixelColor="#ffcc00"
                gridSize={8}
                animationStepDuration={0.4}
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 animate-slide-in-right">
            <p className="text-sm tracking-[0.3em] text-accent uppercase">
              Built Different
            </p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Engineered for Excellence
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every VELOCITY sneaker is meticulously crafted with cutting-edge
              materials and innovative design. Our proprietary cushioning
              technology delivers unmatched comfort while maintaining the
              lightweight feel athletes demand.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div>
                <h4 className="text-3xl font-bold text-accent mb-2">48hrs</h4>
                <p className="text-sm text-muted-foreground">
                  Handcrafted Production
                </p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-accent mb-2">100%</h4>
                <p className="text-sm text-muted-foreground">
                  Premium Materials
                </p>
              </div>
            </div>
            <div className="relative inline-block mt-8">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent via-clay-500 to-accent rounded-lg blur opacity-75 animate-pulse"></div>
              <button className="relative px-8 py-4 bg-secondary border-2 border-accent text-accent font-semibold tracking-wider hover:bg-accent hover:text-accent-foreground transition-all duration-300 rounded-lg">
                LEARN MORE
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifestyleSection;
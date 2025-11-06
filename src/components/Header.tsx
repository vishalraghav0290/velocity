import { Search, ShoppingBag, User, Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Left - Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <button className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              Shop
            </button>
            <button className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              Collections
            </button>
            <button className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              About
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Center - Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-2xl lg:text-3xl font-bold tracking-wider text-foreground">
              VELOCITY
            </h1>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-4 lg:gap-6">
            <button className="text-foreground hover:text-accent transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-foreground hover:text-accent transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button className="text-foreground hover:text-accent transition-colors">
              <ShoppingBag className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <button className="text-sm font-medium text-foreground hover:text-accent transition-colors text-left">
                Shop
              </button>
              <button className="text-sm font-medium text-foreground hover:text-accent transition-colors text-left">
                Collections
              </button>
              <button className="text-sm font-medium text-foreground hover:text-accent transition-colors text-left">
                About
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

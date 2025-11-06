import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-wider text-foreground">
              VELOCITY
            </h3>
            <p className="text-sm text-muted-foreground">
              High-performance footwear engineered for champions.
            </p>
            <div className="flex gap-4 pt-4">
              <Instagram className="w-5 h-5 text-foreground hover:text-accent cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-foreground hover:text-accent cursor-pointer transition-colors" />
              <Facebook className="w-5 h-5 text-foreground hover:text-accent cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 text-foreground hover:text-accent cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-accent cursor-pointer transition-colors">
                New Arrivals
              </li>
              <li className="hover:text-accent cursor-pointer transition-colors">
                Best Sellers
              </li>
              <li className="hover:text-accent cursor-pointer transition-colors">
                Limited Edition
              </li>
              <li className="hover:text-accent cursor-pointer transition-colors">
                Sale
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-accent cursor-pointer transition-colors">
                Contact Us
              </li>
              <li className="hover:text-accent cursor-pointer transition-colors">
                Shipping Info
              </li>
              <li className="hover:text-accent cursor-pointer transition-colors">
                Returns
              </li>
              <li className="hover:text-accent cursor-pointer transition-colors">
                Size Guide
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              Stay Updated
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to get special offers and updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-background border border-border text-foreground text-sm focus:outline-none focus:border-accent"
              />
              <button className="px-6 py-2 bg-accent text-accent-foreground text-sm font-semibold hover:shadow-glow transition-all">
                JOIN
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 VELOCITY. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <span className="hover:text-accent cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-accent cursor-pointer transition-colors">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

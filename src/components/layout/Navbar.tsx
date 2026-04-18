import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/solutions", label: "Solutions" },
  { to: "/sap-business-one", label: "SAP Business One" },
  { to: "/contact", label: "Contact Us" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-18 items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-dark text-primary-foreground font-display font-bold text-lg shadow-card-soft transition-smooth group-hover:shadow-accent-glow">
            J
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display font-bold text-primary text-lg">Jaunt</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground -mt-0.5">Solutions</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-smooth relative",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <span className="absolute left-4 right-4 -bottom-[18px] h-0.5 bg-accent rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button variant="hero" size="sm" asChild>
            <Link to="/about">
              Let's Talk <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <button
          className="lg:hidden p-2 text-primary"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background animate-fade-in">
          <div className="container flex flex-col py-4 gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-3 rounded-md text-sm font-medium transition-smooth",
                    isActive
                      ? "bg-secondary text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-primary"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Button variant="hero" className="mt-3" asChild>
              <Link to="/about" onClick={() => setOpen(false)}>Let's Talk</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

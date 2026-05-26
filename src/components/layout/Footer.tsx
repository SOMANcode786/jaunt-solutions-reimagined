import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";
import jsLogo from "@/assets/js-logo-1.png";

const locations = [
  {
    country: "AUSTRALIA",
    address: "Hurstville NSW 2220",
    phone: "+61 412 785 886",
  },
  {
    country: "MALAYSIA",
    address: "Menara Kek Seng - Bukit Bintang Kuala Lumpur",
    phone: "+60 111 310 7913",
  },
  {
    country: "PAKISTAN",
    address: "Business Center PECHS Block 6, Karachi",
    phone: "+92 332 006 1100",
  },
  {
    country: "UNITED STATES",
    address: "Haverhill MA 01835",
    phone: "+1 9787 051 119",
  },
];

const Footer = () => {
  return (
    <footer className="bg-gradient-dark text-primary-foreground mt-20 border-t border-white/5">
      <div className="container py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        {/* Column 1: Branding */}
        <div className="flex flex-col gap-6">
          <Link to="/" className="inline-block">
            <img className="h-12 w-auto" src={jsLogo} alt="Jaunt Solutions" />
          </Link>
          <p className="text-sm text-primary-foreground/70 leading-relaxed max-w-xs">
            Empowering businesses for sustainable growth through smart
            technology, ERP and custom software.
          </p>
          <div className="flex gap-3">
            {[Linkedin, Twitter, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-9 w-9 grid place-items-center rounded-md bg-white/5 hover:bg-accent hover:text-white transition-all duration-300"
                aria-label="social-link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-display font-semibold mb-6 text-sm uppercase tracking-widest text-white">
            Company
          </h4>
          <ul className="space-y-4 text-sm text-primary-foreground/70">
            <li>
              <Link to="/about" className="hover:text-accent transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="hover:text-accent transition-colors"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/solutions"
                className="hover:text-accent transition-colors"
              >
                Solutions
              </Link>
            </li>
            <li>
              <Link
                to="/sap-business-one"
                className="hover:text-accent transition-colors"
              >
                SAP Business One
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 & 4: Locations (Spanning 2 columns) */}
        <div className="lg:col-span-2">
          <h4 className="font-display font-semibold mb-6 text-sm uppercase tracking-widest text-white">
            Global Offices
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
            {locations.map((loc, index) => (
              <div
                key={index}
                className="group flex flex-col gap-3 border-l border-white/10 pl-5 hover:border-accent transition-colors"
              >
                <h5 className="font-bold text-xs tracking-widest text-white uppercase opacity-90">
                  {loc.country}
                </h5>

                <div className="flex items-start gap-3 text-sm text-white/60 group-hover:text-white/90 transition-colors">
                  <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span className="leading-snug">{loc.address}</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-white/60 group-hover:text-white/90 transition-colors">
                  <Phone className="h-4 w-4 text-accent shrink-0" />
                  <a
                    href={`tel:${loc.phone.replace(/\s/g, "")}`}
                    className="hover:underline"
                  >
                    {loc.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="container py-6 text-[11px] font-medium uppercase tracking-wider text-primary-foreground/40 flex flex-col md:row gap-4 justify-between items-center">
          <p>
            © {new Date().getFullYear()} Jaunt Solutions. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

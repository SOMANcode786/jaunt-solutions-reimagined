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
    address: "Jalan Sultan Ismail",
    phone: "+60 111 310 7913",
  },
  {
    country: "Pakistan",
    address: "Business Center",
    phone: "+92 332 006 1100",
  },
  {
    country: "United State",
    address: "Haverhill MA 01835",
    phone: "+1 9787 051 119",
  },
];

const Footer = () => {
  return (
    <footer className="bg-gradient-dark text-primary-foreground mt-20">
      <div className="container py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5 mb-5">
            {/* <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground font-display font-bold text-lg">
              J
            </div> */}
            <div className="flex flex-col leading-tight ">
              <img className="h-12 w-12" src={jsLogo} alt="Jupiter Logo" />
            </div>
          </div>
          <p className="text-sm text-primary-foreground/70 leading-relaxed">
            Empowering businesses for sustainable growth through smart
            technology, ERP and custom software.
          </p>
          <div className="flex gap-3 mt-5">
            {[Linkedin, Twitter, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-9 w-9 grid place-items-center rounded-md bg-white/10 hover:bg-accent transition-smooth"
                aria-label="social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider">
            Company
          </h4>
          <ul className="space-y-2.5 text-sm text-primary-foreground/70">
            <li>
              <Link to="/about" className="hover:text-accent transition-smooth">
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="hover:text-accent transition-smooth"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/solutions"
                className="hover:text-accent transition-smooth"
              >
                Solutions
              </Link>
            </li>
            <li>
              <Link
                to="/sap-business-one"
                className="hover:text-accent transition-smooth"
              >
                SAP Business One
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider">
            Solutions
          </h4>
          <ul className="space-y-2.5 text-sm text-primary-foreground/70">
            <li>ERP Consultancy</li>
            <li>Smart Cities</li>
            <li>Smart Parking</li>
            <li>Cyber Security</li>
            <li>Cloud & Infrastructure</li>
          </ul>
        </div>

        <div className="text-white">
          <h4 className="font-semibold mb-6 text-sm uppercase tracking-wider">
            Locations
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {locations.map((loc, index) => (
              <div key={index} className="border-b border-white/10 pb-4">
                {/* Country */}
                <h5 className="font-bold mb-2 text-white">{loc.country}</h5>

                {/* Address */}
                <div className="flex items-start gap-3 text-sm text-white/70">
                  <MapPin className="h-4 w-4 text-accent shrink-0 mt-[2px]" />
                  <span className="leading-relaxed">{loc.address}</span>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3 text-sm text-white/70 mt-2">
                  <Phone className="h-4 w-4 text-accent shrink-0" />
                  <span className="whitespace-nowrap">{loc.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container py-5 text-xs text-primary-foreground/60 flex flex-col md:flex-row gap-2 justify-between">
          <p>
            © {new Date().getFullYear()} Jaunt Solutions. All rights reserved.
          </p>
          <p>Privacy · Terms · Cookies</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

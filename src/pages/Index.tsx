import { Link } from "react-router-dom";
import {
  ArrowRight,
  Cpu,
  Shield,
  Cloud,
  Database,
  Code2,
  BarChart3,
  Smartphone,
  Globe,
  ChevronRight,
  CheckCircle2,
  Building2,
  GraduationCap,
  Stethoscope,
  Landmark,
  Factory,
  Banknote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import heroImage from "@/assets/Hero-bg-1.png";
import cityImage from "@/assets/solutions-city.jpg";

const services = [
  {
    icon: Database,
    title: "ERP Consultancy",
    desc: "Strategy, implementation and optimization for SAP & modern ERPs.",
  },
  {
    icon: Building2,
    title: "Smart Cities",
    desc: "Connected infrastructure powering safer, more efficient cities.",
  },
  {
    icon: Cpu,
    title: "Smart Parking",
    desc: "End-to-end IoT parking systems with real-time analytics.",
  },
  {
    icon: Code2,
    title: "Custom Software",
    desc: "Web, mobile and enterprise apps built around your processes.",
  },
  {
    icon: Shield,
    title: "Cyber Security",
    desc: "Threat detection, governance and compliance built-in.",
  },
  {
    icon: Cloud,
    title: "Cloud & Infrastructure",
    desc: "Migration, hosting and managed cloud operations.",
  },
];

const industries = [
  { icon: Stethoscope, name: "Healthcare" },
  { icon: Landmark, name: "Government" },
  { icon: GraduationCap, name: "Education" },
  { icon: Banknote, name: "Finance" },
  { icon: Factory, name: "Manufacturing" },
  { icon: Building2, name: "Retail" },
];

const stats = [
  { v: "10+", l: "Years of expertise" },
  { v: "200+", l: "Projects delivered" },
  { v: "50+", l: "Enterprise clients" },
  { v: "24/7", l: "Global support" },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[420px] md:h-[520px] overflow-hidden bg-gradient-hero text-primary-foreground">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Modern IT data center with consultants"
            className="w-full h-full object-cover"
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
        </div>

        {/* Content */}
        <div className="container relative h-full flex items-center">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <span className="text-sm tracking-wide uppercase text-primary-foreground/80">
              Infrastructure · ERP · Digital Transformation
            </span>

            {/* Heading */}
            <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-tight">
              Transforming visions into{" "}
              <span className="text-accent">digital reality.</span>
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-xl text-base md:text-lg text-primary-foreground/85">
              Jaunt Solutions helps growing and enterprise organizations
              modernize infrastructure, deploy ERPs and ship custom software —
              end to end.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/services" className="flex items-center gap-2">
                  Explore services
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>

              <Button variant="heroOutline" size="lg" asChild>
                <Link to="/about">Why Jaunt</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-border bg-secondary/50">
        <div className="container py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.l}>
              <div className="text-3xl md:text-4xl font-display font-bold text-primary">
                {s.v}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section className="container py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="eyebrow">Industries we serve</span>
            <h2 className="mt-3 section-title">
              Trusted by organizations across every industry.
            </h2>
            <p className="mt-5 text-muted-foreground text-lg">
              Our expert teams help you find tailored solutions across retail,
              manufacturing, government, finance, healthcare and education.
            </p>
            <Button variant="outline" className="mt-7" asChild>
              <Link to="/solutions">
                View case studies <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {industries.map((i) => (
              <div
                key={i.name}
                className="group rounded-xl border border-border bg-gradient-card p-5 hover:border-accent hover:shadow-card-soft transition-smooth cursor-pointer"
              >
                <i.icon className="h-7 w-7 text-accent group-hover:scale-110 transition-smooth" />
                <p className="mt-3 font-display font-semibold text-primary">
                  {i.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured solution */}
      <section className="bg-gradient-dark text-primary-foreground">
        <div className="container py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-elevated order-2 lg:order-1">
            <img
              src={cityImage}
              alt="Smart city infrastructure"
              loading="lazy"
              className="w-full h-full object-cover"
              width={1280}
              height={896}
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="eyebrow text-accent">
              Next-generation infrastructure
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-display font-bold leading-tight">
              Modernize the systems that power your business.
            </h2>
            <p className="mt-5 text-primary-foreground/80 text-lg">
              From cloud and connectivity to security and observability — we
              design, deploy and operate the infrastructure your teams depend
              on, with the providers you trust.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                "Hybrid & multi-cloud architecture",
                "Zero-trust security baseline",
                "Managed operations 24/7",
                "Vendor-neutral procurement",
              ].map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-3 text-primary-foreground/90"
                >
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <Button variant="hero" size="lg" className="mt-8" asChild>
              <Link to="/solutions">
                See solutions <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="container py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="eyebrow">What we do</span>
            <h2 className="mt-3 section-title">
              A full stack of services to power your roadmap.
            </h2>
          </div>
          <Button variant="outline" asChild>
            <Link to="/services">
              All services <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <article
              key={s.title}
              className="group rounded-2xl border border-border bg-gradient-card p-7 hover:border-accent hover:shadow-elevated hover:-translate-y-1 transition-smooth"
            >
              <div className="h-12 w-12 grid place-items-center rounded-lg bg-accent-soft text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-smooth">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display font-semibold text-xl text-primary">
                {s.title}
              </h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                {s.desc}
              </p>
              <Link
                to="/services"
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:gap-2 transition-smooth"
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Testimonial / CTA */}
      <section className="container pb-20">
        <div className="rounded-3xl bg-gradient-hero text-primary-foreground p-10 md:p-16 shadow-elevated relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-accent/30 blur-3xl" />
          <div className="relative max-w-3xl">
            <span className="eyebrow text-accent">
              Custom plans, lasting impact
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-display font-bold leading-tight">
              Ready to modernize what matters most?
            </h2>
            <p className="mt-5 text-lg text-primary-foreground/85">
              Whether you're a startup or an established brand, our solutions
              deliver powerful, lasting results — tailored to your goals.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/about">
                  Start a conversation <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <Link to="/sap-business-one">Explore SAP B1</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

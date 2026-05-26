import Layout from "@/components/layout/Layout";
import PageHero from "@/components/PageHero";
import { Link } from "react-router-dom";
import {
  Database,
  Users,
  Building2,
  Cpu,
  Briefcase,
  Smartphone,
  Mail,
  Globe,
  BarChart3,
  Shield,
  Workflow,
  ClipboardCheck,
  Code2,
  Palette,
  MonitorSmartphone,
  Server,
  Search,
  FileText,
  LineChart,
  Brain,
  Wrench,
  Archive,
  Headphones,
  Keyboard,
  ArrowRight,
} from "lucide-react";
import serviceHomepageImage from "@/assets/ser.png";

const groups = [
  {
    title: "Strategy & Consulting",
    items: [
      {
        icon: Database,
        name: "ERP Consultancy",
        desc: "Strategy, selection and implementation of enterprise resource planning systems.",
        slug: "erp-consultancy",
      },
      {
        icon: Users,
        name: "Team Augmentation",
        desc: "Senior engineers and consultants embedded with your team on demand.",
        slug: "team-augmentation",
      },
      {
        icon: Briefcase,
        name: "Process Outsourcing",
        desc: "Run non-core operations efficiently with our specialized teams.",
        slug: "process-outsourcing",
      },
      {
        icon: ClipboardCheck,
        name: "Process Optimization & Reporting",
        desc: "Streamline operations with data-driven workflows and dashboards.",
        slug: "process-optimization",
      },
    ],
  },
  {
    title: "Smart Solutions",
    items: [
      {
        icon: Building2,
        name: "Smart Cities Solutions",
        desc: "Connected infrastructure for safer, more efficient urban environments.",
        slug: "smart-cities",
      },
      {
        icon: Cpu,
        name: "Smart Parking Systems",
        desc: "IoT-driven parking with real-time occupancy and payment integration.",
        slug: "smart-parking",
      },
      {
        icon: Brain,
        name: "AI & Machine Learning",
        desc: "Predictive models, computer vision and intelligent automation.",
        slug: "ai-machine-learning",
      },
      {
        icon: LineChart,
        name: "Data Science & Analytics",
        desc: "Turn raw data into actionable business intelligence.",
        slug: "data-science-analytics",
      },
    ],
  },
  {
    title: "Software & Engineering",
    items: [
      {
        icon: Smartphone,
        name: "Software & Mobile App Development",
        desc: "Native and cross-platform apps built for performance.",
        slug: "mobile-app-development",
      },
      {
        icon: Globe,
        name: "Website Development",
        desc: "Marketing sites, portals and progressive web apps.",
        slug: "website-development",
      },
      {
        icon: Code2,
        name: "Full Stack Development",
        desc: "End-to-end engineering across modern frameworks and clouds.",
        slug: "full-stack-development",
      },
      {
        icon: MonitorSmartphone,
        name: "UI/UX Design",
        desc: "Research-led design that converts and delights.",
        slug: "ui-ux-design",
      },
      {
        icon: Palette,
        name: "Web Design",
        desc: "Beautiful, brand-aligned visual experiences.",
        slug: "web-design",
      },
      {
        icon: Workflow,
        name: "Agile (Scrum, Kanban)",
        desc: "Iterative delivery with the ceremonies and tooling that fit your team.",
        slug: "agile-scrum-kanban",
      },
      {
        icon: ClipboardCheck,
        name: "Software QA & QC",
        desc: "Manual and automated testing across the SDLC.",
        slug: "software-qa-qc",
      },
    ],
  },
  {
    title: "Operations & Support",
    items: [
      {
        icon: Mail,
        name: "Domain & Email Management",
        desc: "Reliable corporate email and DNS, fully managed.",
        slug: "domain-email-management",
      },
      {
        icon: Shield,
        name: "Cyber Security",
        desc: "Threat detection, governance and compliance baked in.",
        slug: "cyber-security",
      },
      {
        icon: Server,
        name: "Database Management",
        desc: "Performance, backups, scaling and high availability.",
        slug: "database-management",
      },
      {
        icon: Wrench,
        name: "Business Support & IT Maintenance",
        desc: "Proactive monitoring and rapid issue resolution.",
        slug: "it-maintenance",
      },
      {
        icon: Archive,
        name: "Data Backup & Archiving",
        desc: "Resilient backup strategies that meet your RPO/RTO.",
        slug: "data-backup",
      },
      {
        icon: Headphones,
        name: "Customer Support & Call Center",
        desc: "Trained agents delivering omnichannel support.",
        slug: "customer-support",
      },
      {
        icon: Keyboard,
        name: "Data Entry & Management",
        desc: "Accurate, structured data operations at scale.",
        slug: "data-entry",
      },
    ],
  },
  {
    title: "Marketing & Growth",
    items: [
      {
        icon: BarChart3,
        name: "Digital & Social Media Marketing",
        desc: "Performance campaigns that move the metrics that matter.",
        slug: "digital-marketing",
      },
      {
        icon: Search,
        name: "Search Engine Optimization (SEO)",
        desc: "Technical, on-page and content SEO that compounds.",
        slug: "seo",
      },
      {
        icon: FileText,
        name: "Content Creation & Management",
        desc: "Editorial and creative built around your brand voice.",
        slug: "content-creation",
      },
    ],
  },
];

const Services = () => (
  <Layout>
    {/* Hero Section */}
    <section className="relative h-[420px] md:h-[520px] overflow-hidden bg-gradient-hero text-primary-foreground">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={serviceHomepageImage}
          alt="Jaunt Solutions services"
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
            Our Services
          </span>

          {/* Heading */}
          <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-tight">
            End-to-end <span className="text-accent">digital services.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 max-w-xl text-base md:text-lg text-primary-foreground/85">
            From ERP and software engineering to cybersecurity and digital
            marketing — we help businesses scale with confidence.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/about"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 transition-smooth"
            >
              About us
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 backdrop-blur px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-white/20 transition-smooth"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </section>
    {groups.map((g) => (
      <section
        key={g.title}
        className="container py-16 border-b border-border last:border-0"
      >
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="eyebrow">{g.title}</span>
            <h2 className="mt-2 text-2xl md:text-4xl font-display font-bold text-primary">
              {g.title}
            </h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {g.items.map((it) => (
            <Link
              key={it.name}
              to={`/services/${it.slug}`}
              className="group rounded-2xl border border-border bg-gradient-card p-6 hover:border-accent hover:shadow-card-soft hover:-translate-y-1 transition-smooth flex flex-col"
            >
              <div className="h-11 w-11 grid place-items-center rounded-lg bg-accent-soft text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-smooth">
                <it.icon className="h-5 w-5" />
              </div>

              <h3 className="mt-4 font-display font-semibold text-primary">
                {it.name}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {it.desc}
              </p>

              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent group-hover:gap-2 transition-smooth">
                Learn more <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    ))}
  </Layout>
);

export default Services;

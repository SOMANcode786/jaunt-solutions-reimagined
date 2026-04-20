import Layout from "@/components/layout/Layout";
import PageHero from "@/components/PageHero";
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
      },
      {
        icon: Users,
        name: "Team Augmentation",
        desc: "Senior engineers and consultants embedded with your team on demand.",
      },
      {
        icon: Briefcase,
        name: "Process Outsourcing",
        desc: "Run non-core operations efficiently with our specialized teams.",
      },
      {
        icon: ClipboardCheck,
        name: "Process Optimization & Reporting",
        desc: "Streamline operations with data-driven workflows and dashboards.",
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
      },
      {
        icon: Cpu,
        name: "Smart Parking Systems",
        desc: "IoT-driven parking with real-time occupancy and payment integration.",
      },
      {
        icon: Brain,
        name: "AI & Machine Learning",
        desc: "Predictive models, computer vision and intelligent automation.",
      },
      {
        icon: LineChart,
        name: "Data Science & Analytics",
        desc: "Turn raw data into actionable business intelligence.",
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
      },
      {
        icon: Globe,
        name: "Website Development",
        desc: "Marketing sites, portals and progressive web apps.",
      },
      {
        icon: Code2,
        name: "Full Stack Development",
        desc: "End-to-end engineering across modern frameworks and clouds.",
      },
      {
        icon: MonitorSmartphone,
        name: "UI/UX Design",
        desc: "Research-led design that converts and delights.",
      },
      {
        icon: Palette,
        name: "Web Design",
        desc: "Beautiful, brand-aligned visual experiences.",
      },
      {
        icon: Workflow,
        name: "Agile (Scrum, Kanban)",
        desc: "Iterative delivery with the ceremonies and tooling that fit your team.",
      },
      {
        icon: ClipboardCheck,
        name: "Software QA & QC",
        desc: "Manual and automated testing across the SDLC.",
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
      },
      {
        icon: Shield,
        name: "Cyber Security",
        desc: "Threat detection, governance and compliance baked in.",
      },
      {
        icon: Server,
        name: "Database Management",
        desc: "Performance, backups, scaling and high availability.",
      },
      {
        icon: Wrench,
        name: "Business Support & IT Maintenance",
        desc: "Proactive monitoring and rapid issue resolution.",
      },
      {
        icon: Archive,
        name: "Data Backup & Archiving",
        desc: "Resilient backup strategies that meet your RPO/RTO.",
      },
      {
        icon: Headphones,
        name: "Customer Support & Call Center",
        desc: "Trained agents delivering omnichannel support.",
      },
      {
        icon: Keyboard,
        name: "Data Entry & Management",
        desc: "Accurate, structured data operations at scale.",
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
      },
      {
        icon: Search,
        name: "Search Engine Optimization (SEO)",
        desc: "Technical, on-page and content SEO that compounds.",
      },
      {
        icon: FileText,
        name: "Content Creation & Management",
        desc: "Editorial and creative built around your brand voice.",
      },
    ],
  },
];

const Services = () => (
  <Layout>
    <PageHero
      eyebrow="Services"
      title="We combine creativity, technology and strategy to deliver impactful digital experiences."
      subtitle="A complete services portfolio — from ERP and custom software to marketing, security and managed support."
      image={serviceHomepageImage}
    />
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
            <article
              key={it.name}
              className="group rounded-2xl border border-border bg-gradient-card p-6 hover:border-accent hover:shadow-card-soft hover:-translate-y-1 transition-smooth"
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
            </article>
          ))}
        </div>
      </section>
    ))}
  </Layout>
);

export default Services;

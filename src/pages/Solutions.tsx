import Layout from "@/components/layout/Layout";
import PageHero from "@/components/PageHero";
import {
  Building2,
  Cpu,
  Cloud,
  Shield,
  Database,
  Brain,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import cityImage from "@/assets/solutions-city.jpg";
import imgSol from "@/assets/sol.jpg";

const solutions = [
  {
    icon: Building2,
    title: "Smart Cities",
    tagline: "Connected infrastructure for the urban future",
    points: [
      "Integrated IoT sensor networks",
      "Traffic & mobility analytics",
      "Public safety platforms",
      "Citizen-facing services",
    ],
  },
  {
    icon: Cpu,
    title: "Smart Parking",
    tagline: "End-to-end parking management",
    points: [
      "Real-time occupancy detection",
      "License plate recognition",
      "Mobile payments & reservations",
      "Operator analytics dashboard",
    ],
  },
  {
    icon: Database,
    title: "ERP Modernization",
    tagline: "Unified business operations",
    points: [
      "SAP Business One implementation",
      "Migration from legacy systems",
      "Custom modules & integrations",
      "Change management & training",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud & Infrastructure",
    tagline: "Scalable, secure, vendor-neutral",
    points: [
      "Hybrid & multi-cloud design",
      "Migration & cost optimization",
      "Managed cloud operations",
      "Disaster recovery",
    ],
  },
  {
    icon: Shield,
    title: "Cyber Security",
    tagline: "Defense built into every layer",
    points: [
      "Risk assessment & governance",
      "Identity & access management",
      "24/7 threat monitoring",
      "Compliance (ISO, GDPR, HIPAA)",
    ],
  },
  {
    icon: Brain,
    title: "AI & Data Platforms",
    tagline: "From data to decisions",
    points: [
      "Modern data warehousing",
      "Predictive analytics models",
      "Computer vision & NLP",
      "Generative AI assistants",
    ],
  },
];

const Solutions = () => (
  <Layout>
    <PageHero
      eyebrow="Solutions"
      title="Outcome-focused solutions for every part of your business."
      subtitle="We package our expertise into proven solutions that accelerate transformation — without locking you into a single vendor."
      image={imgSol}
    />

    <section className="container py-20">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {solutions.map((s) => (
          <article
            key={s.title}
            className="group rounded-2xl border border-border bg-gradient-card p-7 hover:border-accent hover:shadow-elevated hover:-translate-y-1 transition-smooth flex flex-col"
          >
            <div className="h-12 w-12 grid place-items-center rounded-lg bg-accent-soft text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-smooth">
              <s.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-display font-semibold text-xl text-primary">
              {s.title}
            </h3>
            <p className="mt-1 text-sm text-accent font-medium">{s.tagline}</p>
            <ul className="mt-4 space-y-2 flex-1">
              {s.points.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-accent shrink-0" />{" "}
                  {p}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>

    <section className="bg-gradient-dark text-primary-foreground">
      <div className="container py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="rounded-2xl overflow-hidden shadow-elevated">
          <img
            src={cityImage}
            alt="Smart city solution"
            loading="lazy"
            width={1280}
            height={896}
            className="w-full object-cover"
          />
        </div>
        <div>
          <span className="eyebrow text-accent">
            Powering progress through alliances
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-display font-bold leading-tight">
            Strategic partnerships that extend your reach.
          </h2>
          <p className="mt-5 text-primary-foreground/85 text-lg">
            We collaborate with a curated network of technology and delivery
            partners to bring you best-in-class capabilities — wherever your
            business operates.
          </p>
          <Button variant="hero" size="lg" className="mt-8" asChild>
            <Link to="/about">
              Talk to a solutions architect <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  </Layout>
);

export default Solutions;

import Layout from "@/components/layout/Layout";
import aboutHero from "@/assets/js-about.png";
import {
  Lightbulb,
  Award,
  HeartHandshake,
  ShieldCheck,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import aboutTeam from "@/assets/about-team.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We bring fresh thinking and modern engineering to every problem.",
  },
  {
    icon: Award,
    title: "Expertise",
    desc: "Senior consultants, engineers and ERP specialists in one team.",
  },
  {
    icon: HeartHandshake,
    title: "Dedication",
    desc: "We invest in long-term partnerships, not one-off projects.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    desc: "Predictable delivery, transparent communication, no surprises.",
  },
  {
    icon: Users,
    title: "Collaboration",
    desc: "We work as an extension of your team — not a vendor at arm's length.",
  },
  {
    icon: Sparkles,
    title: "Impact",
    desc: "Solutions designed to drive measurable business outcomes.",
  },
];

const About = () => (
  <Layout>
    {/* Hero Section */}
    <section className="relative h-[420px] md:h-[520px] overflow-hidden bg-gradient-hero text-primary-foreground">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={aboutHero}
          alt="Jaunt Solutions team collaboration"
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
            About Jaunt Solutions
          </span>

          {/* Heading */}
          <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-tight">
            Building smarter{" "}
            <span className="text-accent">digital solutions.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 max-w-2xl text-base md:text-lg text-primary-foreground/85">
            Delivering scalable, reliable systems for modern businesses through
            innovation, collaboration and long-term technology partnerships.
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
              <Link to="/contact">Contact us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* Story Section */}
    <section className="container py-20 grid lg:grid-cols-2 gap-14 items-center">
      <div className="rounded-2xl overflow-hidden shadow-elevated">
        <img
          src={aboutTeam}
          alt="Jaunt Solutions consulting team"
          loading="lazy"
          width={1280}
          height={896}
          className="w-full h-full object-cover"
        />
      </div>

      <div>
        <span className="eyebrow">Our story</span>

        <h2 className="mt-3 section-title">
          A trusted technology partner for ambitious teams.
        </h2>

        <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
          Jaunt Solutions was founded by a team of passionate technologists and
          business consultants who recognized a gap in the market: businesses
          struggling with disconnected systems, slow digital adaptation, and
          lack of support during crucial transitions.
        </p>

        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
          What started as a small consultancy has evolved into a trusted
          technology partner serving clients across multiple industries and
          regions. With years of experience and a dynamic team of software
          engineers, ERP consultants, designers and project managers, we build
          and support intelligent solutions that deliver lasting impact.
        </p>
      </div>
    </section>

    {/* Mission & Values */}
    <section className="bg-secondary/50 border-y border-border">
      <div className="container py-20">
        <div className="max-w-3xl">
          <span className="eyebrow">Our mission</span>

          <h2 className="mt-3 section-title">
            Solutions that solve today's challenges and set you up for future
            success.
          </h2>

          <p className="mt-5 text-muted-foreground text-lg">
            From startups to enterprises, we bring the right mix of innovation,
            expertise and dedication to every project we take on.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl bg-background border border-border p-7 hover:border-accent hover:shadow-card-soft transition-smooth"
            >
              <div className="h-12 w-12 grid place-items-center rounded-lg bg-accent-soft text-accent">
                <v.icon className="h-6 w-6" />
              </div>

              <h3 className="mt-5 font-display font-semibold text-lg text-primary">
                {v.title}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="container py-20">
      <div className="rounded-3xl bg-gradient-dark text-primary-foreground p-10 md:p-14 grid md:grid-cols-[1.5fr_1fr] gap-8 items-center">
        <div>
          <h3 className="text-2xl md:text-4xl font-display font-bold leading-tight">
            Empowering businesses through{" "}
            <span className="text-accent">smart technology.</span>
          </h3>

          <p className="mt-4 text-primary-foreground/80">
            We're a full-service IT solutions company committed to transforming
            how businesses operate — helping you move faster, work smarter and
            grow stronger.
          </p>
        </div>

        <div className="flex md:justify-end">
          <Button variant="hero" size="lg" asChild>
            <Link to="/services" className="flex items-center gap-2">
              See what we do
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  </Layout>
);

export default About;

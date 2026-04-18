import Layout from "@/components/layout/Layout";
import PageHero from "@/components/PageHero";
import { CheckCircle2, ArrowRight, Boxes, Receipt, Users, Truck, BarChart3, Wallet, Globe2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import sapImage from "@/assets/sap-dashboard.jpg";

const modules = [
  { icon: Wallet, title: "Financial Management", desc: "Accounting, banking, fixed assets and financial reporting in one system." },
  { icon: Users, title: "Sales & CRM", desc: "Manage the entire customer lifecycle from opportunity to invoice." },
  { icon: Truck, title: "Purchasing & Inventory", desc: "Procurement, warehouse and stock control with full traceability." },
  { icon: Boxes, title: "Production & MRP", desc: "Plan and execute manufacturing with real-time material requirements." },
  { icon: BarChart3, title: "Business Intelligence", desc: "Built-in dashboards and analytics powered by SAP HANA." },
  { icon: Receipt, title: "Project & Resource Mgmt", desc: "Track projects, costs and resources with margin visibility." },
];

const why = [
  "Affordable, scalable ERP designed for SMEs",
  "Single source of truth across departments",
  "Real-time analytics with SAP HANA",
  "Industry-specific add-ons & extensions",
  "Cloud or on-premise deployment options",
  "Backed by our certified consultants",
];

const SapBusinessOne = () => (
  <Layout>
    <PageHero
      eyebrow="SAP Business One"
      title="Run your entire business on a single, intelligent ERP platform."
      subtitle="SAP Business One unifies finance, sales, inventory, production and analytics — purpose-built for growing companies and delivered by Jaunt's certified consultants."
    />

    <section className="container py-20 grid lg:grid-cols-2 gap-12 items-center">
      <div className="rounded-2xl overflow-hidden shadow-elevated">
        <img src={sapImage} alt="SAP Business One dashboard" loading="lazy" width={1280} height={896} className="w-full object-cover" />
      </div>
      <div>
        <span className="eyebrow">Why SAP Business One</span>
        <h2 className="mt-3 section-title">One ERP. Every department. Real-time insight.</h2>
        <p className="mt-5 text-muted-foreground text-lg">
          Many SMEs struggle with growth while using fragmented systems — spreadsheets, standalone accounting tools and disconnected emails. SAP Business One gives you an all-in-one platform to streamline operations, gain visibility and scale confidently.
        </p>
        <ul className="mt-7 grid sm:grid-cols-2 gap-3">
          {why.map((w) => (
            <li key={w} className="flex items-start gap-2 text-sm text-foreground">
              <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" /> {w}
            </li>
          ))}
        </ul>
        <Button variant="hero" size="lg" className="mt-8" asChild>
          <Link to="/about">Request a demo <ArrowRight className="h-4 w-4" /></Link>
        </Button>
      </div>
    </section>

    <section className="bg-secondary/50 border-y border-border">
      <div className="container py-20">
        <div className="max-w-3xl">
          <span className="eyebrow">Modules</span>
          <h2 className="mt-3 section-title">Everything you need to run a modern business.</h2>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((m) => (
            <article key={m.title} className="group rounded-2xl bg-background border border-border p-7 hover:border-accent hover:shadow-card-soft hover:-translate-y-1 transition-smooth">
              <div className="h-12 w-12 grid place-items-center rounded-lg bg-accent-soft text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-smooth">
                <m.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display font-semibold text-lg text-primary">{m.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="container py-20">
      <div className="rounded-3xl bg-gradient-hero text-primary-foreground p-10 md:p-16 grid md:grid-cols-3 gap-10 shadow-elevated">
        {[
          { icon: ShieldCheck, h: "Certified", p: "SAP-certified consultants delivering proven implementations." },
          { icon: Globe2, h: "Global Delivery", p: "Multi-region delivery teams supporting your rollout end-to-end." },
          { icon: BarChart3, h: "Outcome-Driven", p: "We measure success by business outcomes, not hours billed." },
        ].map((b) => (
          <div key={b.h}>
            <b.icon className="h-9 w-9 text-accent" />
            <h3 className="mt-4 text-xl font-display font-semibold">{b.h}</h3>
            <p className="mt-2 text-primary-foreground/80 text-sm">{b.p}</p>
          </div>
        ))}
      </div>
    </section>
  </Layout>
);

export default SapBusinessOne;

import { useState } from "react";
import { z } from "zod";
import ReCAPTCHA from "react-google-recaptcha";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Building2,
  Globe,
  ArrowRight,
} from "lucide-react";
import contactImage from "@/assets/cont.jpg";

const contactSchema = z.object({
  name: z.string().trim().nonempty({ message: "Name is required" }).max(100),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  subject: z
    .string()
    .trim()
    .nonempty({ message: "Subject is required" })
    .max(200),
  message: z
    .string()
    .trim()
    .nonempty({ message: "Message is required" })
    .max(2000),
});

const offices = [
  {
    city: "Headquarters",
    address: "Haverhill MA 01835",
    region: "UNITED STATES",
    icon: Building2,
  },
  {
    city: "Regional Office",
    icon: Globe,

    locations: [
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
    ],
  },
];

const contactChannels = [
  {
    icon: Mail,
    label: "Email",
    value: "info@jauntsolutions.com",
    href: "mailto:hello@jauntsolutions.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 9787 051 119",
    href: "tel:+19787051119",
  },
  {
    icon: MessageSquare,
    label: "Sales",
    value: "sales@jauntsolutions.com",
    href: "mailto:sales@jauntsolutions.com",
  },
  { icon: Clock, label: "Hours", value: "Mon – Fri · 9:00 – 18:00 RST" },
];

const Contact = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      company: String(formData.get("company") || ""),
      subject: String(formData.get("subject") || ""),
      message: String(formData.get("message") || ""),
      captchaToken,
    };

    if (!captchaToken) {
      toast({
        title: "reCAPTCHA required",
        description: "Please verify that you are not a robot.",
        variant: "destructive",
      });
      return;
    }

    const result = contactSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as string;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      toast({
        title: "Please fix the errors",
        description: "Some fields need your attention.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "https://jauntsolutions.net";
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: "Message sent",
          description: result.message || "Thanks! Our team will get back to you within one business day.",
        });
        (e.target as HTMLFormElement).reset();
      } else {
        toast({
          title: "Submission failed",
          description: result.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Connection error",
        description: "Could not connect to the server. Please check your internet connection.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[420px] md:h-[520px] overflow-hidden bg-gradient-hero text-primary-foreground">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={contactImage}
            alt="Contact Jaunt Solutions team"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
        </div>

        {/* Content */}
        <div className="container relative h-full flex items-center">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <span className="text-sm tracking-wide uppercase text-primary-foreground/80">
              Contact us
            </span>

            {/* Heading */}
            <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-tight">
              Let’s build something{" "}
              <span className="text-accent">great together.</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 max-w-xl text-base md:text-lg text-primary-foreground/85">
              Share your idea, challenge or project — our team will respond
              within one business day.
            </p>

          </div>
        </div>
      </section>

      <section className="container py-20 grid lg:grid-cols-3 gap-10">
        {/* Form */}
        <div className="lg:col-span-2">
          <span className="eyebrow">Send a message</span>
          <h2 className="mt-3 section-title">Start the conversation.</h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Whether you're scoping an ERP rollout, modernizing infrastructure or
            exploring a new product idea — we'd love to hear from you.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 grid sm:grid-cols-2 gap-5"
            noValidate
          >
            <div className="space-y-2">
              <Label htmlFor="name">Full name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="Jane Doe"
                maxLength={100}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Work email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="jane@company.com"
                maxLength={255}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                placeholder="Acme Inc."
                maxLength={150}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                name="subject"
                placeholder="SAP Business One implementation"
                maxLength={200}
                aria-invalid={!!errors.subject}
              />
              {errors.subject && (
                <p className="text-sm text-destructive">{errors.subject}</p>
              )}
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="message">How can we help? *</Label>
              <Textarea
                id="message"
                name="message"
                rows={6}
                placeholder="Tell us about your project, timeline and goals…"
                maxLength={2000}
                aria-invalid={!!errors.message}
              />
              {errors.message && (
                <p className="text-sm text-destructive">{errors.message}</p>
              )}
            </div>
            <div className="sm:col-span-2 pt-2">
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || import.meta.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                onChange={(token) => setCaptchaToken(token)}
              />
            </div>
            <div className="sm:col-span-2 flex items-center justify-between gap-4 pt-2">
              <p className="text-xs text-muted-foreground">
                By submitting, you agree to be contacted about your inquiry.
              </p>
              <Button
                type="submit"
                variant="hero"
                size="lg"
                disabled={submitting}
              >
                {submitting ? (
                  "Sending…"
                ) : (
                  <>
                    Send message <Send className="ml-1 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card-soft">
            <h3 className="font-display font-semibold text-primary text-lg">
              Talk to our team
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Pick the channel that works best for you.
            </p>
            <ul className="mt-6 space-y-4">
              {contactChannels.map((c) => (
                <li key={c.label} className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-accent shrink-0">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">
                      {c.label}
                    </div>
                    {c.href ? (
                      <a
                        href={c.href}
                        className="text-sm font-medium text-primary hover:text-accent transition-smooth break-all"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <div className="text-sm font-medium text-primary">
                        {c.value}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-gradient-dark text-primary-foreground p-6">
            <h3 className="font-display font-semibold text-lg">
              Prefer a quick call?
            </h3>
            <p className="mt-2 text-sm text-primary-foreground/80">
              Book a 30-minute discovery session with one of our solution
              architects.
            </p>
            <Button variant="heroOutline" className="mt-5 w-full" asChild>
              <a href="mailto:hello@jauntsolutions.com?subject=Discovery%20call%20request">
                Schedule a call
              </a>
            </Button>
          </div>
        </aside>
      </section>

      {/* Offices */}
      {/* Offices */}
      <section className="border-t border-border bg-secondary/40">
        <div className="container py-20">
          <div className="max-w-2xl">
            <span className="eyebrow">Our offices</span>
            <h2 className="mt-3 section-title">Where to find us.</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              We serve clients across the Middle East, South Asia and beyond
              from our regional hubs.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {offices.map((o) => (
              <div
                key={o.city}
                className="rounded-2xl border border-border bg-card p-7 shadow-card-soft hover:shadow-elevated transition-smooth"
              >
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <o.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display font-semibold text-primary text-xl">
                    {o.city}
                  </h3>
                </div>

                {/* Address */}
                <div className="mt-5 flex items-start gap-2 text-muted-foreground">
                  <div>
                    <div>{o.address}</div>
                    <div className="text-sm">{o.region}</div>
                  </div>
                </div>

                {/* ✅ Countries Only */}
                {o.locations && (
                  <div className="mt-6 border-t border-border pt-4">
                    <div className="flex flex-wrap gap-2">
                      {o.locations.map((loc, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium"
                        >
                          {loc.country}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;

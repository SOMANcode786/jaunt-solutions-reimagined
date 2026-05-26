import { Link, useParams, Navigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ArrowLeft,
  Database,
  Building2,
  Cpu,
  Code2,
  Shield,
  Cloud,
  Users,
  Briefcase,
  ClipboardCheck,
  Brain,
  LineChart,
  Smartphone,
  Globe,
  MonitorSmartphone,
  Palette,
  Workflow,
  Mail,
  Server,
  Wrench,
  Archive,
  Headphones,
  Keyboard,
  BarChart3,
  Search,
  FileText,
  LucideIcon,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";

type ServiceContent = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string;
  highlights: string[];
  offerings: { title: string; desc: string }[];
  outcomes: string[];
};

const make = (
  icon: LucideIcon,
  eyebrow: string,
  title: string,
  subtitle: string,
  intro: string,
  highlights: string[],
  offerings: { title: string; desc: string }[],
  outcomes: string[],
): ServiceContent => ({
  icon,
  eyebrow,
  title,
  subtitle,
  intro,
  highlights,
  offerings,
  outcomes,
});

const services: Record<string, ServiceContent> = {
  "erp-consultancy": make(
    Database,
    "ERP Consultancy",
    "Strategy, implementation and optimization for SAP & modern ERPs.",
    "We help organizations select, deploy and continually evolve ERP platforms that align with operational reality.",
    "Our ERP practice spans full lifecycle delivery: from readiness assessments and vendor selection to implementation, integration and post go-live support across SAP Business One, S/4HANA and other leading ERPs.",
    [
      "End-to-end ERP delivery led by certified consultants",
      "Process re-engineering aligned with industry best practice",
      "Clean, well-documented integrations to your existing stack",
      "Adoption support, training and continuous optimization",
    ],
    [
      {
        title: "Readiness & Selection",
        desc: "Workshops, requirements mapping and vendor scoring to pick the right ERP fit.",
      },
      {
        title: "Implementation",
        desc: "Configuration, data migration, testing and go-live with proven playbooks.",
      },
      {
        title: "Integration",
        desc: "Connect ERP with CRM, e-commerce, HR and custom apps via secure APIs.",
      },
      {
        title: "Managed Support",
        desc: "Ongoing enhancement, reporting, user enablement and tuning.",
      },
    ],
    [
      "Faster month-end close and cleaner reporting",
      "Real-time inventory, sales and operations visibility",
      "Lower total cost of ownership through standardization",
      "Confident scaling to new entities and geographies",
    ],
  ),
  "team-augmentation": make(
    Users,
    "Team Augmentation",
    "Senior engineers and consultants embedded with your team.",
    "Scale capacity quickly with vetted specialists who plug into your delivery model.",
    "We supply experienced engineers, designers and consultants who integrate directly with your in-house teams. You stay in control of priorities while we handle sourcing, onboarding and quality.",
    [
      "Senior, vetted talent across major tech stacks",
      "Fast ramp-up — typically days, not months",
      "Flexible engagements: short sprints to multi-year programs",
      "Full transparency into output and velocity",
    ],
    [
      {
        title: "Engineering Pods",
        desc: "Backend, frontend, mobile, data and DevOps profiles on demand.",
      },
      {
        title: "Specialist Roles",
        desc: "Architects, security engineers, QA leads, product managers.",
      },
      {
        title: "Co-Managed Delivery",
        desc: "We provide leads and ceremonies while you set the roadmap.",
      },
      {
        title: "Knowledge Transfer",
        desc: "Documentation and pairing to keep know-how in your org.",
      },
    ],
    [
      "Faster delivery without long hiring cycles",
      "Predictable cost with flexible scaling",
      "Higher code quality through senior oversight",
      "Reduced key-person risk on critical projects",
    ],
  ),
  "process-outsourcing": make(
    Briefcase,
    "Process Outsourcing",
    "Run non-core operations efficiently with specialized teams.",
    "Hand off repeatable back-office and operational work so your team can focus on strategy and growth.",
    "From data operations to customer back-office, we operate well-defined processes on your behalf with measurable SLAs and continuous improvement built in.",
    [
      "Documented SOPs and quality controls",
      "Outcome-based pricing options",
      "Dedicated team leads and reporting",
      "Continuous improvement loops",
    ],
    [
      {
        title: "Back-Office Operations",
        desc: "Document processing, validations and reconciliations.",
      },
      {
        title: "Finance Support",
        desc: "AP/AR, expense, payroll preparation and bookkeeping support.",
      },
      {
        title: "HR & Recruitment Ops",
        desc: "Sourcing, screening and onboarding administration.",
      },
      {
        title: "Custom BPO",
        desc: "Tailored teams designed around your unique workflows.",
      },
    ],
    [
      "Lower operating cost on non-core work",
      "Higher accuracy and faster turnaround",
      "Better focus on strategic priorities",
      "Scalable capacity through demand peaks",
    ],
  ),
  "process-optimization": make(
    ClipboardCheck,
    "Process Optimization & Reporting",
    "Streamline operations with data-driven workflows and dashboards.",
    "Map, measure and modernize the processes that move the needle.",
    "We combine lean process design with modern automation and analytics to remove friction, surface insights and give leaders the dashboards they need to run the business in real time.",
    [
      "End-to-end process discovery and mapping",
      "Automation across systems with low-code and APIs",
      "Executive dashboards with the right KPIs",
      "Change management and adoption support",
    ],
    [
      {
        title: "Process Discovery",
        desc: "Workshops and analysis to surface bottlenecks and risks.",
      },
      {
        title: "Workflow Automation",
        desc: "Replace manual handoffs with reliable, auditable flows.",
      },
      {
        title: "BI & Reporting",
        desc: "Curated dashboards for finance, ops, sales and service.",
      },
      {
        title: "Continuous Improvement",
        desc: "Operating model and reviews to keep optimizing.",
      },
    ],
    [
      "Shorter cycle times across core processes",
      "Higher data quality and decision speed",
      "Lower error and rework rates",
      "Clearer accountability through KPIs",
    ],
  ),
  "smart-cities": make(
    Building2,
    "Smart Cities",
    "Connected infrastructure powering safer, more efficient cities.",
    "Sensor networks, command-and-control platforms and citizen-facing services that turn urban data into better decisions.",
    "We design and deliver smart city programs end-to-end — from connected lighting and traffic to integrated operations centers — helping municipalities and large campuses improve safety, sustainability and quality of life.",
    [
      "Vendor-neutral architecture across IoT, networking and cloud",
      "Integrated dashboards for operations and sustainability",
      "Citizen apps and portals for transparent service delivery",
      "Privacy-first, standards-based data governance",
    ],
    [
      {
        title: "Connected Infrastructure",
        desc: "Smart lighting, environment, water and waste monitoring.",
      },
      {
        title: "Mobility & Traffic",
        desc: "Adaptive traffic, transit priority and incident management.",
      },
      {
        title: "Public Safety",
        desc: "Video analytics and integrated command centers.",
      },
      {
        title: "Citizen Services",
        desc: "Apps and portals for permits, payments and reporting.",
      },
    ],
    [
      "Lower energy consumption across municipal assets",
      "Faster emergency response and reduced incident impact",
      "Higher citizen satisfaction with digital services",
      "Data-driven planning for long-term urban growth",
    ],
  ),
  "smart-parking": make(
    Cpu,
    "Smart Parking",
    "End-to-end IoT parking systems with real-time analytics.",
    "From sensor to driver app — connected parking that boosts revenue, reduces congestion and improves the visitor experience.",
    "Our smart parking platform combines occupancy sensors, gateways, cloud analytics and mobile apps to give operators full visibility and drivers a frictionless experience across malls, airports, campuses and on-street environments.",
    [
      "Real-time occupancy and guidance to free spaces",
      "Cashless payments and digital permits",
      "Automated enforcement and violation handling",
      "Operator dashboards with revenue analytics",
    ],
    [
      {
        title: "Sensors & Hardware",
        desc: "Magnetic, ultrasonic and camera-based detection.",
      },
      {
        title: "Driver Experience",
        desc: "Wayfinding signage, mobile apps and reservations.",
      },
      {
        title: "Payments & Permits",
        desc: "Cashless payments, season passes and validations.",
      },
      {
        title: "Operations Platform",
        desc: "Live dashboards, alerts and reports.",
      },
    ],
    [
      "Higher utilization of existing inventory",
      "Reduced search traffic and emissions on-site",
      "New revenue from dynamic pricing and digital permits",
      "Better visitor satisfaction and faster entry/exit",
    ],
  ),
  "ai-machine-learning": make(
    Brain,
    "AI & Machine Learning",
    "Predictive models, computer vision and intelligent automation.",
    "Apply AI where it creates measurable business impact — not where it's a buzzword.",
    "We help teams identify high-value AI use cases, build production-grade models and deploy them safely. Our work spans predictive analytics, computer vision, NLP and generative AI tailored to your domain.",
    [
      "Use-case discovery grounded in business value",
      "Production MLOps with monitoring and retraining",
      "Responsible AI: bias, privacy and explainability",
      "Integration into existing apps and workflows",
    ],
    [
      {
        title: "AI Strategy",
        desc: "Opportunity mapping, ROI modeling and roadmap.",
      },
      {
        title: "Model Development",
        desc: "Predictive, vision, NLP and generative AI solutions.",
      },
      {
        title: "MLOps",
        desc: "Pipelines, deployment, monitoring and governance.",
      },
      {
        title: "Generative AI",
        desc: "Copilots, assistants and knowledge retrieval systems.",
      },
    ],
    [
      "Better forecasts and decisions",
      "Automation of repetitive cognitive work",
      "New customer-facing AI experiences",
      "Defensible ROI on AI investments",
    ],
  ),
  "data-science-analytics": make(
    LineChart,
    "Data Science & Analytics",
    "Turn raw data into actionable business intelligence.",
    "Modern data platforms, clear insights and self-serve analytics for every team.",
    "We design and build the data foundation — pipelines, warehouses and BI — that lets your organization ask questions and get reliable answers in minutes, not weeks.",
    [
      "Modern data stack with cloud warehouses",
      "Reliable pipelines with quality monitoring",
      "Self-serve dashboards for business teams",
      "Advanced analytics and forecasting",
    ],
    [
      {
        title: "Data Engineering",
        desc: "Pipelines, ELT, warehousing and lakehouse design.",
      },
      {
        title: "BI & Visualization",
        desc: "Dashboards in Power BI, Looker, Tableau and more.",
      },
      {
        title: "Advanced Analytics",
        desc: "Forecasting, segmentation and experimentation.",
      },
      {
        title: "Data Governance",
        desc: "Catalogs, lineage and access controls.",
      },
    ],
    [
      "One source of truth across teams",
      "Faster, evidence-based decisions",
      "Higher trust in numbers and reports",
      "Foundations ready for AI and ML",
    ],
  ),
  "mobile-app-development": make(
    Smartphone,
    "Software & Mobile App Development",
    "Native and cross-platform apps built for performance.",
    "Beautifully designed mobile apps that ship on time and scale with your business.",
    "Our mobile teams cover iOS, Android and cross-platform stacks like React Native and Flutter — from product discovery and UX to release, analytics and ongoing iteration.",
    [
      "Native-quality UX on every platform",
      "Offline-first patterns where it matters",
      "Built-in analytics and crash reporting",
      "App store release and lifecycle management",
    ],
    [
      {
        title: "Discovery & UX",
        desc: "Research, prototyping and validated designs.",
      },
      {
        title: "Native Development",
        desc: "iOS (Swift) and Android (Kotlin) where performance counts.",
      },
      {
        title: "Cross-Platform",
        desc: "React Native and Flutter for faster reach.",
      },
      {
        title: "Release & Iterate",
        desc: "CI/CD, store submissions and continuous improvement.",
      },
    ],
    [
      "Higher engagement and retention",
      "Faster time-to-market for new features",
      "Lower defect rates in production",
      "A mobile experience customers recommend",
    ],
  ),
  "website-development": make(
    Globe,
    "Website Development",
    "Marketing sites, portals and progressive web apps.",
    "Fast, SEO-friendly websites that convert visitors into customers.",
    "From corporate sites to high-traffic content platforms and customer portals, we build performant websites with modern stacks, accessible design and clean SEO foundations.",
    [
      "Performance-first builds with great Core Web Vitals",
      "SEO and accessibility baked in",
      "CMS choices that fit your editorial team",
      "Analytics and experimentation ready",
    ],
    [
      {
        title: "Corporate Websites",
        desc: "Brand sites that scale across regions and languages.",
      },
      {
        title: "Customer Portals",
        desc: "Authenticated experiences with rich integrations.",
      },
      { title: "PWAs", desc: "Installable web apps with offline capability." },
      {
        title: "Headless CMS",
        desc: "Composable content with modern editing experiences.",
      },
    ],
    [
      "Higher organic traffic and conversion",
      "Faster page loads and better user experience",
      "Easier content updates for marketing teams",
      "Lower long-term maintenance cost",
    ],
  ),
  "full-stack-development": make(
    Code2,
    "Full Stack Development",
    "End-to-end engineering across modern frameworks and clouds.",
    "One team, one codebase, one accountable delivery for your custom software.",
    "Our full-stack squads cover product discovery, UX, frontend, backend, data and DevOps. We deliver applications your teams and customers actually love to use — and that you can confidently maintain.",
    [
      "Modern stacks: React, Node, .NET, Python, Go",
      "Cloud-native architectures and APIs",
      "Automated testing and CI/CD from day one",
      "Documentation and clean handover",
    ],
    [
      {
        title: "Product Discovery",
        desc: "Workshops, prototyping and roadmap definition.",
      },
      {
        title: "Frontend",
        desc: "Modern web apps with great UX and performance.",
      },
      {
        title: "Backend & APIs",
        desc: "Reliable services, microservices and integrations.",
      },
      {
        title: "DevOps",
        desc: "CI/CD, infrastructure-as-code and observability.",
      },
    ],
    [
      "Faster time-to-market for new products",
      "Higher productivity through tailored tools",
      "Improved customer experience and conversion",
      "Predictable, maintainable software you fully own",
    ],
  ),
  "ui-ux-design": make(
    MonitorSmartphone,
    "UI/UX Design",
    "Research-led design that converts and delights.",
    "Design systems, user flows and interfaces grounded in user research.",
    "We pair user research with strong visual craft to design products that are easy to use, on-brand and ready to build. Every project ships with a design system to keep things consistent as you grow.",
    [
      "User research and usability testing",
      "Reusable design systems and components",
      "Accessible by default (WCAG aware)",
      "Tight collaboration with engineering",
    ],
    [
      {
        title: "Research",
        desc: "Interviews, usability tests and analytics review.",
      },
      {
        title: "Information Architecture",
        desc: "Flows, navigation and content structure.",
      },
      {
        title: "Visual Design",
        desc: "Brand-aligned UI with strong typography and motion.",
      },
      {
        title: "Design Systems",
        desc: "Tokens, components and documentation.",
      },
    ],
    [
      "Higher conversion and task completion",
      "Lower support burden through clearer UX",
      "Faster engineering through reusable components",
      "Consistent brand experience across products",
    ],
  ),
  "web-design": make(
    Palette,
    "Web Design",
    "Beautiful, brand-aligned visual experiences.",
    "Distinctive web design that tells your story and earns trust at first glance.",
    "We craft web experiences that feel intentional in every detail — from typography and color to motion and imagery — while staying performant and easy to update.",
    [
      "Original visual direction, not template work",
      "Responsive across every modern device",
      "Motion and micro-interactions that feel alive",
      "CMS-friendly handover to your team",
    ],
    [
      {
        title: "Brand-Aligned Concepts",
        desc: "Moodboards and directions that match your identity.",
      },
      {
        title: "Responsive Design",
        desc: "Layouts that look great from mobile to desktop.",
      },
      { title: "Motion", desc: "Tasteful animation and micro-interactions." },
      {
        title: "Asset Production",
        desc: "Icons, illustrations and imagery curated for the brand.",
      },
    ],
    [
      "Stronger first impression and brand recall",
      "Higher engagement and time on site",
      "A site your team is proud to share",
      "Foundations that scale to new pages and campaigns",
    ],
  ),
  "agile-delivery": make(
    Workflow,
    "Agile (Scrum, Kanban)",
    "Iterative delivery with the ceremonies and tooling that fit your team.",
    "Right-sized agile that focuses on outcomes, not theatre.",
    "We coach and run agile delivery across Scrum, Kanban and hybrid models — picking the lightest process that still gives leadership the visibility and predictability they need.",
    [
      "Outcome-focused backlogs and roadmaps",
      "Lightweight ceremonies and clear roles",
      "Tooling setup in Jira, Linear or Azure DevOps",
      "Metrics for flow, predictability and quality",
    ],
    [
      {
        title: "Agile Coaching",
        desc: "Train teams and leaders on practical agile delivery.",
      },
      {
        title: "Delivery Setup",
        desc: "Backlogs, ceremonies and reporting from day one.",
      },
      {
        title: "Scrum Masters",
        desc: "Experienced facilitators embedded with your teams.",
      },
      {
        title: "Scaling Frameworks",
        desc: "Cross-team coordination without bureaucracy.",
      },
    ],
    [
      "More predictable delivery cadence",
      "Higher team engagement and ownership",
      "Better visibility for stakeholders",
      "Faster response to change",
    ],
  ),
  "qa-quality-control": make(
    ClipboardCheck,
    "Software QA & QC",
    "Manual and automated testing across the SDLC.",
    "Catch defects earlier, ship with confidence and protect your brand.",
    "Our QA practice combines exploratory testing, automation and performance engineering to give teams fast feedback and a safety net that scales with your product.",
    [
      "Test strategy aligned with product risk",
      "Automation across UI, API and mobile",
      "Performance, load and security testing",
      "CI integration with clear quality gates",
    ],
    [
      {
        title: "Manual QA",
        desc: "Exploratory and structured testing led by senior testers.",
      },
      {
        title: "Test Automation",
        desc: "Reliable suites in Playwright, Cypress, Appium and more.",
      },
      {
        title: "Performance Testing",
        desc: "Load, stress and soak tests with actionable insights.",
      },
      {
        title: "QA in CI/CD",
        desc: "Quality gates wired into your pipelines.",
      },
    ],
    [
      "Fewer production defects and incidents",
      "Faster, safer release cadence",
      "Higher customer trust and satisfaction",
      "Lower long-term maintenance cost",
    ],
  ),
  "domain-email-management": make(
    Mail,
    "Domain & Email Management",
    "Reliable corporate email and DNS, fully managed.",
    "Keep your business communications fast, secure and always available.",
    "We set up and operate domains, DNS and corporate email on platforms like Microsoft 365 and Google Workspace — including security hardening, deliverability and lifecycle management.",
    [
      "Microsoft 365 and Google Workspace expertise",
      "DNS, SPF, DKIM and DMARC properly configured",
      "Phishing protection and mailbox security",
      "Migrations with zero data loss",
    ],
    [
      {
        title: "Domain & DNS",
        desc: "Registration, transfers and reliable DNS hosting.",
      },
      {
        title: "Email Platforms",
        desc: "Setup, migration and administration.",
      },
      {
        title: "Security & Deliverability",
        desc: "Anti-phishing, MFA and authentication records.",
      },
      { title: "Lifecycle", desc: "Joiner/mover/leaver flows and quotas." },
    ],
    [
      "Higher email deliverability",
      "Reduced phishing and account takeover risk",
      "Faster onboarding and offboarding",
      "Predictable, supported communications stack",
    ],
  ),
  "cyber-security": make(
    Shield,
    "Cyber Security",
    "Threat detection, governance and compliance built-in.",
    "Pragmatic security programs that protect your business without slowing it down.",
    "We help organizations mature their security posture with a balanced mix of advisory, engineering and managed services — from risk assessments and policy frameworks to 24/7 monitoring.",
    [
      "Risk-based security strategy aligned to business goals",
      "Zero-trust architecture and identity-first controls",
      "Continuous monitoring, detection and response",
      "Compliance support across major standards",
    ],
    [
      {
        title: "Assessments & Advisory",
        desc: "Maturity assessments, gap analysis and roadmaps.",
      },
      {
        title: "Identity & Access",
        desc: "SSO, MFA, privileged access and least-privilege design.",
      },
      {
        title: "Detection & Response",
        desc: "SIEM, EDR and incident response playbooks.",
      },
      {
        title: "Compliance",
        desc: "ISO 27001, SOC 2, PCI DSS and local regulations.",
      },
    ],
    [
      "Reduced exposure to ransomware and data breaches",
      "Faster detection and containment of incidents",
      "Audit-ready documentation and controls",
      "Confidence to adopt new technology safely",
    ],
  ),
  "database-management": make(
    Server,
    "Database Management",
    "Performance, backups, scaling and high availability.",
    "Healthy databases are the quiet foundation of every reliable application.",
    "We design, tune and operate databases across SQL and NoSQL engines — making sure your data is fast, available and recoverable whatever happens.",
    [
      "Expertise across PostgreSQL, MySQL, SQL Server, MongoDB",
      "High availability and disaster recovery design",
      "Performance tuning and query optimization",
      "24/7 monitoring and alerting",
    ],
    [
      {
        title: "Architecture",
        desc: "Schema design, sharding, replication and HA.",
      },
      {
        title: "Performance",
        desc: "Query and index tuning, capacity planning.",
      },
      {
        title: "Backups & DR",
        desc: "Tested backup strategies and recovery drills.",
      },
      {
        title: "Managed Operations",
        desc: "Day-to-day administration and on-call support.",
      },
    ],
    [
      "Faster, more reliable applications",
      "Lower risk of data loss or downtime",
      "Right-sized infrastructure cost",
      "Confidence to scale with the business",
    ],
  ),
  "it-maintenance": make(
    Wrench,
    "Business Support & IT Maintenance",
    "Proactive monitoring and rapid issue resolution.",
    "An IT team that keeps your business running, day and night.",
    "We provide end-to-end IT support — from end-user help desk to server, network and cloud operations — with clear SLAs and proactive maintenance to prevent issues before they happen.",
    [
      "Tiered support with clear SLAs",
      "Proactive monitoring and patching",
      "Asset and vendor management",
      "Documented runbooks and reporting",
    ],
    [
      {
        title: "Help Desk",
        desc: "Multi-channel end-user support during your business hours.",
      },
      {
        title: "Infrastructure Ops",
        desc: "Servers, networks, endpoints and cloud monitored 24/7.",
      },
      {
        title: "Patch & Vulnerability",
        desc: "Regular patching aligned with security policy.",
      },
      {
        title: "Reporting",
        desc: "Monthly service reviews and improvement plans.",
      },
    ],
    [
      "Higher uptime and user productivity",
      "Faster issue resolution",
      "Lower IT cost through standardization",
      "Clear visibility into IT health",
    ],
  ),
  "data-backup": make(
    Archive,
    "Data Backup & Archiving",
    "Resilient backup strategies that meet your RPO/RTO.",
    "Backups you can actually restore from — verified, encrypted and off-site.",
    "We design and operate backup and archiving solutions across endpoints, servers, SaaS and cloud workloads, with regular restore testing so you know your data is truly safe.",
    [
      "RPO/RTO aligned with business needs",
      "Immutable, ransomware-resistant backups",
      "SaaS data protection (M365, Google Workspace)",
      "Long-term archive and compliance retention",
    ],
    [
      {
        title: "Backup Design",
        desc: "Tiered backup strategies for every workload.",
      },
      {
        title: "SaaS Protection",
        desc: "Protect cloud data your provider doesn't back up.",
      },
      { title: "Archiving", desc: "Cost-efficient long-term retention." },
      {
        title: "Restore Testing",
        desc: "Routine drills to validate recoverability.",
      },
    ],
    [
      "Confidence in disaster recovery",
      "Resilience against ransomware",
      "Compliance with data retention policies",
      "Lower storage cost through tiering",
    ],
  ),
  "customer-support": make(
    Headphones,
    "Customer Support & Call Center",
    "Trained agents delivering omnichannel support.",
    "Always-on support that protects your brand and grows customer lifetime value.",
    "We operate inbound and outbound contact centers across voice, chat, email and social — with the tooling, scripting and analytics to keep quality high and costs predictable.",
    [
      "Multi-language, multi-channel coverage",
      "Quality monitoring and continuous coaching",
      "CRM and ticketing integrations",
      "Performance dashboards and reporting",
    ],
    [
      {
        title: "Inbound Support",
        desc: "Customer service, help desk and technical support.",
      },
      {
        title: "Outbound Programs",
        desc: "Sales, retention and survey campaigns.",
      },
      {
        title: "Omnichannel",
        desc: "Voice, chat, email, WhatsApp and social.",
      },
      { title: "Analytics", desc: "CSAT, NPS, AHT and resolution insights." },
    ],
    [
      "Higher customer satisfaction and loyalty",
      "Lower cost per contact",
      "Faster response and resolution times",
      "Better visibility into customer feedback",
    ],
  ),
  "data-entry": make(
    Keyboard,
    "Data Entry & Management",
    "Accurate, structured data operations at scale.",
    "Reliable hands behind the data that powers your decisions and operations.",
    "We provide data entry, cleansing, enrichment and migration services with documented quality controls — perfect for backlogs, migrations or ongoing data operations.",
    [
      "Quality controls with sampling and audits",
      "Strict data confidentiality and access controls",
      "Scalable teams for one-off or ongoing work",
      "Integrations with your systems and formats",
    ],
    [
      {
        title: "Data Entry",
        desc: "Structured entry from forms, scans and feeds.",
      },
      {
        title: "Data Cleansing",
        desc: "Deduplication, standardization and validation.",
      },
      {
        title: "Enrichment",
        desc: "Add missing attributes from trusted sources.",
      },
      {
        title: "Migration Support",
        desc: "Prepare and validate data for new systems.",
      },
    ],
    [
      "Higher data accuracy and trust",
      "Faster system migrations and rollouts",
      "Lower internal effort on tedious tasks",
      "Cleaner foundations for analytics",
    ],
  ),
  "digital-marketing": make(
    BarChart3,
    "Digital & Social Media Marketing",
    "Performance campaigns that move the metrics that matter.",
    "Paid, organic and social campaigns built around clear business outcomes.",
    "Our marketing team plans, launches and optimizes campaigns across search, social and display — with measurement frameworks that connect spend to revenue.",
    [
      "Full-funnel strategy from awareness to retention",
      "Creative production tuned for each channel",
      "Conversion tracking and attribution setup",
      "Weekly optimization based on real data",
    ],
    [
      {
        title: "Paid Media",
        desc: "Google, Meta, LinkedIn, TikTok and programmatic.",
      },
      {
        title: "Social Media",
        desc: "Organic strategy, content calendars and community.",
      },
      {
        title: "Creative",
        desc: "Static, motion and video creative for performance.",
      },
      { title: "Measurement", desc: "Tracking, dashboards and attribution." },
    ],
    [
      "Lower CAC and higher ROAS",
      "Predictable, scalable lead flow",
      "Stronger brand presence on key channels",
      "Clear visibility into what's working",
    ],
  ),
  seo: make(
    Search,
    "Search Engine Optimization (SEO)",
    "Technical, on-page and content SEO that compounds.",
    "Sustainable organic growth through fundamentals — done well, at scale.",
    "We combine technical audits, on-page optimization, content strategy and authority building to grow qualified organic traffic month over month.",
    [
      "Technical audits and Core Web Vitals fixes",
      "Keyword and topic strategy with intent mapping",
      "Content briefs and on-page optimization",
      "Authority building and digital PR",
    ],
    [
      {
        title: "Technical SEO",
        desc: "Crawlability, performance, schema and architecture.",
      },
      {
        title: "On-Page",
        desc: "Optimization of titles, content and internal links.",
      },
      {
        title: "Content Strategy",
        desc: "Topic clusters and editorial calendars.",
      },
      { title: "Off-Page", desc: "Link building and digital PR." },
    ],
    [
      "Compounding organic traffic over time",
      "Higher rankings on commercial keywords",
      "More qualified leads at lower cost",
      "Stronger overall site quality",
    ],
  ),
  "content-creation": make(
    FileText,
    "Content Creation & Management",
    "Editorial and creative built around your brand voice.",
    "Words, visuals and video that match your strategy and standards.",
    "Our content team produces blogs, landing pages, social posts, video and design assets — managed through clear workflows so your brand voice stays consistent across every channel.",
    [
      "Editorial planning aligned with marketing goals",
      "Consistent brand voice and visual standards",
      "SEO-aware writing and structuring",
      "Workflow tools for review and publishing",
    ],
    [
      {
        title: "Editorial",
        desc: "Articles, guides, case studies and newsletters.",
      },
      {
        title: "Creative",
        desc: "Graphics, social creative and short-form video.",
      },
      {
        title: "Localization",
        desc: "Multi-language adaptation that respects context.",
      },
      {
        title: "Content Ops",
        desc: "Calendars, approvals and CMS publishing.",
      },
    ],
    [
      "Higher engagement and time on content",
      "Stronger brand consistency across channels",
      "More material to fuel SEO and social",
      "Less internal effort on production",
    ],
  ),
  "custom-software": make(
    Code2,
    "Custom Software",
    "Web, mobile and enterprise apps built around your processes.",
    "Product-grade engineering teams that ship reliable software — from MVPs to mission-critical platforms.",
    "We build custom software when off-the-shelf tools fall short. Our cross-functional squads cover discovery, UX, full-stack engineering, QA and DevOps.",
    [
      "Discovery-led delivery with clear scope",
      "Modern stacks across web, mobile and cloud-native",
      "Built-in quality: automated testing and CI/CD",
      "Long-term partnership with handover and enablement",
    ],
    [
      {
        title: "Product Discovery",
        desc: "Workshops, prototyping and roadmap definition.",
      },
      {
        title: "Web Applications",
        desc: "Portals, internal tools and SaaS products.",
      },
      { title: "Mobile Apps", desc: "Native and cross-platform apps." },
      {
        title: "Platform Engineering",
        desc: "APIs, microservices and event-driven architectures.",
      },
    ],
    [
      "Faster time-to-market for new digital products",
      "Higher employee productivity through tailored tools",
      "Improved customer experience and conversion",
      "Predictable, maintainable software you fully own",
    ],
  ),
  "cloud-infrastructure": make(
    Cloud,
    "Cloud & Infrastructure",
    "Migration, hosting and managed cloud operations.",
    "Design, deploy and operate the hybrid and multi-cloud foundations your business depends on.",
    "We architect, migrate and operate cloud and hybrid infrastructure across leading providers — delivering resilient platforms with the cost and security controls leadership expects.",
    [
      "Cloud strategy and landing zone design",
      "Migration of workloads with minimal disruption",
      "Cost optimization and FinOps practices",
      "24/7 managed operations with clear SLAs",
    ],
    [
      {
        title: "Assess & Plan",
        desc: "Portfolio analysis, TCO modeling and migration waves.",
      },
      {
        title: "Migrate & Modernize",
        desc: "Lift-and-shift, replatform or refactor.",
      },
      { title: "Operate", desc: "Monitoring, patching, backup, DR and IR." },
      {
        title: "Optimize",
        desc: "Continuous tuning of cost, performance and security.",
      },
    ],
    [
      "Lower infrastructure cost and faster provisioning",
      "Higher availability and disaster resilience",
      "Stronger security baseline across environments",
      "Engineering teams freed to focus on product",
    ],
  ),
};

export const serviceSlugs = Object.keys(services);

const ServiceDetail = () => {
  const { slug = "" } = useParams();
  const data = services[slug];
  if (!data) return <Navigate to="/services" replace />;
  const Icon = data.icon;

  return (
    <Layout>
      <PageHero
        eyebrow={data.eyebrow}
        title={data.title}
        subtitle={data.subtitle}
      />

      <section className="container py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="h-14 w-14 grid place-items-center rounded-xl bg-accent-soft text-accent mb-6">
              <Icon className="h-7 w-7" />
            </div>
            <h2 className="section-title">Overview</h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              {data.intro}
            </p>

            <h3 className="mt-12 text-2xl font-display font-bold text-primary">
              What we offer
            </h3>
            <div className="mt-6 grid sm:grid-cols-2 gap-5">
              {data.offerings.map((o) => (
                <div
                  key={o.title}
                  className="rounded-2xl border border-border bg-gradient-card p-6 hover:border-accent transition-smooth"
                >
                  <h4 className="font-display font-semibold text-primary">
                    {o.title}
                  </h4>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {o.desc}
                  </p>
                </div>
              ))}
            </div>

            <h3 className="mt-12 text-2xl font-display font-bold text-primary">
              Outcomes you can expect
            </h3>
            <ul className="mt-6 space-y-3">
              {data.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />{" "}
                  {o}
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-border bg-secondary/50 p-6">
              <span className="eyebrow">Why Jaunt</span>
              <h4 className="mt-2 font-display font-bold text-primary text-xl">
                Highlights
              </h4>
              <ul className="mt-5 space-y-3">
                {data.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-3 text-sm text-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />{" "}
                    {h}
                  </li>
                ))}
              </ul>
              <Button variant="default" className="w-full mt-6" asChild>
                <Link to="/contact">
                  Talk to an expert <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" className="w-full mt-2" asChild>
                <Link to="/services">
                  <ArrowLeft className="h-4 w-4" /> All services
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceDetail;

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image?: string;
}

const PageHero = ({ eyebrow, title, subtitle, image }: PageHeroProps) => (
  <section className="relative text-primary-foreground overflow-hidden">
    {/* Background Image */}
    {image && (
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
    )}

    {/* Overlay gradient */}
    <div className="absolute inset-0 bg-gradient-hero opacity-80" />

    {/* Decorative radial lights */}
    <div
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 50%, hsl(var(--accent) / 0.4), transparent 50%), radial-gradient(circle at 80% 20%, hsl(var(--primary-glow) / 0.5), transparent 50%)",
      }}
    />

    <div className="container relative py-20 md:py-28">
      <span className="eyebrow text-accent">{eyebrow}</span>

      <h1 className="mt-4 max-w-4xl text-4xl md:text-6xl font-display font-bold leading-[1.05] animate-fade-up">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-6 max-w-2xl text-lg text-primary-foreground/80 animate-fade-up">
          {subtitle}
        </p>
      )}
    </div>
  </section>
);

export default PageHero;

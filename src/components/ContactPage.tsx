import { Button } from "./ui/button";
import { Instagram, Facebook, Twitter, Mail, Linkedin, Github, Youtube } from "lucide-react";

/**
 * ============================================
 * CONTACT PAGE COMPONENT - FUSION ZONE
 * ============================================
 * 
 * Bridge between THINK and CREATIVE worlds:
 * - Neutral charcoal base
 * - THINK accents (amber) for static elements
 * - CREATIVE accents (lime/orange) on interaction only
 * - Balanced, calm, resolved feeling
 * 
 * MOTION RULES:
 * - Subtle, minimal animation
 * - Interactive highlights only on hover/focus
 * - No aggressive animation
 * 
 * HOW TO CUSTOMIZE:
 * 1. Replace placeholder URLs in socialLinks array
 * 2. Add/remove social media links
 * 3. Adjust icon sizes (w-* h-* classes)
 * 4. Modify hover effects
 */

interface ContactPageProps {
  onGoHome: () => void;
}

const ContactPage = ({ onGoHome }: ContactPageProps) => {
  /**
   * SOCIAL MEDIA LINKS
   * HOW TO CUSTOMIZE: Replace # with actual URLs
   */
  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      url: "#", // <!-- INSERT INSTAGRAM LINK HERE -->
      hoverColor: "hover:bg-creative-accent hover:text-creative-bg",
      ariaLabel: "Visit Praveen's Instagram profile",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "#", // <!-- INSERT FACEBOOK LINK HERE -->
      hoverColor: "hover:bg-think-accent hover:text-white",
      ariaLabel: "Visit Praveen's Facebook profile",
    },
    {
      name: "Twitter / X",
      icon: Twitter,
      url: "#", // <!-- INSERT X/TWITTER LINK HERE -->
      hoverColor: "hover:bg-creative-accent hover:text-creative-bg",
      ariaLabel: "Visit Praveen's Twitter/X profile",
    },
    {
      name: "Gmail",
      icon: Mail,
      url: "mailto:praveenchezhian1@gmail.com", // <!-- INSERT EMAIL ADDRESS HERE -->
      hoverColor: "hover:bg-creative-accent-alt hover:text-white",
      ariaLabel: "Send email to Praveen",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "#", // <!-- INSERT LINKEDIN LINK HERE -->
      hoverColor: "hover:bg-think-accent hover:text-white",
      ariaLabel: "Visit Praveen's LinkedIn profile",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "#", // <!-- INSERT GITHUB LINK HERE -->
      hoverColor: "hover:bg-creative-fg hover:text-creative-bg",
      ariaLabel: "Visit Praveen's GitHub profile",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "#", // <!-- INSERT YOUTUBE LINK HERE -->
      hoverColor: "hover:bg-creative-accent-alt hover:text-white",
      ariaLabel: "Visit Praveen's YouTube channel",
    },
  ];

  return (
    <div className="min-h-screen bg-fusion-bg animate-slide-up">
      {/* Fusion gradient - blend of Think and Creative */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 30%, hsl(var(--think-accent) / 0.08) 0%, transparent 40%),
            radial-gradient(ellipse at 70% 70%, hsl(var(--creative-accent) / 0.06) 0%, transparent 40%)
          `,
        }}
      />

      {/* Navigation */}
      <nav className="relative z-10 py-8">
        <div className="container mx-auto px-6">
          <div className="flex justify-center">
            <Button
              onClick={onGoHome}
              variant="outline"
              className="border-2 border-think-accent/50 text-fusion-fg hover:bg-think-accent hover:text-white hover:border-think-accent font-semibold transition-all duration-300"
            >
              ← Back to Home
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <header className="text-center mb-16 animate-scale-fade">
            <h1 className="text-5xl md:text-6xl font-extrabold text-fusion-fg mb-4">
              Let's <span className="text-think-accent">Connect</span>
            </h1>
            <p className="text-xl text-creative-fg-muted">
              Find me on social media or drop me an email
            </p>
          </header>

          {/* Social Media Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 animate-scale-fade [animation-delay:100ms]">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;

              return (
                <a
                  key={social.name}
                  href={social.url}
                  target={social.url.startsWith("mailto:") ? "_self" : "_blank"}
                  rel={social.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  aria-label={social.ariaLabel}
                  className={`
                    flex flex-col items-center justify-center p-6 md:p-8
                    bg-white/5 backdrop-blur-sm rounded-2xl
                    border-2 border-white/10
                    transition-all duration-300 ease-out
                    hover:scale-110 hover:border-transparent
                    hover:shadow-xl
                    cursor-pointer group
                    ${social.hoverColor}
                  `}
                >
                  <IconComponent
                    className="w-10 h-10 md:w-12 md:h-12 mb-3 text-fusion-fg transition-all duration-300 group-hover:scale-110"
                    strokeWidth={1.5}
                  />
                  <span className="text-sm font-semibold text-fusion-fg text-center transition-colors group-hover:text-inherit">
                    {social.name}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Direct Contact */}
          <div className="mt-16 text-center animate-scale-fade [animation-delay:200ms]">
            <div className="bg-white/5 backdrop-blur-sm p-8 md:p-10 rounded-2xl border-2 border-white/10 hover:border-think-accent/30 transition-all duration-300">
              <h2 className="text-2xl font-bold text-fusion-fg mb-4">Email Me Directly</h2>
              <a
                href="mailto:praveenchezhian1@gmail.com"
                className="text-xl md:text-2xl text-think-accent hover:text-creative-accent transition-colors duration-300 font-semibold"
              >
                praveenchezhian1@gmail.com
              </a>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="flex justify-center gap-4 mt-16">
            <div className="w-2 h-2 rounded-full bg-think-accent/50" />
            <div className="w-2 h-2 rounded-full bg-fusion-fg/30" />
            <div className="w-2 h-2 rounded-full bg-creative-accent/50" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/20 backdrop-blur-sm py-6 mt-auto border-t border-white/10">
        <div className="container mx-auto px-6 text-center text-creative-fg-muted">
          <p className="text-sm md:text-base">&copy; 2025 Praveen Elanchezhian. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;

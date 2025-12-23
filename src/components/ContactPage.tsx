import { Button } from "./ui/button";
import { Instagram, Facebook, Twitter, Mail, Linkedin, Github, Youtube } from "lucide-react";

/**
 * CONTACT PAGE COMPONENT
 * 
 * This page displays social media links with icons.
 * 
 * HOW TO CUSTOMIZE:
 * 1. Replace placeholder URLs in href attributes with actual links
 * 2. Add or remove social media icons as needed
 * 3. Adjust icon size by changing w-* and h-* classes
 * 4. Modify colors by editing text-* and hover:text-* classes
 * 5. Change layout by adjusting grid-cols-* for different screen sizes
 */

interface ContactPageProps {
  onGoHome: () => void;
}

const ContactPage = ({ onGoHome }: ContactPageProps) => {
  // Social media links configuration
  // ADD/REMOVE LINKS: Edit this array to customize social media presence
  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      url: "#", // <!-- INSERT INSTAGRAM LINK HERE -->
      color: "hover:text-pink-600",
      ariaLabel: "Visit Praveen's Instagram profile"
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "#", // <!-- INSERT FACEBOOK LINK HERE -->
      color: "hover:text-blue-600",
      ariaLabel: "Visit Praveen's Facebook profile"
    },
    {
      name: "Twitter / X",
      icon: Twitter,
      url: "#", // <!-- INSERT X/TWITTER LINK HERE -->
      color: "hover:text-sky-500",
      ariaLabel: "Visit Praveen's Twitter/X profile"
    },
    {
      name: "Gmail",
      icon: Mail,
      url: "mailto:praveenchezhian1@gmail.com", // <!-- INSERT GMAIL ADDRESS HERE -->
      color: "hover:text-red-600",
      ariaLabel: "Send email to Praveen"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "#", // <!-- INSERT LINKEDIN LINK HERE -->
      color: "hover:text-blue-700",
      ariaLabel: "Visit Praveen's LinkedIn profile"
    },
    {
      name: "GitHub",
      icon: Github,
      url: "#", // <!-- INSERT GITHUB LINK HERE -->
      color: "hover:text-gray-800",
      ariaLabel: "Visit Praveen's GitHub profile"
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "#", // <!-- INSERT YOUTUBE LINK HERE -->
      color: "hover:text-red-600",
      ariaLabel: "Visit Praveen's YouTube channel"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--creative-bg))] to-[hsl(var(--digital-bg))] text-[hsl(var(--digital-fg))]">
      {/* Navigation */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="flex justify-center">
            <Button 
              onClick={onGoHome}
              variant="outline"
              className="border-2 border-[hsl(var(--creative-accent))] text-white hover:bg-[hsl(var(--creative-accent))] font-semibold"
            >
              ← Back to Home
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
              Let's Connect
            </h1>
            <p className="text-xl text-gray-300">
              Find me on social media or drop me an email
            </p>
          </div>

          {/* Social Media Icons Grid */}
          {/* CUSTOMIZE LAYOUT: Change grid-cols-* values for different layouts */}
          {/* Current: 2 columns on mobile, 3 on tablet, 4 on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target={social.url.startsWith('mailto:') ? '_self' : '_blank'}
                  rel={social.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  aria-label={social.ariaLabel}
                  className={`
                    flex flex-col items-center justify-center p-6 
                    bg-white/10 backdrop-blur-sm rounded-2xl
                    border-2 border-white/20
                    transition-all duration-300 ease-in-out
                    hover:scale-110 hover:bg-white/20 hover:border-white/40
                    hover:shadow-xl hover:shadow-[hsl(var(--creative-accent))]/30
                    cursor-pointer group
                    ${social.color}
                  `}
                >
                  {/* CUSTOMIZE ICON SIZE: Change w-* and h-* values */}
                  <IconComponent 
                    className="w-12 h-12 mb-3 text-white transition-transform duration-300 group-hover:scale-125" 
                    strokeWidth={1.5}
                  />
                  <span className="text-sm font-semibold text-white text-center">
                    {social.name}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Direct Contact Info */}
          <div className="mt-16 text-center bg-white/10 backdrop-blur-sm p-8 rounded-2xl border-2 border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">
              Email Me Directly
            </h2>
            <a 
              href="mailto:praveenchezhian1@gmail.com"
              className="text-xl text-[hsl(var(--creative-accent))] hover:text-[hsl(var(--digital-accent))] transition-colors font-semibold"
            >
              praveenchezhian1@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-sm py-6 mt-20">
        <div className="container mx-auto px-6 text-center text-gray-300">
          <p>&copy; 2025 Praveen Elanchezhian. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Mail, Linkedin, Instagram, Twitter, Youtube, Link2 } from "lucide-react";
import ComicParticles from "./ComicParticles";
import LogoLoop from "./LogoLoop";
import { ComicPopHeadlinePlate } from "./ComicPopHeadlinePlate";

/**
 * ============================================
 * CONTACT PAGE COMPONENT - FUSION ZONE
 * ============================================
 * 
 * Social links: LinkedIn, Instagram, Gmail, X, YouTube, Linktree.
 * Evenly spaced in a seamless looping row.
 * 
 * LinkedIn: add your profile URL when ready.
 */

interface ContactPageProps {
  onGoHome: () => void;
  onSwitchToCreative: () => void;
  onSwitchToThink: () => void;
}

const socialLogos = [
  { node: <Linkedin className="w-full h-full" />, title: "LinkedIn", href: "https://www.linkedin.com/in/praveen-elanchezhian-3310751a0/" },
  { node: <Instagram className="w-full h-full" />, title: "Instagram", href: "https://www.instagram.com/praveen_chezhian/" },
  { node: <Mail className="w-full h-full" />, title: "Email", href: "mailto:praveen.ez01@gmail.com" },
  { node: <Twitter className="w-full h-full" />, title: "X", href: "https://x.com/PraveenChez" },
  { node: <Youtube className="w-full h-full" />, title: "YouTube", href: "https://www.youtube.com/channel/UCGE82nnC3GH6PJ8fwB5HBow" },
  { node: <Link2 className="w-full h-full" />, title: "Linktree", href: "https://linktr.ee/praveen01" },
];

const ContactPage = ({ onGoHome, onSwitchToCreative, onSwitchToThink }: ContactPageProps) => {
  const [name, setName] = useState("");
  const [mailId, setMailId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Web3Forms is a browser form POST (no backend needed).
  const web3formsAccessKey = (import.meta as any).env?.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;
  const WEB3FORMS_ACCESS_KEY_FALLBACK = "b47700fc-8db8-492e-9c8a-58820550a166";

  useEffect(() => {
    // Load Web3Forms client script (enables hCaptcha widget wiring).
    if (typeof document === "undefined") return;
    if (document.getElementById("web3forms-script")) return;

    const script = document.createElement("script");
    script.id = "web3forms-script";
    script.src = "https://web3forms.com/client/script.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="min-h-screen min-h-screen-mobile flex flex-col bg-energy-dark texture-halftone"
      style={{
        backgroundColor: "hsl(var(--fusion-bg))",
        // Light yellow dots in Contact background
        ["--halftone-dot" as any]: "48 100% 65%",
      }}
    >
      {/* Comic Particles */}
      <ComicParticles mode="fusion" />

      {/* Navigation - flat text-based, dark overlay, hover glow */}
      <nav
        className="relative z-10 py-4 sm:py-6 border-b-4"
        style={{ backgroundColor: "hsl(0 0% 0%)", borderColor: "hsl(var(--accent))" }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4">
            <Button
              onClick={onGoHome}
              className="w-full sm:w-auto border-4 px-6 py-3 font-comic text-lg font-bold"
              style={{
                backgroundColor: "hsl(var(--think-bg))",
                color: "hsl(var(--think-fg))",
                borderColor: "hsl(var(--accent))",
                boxShadow: "0 0 16px hsl(var(--accent) / 0.4), 4px 4px 0 hsl(var(--accent) / 0.5)",
              }}
            >
              Home
            </Button>
            <Button
              onClick={onSwitchToCreative}
              className="w-full sm:w-auto border-4 px-6 py-3 font-comic text-lg font-bold"
              style={{
                backgroundColor: "hsl(var(--neon-red))",
                color: "hsl(var(--primary-foreground))",
                borderColor: "hsl(var(--neon-red))",
                boxShadow: "0 0 16px hsl(var(--neon-red) / 0.5), 4px 4px 0 hsl(var(--neon-red) / 0.5)",
              }}
            >
              VIEW CREATE.
            </Button>
            <Button
              onClick={onSwitchToThink}
              className="w-full sm:w-auto border-4 px-6 py-3 font-comic text-lg font-bold"
              style={{
                backgroundColor: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                borderColor: "hsl(var(--primary))",
                boxShadow: "0 0 16px hsl(var(--primary) / 0.5), 4px 4px 0 hsl(var(--primary) / 0.5)",
              }}
            >
              VIEW THINK.
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 py-8 sm:py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          {/* Header Panel - high-contrast frame */}
          <header className="relative text-center mb-8 sm:mb-12 md:mb-16">
            <ComicPopHeadlinePlate
              variant="secondary"
              align="center"
              className="inline-block"
              textClassName="text-2xl sm:text-3xl md:text-5xl lg:text-6xl"
              plateClassName="comic-pop-plate--contact-header"
              plateStyle={{ ["--plate-bg" as any]: "hsl(var(--accent))" } as any}
            >
              LET'S CONNECT
            </ComicPopHeadlinePlate>
          </header>

          {/* Logo loop - horizontal infinite scroll */}
          <div
            className="mb-8 sm:mb-12 py-6 border-4 rounded-lg"
            style={{
              borderColor: "hsl(var(--accent))",
              // Keep the border yellow, but make the panel fill black
              backgroundColor: "hsl(var(--think-bg) / 0.5)",
              color: "hsl(var(--fusion-fg))",
            }}
          >
            <LogoLoop
              logos={socialLogos}
              speed={45}
              direction="left"
              logoHeight={48}
              gap={96}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="hsl(var(--fusion-bg))"
              ariaLabel="Social links: LinkedIn, Instagram, Gmail, X, YouTube, Linktree"
            />
          </div>

          {/* Message form - below rolling socials */}
          <section
            className="mb-8 sm:mb-12 border-4 rounded-lg p-4 sm:p-6"
            style={{
              borderColor: "hsl(var(--accent))",
              backgroundColor: "hsl(var(--think-bg) / 0.35)",
              color: "hsl(var(--fusion-fg))",
              boxShadow: "0 0 20px hsl(var(--accent) / 0.12)",
            }}
          >
            <h2 className="text-center font-comic font-bold text-2xl sm:text-3xl" style={{ color: "hsl(var(--accent))" }}>
              Slide into my DM
            </h2>

            <form
              className="mt-4 flex flex-col gap-3"
              action="https://api.web3forms.com/submit"
              method="POST"
              onSubmit={(e) => {
                setError(null);

                const trimmedName = name.trim();
                const trimmedMail = mailId.trim();
                const trimmedMessage = message.trim();

                if (trimmedName.length < 2) {
                  setError("Please enter your name.");
                  e.preventDefault();
                  return;
                }
                if (!/^\S+@\S+\.\S+$/.test(trimmedMail)) {
                  setError("Please enter a valid mail ID.");
                  e.preventDefault();
                  return;
                }
                if (trimmedMessage.length < 5) {
                  setError("Please enter your message.");
                  e.preventDefault();
                  return;
                }
              }}
            >
              <input type="hidden" name="access_key" value={web3formsAccessKey ?? WEB3FORMS_ACCESS_KEY_FALLBACK} />
              <input type="hidden" name="subject" value="New message from contact form" />

              <div className="flex flex-col gap-1">
                <label htmlFor="contact-name" className="font-comic font-bold text-sm sm:text-base" style={{ color: "hsl(var(--fusion-fg))" }}>
                  Name
                </label>
                <Input
                  id="contact-name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="border-4"
                  style={{ borderColor: "hsl(var(--accent))", backgroundColor: "hsl(var(--fusion-bg))" }}
                  autoComplete="name"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="contact-mail" className="font-comic font-bold text-sm sm:text-base" style={{ color: "hsl(var(--fusion-fg))" }}>
                  Mail ID
                </label>
                <Input
                  id="contact-mail"
                  name="email"
                  value={mailId}
                  onChange={(e) => setMailId(e.target.value)}
                  placeholder="you@example.com"
                  className="border-4"
                  style={{ borderColor: "hsl(var(--accent))", backgroundColor: "hsl(var(--fusion-bg))" }}
                  autoComplete="email"
                  inputMode="email"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="contact-message" className="font-comic font-bold text-sm sm:text-base" style={{ color: "hsl(var(--fusion-fg))" }}>
                  Message
                </label>
                <Textarea
                  id="contact-message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="border-4"
                  style={{ borderColor: "hsl(var(--accent))", backgroundColor: "hsl(var(--fusion-bg))" }}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-comic font-bold text-sm sm:text-base" style={{ color: "hsl(var(--fusion-fg))" }}>
                  Captcha
                </label>
                <div className="flex justify-center">
                  <div className="h-captcha" data-captcha="true" />
                </div>
              </div>

              {error && <p className="text-center text-sm sm:text-base font-content" style={{ color: "hsl(var(--neon-red))" }}>{error}</p>}

              <div className="flex justify-center pt-1">
                <Button
                  type="submit"
                  className="border-4 px-8 py-3 font-comic text-lg font-bold"
                  style={{
                    backgroundColor: "hsl(var(--accent))",
                    color: "hsl(var(--accent-foreground))",
                    borderColor: "hsl(var(--accent))",
                    boxShadow: "0 0 16px hsl(var(--accent) / 0.5), 4px 4px 0 hsl(var(--accent) / 0.5)",
                  }}
                >
                  Submit
                </Button>
              </div>
            </form>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="relative z-10 mt-auto py-6 border-t-4 text-center"
        style={{
          backgroundColor: "hsl(0 0% 0%)",
          borderColor: "hsl(var(--accent))",
        }}
      >
        <div className="container mx-auto px-6">
          <p className="text-sm md:text-base font-content font-content-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
            &copy; 2026 PRAVEEN ELANCHEZHIAN. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;

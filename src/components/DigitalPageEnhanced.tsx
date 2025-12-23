import { Button } from "./ui/button";

/**
 * DIGITAL PAGE - ENHANCED AND REORGANIZED
 * 
 * Features:
 * - Experience & Projects section at the top (prioritized)
 * - Education section at the bottom
 * - Clickable tiles with hover effects
 * - Mobile responsive layout
 * - Consistent styling with Creative page
 * 
 * HOW TO CUSTOMIZE:
 * 1. Replace placeholder links in href attributes
 * 2. Add/remove experience entries
 * 3. Modify hover effects in tile className
 * 4. Adjust layout by changing max-w-* and spacing classes
 * 5. Update personal information in Profile Intro section
 */

interface DigitalPageEnhancedProps {
  onGoHome: () => void;
  onSwitchToCreative: () => void;
  onNavigateToContact: () => void;
}

const DigitalPageEnhanced = ({ onGoHome, onSwitchToCreative, onNavigateToContact }: DigitalPageEnhancedProps) => {
  // Experience data configuration
  // ADD/EDIT EXPERIENCES: Modify this array to add or change experiences
  const experiences = [
    {
      id: 1,
      title: "Product Design Engineer & Consultant - AR Smart Glass",
      company: "Tamizh",
      period: "Jul 2024 - Present",
      description: [
        "Designing UI/UX for AR Smart Glasses with hand gesture and voice control.",
        "Collaborating on display and interaction systems.",
        "Consulting on overall product design strategy from concept to prototype."
      ],
      link: "#" // <!-- INSERT PROJECT/COMPANY LINK HERE -->
    },
    {
      id: 2,
      title: "Summer Intern: Brand-Aligned Marketing Strategies",
      company: "Madarth",
      period: "May 2025 - Jul 2025",
      description: [
        "Developed social media calendars, copywriting, and video scripting for TAFE and DahNAY.",
        "Experimented with 3D modelling, photogrammetry, and AI-based design."
      ],
      link: "#" // <!-- INSERT PROJECT/COMPANY LINK HERE -->
    }
  ];

  return (
    <div className="min-h-screen bg-[hsl(var(--digital-bg))] text-[hsl(var(--digital-fg))] animate-[fadeIn_0.5s_ease-in-out]">
      {/* Navigation */}
      <section className="py-6 md:py-8">
        <div className="container mx-auto px-4 md:px-6">
          {/* MOBILE RESPONSIVE: flex-col on mobile, flex-row on larger screens */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4">
            <Button 
              onClick={onGoHome} 
              variant="ghost" 
              className="w-full sm:w-auto text-gray-600 hover:text-black transition-colors font-semibold"
            >
              Home
            </Button>
            <Button 
              onClick={onSwitchToCreative} 
              className="w-full sm:w-auto bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              View Creative Work
            </Button>
            <Button
              onClick={onNavigateToContact}
              className="w-full sm:w-auto bg-[hsl(var(--digital-accent))] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[hsl(var(--digital-accent))]/90 transition-colors"
            >
              Contact
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            {/* Profile Intro */}
            <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-6 md:gap-8 mb-12 md:mb-16">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 shadow-xl border-4 border-[hsl(var(--digital-accent))]/30">
                <img 
                  src="https://placehold.co/200x200/e5e7eb/4b5563?text=PE" 
                  alt="Praveen Elanchezhian - Professional headshot" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Praveen Elanchezhian</h1>
                <p className="text-lg md:text-xl text-gray-600 mt-2 font-semibold">
                  MBA Candidate | Product & Marketing Strategist | Filmmaker
                </p>
                <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                  A brief, engaging summary about yourself can go here. Highlight your key strengths and what drives you professionally and creatively.
                </p>
              </div>
            </div>

            {/* SECTION 1: Experience & Projects (Now at the top) */}
            <div className="mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-[hsl(var(--digital-accent))]">
                Experience & Projects
              </h2>
              
              {/* Experience Grid */}
              {/* CUSTOMIZE LAYOUT: Change grid-cols-* for different layouts */}
              <div className="grid grid-cols-1 gap-6">
                {experiences.map((exp) => (
                  <a
                    key={exp.id}
                    href={exp.link}
                    className="group block"
                    aria-label={`View details for ${exp.title}`}
                  >
                    {/* Clickable Experience Tile */}
                    {/* HOVER EFFECTS: Customize scale, shadow, and colors below */}
                    <div className="
                      bg-white p-6 md:p-8 rounded-xl shadow-md
                      border-2 border-gray-200
                      transition-all duration-300 ease-in-out
                      hover:scale-[1.02]
                      hover:border-[hsl(var(--digital-accent))]
                      hover:shadow-2xl hover:shadow-[hsl(var(--digital-accent))]/20
                      cursor-pointer
                    ">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-[hsl(var(--digital-accent))] transition-colors">
                          {exp.title}
                        </h3>
                        <span className="text-sm font-semibold text-gray-500 whitespace-nowrap">
                          {exp.period}
                        </span>
                      </div>
                      
                      <p className="text-base md:text-lg font-semibold text-[hsl(var(--digital-accent))] mb-4">
                        {exp.company}
                      </p>
                      
                      <ul className="list-disc list-inside text-sm md:text-base text-gray-700 space-y-2">
                        {exp.description.map((item, index) => (
                          <li key={index} className="leading-relaxed">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* SECTION 2: Education (Now at the bottom) */}
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-[hsl(var(--digital-accent))]">
                Education
              </h2>
              
              {/* Education Tile - Non-clickable but styled consistently */}
              <div className="
                bg-white p-6 md:p-8 rounded-xl shadow-md
                border-2 border-gray-200
                transition-all duration-300 ease-in-out
              ">
                <div className="space-y-6">
                  {/* MBA */}
                  <div>
                    <p className="text-lg md:text-xl font-bold text-gray-900">
                      Master of Business Administration (MBA)
                    </p>
                    <p className="text-base md:text-lg text-gray-600 mt-1">
                      NIT, Trichy (2024-2026)
                    </p>
                  </div>
                  
                  <hr className="border-gray-300" />
                  
                  {/* B.E. */}
                  <div>
                    <p className="text-lg md:text-xl font-bold text-gray-900">
                      B.E. Electronics and Communication Engineering
                    </p>
                    <p className="text-base md:text-lg text-gray-600 mt-1">
                      Loyola ICAM College of Engineering and Technology, Chennai (2020-2024)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/90 backdrop-blur-sm py-6 mt-12">
        <div className="container mx-auto px-4 md:px-6 text-center text-gray-400">
          <p className="text-sm md:text-base">&copy; 2025 Praveen Elanchezhian. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DigitalPageEnhanced;

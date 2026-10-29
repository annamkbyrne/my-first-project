// Curated daily affirmations for Black women in business.
// Each entry has a theme so the app can filter and color by category.
const AFFIRMATIONS = [
  // Confidence
  { theme: "Confidence", text: "I walk into every room knowing I belong there — because I built my way in." },
  { theme: "Confidence", text: "My voice carries weight. I speak clearly, and I do not shrink to make others comfortable." },
  { theme: "Confidence", text: "I am the expert in my business. My knowledge was earned, and I trust it." },
  { theme: "Confidence", text: "I do not need permission to be brilliant." },
  { theme: "Confidence", text: "I take up space with grace and without apology." },
  { theme: "Confidence", text: "My presence is a strategy. I show up fully, and it pays off." },
  { theme: "Confidence", text: "I trust the woman I am becoming." },
  { theme: "Confidence", text: "I am not too much. I am exactly enough for the vision I was given." },

  // Worth
  { theme: "Worth", text: "I charge what I am worth, and I do not discount my excellence." },
  { theme: "Worth", text: "I negotiate from a place of value, not fear." },
  { theme: "Worth", text: "My rates reflect my results. The right clients are glad to pay them." },
  { theme: "Worth", text: "Asking for more is not greedy. It is good business." },
  { theme: "Worth", text: "I release the guilt of earning well. Abundance looks beautiful on me." },
  { theme: "Worth", text: "I am an investment, not an expense." },
  { theme: "Worth", text: "I know my numbers, and my numbers know my name." },

  // Leadership
  { theme: "Leadership", text: "I lead with clarity, compassion, and conviction." },
  { theme: "Leadership", text: "I make decisions with confidence and adjust with wisdom." },
  { theme: "Leadership", text: "I create the table, and I choose who sits at it." },
  { theme: "Leadership", text: "My leadership opens doors for the women coming after me." },
  { theme: "Leadership", text: "I build teams that feel seen, safe, and powerful." },
  { theme: "Leadership", text: "I am the CEO of my life, and I run it with intention." },
  { theme: "Leadership", text: "I delegate freely. My energy belongs on the work only I can do." },

  // Growth
  { theme: "Growth", text: "Every no is redirecting me toward a better yes." },
  { theme: "Growth", text: "I am allowed to start small. Small steps still build empires." },
  { theme: "Growth", text: "My setbacks are data, not definitions." },
  { theme: "Growth", text: "I learn quickly, adapt gracefully, and grow on purpose." },
  { theme: "Growth", text: "I am building something that will outlast me." },
  { theme: "Growth", text: "Today I choose progress over perfection." },
  { theme: "Growth", text: "The opportunities meant for me cannot miss me. I am ready to receive them." },
  { theme: "Growth", text: "I scale my vision before I scale my business." },

  // Legacy
  { theme: "Legacy", text: "I am my ancestors' wildest dream, running a business they could only imagine." },
  { theme: "Legacy", text: "I carry generations of resilience, creativity, and genius in my blood." },
  { theme: "Legacy", text: "The wealth I build today is the freedom my family inherits tomorrow." },
  { theme: "Legacy", text: "I honor the women who made a way out of no way by making my own." },
  { theme: "Legacy", text: "My success is a blueprint for the girls who are watching." },
  { theme: "Legacy", text: "I am building generational wealth, one wise decision at a time." },
  { theme: "Legacy", text: "My story matters, and I tell it with pride." },

  // Rest
  { theme: "Rest", text: "Rest is not a reward. It is part of the work." },
  { theme: "Rest", text: "I do not have to be strong every minute. I am allowed to be soft." },
  { theme: "Rest", text: "My worth is not measured by my exhaustion." },
  { theme: "Rest", text: "I protect my peace like it is my most valuable asset — because it is." },
  { theme: "Rest", text: "Boundaries are how I keep my brilliance sustainable." },
  { theme: "Rest", text: "I can pause without falling behind." },
  { theme: "Rest", text: "Joy is productive. I make room for it today." },

  // Community
  { theme: "Community", text: "I am surrounded by women who celebrate my wins as their own." },
  { theme: "Community", text: "Collaboration multiplies what competition divides." },
  { theme: "Community", text: "I ask for help boldly, and I offer it generously." },
  { theme: "Community", text: "My network is rich with mentors, sponsors, and sisters." },
  { theme: "Community", text: "When I rise, I reach back. That is how we all win." },
  { theme: "Community", text: "I attract partners who honor my vision and my values." },
];

const THEMES = ["All", ...new Set(AFFIRMATIONS.map((a) => a.theme))];

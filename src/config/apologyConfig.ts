export interface ApologyConfig {
  recipientName: string;
  senderName: string;
  
  scene1: {
    leadText1: string;
    leadText2: string;
    headline: string;
    subheadline: string;
    ctaButton: string;
  };
  
  scene2: {
    introPart1: string;
    mainWord: string;
    heartfeltNote: string;
    continueButton: string;
  };
  
  scene3: {
    headline: string;
    paragraphs: string[];
    reflectionNote: string;
  };
  
  scene4Cards: Array<{
    id: string;
    title: string;
    subtitle: string;
    preview: string;
    content: string;
    colorAccent: string;
    badge: string;
  }>;
  
  scene5Memories: Array<{
    id: string;
    title: string;
    category: string;
    description: string;
    accentEmojiOrIcon: string;
    highlight: string;
  }>;
  
  scene6Surprise: {
    prompt: string;
    revealedMessage: string;
    subtext: string;
  };
  
  scene7Choices: {
    quote1: string;
    quote2: string;
    finalApology: string;
    option1Text: string;
    option1Response: string;
    option2Text: string;
    option2Response: string;
  };
  
  scene8Ending: {
    finalNote: string;
    reassurance: string;
    replayButton: string;
    signature: string;
  };

  sceneHourglass: {
    badge: string;
    headline: string;
    subheadline: string;
    coreQuote: string;
    reflectionText: string;
    reverseButtonText: string;
    normalButtonText: string;
    continueButton: string;
  };

  sceneLetter: {
    badge: string;
    title: string;
    envelopeLabel: string;
    salutation: string;
    paragraphs: string[];
    closing: string;
    signature: string;
    unfoldPrompt: string;
    continueButton: string;
  };

  sceneHealingHeart: {
    badge: string;
    headline: string;
    description: string;
    promises: Array<{
      id: string;
      title: string;
      detail: string;
      tag: string;
    }>;
    repairedMessage: string;
    continueButton: string;
  };

  sceneOpenDoor: {
    badge: string;
    headline: string;
    subheadline: string;
    reflection: string;
    stepThroughButton: string;
  };
}

export const defaultApologyConfig: ApologyConfig = {
  recipientName: "Someone Very Special",
  senderName: "Me",
  
  scene1: {
    leadText1: "Some words take courage…",
    leadText2: "And some feelings deserve to be expressed.",
    headline: "I HAVE SOMETHING TO TELL YOU.",
    subheadline: "A quiet space dedicated to an honest and heartfelt message.",
    ctaButton: "Open My Heart",
  },
  
  scene2: {
    introPart1: "I AM…",
    mainWord: "SORRY.",
    heartfeltNote: "I know that words cannot change everything, but I want to start by saying this sincerely.",
    continueButton: "Continue Reading",
  },
  
  scene3: {
    headline: "I owe you an honest apology.",
    paragraphs: [
      "Sometimes we let pride, haste, or thoughtlessness get in the way of what truly matters.",
      "I look back at what happened and realize I did not listen as carefully or treat the moment with the tenderness it deserved.",
      "You deserved patience, understanding, and gentleness—and I fell short.",
      "There are no excuses, no deflections, and no expectations attached to this message.",
      "Just a genuine, unhurried wish to acknowledge where I was wrong and to promise real self-reflection."
    ],
    reflectionNote: "Real apologies aren’t about demanding forgiveness—they are about taking true ownership."
  },
  
  scene4Cards: [
    {
      id: "better",
      title: "What I should have done better",
      subtitle: "Reflection & Accountability",
      preview: "Pausing before speaking, hearing your silence, and stepping outside my own perspective.",
      content: "I should have paused, listened without defending myself, and given your feelings the breathing room they deserved. When you needed empathy, I reacted too quickly. I recognize how painful that felt, and I am learning to slow down and hold space with genuine care.",
      colorAccent: "from-[#CFE5FF] to-[#8DBBFF]",
      badge: "Accountability"
    },
    {
      id: "know",
      title: "What I want you to know",
      subtitle: "Sincerity & Respect",
      preview: "Your feelings are valid, and your presence in my life has never been taken for granted.",
      content: "I want you to know that nothing was done with malice, but impact always matters more than intention. Your trust, warmth, and peace of mind matter deeply to me. I never wanted to cause you distress, and seeing that I did weighs heavily on my heart.",
      colorAccent: "from-[#DCD6FF] to-[#8DBBFF]",
      badge: "Intention"
    },
    {
      id: "understand",
      title: "What I hope you understand",
      subtitle: "Patience & Growth",
      preview: "This is not about rushing back to normal, but about growing into a better person.",
      content: "I hope you understand that I am committed to steady, honest growth. Not for show, and not to rush you into making things 'fine.' Whatever distance or time you need is completely yours. My apology remains constant, whether today, tomorrow, or down the road.",
      colorAccent: "from-[#FFE0EB] to-[#DCD6FF]",
      badge: "Commitment"
    }
  ],
  
  scene5Memories: [
    {
      id: "mem-1",
      title: "Quiet Understanding",
      category: "Kindness",
      description: "Those gentle moments when a simple smile or shared pause spoke louder than a thousand words.",
      accentEmojiOrIcon: "✨",
      highlight: "Moments of natural ease"
    },
    {
      id: "mem-2",
      title: "Genuine Laughter",
      category: "Joy",
      description: "When conversations unfolded effortlessly and reminded us of how light and joyful things could be.",
      accentEmojiOrIcon: "🌸",
      highlight: "Unscripted warmth"
    },
    {
      id: "mem-3",
      title: "Supportive Presence",
      category: "Trust",
      description: "Showing up for each other in quiet, unassuming ways when the world felt a little too heavy.",
      accentEmojiOrIcon: "🕊️",
      highlight: "Unspoken loyalty"
    },
    {
      id: "mem-4",
      title: "Shared Lessons",
      category: "Growth",
      description: "Recognizing that every rough edge teaches us humility, empathy, and how to communicate with more grace.",
      accentEmojiOrIcon: "🌱",
      highlight: "Becoming wiser"
    },
    {
      id: "mem-5",
      title: "Gentle Hope",
      category: "Future",
      description: "A simple, steady hope that warmth, clarity, and peace will always find their way back.",
      accentEmojiOrIcon: "💎",
      highlight: "No pressure, just light"
    }
  ],
  
  scene6Surprise: {
    prompt: "Tap the floating crystal heart to open the core message",
    revealedMessage: "Behind this little experience is one simple feeling: I am genuinely sorry.",
    subtext: "Crafted with every ounce of sincerity and gentle regard."
  },
  
  scene7Choices: {
    quote1: "I cannot ask you to forget how you felt.",
    quote2: "But I can acknowledge it, learn from it, and do better.",
    finalApology: "I am truly sorry.",
    option1Text: "I hear you.",
    option1Response: "Thank you for listening. Knowing that my words reached your heart means the world to me. Take all the time and peace you need.",
    option2Text: "I need some time.",
    option2Response: "I completely respect that. There is no timeline and no rush. Your space and feelings will always be honored."
  },
  
  scene8Ending: {
    finalNote: "No pressure. No expectations. Just a sincere apology.",
    reassurance: "May your day be peaceful and your heart be light.",
    replayButton: "Replay the experience",
    signature: "Made with sincerity."
  },

  sceneHourglass: {
    badge: "Signature Reflection",
    headline: "If I Could Turn Back Time",
    subheadline: "A symbolic pause to honor what happened, and to wish I had handled things differently.",
    coreQuote: "I can't change what happened, but I can choose what I do next.",
    reflectionText: "Time moves strictly forward—and while we cannot rewrite the past, we have complete power over how we learn, how we listen, and how we care from this moment on.",
    reverseButtonText: "Reverse Flow (Symbolic)",
    normalButtonText: "Let Time Flow",
    continueButton: "To The Unspoken Letter",
  },

  sceneLetter: {
    badge: "Unspoken Words",
    title: "An Honest Letter From My Heart",
    envelopeLabel: "For Your Eyes Only • With Deep Care",
    salutation: "Dear Friend,",
    paragraphs: [
      "I am writing this because some things are too important to leave unsaid, yet deserve the quiet space of written words rather than the haste of a conversation.",
      "Looking back at what happened, I see where I failed to understand your perspective. I allowed impatience or thoughtlessness to eclipse the gentleness you deserved.",
      "You did not deserve the hurt that followed. My intentions may not have been cruel, but the weight of the impact remains real—and for that impact, I am deeply, unequivocally sorry.",
      "Please know there are no hidden demands here, no pressure to forgive, and no rush to make anything 'okay.' Your peace of mind and comfort are what truly matter most."
    ],
    closing: "With sincere regard and quiet hope,",
    signature: "Always yours in sincerity.",
    unfoldPrompt: "Tap the wax seal to open and read",
    continueButton: "Carry These Words Forward",
  },

  sceneHealingHeart: {
    badge: "Golden Repair",
    headline: "The Healing Heart",
    description: "In the ancient art of Kintsugi, broken pieces are joined with gold—honoring the history rather than hiding it. Touch each commitment to illuminate the mend.",
    promises: [
      {
        id: "listening",
        title: "Patience & Active Listening",
        detail: "Pausing before speaking, hearing what is unspoken, and valuing your feelings above my defense.",
        tag: "Commitment I"
      },
      {
        id: "accountability",
        title: "True Ownership Without Deflection",
        detail: "Acknowledging mistakes directly, never shifting blame, and learning from every misstep.",
        tag: "Commitment II"
      },
      {
        id: "boundaries",
        title: "Honoring Space & Boundaries",
        detail: "Respecting your distance and pace completely, with zero rush or emotional pressure.",
        tag: "Commitment III"
      },
      {
        id: "growth",
        title: "Demonstrated, Steady Growth",
        detail: "Showing real change through consistent actions over time, rather than empty promises.",
        tag: "Commitment IV"
      }
    ],
    repairedMessage: "Healing isn't erasing the cracks; it's filling them with gold and genuine care.",
    continueButton: "Step Toward The Light",
  },

  sceneOpenDoor: {
    badge: "A Hopeful Threshold",
    headline: "The Open Doorway",
    subheadline: "A gentle threshold into tomorrow, leaving all pressure behind.",
    reflection: "Whatever choice you make, this doorway represents peace, mutual respect, and unconditional care for your feelings.",
    stepThroughButton: "Step Through The Door",
  }
};

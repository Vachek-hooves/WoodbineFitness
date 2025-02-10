export const motivations = {
  Running: {
    icon: '🏃‍♂️',
    quotes: [
      {
        title: "Running is not just a sport, it's a journey to a better you!",
        description:
          "Every new step takes you closer to health, endurance, and freedom. Start small, and one day you'll conquer distances you never imagined!",
      },
      {
        title:
          'Running beats stress and fills you with energy for the whole day!',
        description:
          'The feeling of lightness after a run is priceless. Every mile clears your mind, strengthens your body, and boosts your endurance.',
      },
      {
        title: 'From the first step to a marathon – you are capable of more!',
        description:
          "There are no limits to what you can achieve! Even if today you run just a few minutes, tomorrow you'll go further. Keep moving forward!",
      },
      {
        title: 'Run for your dreams – literally!',
        description:
          'Running symbolizes progress. Every workout makes you stronger, not just physically but mentally too.',
      },
      {
        title: 'Your legs can do more than you think!',
        description:
          "Running is freedom. Once you start, you won't want to stop. Speed isn't just about kilometers—it's about the drive to live life to the fullest!",
      },
    ],
  },
  Fitness: {
    icon: '🏋️‍♂️',
    quotes: [
      {
        title: 'Sweat today, shine tomorrow!',
        description:
          'Every drop of sweat is a step closer to your fitness goals. Keep pushing!',
      },
      {
        title: 'Stronger than excuses!',
        description:
          "There's always a reason to skip a workout, but the best reason is to show up for yourself.",
      },
      {
        title: "You don't need perfect conditions—just start!",
        description:
          'A quick workout is better than none. Movement is progress, no matter how small.',
      },
      {
        title: 'Discipline beats motivation every time!',
        description:
          'Motivation fades, but habits stay. Train your body, train your mind!',
      },
      {
        title: 'Your future self will thank you!',
        description:
          'Every rep, every set, every workout is an investment in a stronger, healthier you.',
      },
    ],
  },
  Yoga: {
    icon: '🧘',
    quotes: [
      {
        title: 'Balance your body, balance your mind!',
        description:
          "Yoga isn't just movement—it's a way to connect with yourself, reduce stress, and feel at peace.",
      },
      {
        title:
          "Flexibility isn't just for your muscles, but for your mindset too!",
        description:
          'Stretch, breathe, and let go of tension. A flexible body leads to a flexible and strong mind.',
      },
      {
        title: 'One deep breath can change everything!',
        description:
          'No matter how stressful the day is, yoga brings you back to the present moment. Stay grounded.',
      },
      {
        title:
          "Strength isn't just lifting weights—sometimes, it's holding a pose!",
        description:
          "Yoga challenges you in ways you don't expect. Find power in stillness and control.",
      },
      {
        title: 'Your body deserves care—stretch, relax, recover!',
        description:
          'Take time to listen to your body. Gentle movements today create a stronger, pain-free tomorrow.',
      },
    ],
  },
  Cycling: {
    icon: '🚴',
    quotes: [
      {
        title: 'Life is like riding a bicycle—keep moving forward!',
        description:
          'Every pedal push takes you closer to your goals. Feel the freedom of the open road!',
      },
      {
        title: 'Your legs are stronger than you think—keep pedaling!',
        description:
          "No hill is too steep when determination is stronger. Push through, and you'll be amazed!",
      },
      {
        title: 'Ride for the challenge, stay for the adventure!',
        description:
          "Cycling isn't just exercise; it's a journey filled with fresh air, adrenaline, and discovery.",
      },
      {
        title: 'Every ride makes you better!',
        description:
          "Speed doesn't matter. What counts is consistency. Keep going, and progress will follow!",
      },
      {
        title: 'Two wheels, endless possibilities!',
        description:
          'Cycling clears the mind, strengthens the body, and gives you a whole new perspective on the world.',
      },
    ],
  },
  Hiking: {
    icon: '🚶',
    quotes: [
      {
        title: 'Every step is a step towards a healthier you!',
        description:
          'Walking and hiking may seem simple, but they transform both body and mind. Keep moving!',
      },
      {
        title: 'The best views come after the hardest climbs!',
        description:
          'Nature rewards those who take the challenge. Step outside, breathe, and enjoy the journey.',
      },
      {
        title: "Walking isn't just exercise—it's therapy!",
        description:
          'A simple walk can clear your mind, boost creativity, and make your day better.',
      },
      {
        title: 'Your body is made to move!',
        description:
          "Don't underestimate the power of walking. Even short walks make a difference.",
      },
      {
        title: "Step by step, you're getting stronger!",
        description:
          "Hiking isn't about speed—it's about the experience. Enjoy every moment and every step.",
      },
    ],
  },
};

// Helper function to get a random motivation quote for an activity
export const getRandomMotivation = activity => {
  if (!motivations[activity]) {
    return null;
  }
  const quotes = motivations[activity].quotes;
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return {
    ...quotes[randomIndex],
    icon: motivations[activity].icon,
  };
};

// Helper function to get all motivation quotes for an activity
export const getAllMotivations = activity => {
  if (!motivations[activity]) {
    return null;
  }
  return {
    quotes: motivations[activity].quotes,
    icon: motivations[activity].icon,
  };
};

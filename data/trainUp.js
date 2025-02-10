export const trainUpData = {
  Running: {
    icon: '🏃‍♂️',
    levels: {
      Beginner: {
        title: 'Light jogging + adaptation',
        duration: '20-30 minutes',
        steps: [
          'Warm-up (5 minutes) – walking + dynamic stretching.',
          'Main phase (15–20 minutes) – jogging at a comfortable pace.',
          'Cool-down (5 minutes) – walking and gentle stretching.',
        ],
        tip: 'Focus on steady breathing (inhale through the nose, exhale through the mouth).',
      },
      Advanced: {
        title: 'Fartlek',
        duration: '30-40 minutes',
        steps: [
          'Warm-up (5–10 minutes) – light jogging + mobility exercises.',
          'Main phase (25–30 minutes):',
          '• 2 min slow jogging',
          '• 1 min fast running',
          '• 30 sec sprint',
          '• Repeat 5–6 times',
          'Cool-down (5 minutes) – walking and stretching.',
        ],
        tip: 'Maintain proper posture – avoid slouching or leaning too far forward.',
      },
      Expert: {
        title: 'Interval running + speed',
        duration: '40-50 minutes',
        steps: [
          'Warm-up (10 minutes) – slow jogging + dynamic stretching.',
          'Main phase (30 minutes):',
          '• 5×1 min sprints + 2 min recovery jogs',
          '• 10 minutes of moderate pace',
          'Cool-down (10 minutes) – walking and stretching.',
        ],
        tip: 'Work on your cadence (step frequency) – aim for 170–180 steps per minute.',
      },
    },
  },
  Yoga: {
    icon: '🧘',
    levels: {
      Beginner: {
        title: 'Relaxing yoga',
        duration: '20 minutes',
        steps: [
          "Simple poses: cat-cow, child's pose, forward bends.",
          'Slow pace, focus on breathing.',
          'Final pose: savasana (relaxation).',
        ],
        tip: 'Practice in the morning or before bed.',
      },
      Advanced: {
        title: 'Yoga flow',
        duration: '30-40 minutes',
        steps: [
          'Pose sequences: downward dog → plank → cobra → warrior I & II.',
          'Smooth transitions, breath control.',
          'Final pose: deep hip and back stretches.',
        ],
        tip: 'Use music to enhance concentration.',
      },
      Expert: {
        title: 'Power yoga',
        duration: '45-60 minutes',
        steps: [
          'Challenging poses: arm balances, headstands, bridge pose.',
          'Hold poses (30–60 sec each).',
          'Final meditation – breath control.',
        ],
        tip: 'Focus on balance and coordination.',
      },
    },
  },
  Hiking: {
    icon: '🚶',
    levels: {
      Beginner: {
        title: 'Easy hike',
        duration: '1-2 hours',
        distance: '5 km',
        steps: [
          'Route: flat terrain, parks, or waterfront trails.',
          'Pace: moderate, with rest stops.',
        ],
        tip: "Wear comfortable shoes, don't rush.",
      },
      Advanced: {
        title: 'Medium hike',
        duration: '3-4 hours',
        distance: '10 km',
        steps: [
          'Route: hilly terrain, forest trails.',
          'Pace: steady and active.',
        ],
        tip: 'Maintain good posture, use trekking poles.',
      },
      Expert: {
        title: 'Mountain hike',
        duration: '5-7 hours',
        distance: '15+ km',
        steps: [
          'Route: difficult terrain, elevation changes.',
          'Pace: challenging, requiring endurance.',
        ],
        tip: 'Plan ahead, bring extra water and food.',
      },
    },
  },
  Cycling: {
    icon: '🚴',
    levels: {
      Beginner: {
        title: 'Easy ride',
        duration: '30 minutes',
        distance: '5-10 km',
        steps: ['Flat route, minimal inclines.', 'Pace: comfortable, no rush.'],
        tip: 'Keep your back straight, relax your shoulders.',
      },
      Advanced: {
        title: 'Endurance training',
        duration: '60 minutes',
        distance: '20 km',
        steps: ['Variable pace, heart rate training.'],
        tip: 'Use proper safety gear.',
      },
      Expert: {
        title: 'Speed & endurance ride',
        duration: '90 minutes',
        distance: '40+ km',
        steps: ['Fast intervals, climbs and descents.'],
        tip: 'Control your breathing and cadence.',
      },
    },
  },
  Fitness: {
    icon: '💪',
    levels: {
      Beginner: {
        title: 'Basic fitness',
        activities: ['Rollerblading', 'volleyball', 'casual walks'],
        tip: 'Start with activities you enjoy and gradually increase intensity.',
      },
      Advanced: {
        title: 'Intermediate fitness',
        activities: ['Freestyle skating', 'active games'],
        tip: 'Focus on improving technique and endurance.',
      },
      Expert: {
        title: 'Advanced fitness',
        activities: ['Extreme sports (BMX, parkour, SUP surfing)'],
        tip: 'Always prioritize safety and proper equipment.',
      },
    },
  },
};

// Helper function to get training data by activity and level
export const getTrainingData = (activity, level) => {
  if (!trainUpData[activity] || !trainUpData[activity].levels[level]) {
    return null;
  }
  return {
    ...trainUpData[activity].levels[level],
    icon: trainUpData[activity].icon,
  };
};

// Helper function to get all levels for an activity
export const getActivityLevels = activity => {
  if (!trainUpData[activity]) {
    return null;
  }
  return {
    levels: Object.keys(trainUpData[activity].levels),
    icon: trainUpData[activity].icon,
  };
};

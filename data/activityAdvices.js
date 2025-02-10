export const activityAdvices = {
  Running: {
    icon: '🏃‍♂️',
    tips: [
      'Start with a warm-up before setting the timer to prepare your muscles for the workout.',
      'Gradually increase the time goal to avoid overloading your body.',
      'Set a goal of 20-30 minutes to maintain a steady pace without overexerting.',
      'Take short hydration breaks if you\'re planning for a longer run.',
      'After the timer ends, cool down to avoid muscle soreness.'
    ]
  },
  Yoga: {
    icon: '🧘',
    tips: [
      'Start with 15-20 minutes of beginner yoga, gradually increasing the duration.',
      'Breathe deeply and calmly to maintain balance during poses.',
      'Set the timer for 5-10 minutes of meditation at the end of your practice.',
      'Use the timer to focus on how long you hold each pose.',
      'Regularly set goals to stay disciplined and improve flexibility.'
    ]
  },
  Hiking: {
    icon: '🚶',
    tips: [
      'Set a goal for a 30-40 minute easy walk to avoid overexerting yourself.',
      'Start with smaller goals, like 10-15 minutes, to build stamina.',
      'Use the timer for each segment of the trail to maintain a steady pace.',
      'Break your goal into smaller stages, like stopping every 15 minutes.',
      'Pay attention to the terrain and monitor your condition during the hike.'
    ]
  },
  Cycling: {
    icon: '🚴',
    tips: [
      'Set a 30-minute goal at a moderate pace, gradually increasing the time.',
      'Use the timer for intervals: speed up for 1 minute, then relax for 2 minutes.',
      'For intense workouts, set a goal for 40-45 minutes with alternating speeds.',
      'Set a timer for each round (e.g., 15 minutes for the first lap) to gradually increase the load.',
      'Monitor your leg condition, control your breathing, and don\'t forget hydration.'
    ]
  },
  Fitness: {
    icon: '💪',
    tips: [
      'Start with 20 minutes of general fitness training, including cardio and strength exercises.',
      'Set a goal for each exercise (e.g., 1 minute of plank, 2 minutes of jumps).',
      'Use the interval timer: 40 seconds of activity and 20 seconds of rest for optimal results.',
      'Gradually increase the duration of the workout by adding new exercises.',
      'Use the timer to track rest periods and recovery between sets.'
    ]
  }
};

// Helper function to get a random tip for a specific activity
export const getRandomTip = (activity) => {
  if (!activityAdvices[activity]) {
    return null;
  }
  const tips = activityAdvices[activity].tips;
  const randomIndex = Math.floor(Math.random() * tips.length);
  return {
    tip: tips[randomIndex],
    icon: activityAdvices[activity].icon
  };
};

// Helper function to get all tips for a specific activity
export const getAllTips = (activity) => {
  if (!activityAdvices[activity]) {
    return null;
  }
  return {
    tips: activityAdvices[activity].tips,
    icon: activityAdvices[activity].icon
  };
}; 
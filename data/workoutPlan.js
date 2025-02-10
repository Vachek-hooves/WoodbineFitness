export const workoutPlan = {
  Running: {
    icon: '🏃‍♂️',
    phases: [
      {
        title: 'Warm-up',
        duration: '5-10 min',
        exercises: ['Light jogging', 'Leg swings', 'Jumps'],
      },
      {
        title: 'Interval Running',
        sets: 5,
        exercises: ['1 min fast run', '1 min walking'],
      },
      {
        title: 'Long Distance Run',
        duration: '20-30 min',
        description: 'Run at a comfortable pace',
      },
      {
        title: 'Sprints',
        sets: 6,
        distance: '100 meters',
        description: 'With acceleration',
      },
      {
        title: 'Cool-down',
        duration: '5 min',
        exercises: ['Walking', 'Stretching'],
      },
    ],
  },
  Strength: {
    icon: '💪',
    phases: [
      {
        title: 'Warm-up',
        exercises: ['Cardio', 'Joint mobility exercises'],
      },
      {
        title: 'Main Workout',
        exercises: [
          {
            name: 'Squats',
            sets: 3,
            reps: 12,
          },
          {
            name: 'Push-ups',
            sets: 3,
            reps: 10,
          },
          {
            name: 'Plank',
            sets: 3,
            duration: '30 sec',
          },
          {
            name: 'Pull-ups',
            sets: 3,
            reps: 8,
          },
        ],
      },
      {
        title: 'Cool-down',
        exercises: ['Muscle stretching', 'Breathing exercises'],
      },
    ],
  },
  Yoga: {
    icon: '🧘',
    phases: [
      {
        title: 'Warm-up',
        exercises: ['Muscle stretching', 'Breathing exercises'],
      },
      {
        title: 'Flexibility poses',
        poses: ['Downward Dog', 'Triangle', 'Warrior'],
      },
      {
        title: 'Balance poses',
        poses: ['Tree Pose', 'Swallow Pose'],
      },
      {
        title: 'Relaxation',
        exercises: ['Savasana', 'Meditation'],
      },
    ],
  },
  Cycling: {
    icon: '🚴',
    phases: [
      {
        title: 'Warm-up',
        duration: '5 min',
        description: 'Light riding',
      },
      {
        title: 'Hill Climbs',
        sets: 3,
        duration: '1 min',
      },
      {
        title: 'Sprints',
      },
      {
        title: 'Long Ride',
        distance: '20 km',
        description: 'At a moderate pace',
      },
      {
        title: 'Cool-down',
        exercises: ['Slow riding', 'Stretching'],
      },
    ],
  },
  Hiking: {
    icon: '🚶',
    phases: [
      {
        title: 'Main Activity',
        description: 'Hiking at comfortable pace',
      },
      {
        title: 'Regular Breaks',
        frequency: 'Every 30 min',
        description: 'Stretching breaks',
      },
      {
        title: 'Rest Period',
        location: 'By the Water',
        activities: ['Meditation', 'Breathing practices'],
      },
    ],
  },
  Fitness: {
    icon: '🔥',
    phases: [
      {
        title: 'Warm-up',
        duration: '5 min',
        exercises: ['Joint mobility exercises', 'Jogging in place'],
      },
      {
        title: 'Cardio',
        exercises: [
          {
            name: 'Jump rope',
            sets: 3,
            duration: '1 min',
          },
          {
            name: 'Burpees',
            sets: 3,
            reps: 10,
          },
        ],
      },
      {
        title: 'Strength',
        exercises: [
          {
            name: 'Jump squats',
            sets: 3,
            reps: 12,
          },
          {
            name: 'Push-ups',
            sets: 3,
            reps: 10,
          },
        ],
      },
      {
        title: 'Final challenge',
        exercises: [
          {
            name: 'Plank',
            sets: 3,
            duration: '30 sec',
          },
        ],
      },
      {
        title: 'Cool-down',
        duration: '5 min',
        exercises: ['Stretching', 'Breathing exercises'],
      },
    ],
  },
};

// Helper function to get workout plan for specific activity
export const getWorkoutPlan = activity => {
  if (!workoutPlan[activity]) {
    return null;
  }
  return {
    phases: workoutPlan[activity].phases,
    icon: workoutPlan[activity].icon,
  };
};

// Helper function to get all available activities
export const getAvailableActivities = () => {
  return Object.keys(workoutPlan).map(activity => ({
    name: activity,
    icon: workoutPlan[activity].icon,
  }));
};

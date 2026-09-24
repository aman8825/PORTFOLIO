// Premium, smooth easing curves
const transitionStandard = { duration: 0.6, ease: [0.22, 1, 0.36, 1] };
const transitionFast = { duration: 0.3, ease: [0.22, 1, 0.36, 1] };

export const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: transitionStandard
  },
  exit: { opacity: 0, y: -15, transition: transitionFast }
};

export const FADE_DOWN = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: transitionStandard
  },
  exit: { opacity: 0, y: 15, transition: transitionFast }
};

export const FADE_IN = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  },
  exit: { opacity: 0, transition: transitionFast }
};

export const SCALE_UP = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: transitionStandard
  }
};

export const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const SLIDE_IN_RIGHT = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: transitionStandard
  }
};

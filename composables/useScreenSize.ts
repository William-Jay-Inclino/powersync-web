import { computed } from "vue";
import { useWindowSize } from '@vueuse/core';

export default function useScreenSize() {
  // Define breakpoints for different screen sizes
  const SMALL_WIDTH = 640; // Example breakpoint for small screens
  const MEDIUM_WIDTH = 768; // Example breakpoint for medium screens
  // If width is greater than this, it's considered large

  // Get the window width and height
  const { width, height } = useWindowSize();

  // Computed property to determine screen size
  const screenSize = computed(() => {
    if (width.value < SMALL_WIDTH) {
      return 'small';
    } else if (width.value >= SMALL_WIDTH && width.value < MEDIUM_WIDTH) {
      return 'medium';
    } else {
      return 'large';
    }
  });

  // Return the computed screen size and the raw width and height
  return {
    screenSize,
    width,
    height
  };
}
import { scroller } from "react-scroll";

// Smooth-scrolls to a section by its element id, leaving room for the floating navbar.
export function scrollToSection(id) {
  scroller.scrollTo(id, { smooth: true, duration: 600, offset: -72 });
}

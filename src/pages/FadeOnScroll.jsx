import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FadeOnScroll = ({ children, num1 = 5, num2 = 25 }) => {
  const el = useRef();

  useEffect(() => {
    gsap.fromTo(
      el.current,
      { opacity: 1 },
      {
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el.current,
          start: `center+=${num1}% center`,
          end: `center+=${num2}% center`,
          scrub: 0.5,
        },
      },
    );
  }, [num1, num2]);

  return <div ref={el}>{children}</div>;
};

export default FadeOnScroll;

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Reveal({ children, delay = 0, width = "fit-content" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-75px" });

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75, filter: "blur(10px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.8, delay: delay / 1000, type: "spring", stiffness: 50 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

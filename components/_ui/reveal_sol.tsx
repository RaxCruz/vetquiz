"use client";
import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export default function RevealSole({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const mainControls = useAnimation();
    const slideControls = useAnimation();
    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
            slideControls.start("visible");
        }
    }, [isInView]);

    return (
        <div ref={ref} className="relative">
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.5 }}
            >
                {children}
            </motion.div>
            {/* <motion.div
                variants={{
                    hidden: { left: 0 },
                    visible: { left: "100%", opacity: 0 },
                }}
                initial="hidden"
                animate={slideControls}
                transition={{ duration: 0.5, ease: "easeIn" }}
                className="absolute left-1 bottom-1 bg-zinc-900 w-full h-full rounded-xl"
            /> */}
        </div>
    );
}
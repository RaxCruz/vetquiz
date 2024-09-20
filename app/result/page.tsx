'use client';
import React from "react";
import { motion } from "framer-motion";
import { ResultChart } from "@/components/_ui/result-chart";
import { useSearchParams } from "next/navigation";

const Result = () => {
    const searchParams = useSearchParams()
    const score = searchParams.get('score')

    const chartData = [
        { browser: "safari", visitors: score, fill: "var(--color-safari)" },
    ]
    return (
        // NOTE: An overflow of hidden will be required on a wrapping
        // element to see expected results
        <div className="relative overflow-hidden flex flex-col items-center justify-center min-h-screen">
            <ResultChart chartData={chartData}
            />

            <FuzzyOverlay />
        </div>
    );
};

const FuzzyOverlay = () => {
    return (
        <motion.div
            initial={{ transform: "translateX(-10%) translateY(-10%)" }}
            animate={{
                transform: "translateX(10%) translateY(10%)",
            }}
            transition={{
                repeat: Infinity,
                duration: 0.2,
                ease: "linear",
                repeatType: "mirror",
            }}
            // You can download these PNGs here:
            // https://www.hover.dev/black-noise.png
            // https://www.hover.dev/noise.png
            style={{
                backgroundImage: 'url("/black-noise.png")',
                // backgroundImage: 'url("/noise.png")',
            }}
            className="pointer-events-none absolute -inset-[100%] opacity-[15%]"
        />
    );
};

export default Result;
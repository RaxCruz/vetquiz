'use client'
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useSound from "use-sound";

const HeroPage = () => {
    return (
        // NOTE: An overflow of hidden will be required on a wrapping
        // element to see expected results
        <div className="relative overflow-hidden">
            <ExampleContent />
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

const ExampleContent = () => {
    const [playStart] = useSound('/sounds/meow.mp3', {
        volume: 0.25,
    });
    const router = useRouter()
    return (
        <div className="relative grid h-screen place-content-center space-y-6 bg-neutral-950 p-8 justify-items-center">
            <Image src='/bigcat.svg' width={200} height={200} alt="mikecat" className="" />
            <p className="text-center text-6xl font-black text-neutral-50 !mt-0">
                想成為獸醫師嗎?
            </p>
            <p className="text-center text-neutral-400">
                測驗你有沒有獸醫師的潛能吧！ 📺
            </p>
            <div className="flex items-center justify-center gap-3">
                {/* <button className="text-neutral-20 w-fit px-4 py-2 font-semibold text-neutral-200 transition-colors hover:bg-neutral-800">
                    Pricing
                </button> */}
                <button className="w-fit bg-neutral-200 px-4 py-2 font-semibold text-neutral-700 transition-colors hover:bg-red-700 hover:text-white hover:scale-110" onClick={() => { playStart(); router.push('/quiz') }}>
                    開始挑戰
                </button>
            </div>
        </div>
    );
};

export default HeroPage;
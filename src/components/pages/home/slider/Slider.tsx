'use client'

import { useState } from "react";
import { SLIDES } from "./slider.data";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import cn from "clsx";

export function Slider() {
    const [activeSlideId, setActiveSlideId] = useState(1);

    return (
        <div className="relative flex items-center gap-1 rounded-3xl
        overflow-hidden">
            <div className="flex w-full transition-transform duration-500 ease-in-out gap-1"
                style={{transform: `translateX(-${(activeSlideId - 1) * 100}%)`}}>
                {SLIDES.map(slide => (
                    <div
                        key={slide.id}
                        className="min-w-full"
                        onDrag={e => e.preventDefault()}
                    >
                        <Image
                            src={slide.image}                              
                            alt=""
                            width={1450}
                            height={307}
                            className="w-full h-full object-cover"
                            draggable={false}
                        />
                    </div>
                ))}
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
                <button
                    onClick={() => setActiveSlideId(
                        activeSlideId === 1 ? SLIDES.length : activeSlideId - 1)}
                    className="bg-white/50 transition hover:bg-white-75
                    text-black font-bold p-1.5 rounded-lg">
                    <ChevronLeft size={20}/>
                </button>

                <button
                    onClick={() => setActiveSlideId(
                        activeSlideId === SLIDES.length ? 1 : activeSlideId + 1)}
                    className="bg-white/50 transition hover:bg-white-75
                    text-black font-bold p-1.5 rounded-lg">
                    <ChevronRight size={20}/>
                </button>
            </div>
        </div>
    );
}
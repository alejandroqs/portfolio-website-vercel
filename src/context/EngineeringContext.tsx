
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { content, Content, Mode } from "@/data/content";

interface EngineeringContextType {
    mode: Mode;
    toggleMode: () => void;
    data: Content;
}

const EngineeringContext = createContext<EngineeringContextType | undefined>(undefined);

import { useSearchParams } from "next/navigation";

export const EngineeringProvider = ({ children }: { children: ReactNode }) => {
    const searchParams = useSearchParams();
    // Default to corporate, but check URL immediately if possible (though useEffect handles it safer for hydration)
    const [mode, setMode] = useState<Mode>("corporate");

    // Handle initial URL param
    useEffect(() => {
        const modeParam = searchParams.get("mode");
        if (modeParam === "corp") {
            setMode("corporate");
        } else if (modeParam === "web3") {
            setMode("disruptor");
        }
    }, [searchParams]);

    useEffect(() => {
        // Enable smooth transitions only after initial load to prevent flash
        const timer = setTimeout(() => {
            document.body.classList.add("transition-colors", "duration-500");
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Update data-theme attribute on body for global CSS variables
        document.body.dataset.theme = mode;
    }, [mode]);

    const toggleMode = () => {
        setMode((prev) => (prev === "corporate" ? "disruptor" : "corporate"));
    };

    const data = content[mode];

    return (
        <EngineeringContext.Provider value={{ mode, toggleMode, data }}>
            {children}
        </EngineeringContext.Provider>
    );
};

export const useEngineering = () => {
    const context = useContext(EngineeringContext);
    if (context === undefined) {
        throw new Error("useEngineering must be used within an EngineeringProvider");
    }
    return context;
};

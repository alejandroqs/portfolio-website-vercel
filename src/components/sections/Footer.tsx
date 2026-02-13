
"use client";

import { useState } from "react";
import { useEngineering } from "@/context/EngineeringContext";
import { cn } from "@/lib/utils";
import { Github, Linkedin, Mail, Send } from "lucide-react";

export default function Footer() {
    const { data, mode } = useEngineering();
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        // Open default mail client in a new tab/window
        window.open(`mailto:alejandroqs04@gmail.com?subject=Portfolio Inquiry&body=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <footer id="contact" className={cn(
            "border-t py-24 px-6 lg:px-20 text-center",
            mode === "disruptor"
                ? "border-neon-purple/20 bg-slate-950 text-slate-400"
                : "border-slate-200 bg-slate-50 text-slate-600"
        )}>
            <div className="max-w-4xl mx-auto space-y-12">
                <h2 className={cn(
                    "text-3xl font-bold tracking-tight",
                    mode === "disruptor" ? "text-neon-purple text-glow" : "text-slate-900"
                )}>
                    {data.footer.contact}
                </h2>

                {/* Social Links */}
                <div className="flex justify-center gap-8">
                    <a href="https://github.com/alejandroqs" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        <Github size={24} />
                    </a>
                    <a href="https://www.linkedin.com/in/alejandroqs-io/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        <Linkedin size={24} />
                    </a>
                    <a href="mailto:alejandroqs04@gmail.com" className="hover:text-primary transition-colors">
                        <Mail size={24} />
                    </a>
                </div>

                {/* Simple Contact Form */}
                <form className="max-w-md mx-auto flex gap-2" onSubmit={handleSubmit} noValidate>
                    <input
                        type="text"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={mode === "corporate" ? "Send a quick message..." : "enter_transmission_data"}
                        className={cn(
                            "flex-1 px-4 py-2 rounded-md border bg-transparent focus:outline-none focus:ring-2",
                            mode === "disruptor" ? "border-slate-800 focus:ring-neon-purple text-neon-purple placeholder:text-slate-700" : "border-slate-300 focus:ring-slate-400 placeholder:text-slate-400"
                        )}
                    />
                    <button
                        type="submit"
                        className={cn(
                            "px-6 py-2 rounded-md font-bold transition-all",
                            mode === "disruptor" ? "bg-neon-purple text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:bg-fuchsia-600" : "bg-slate-900 text-white hover:bg-slate-800"
                        )}
                    >
                        <Send size={16} />
                    </button>
                </form>

                <p className="text-sm font-mono opacity-70 mt-12">
                    {data.footer.closing}
                </p>
            </div>
        </footer>
    );
}

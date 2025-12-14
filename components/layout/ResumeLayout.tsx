"use client";

import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface ResumeLayoutProps {
    children: ReactNode;
}

export function ResumeLayout({ children }: ResumeLayoutProps) {
    return (
        <div className="min-h-screen bg-stone-50">
            <Sidebar />
            <main className="main-content">
                <div className="max-w-5xl mx-auto px-8 py-12">
                    {children}
                </div>
            </main>
        </div>
    );
}

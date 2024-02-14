"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { HSAccordion, HSDropdown, IStaticMethods } from "preline/preline";
declare global {
    interface Window {
        HSStaticMethods: IStaticMethods;
    }
}

export default function PrelineScript() {
    const path = usePathname();

    useEffect(() => {
        import("preline/preline");
    }, []);

    useEffect(() => {
        setTimeout(() => {
            HSAccordion.autoInit();
            HSDropdown.autoInit();
        }, 100)
    }, [path])

    return null;
}
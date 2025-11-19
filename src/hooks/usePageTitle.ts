import { useEffect } from "react";

export function usePageTitle(title: string) {
    useEffect(() => {
        const baseTitle = "";
        document.title = `${title} ${baseTitle}`;
        return () => {
            document.title = baseTitle;
        };
    }, [title]);
}
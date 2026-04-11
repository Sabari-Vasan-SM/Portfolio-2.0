import {
    Briefcase,
    FileTerminal,
    GraduationCap,
    House,
    Layers,
    Mail,
    Sparkles,
} from "lucide-react";
import Dock, { type DockItemData } from "@/components/Dock";

const NavBar = () => {
    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const items: DockItemData[] = [
        { icon: <House size={18} />, label: "Home", onClick: () => scrollTo("hero") },
        { icon: <Sparkles size={18} />, label: "About", onClick: () => scrollTo("about") },
        { icon: <Layers size={18} />, label: "Projects", onClick: () => scrollTo("projects") },
        { icon: <Briefcase size={18} />, label: "Experience", onClick: () => scrollTo("experience") },
        { icon: <GraduationCap size={18} />, label: "Credentials", onClick: () => scrollTo("certifications") },
        { icon: <FileTerminal size={18} />, label: "Terminal", onClick: () => scrollTo("terminal") },
        { icon: <Mail size={18} />, label: "Contact", onClick: () => scrollTo("contact") },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 pb-4 md:pb-5 px-3">
            <Dock items={items} panelHeight={74} baseItemSize={54} magnification={82} />
        </nav>
    );
};

export default NavBar;

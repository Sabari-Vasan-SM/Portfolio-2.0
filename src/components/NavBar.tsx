import {
    BookOpen,
    Briefcase,
    FileTerminal,
    FolderOpen,
    GraduationCap,
    House,
    Mail,
    Menu,
    User,
    Wrench,
    X,
} from "lucide-react";
import { useState } from "react";
import Dock, { type DockItemData } from "@/components/Dock";

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setMenuOpen(false);
    };

    const items: DockItemData[] = [
        { icon: <House size={18} />, label: "Home", onClick: () => scrollTo("hero") },
        { icon: <User size={18} />, label: "About", onClick: () => scrollTo("about") },
        { icon: <Wrench size={18} />, label: "Skills", onClick: () => scrollTo("skills") },
        { icon: <FolderOpen size={18} />, label: "Projects", onClick: () => scrollTo("projects") },
        { icon: <Briefcase size={18} />, label: "Experience", onClick: () => scrollTo("experience") },
        { icon: <BookOpen size={18} />, label: "Education", onClick: () => scrollTo("education") },
        { icon: <GraduationCap size={18} />, label: "Credentials", onClick: () => scrollTo("certifications") },
        { icon: <FileTerminal size={18} />, label: "Terminal", onClick: () => scrollTo("terminal") },
        { icon: <Mail size={18} />, label: "Contact", onClick: () => scrollTo("contact") },
    ];

    const mobileLinks = [
        { label: "Home", id: "hero" },
        { label: "About", id: "about" },
        { label: "Skills", id: "skills" },
        { label: "Projects", id: "projects" },
        { label: "Experience", id: "experience" },
        { label: "Education", id: "education" },
        { label: "Credentials", id: "certifications" },
        { label: "Terminal", id: "terminal" },
        { label: "Contact", id: "contact" },
    ];

    return (
        <>
            <nav className="fixed bottom-0 left-0 right-0 z-50 hidden px-3 pb-4 md:block md:pb-5">
                <Dock items={items} panelHeight={74} baseItemSize={54} magnification={82} />
            </nav>

            <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-background/90 px-4 py-3 backdrop-blur-md md:hidden">
                <div className="mx-auto flex max-w-6xl items-center justify-between">
                    <button
                        type="button"
                        onClick={() => scrollTo("hero")}
                        className="text-xs font-semibold tracking-[0.18em] text-terminal-green"
                    >
                        SABARIVASAN
                    </button>

                    <button
                        type="button"
                        aria-label={menuOpen ? "Close mobile menu" : "Open mobile menu"}
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/20 text-foreground"
                    >
                        {menuOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>

                {menuOpen && (
                    <div className="mx-auto mt-3 grid max-w-6xl grid-cols-2 gap-2 pb-1">
                        {mobileLinks.map((link) => (
                            <button
                                key={link.id}
                                type="button"
                                onClick={() => scrollTo(link.id)}
                                className="rounded-md border border-white/10 bg-card px-3 py-2 text-left text-xs tracking-widest text-muted-foreground transition-colors hover:border-terminal-green/40 hover:text-terminal-green"
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>
                )}
            </nav>
        </>
    );
};

export default NavBar;

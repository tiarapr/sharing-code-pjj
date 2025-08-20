import { useState, useEffect } from "react";
import Header from "../components/sections/Header";
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import ServiceSection from "../components/sections/ServiceSection";
import CTASection from "../components/sections/CTASection";
import Footer from "../components/sections/Footer";

const sections = ["beranda", "about", "layanan", "footer"];

export default function Homepage() {
    const [activeSection, setActiveSection] = useState("beranda");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (section) => {
        setActiveSection(section);
        const element = document.getElementById(section);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 70,
                behavior: "smooth",
            });
        }
    }

    return (
        <div className="bg-gray-50">
            <Header
                activeSection={activeSection}
                scrolled={scrolled}
                handleNavClick={handleNavClick}
            />
            <HeroSection />
            <main className="py-10">
                <div className="max-w-screen-2xl mx-auto px-4 md:px-16">
                    <AboutSection />
                    <ServiceSection />
                    <CTASection />
                </div>
            </main>
            <Footer />
        </div>
    )
}
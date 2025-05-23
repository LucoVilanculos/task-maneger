import type { FooterProps } from "../types/allprops";

export const Footer = (props: FooterProps) => {
    return (
        <footer className="bg-gradient-to-l from-blue-900 to-cyan-700 px-2 h-15 text-sm text-white flex items-center lg:text-[1rem]">
            <p>&copy; {new Date().getFullYear()} criado com todo ❤ por <strong>{props.name}</strong></p>
        </footer>
    );
};
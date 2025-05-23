import type { FooterProps } from "../types/allprops";

export const Footer = (props: FooterProps) => {
    return (
        <footer className="bg-gradient-to-l from-blue-700 to-blue-900 px-2 h-15 text-sm text-white flex items-center">
            <p>&copy; {new Date().getFullYear()} criado com todo ❤ por <strong>{props.name}</strong></p>
        </footer>
    );
};
import { useEffect, useRef } from "react"
import { RiCloseFill } from "react-icons/ri";
import PropTypes from "prop-types";

export default function Drawer({ isMenuOpen, setMenuOpen }) {
    const drawerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (drawerRef.current && !drawerRef.current.contains(e.target) && isMenuOpen) {
                setMenuOpen(false);
            }
        };
        const handleEsc = (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEsc);
        document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEsc);
        };
    }, [isMenuOpen, setMenuOpen]);

    return (
        <>
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    style={{
                        backdropFilter: 'blur(5px)',
                        WebkitBackdropFilter: 'blur(5px)',
                    }}
                    onClick={() => setMenuOpen(false)}
                />
            )}
            <aside 
                ref={drawerRef} 
                className={`fixed top-0 right-0 w-2/3 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <RiCloseFill
                    className="absolute top-4 right-4 cursor-pointer"
                    size={32}
                    onClick={() => setMenuOpen(false)}
                />
                <nav className="mt-28 flex flex-col items-center">
                    <div
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                        onClick={() => setMenuOpen(false)}
                    >
                        All Articles
                    </div>
                    <div
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                        onClick={() => setMenuOpen(false)}
                    >
                        Contact
                    </div>
                </nav>
            </aside>
        </>
    );
}

Drawer.propTypes = {
    isMenuOpen: PropTypes.bool.isRequired,
    setMenuOpen: PropTypes.func.isRequired
};
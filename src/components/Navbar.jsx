import { useState } from "react"
import logo from "../../src/assets/logo.svg";
import { RiMenu4Line } from "react-icons/ri";
import Drawer from "./Drawer";
import { useAuth } from "@/contexts/auth/useAuth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const {userLoggedIn} = useAuth();

    const navigate = useNavigate();
    
    return <header className=" h-12">
        <nav
            className={`fixed top-0 py-4 bg-white navbar-shadow z-50 left-0 shadow-lg w-full`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-12">
                    <div className="flex-shrink-0 cursor-pointer"
                        onClick={()=> navigate("/")}>
                        <img src={logo} alt='logo' className=' w-12 h-12 sm:h-10 rounded-full' />
                    </div>
                    <div className='block md:hidden'>
                        <RiMenu4Line
                            size={32}
                            onClick={()=>setMenuOpen(true)}
                        />
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <p className=" text-black hover:text-green px-3 py-2 rounded-md text-sm cursor-pointer font-medium"
                                onClick={() => navigate("/all-articles")}>
                                All Articles
                            </p>
                            {userLoggedIn? (
                                <p className="text-black hover:text-green px-3 py-2 rounded-md text-sm cursor-pointer font-medium"
                                onClick={() => navigate("/article/create")}>
                                New Article
                                </p>
                            ): (
                                <p className="text-black hover:text-green px-3 py-2 rounded-md text-sm cursor-pointer font-medium"
                                onClick={() => console.log("nav")}>
                                Contact
                            </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <Drawer isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen}/>
    </header>
}
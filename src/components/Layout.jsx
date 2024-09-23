import Footer from "./Footer";
import Navbar from "./Navbar";
import Proptypes from 'prop-types';

export default function Layout({children}){
    return (
        <div className=" container w-full max-w-full font-cormorant">
            <Navbar/>
            <main className=" w-full max-w-7xl mt-14 mx-auto px-4 sm:px-6 lg:px-8">
                {children}
            </main>
            <Footer/>
        </div>
    )
}

Layout.propTypes = {
    children: Proptypes.object.isRequired
}
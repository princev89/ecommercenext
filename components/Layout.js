import Login from "../pages/login";
import Signup from "../pages/signup";
import Footer from "./Footer";

export default function Layout({children}){
    return (
        <div>
            <Login/>
            <Signup/>
            {/* <div className="p-5">
            {children}
            </div> */}
            {/* <Footer></Footer> */}
        </div>
    );
}
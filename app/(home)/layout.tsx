import Navbar from "./_components/navbar";
import { Footer } from "./_components/footer";

const HomeLayout = ({
    children
}:{children:React.ReactNode}) => {
    return ( 
        <div className="h-full bg-orange-600">
        <Navbar />
        <main className="py-12">
            {children}
        </main>
        <hr className="py-2"/>
        <Footer />
        </div>
     );
}
 
export default HomeLayout;
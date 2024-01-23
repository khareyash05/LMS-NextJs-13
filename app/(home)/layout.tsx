import Navbar from "./_components/navbar";
import { Footer } from "./_components/footer";

const HomeLayout = ({
    children
}:{children:React.ReactNode}) => {
    return ( 
        <div className="h-full bg-orange-600">
        <Navbar />
        <main className="pt-8 pb-20">
            {children}
        </main>
        <Footer />
        </div>
     );
}
 
export default HomeLayout;
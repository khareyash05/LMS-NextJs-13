import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";

const Hero = () => {
    return (  
    <div className="flex items-center justify-center flex-col mb-32 mt-8">
        <div className={cn(
          "flex items-center justify-center flex-col ",
        )}>
          <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-orange-700 rounded-full uppercase">
            <Medal className="h-6 w-6 mr-2" />
            No 1 Wedding Manager
          </div>
          <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
            Matrimony Mall helps organize Weddings
          </h1>
          <div className="text-3xl md:text-6xl bg-gradient-to-r from-orange-400 to-red-700 text-white px-4 p-2 rounded-md pb-4 w-fit mb-6">
            fasterrrrrr....
          </div>
        </div>
        <div className={cn(
          "text-sm md:text-xl text-neutral-800 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
        )}>
          Manage the most Memorable day of your life, from marriage halls to hotels to photographers to caterers to almost everything you might need, all here, and make the day your most memorable one.
        </div>
        <Button className="mt-6 text-white bg-red-700 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" size="lg" asChild>
          <Link href="/signup">
            Get Started
          </Link>
        </Button>
    </div>
    );
}
 
export default Hero;
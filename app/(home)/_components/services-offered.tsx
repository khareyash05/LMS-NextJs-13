import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image";

import MarriageHallCard from "@/assets/marriageHallCard.jpg"
import HotelsCard from "@/assets/hotelsCard.jpg"
import PhotoGrapherCard from "@/assets/photographerCard.jpg"
import DJCard from "@/assets/DJCARD.jpg"  

const ServicesOffered = () => {
    return ( 
        <div className="m-4 p-4 mt-16"> 
            <h2 className="mb-4 text-6xl font-bold tracking-tight text-gray-900">Services Offered</h2>
            <div className="flex flex-row items-center justify-center">
                <Card className="mx-4 shadow-2xl ">
                    <CardHeader className="items-center justify-center">
                        <Image alt="" src={MarriageHallCard} className="object-cover w-full h-full"/>
                        <CardDescription className="text-xl">Wedding Halls</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Discover our exquisite selection of wedding halls designed to turn your special day into a timeless celebration.Explore our range of enchanting wedding halls and embark on a journey to create lasting memories that will be cherished for a lifetime.</p>
                    </CardContent>
                </Card>
                <Card className="mx-4">
                    <CardHeader className="items-center justify-center">
                        <Image alt="" src={HotelsCard} className="object-cover w-full h-full"/>
                        <CardDescription className="text-xl">Accomodations</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>We offer comfortable and convenient accommodation options for you and your guests, ensuring a seamless and enjoyable experience throughout your celebration. The venues are meticulously crafted to offer a perfect blend of sophistication and charm.</p>
                    </CardContent>
                </Card>             
                <Card className="mx-4">
                    <CardHeader className="items-center justify-center">
                        <Image alt="" src={PhotoGrapherCard} className="object-cover w-full h-full"/>
                        <CardDescription className="text-xl">Photographers</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Elevate your wedding experience with team of skilled photographers who specialize in capturing the essence of your special day.We believe that every moment is a memory in the making, and they are dedicated to preserving those cherished moments.</p>
                    </CardContent>
                </Card>             
                <Card className="mx-4">
                    <CardHeader className="items-center justify-center">
                        <Image alt="" src={DJCard} className="object-cover max-h-fit w-full h-full"/>
                        <CardDescription className="text-xl">DJ's</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Transform your wedding into an unforgettable party with professional DJ's. They specialize in creating the right atmosphere, blending the latest hits with classic tunes to keep your dance floor alive and your guests entertained.Trust Us!!</p>
                    </CardContent>
                </Card>
            </div>          
        </div>
     );
}
 
export default ServicesOffered;
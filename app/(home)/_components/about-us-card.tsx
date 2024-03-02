import Image from "next/image";
import AboutUs from "@/assets/AboutUsCard.jpg"

const AboutUsCard = () => {
    return ( 
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 p-4 bg-orange-600 m-4">
            <div className="bg-orange-600 flex ">
                <Image alt="" src={AboutUs} className="object-cover"/>
            </div>
            <div>
                <div className="flex flex-col justify-between pr-0 leading-normal">
                    <h2 className="mb-4 text-6xl font-bold tracking-tight text-gray-900 ">Who are we??</h2>
                    <p className="font-normal text-white">
                    Welcome to Matrimony Mall, where dreams come to life and love takes center stage. We are passionate about creating magical moments 
                    and simplifying the journey to 'I do.' At Matrimony Mall, we understand that planning a wedding can be both exciting and overwhelming. 
                    That's why we've curated a one-stop destination, bringing together a team of dedicated experts and a curated selection of products and services 
                    to ensure your wedding day is nothing short of perfection. With a commitment to exceptional quality, personalized service, and a touch of creativity, 
                    we strive to make your wedding planning experience seamless and enjoyable. From exquisite bridal attire to elegant decor, thoughtful invitations, 
                    and beyond, we're here to transform your vision into reality. Let us be a part of your love story and make your wedding day as unique and beautiful as
                    your journey together. Your happily ever after begins here at Matrimony Mall."
                    </p>
                </div>
            </div>
        </div>
     );
}
 
export default AboutUsCard;
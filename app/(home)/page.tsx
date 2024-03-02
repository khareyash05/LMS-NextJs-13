import AboutUsCard from "./_components/about-us-card";
import ContactUs from "./_components/contact-us";
import Hero from "./_components/hero";
import ServicesOffered from "./_components/services-offered";

export default function Home() {
  return (
      <div>
        <Hero/>
        <AboutUsCard/>
        <ServicesOffered/>
        <ContactUs/>
      </div>
  );
}

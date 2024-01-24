import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ContactUs = () => {
    return ( 
        <section className="bg-orange-600">
            <div className="py-1 lg:py-8 px-4 mx-auto max-w-screen-md m-4">
                <h2 className="mb-4 text-6xl font-bold tracking-tight text-gray-900 ">Contact Us</h2>
                <p className="mb-8 lg:mb-16 font-light text-center text-white sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
                <form action="#" className="space-y-8">
                    <div>
                        <Label>Your Email</Label>
                        <Input type="email" id="email"  placeholder = "john.doe@gmail.com" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" />                        
                    </div>
                    <div>
                        <Label>Subject</Label>
                        <Input id="subject"  placeholder = "Give us a brief" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" />                        
                    </div>
                    <div className="sm:col-span-2">
                        <Label>Message</Label>
                        <Textarea/>
                    </div>
                    <Button>Submit</Button>
                </form>
            </div>
        </section>
     );
}
 
export default ContactUs;
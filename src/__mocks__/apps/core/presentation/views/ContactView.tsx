import TheFooter from '@/lib/components/footer/footer'
import NavBar from '@/lib/components/navBar/navBar'
import location from "@/assets/location.png"
import about from "@/assets/contact.png"
import instagram from "@/assets/insta.png"
import twitter from "@/assets/twitter.png"
import facebook from "@/assets/Facebook.png"
import youtube from "@/assets/YouTube.png"
import mark from "@/assets/Mark.png"
import phone from "@/assets/Phone.png"
import email from "@/assets/Email.png"


export default function ContactView() {
  return (
    <div>
        <div className='lg:pr-10 lg:pl-16 '>
            <NavBar isDark={true} />
        </div>

        <div className="max-w-[1280px] m-auto px-6 lg:p-4 lg:px-16 font-Lato">
            <p className='mt-4 mb-4 lg:mb-14 text-2xl lg:text-4xl font-Lato font-medium'>Contact</p>
            <div className='flex flex-col lg:flex-row justify-between'>
                <div className='w-full lg:w-1/2 lg:mr-28'>
                    <img className='w-full h-96 lg:h-min shadow-md object-cover lg:object-cover' src={about} />
                </div>
                <div className='w-full lg:w-1/2 mt-9 lg:mt-0'>
                    <p className='mb-2 lg:mb-3 text-2xl lg:text-4xl font-Lato font-light'>Post Gallery</p>
                    <p className='text-xl font-light'> 
                        Ethiopian Skylight Hotel, Skylight Mall <br/>
                        Addis Ababa, Ethiopia<br/>
                        Monday - Sunday, 08:00 hours to 20:00 hours<br/>
                        Tel: +251 911630817<br/>
                        Info@post-gallery.com
                    </p>
                    <img className='w-full h-96 lg:h-60 mt-6 object-cover lg:object-cover' src={location} />
                    <div className='flex flex-row mt-6'>
                        <div className='w-1/2'>
                            <a href='https://instagram.com/postgalleryet?igshid=MjEwN2IyYWYwYw==' className='flex flex-row align-center mb-3'>
                                <img className='w-7 h-7 object-contain mr-2' src={instagram} />
                                <p className='text-base'>Instagram</p>
                            </a>
                            <div className='flex flex-row align-center mb-3'>
                                <img className='w-7 h-7 object-contain mr-2' src={twitter} />
                                <p className='text-base'>Twitter</p>
                            </div>
                            <a href='https://www.facebook.com/Post-gallery-107223405799949/' className='flex flex-row align-center mb-3'>
                                <img className='w-7 h-7 object-contain mr-2' src={facebook} />
                                <p className='text-base'>Facebook</p>
                            </a>
                            <a href='https://youtube.com/@PostGallery' className='flex flex-row align-center mb-3'>
                                <img className='w-7 h-7 object-contain mr-2' src={youtube} />
                                <p className='text-base'>Youtube</p>
                            </a>
                        </div>
                        <div className='w-1/2'>
                            <div className='flex flex-row align-center mb-3'>
                                <img className='w-7 h-7 object-contain mr-2' src={mark} />
                                <p className='text-base'>Ethiopian Skylight Hotel, Skylight Mall</p>
                            </div>
                            <div className='flex flex-row align-center mb-3'>
                                <img className='w-7 h-7 object-contain mr-2' src={phone} />
                                <p className='text-base'>+251911630817</p>
                            </div>
                            <div className='flex flex-row align-center mb-3'>
                                <img className='w-7 h-7 object-contain mr-2' src={email} />
                                <p className='text-base'>Info@post-gallery.com</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="w-full flex items-center justify-center my-16">
                <div className=" bg-white shadow rounded py-12 lg:px-28 px-8">
                    <p className="md:text-3xl text-xl font-bold leading-7 text-center text-gray-700">Contact us!</p>
                    <div className="md:flex items-center mt-12">
                        <div className="md:w-72 flex flex-col">
                            <label className="text-base font-semibold leading-none text-gray-800">Name</label>
                            <input tabIndex={0} arial-label="Please input name" type="name" className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100" placeholder="Please input  name" />
                        </div>
                        <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
                            <label className="text-base font-semibold leading-none text-gray-800">Email Address</label>
                            <input tabIndex={0} arial-label="Please input email address" type="name" className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100" placeholder="Please input email address" />
                        </div>
                    </div>
                    <div className="md:flex items-center mt-8">
                        <div className="md:w-full flex flex-col">
                            <label className="text-base font-semibold leading-none text-gray-800">Subject</label>
                            <input tabIndex={0} role="input" arial-label="Please input company name" type="name" className="w-full text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100 " placeholder="Please input company name" />
                        </div>

                    </div>
                    <div>
                        <div className="w-full flex flex-col mt-8">
                            <label className="text-base font-semibold leading-none text-gray-800">Message</label>
                            <textarea tabIndex={0} aria-label="leave a message" role="textbox" className="h-36 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100 resize-none" defaultValue={""} />
                        </div>
                    </div>
                    <p className="text-xs leading-3 text-gray-600 mt-4">By clicking submit you agree to our terms of service, privacy policy and how we use data as stated</p>
                    <div className="flex items-center justify-center w-full">
                        <button className="mt-9 text-base font-semibold leading-none text-white py-4 px-10 bg-indigo-700 rounded hover:bg-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none">SUBMIT</button>
                    </div>
                </div>
            </div>
        </div>

        <TheFooter />
    </div>
  )
}

import TheFooter from '@/lib/components/footer/footer'
import NavBar from '@/lib/components/navBar/navBar'
import collection from "@/assets/exhibition.png"
import about from "@/assets/about.jpg"

export default function AboutView() {
  return (
    <div>
        <div className='lg:pr-10 lg:pl-16 '>
            <NavBar isDark={true} />
        </div>
        <div className="max-w-[1280px] m-auto px-6 lg:p-4 lg:px-16 font-Lato">
            <p className='mt-4 mb-2 lg:mb-4 text-2xl lg:text-4xl font-Lato'>About</p>
            <div className='w-full lg:hidden mb-5'>
                <img className='w-full h-96 lg:h-4/5 shadow-md object-cover lg:object-cover' src={about} />
            </div>
            <div className='flex flex-col lg:flex-row justify-between'>
                <div className='w-full lg:w-1/2 lg:mr-20'>
                    <p className='lg:text-xl lg:mb-0 lg:mt-3 lg:leading-[35px] font-light text-justify'>
                    Post Gallery stands as a dynamic testament to the vision of its founder, Frehiwot Demissie, a devoted art enthusiast with a prolific 15-year journey of collaborating with artists and curating exhibitions. Recognizing the boundless reservoir of artistic talents within Ethiopia, Frehiwot Demissie founded Post Gallery with a keen eye on emerging artists. With a passion for fostering creativity and a deep appreciation for the arts, Post Gallery emerges as a vibrant platform that celebrates innovation, diversity, and the ever-evolving expressions of contemporary art in Ethiopia.
                    </p>
                </div>
                <div className='hidden lg:inline lg:w-1/2'>
                    <img className='w-full h-96 lg:h-4/5 shadow-md object-cover lg:object-cover' src={about} />
                </div>
            </div>
        </div>
        <TheFooter />
    </div>
  )
}

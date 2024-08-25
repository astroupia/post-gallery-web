import React, { ReactNode } from 'react'
import bgT from '@/assets/NewsBGT.png'
import bgB from '@/assets/NewsBGB.png'
import insta from '@/assets/insta.png'
import twitter from '@/assets/twitter.png'
import { FieldComponent, FieldComponentProps } from '../form/FieldComponent';
import { AsyncState, AsyncStatus } from '@/lib/state/asyncState'
import ViewModel from '@/lib/viewmodel/viewmodel'
import { TextField } from '@/lib/forms/fields'
import CoreProviders from '@/apps/core/di/coreproviders'
import AsyncViewModel from '@/lib/viewmodel/asyncViewModel'
import NewsLetterSubscription from '@/apps/core/data/models/newsLetterSubscription'
import email from "@/assets/Email.png"
import phone from "@/assets/Phone.png"
import mark from "@/assets/Mark.png"
import face from "@/assets/Facebook.png"
import link from "@/assets/LinkedIn.png"
import youtube from "@/assets/YouTube.png"
import mface from "@/assets/FacebookM.png"
import mtwit from "@/assets/TwitterM.png"
import mlink from "@/assets/LinkedInM.png"
import minsta from "@/assets/InstagramM.png"
import myout from "@/assets/YouTubeM.png"
import { Link } from 'react-router-dom'


class FooterState extends AsyncState{

    field: TextField = new TextField();

}


class FooterViewModel extends AsyncViewModel<FooterState>{

    private repository = CoreProviders.provideNewsLetterSubscriptoinRepository(); 

    public async subscribe(){

        this.asyncCall(async () => {
            if(await this.state.field.isValid()){
                this.repository.create(new NewsLetterSubscription(this.state.field.getValue()!))
            }
        })

    }

}


export default class TheFooter extends React.Component<any, FooterState>{

    private viewModel: FooterViewModel;

    constructor(props: any){
        super(props);
        this.state = new FooterState()
        this.viewModel = new FooterViewModel(this.state, this.setState.bind(this));
    }

    render(): React.ReactNode {
        return (
            <div>
                <div className='hidden lg:inline pb-4 max-w-[1280px] '>
                    <div className="w-full border-b-[1px] border-[#D9DBE9]"></div>
                    <div className='flex flex-row items-center justify-between  max-w-[1280px] m-auto'>
                    
                        <div className='w-1/2 max-w-xl p-12'>
                            <div className="w-full flex justify-end">
                                <img className='w-24' src={bgT} />
                            </div>
                            <div className="w-full flex flex-col items-center justify-center my-2">
                                <div className='w-full pl-12'>
                                    <p className='font-bold text-xs'>GET OUR WEEKLY</p>
                                    <p className='font-bold text-3xl'>NEWSLETTER</p>
                                    <p className='text-2xl text-[#B7B7B7]'>Get weekly updates </p>
                                    <p className='text-2xl font-semibold'>Subscribe Now!</p>
                                    <div className="w-full max-w-md mt-5 flex flex-row">
                                        <input className="w-full rounded-l-md h-9 text-black pl-3 border-r-0 border-[#B7B7B7] border-2 lg:h-9 placeholder-[#B7B7B7] " type="text" placeholder='Email'
                                            onChange={(event)=> [
                                                this.state.field.setValue(event.target.value)
                                            ]}
                                        />
                                        <div className='flex justify-center items-center bg-black text-white rounded-r-md px-3' onClick={() => {this.viewModel.subscribe()}}>
                                            <button className="font-bold">
                                                {
                                                    (this.state.status === AsyncStatus.loading)?
                                                    "SUBSCRIBING...":
                                                    (this.state.status === AsyncStatus.done)?
                                                    "SUBSCRIBED":
                                                    "SUBSCRIBE"
                                                }
                                            </button>
                                        </div>
                                    </div>
                                    <p className='mt-2 italic text-center text-[#B7B7B7] font-bold text-xs'>Your email is safe with us, we don't spam.</p>
                                </div>
                            </div>
                            <div className="w-full flex justify-start">
                                <img className='w-12' src={bgB} />
                            </div>
                        </div>
                        <div className='w-1/2 flex-row align-end justify-between hidden lg:flex font-Lato'>
                            <div className='w-1/2 flex flex-col space-y-3'>
                                <p className='text-xl font-bold text-[#170F49] mb-6'>Services</p>
                                <Link to="/artists" className='text-lg text-[#6F6C90]'>Artworks</Link>
                                <Link to="/search" className='text-lg text-[#6F6C90]'>Inquiries</Link>
                                <Link to="/artfairs" className='text-lg text-[#6F6C90]'>Art Fair</Link>
                                <Link to="/blogs" className='text-lg text-[#6F6C90]'>Blogs</Link>
                                
                            </div>
                            <div className='w-1/2 flex flex-col space-y-3'>
                                <p className='text-xl font-bold text-[#170F49] mb-6'>Company</p>
                                <Link to="/about" className='text-lg text-[#6F6C90]'>About</Link>
                                <Link to="/contact" className='text-lg text-[#6F6C90]'>Contact Us</Link>
                                <Link to="/artists" className='text-lg text-[#6F6C90]'>Artist</Link>
                                <Link to="/presses" className='text-lg text-[#6F6C90]'>Press</Link>
                                
                            </div>
                            <div className='w-1/2 flex flex-col space-y-3'>
                                <p className='text-xl font-bold text-[#170F49] mb-6'>Support</p>
                                <Link to="/auth/signup/" className='text-lg text-[#6F6C90]'>Getting started</Link>
                                
                                <Link to="/contact"  className='text-lg text-[#6F6C90]'>Messsage support</Link>
                            </div>
                        </div>
                        
                    </div>       
                    <div className='px-10 mb-2 max-w-[1280px] m-auto'><LineWithWidth10 /></div>
                    <div className='flex flex-row mb-3 justify-between px-14 max-w-[1280px] m-auto'>
                        <div className='flex flex-row'>
                            <p className='text-lg text-[#6F6C90] mr-16'>COPYRIGHT © 2023 POST GALLERY</p>
                            {/* <p className='text-lg text-[#6F6C90] underline'>SITE BY <span className='text-black text-md' style={{fontFamily: "playlist"}}> zenon-X</span></p> */}
                        </div>
                        <div className='flex flex-row items-center space-x-3 '>
                            <a href='https://www.facebook.com/Post-gallery-107223405799949/'><img className='w-5 h-5 object-contain' src={face} /></a>
                            <a href='https://youtube.com/@PostGallery'><img className='w-6 h-6 object-contain' src={youtube} /></a>
                            <a href='https://instagram.com/postgalleryet?igshid=MjEwN2IyYWYwYw=='><img className='w-5 h-5 object-contain' src={insta} /></a>
                            
                        </div>
                    </div>
                </div>
                <div className='lg:hidden'>

                    <div className='flex flex-col py-10 px-6'>
                        <p className='text-xl font-semibold text-[#170F49] mb-8'>Contacts us</p>
                        <div className='flex flex-row mb-3'>
                            <img className='w-5 object-contain mr-3' src={email} />
                            <p className='text-lg text-[#6F6C90] '>Info@post-gallery.com</p>
                        </div>
                        <div className='flex flex-row mb-3'>
                            <img className='w-5 object-contain mr-3' src={phone} />
                            <p className='text-lg text-[#6F6C90] '>+251911630817</p>
                        </div>
                        <div className='flex flex-row mb-3'>
                            <img className='w-5 object-contain mr-3' src={mark} />
                            <p className='text-lg text-[#6F6C90] '>Ethiopian Skylight Hotel, Skylight Mall, Bole, Addis Ababa, Ethiopia</p>
                        </div>
                        
                        <div className='flex flex-row items-center space-x-3 mt-3'>
                            <a href='https://www.facebook.com/Post-gallery-107223405799949/'><img className='w-5 h-5 object-contain' src={face} /></a>
                            <a href='https://instagram.com/postgalleryet?igshid=MjEwN2IyYWYwYw=='><img className='w-5 h-5 object-contain' src={insta} /></a>
                            <a href='https://youtube.com/@PostGallery'><img className='w-6 h-5 object-contain' src={youtube} /></a>
                        </div>
                        <div className="w-full border-b border-[#D9DBE9] my-3"></div>
                        
                        <div className="flex">
                            <p className='text-sm text-[#6F6C90] mr-auto'>COPYRIGHT © 2023 POST GALLERY</p>
                            {/* <span className='text-[#6F6C90] underline'>SITE BY <span className="text-black" style={{"fontFamily": "playlist"}}>zenon-X</span></span> */}
                        </div>
                    </div>
                </div>
            </div>
          )
    }

}

// export default function TheFooter() {
//   return (
//     <div>
//         <div className='hidden lg:inline pb-4'>
//             <div className='flex flex-row items-center justify-between'>
//             <div className='px-10 my-4'><LineWithWidth10 /></div>
//                 <div className='w-1/2 max-w-xl p-12'>
//                     <div className="w-full flex justify-end">
//                         <img className='w-24' src={bgT} />
//                     </div>
//                     <div className="w-full flex flex-col items-center justify-center my-2">
//                         <div className='w-full pl-12'>
//                             <p className='font-bold text-xs'>GET OUR WEEKLY</p>
//                             <p className='font-bold text-3xl'>NEWSLETTER</p>
//                             <p className='text-2xl text-[#B7B7B7]'>Get weekly updates </p>
//                             <p className='text-2xl font-semibold'>Subscribe Now!</p>
//                             <div className="w-full max-w-md mt-5 flex flex-row">
//                                 <input className="w-full rounded-l-md h-9 text-black pl-3 border-r-0 border-[#B7B7B7] border-2 lg:h-9 placeholder-[#B7B7B7] " type="text" placeholder='Email'/>
//                                 <div className='flex justify-center items-center bg-black text-white rounded-r-md px-3'>
//                                     <button className="font-bold">SUBSCRIBE</button>
//                                 </div>
//                             </div>
//                             <p className='mt-2 italic text-center text-[#B7B7B7] font-bold text-xs'>Your email is safe with us, we dont spam.</p>
//                         </div>
//                     </div>
//                     <div className="w-full flex justify-start">
//                         <img className='w-12' src={bgB} />
//                     </div>
//                 </div>
//                 <div className='w-1/2 flex flex-row justify-between'>
//                     <div className='w-1/2 flex flex-col space-y-3'>
//                         <p className='text-xl font-bold text-[#170F49] mb-6'>Products</p>
//                         <p className='text-lg text-[#6F6C90]'>Features</p>
//                         <p className='text-lg text-[#6F6C90]'>Pricing</p>
//                         <p className='text-lg text-[#6F6C90]'>Case studies</p>
//                         <p className='text-lg text-[#6F6C90]'>Reviews</p>
//                         <p className='text-lg text-[#6F6C90]'>Updates</p>
//                     </div>
//                     <div className='w-1/2 flex flex-col space-y-3'>
//                         <p className='text-xl font-bold text-[#170F49] mb-6'>Company</p>
//                         <p className='text-lg text-[#6F6C90]'>About</p>
//                         <p className='text-lg text-[#6F6C90]'>Contact us</p>
//                         <p className='text-lg text-[#6F6C90]'>Careers</p>
//                         <p className='text-lg text-[#6F6C90]'>Culture</p>
//                         <p className='text-lg text-[#6F6C90]'>Blog</p>
//                     </div>
//                     <div className='w-1/2 flex flex-col space-y-3'>
//                         <p className='text-xl font-bold text-[#170F49] mb-6'>Support</p>
//                         <p className='text-lg text-[#6F6C90]'>Getting started</p>
//                         <p className='text-lg text-[#6F6C90]'>Help center</p>
//                         <p className='text-lg text-[#6F6C90]'>Server status</p>
//                         <p className='text-lg text-[#6F6C90]'>Report a bug</p>
//                         <p className='text-lg text-[#6F6C90]'>Chat support</p>
//                     </div>
//                 </div>
                
//             </div>       
//             <div className='px-10 my-4'><LineWithWidth10 /></div>
//             <div className='flex flex-row justify-between px-14'>
//                 <div className='flex flex-row'>
//                     <p className='text-lg text-[#6F6C90] mr-16'>COPYRIGHT © 2023 POST GALLERY</p>
//                     <p className='text-lg text-[#6F6C90] underline'>SITE BY <span className='text-black text-md'> zenon-X</span></p>
//                 </div>
//                 <div className='flex flex-row  space-x-6'>
//                     <img className='w-5 h-5' src={insta} />
//                     <img className='w-5 h-5' src={twitter} />
//                     <img className='w-5 h-5' src={insta} />
//                 </div>
//             </div>
//         </div>
//         <div className='lg:hidden'>
//             <div className='w-full max-w-xl p-4'>
//                 <div className="w-full flex justify-end">
//                     <img className='w-24' src={bgT} />
//                 </div>
//                 <div className="w-full flex flex-col items-center justify-center my-2">
//                     <div className='w-full pl-12'>
//                         <p className='font-bold text-xs'>GET OUR WEEKLY</p>
//                         <p className='font-bold text-3xl'>NEWSLETTER</p>
//                         <p className='text-2xl text-[#B7B7B7]'>Get weekly updates </p>
//                         <p className='text-2xl font-semibold'>Subscribe Now!</p>
//                         <div className="w-full max-w-md mt-5 flex flex-row">
//                             <input className="w-full rounded-l-md h-9 text-black pl-3 border-r-0 border-[#B7B7B7] border-2 lg:h-9 placeholder-[#B7B7B7] " type="text" placeholder='Email'/>
//                             <div className='flex justify-center items-center bg-black text-white rounded-r-md px-3'>
//                                 <button className="font-bold">SUBSCRIBE</button>
//                             </div>
//                         </div>
//                         <p className='mt-2 italic text-center text-[#B7B7B7] font-bold text-xs'>Your email is safe with us, we dont spam.</p>
//                     </div>
//                 </div>
//                 <div className="w-full flex justify-start">
//                     <img className='w-12' src={bgB} />
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }


  

const LineWithWidth10 = () => {
	return (
	  <div className="w-full border-b-2 border-[#D9DBE9]"></div>
	);
  };

  const footerNav = () => {
	return (
	  <div className="w-full flex flex-col">
        <p></p>
      </div>
	);
  };

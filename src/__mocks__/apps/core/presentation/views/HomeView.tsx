import ViewModelView from "@/lib/components/views/ViewModelView";
import NavBar from "@/lib/components/navBar/navBar";
import TheFooter from "@/lib/components/footer/footer";
import React from "react";
import back from '@/assets/backWhite.png'
import next from '@/assets/nextWhite.png'
import bgT from '@/assets/NewsBGT.png'
import bgB from '@/assets/NewsBGB.png'
import HomeState from "@/apps/core/application/state/homeState";
import HomeViewModel from "@/apps/core/application/viewmodels/homeViewModel";


export default class HomeView extends ViewModelView<HomeViewModel, any, HomeState> {
    
	onCreateViewModel(state: HomeState): HomeViewModel {
        return new HomeViewModel(state, this.setState.bind(this))
    }

    onCreateState(): HomeState {
        return new HomeState();
    }

	nextSlide = () => {
		const newIndex = (this.state.slideState.slideIndex + 1) % this.state.images!.length;
		this.setState({
			...this.state,
			slideState: {
				...this.state.slideState,
				slideIndex: newIndex,
				bgImage: this.state.images![newIndex]
			}
		});
		console.log(this.state);
	}

	prevSlide = () => {
		const newIndex = this.state.slideState.slideIndex > 0 ? this.state.slideState.slideIndex - 1 : this.state.images!.length - 1;
		this.setState({
			...this.state,
			slideState: {
				...this.state.slideState,
				slideIndex: newIndex,
				bgImage: this.state.images![newIndex]
			}
		});
	}

    onCreateMain(): React.ReactNode {
		console.log('Rendering with bgImage:', this.state.slideState.bgImage);
        return (
            <div>
                <div>
                    <div className="flex w-full min-h-screen bg-no-repeat bg-cover" style={{ backgroundImage: `url(${this.state.slideState.bgImage})` }}>
                        <div className="w-full min-h-screen flex flex-col justify-between  lg:pl-12 2xl:pr-12" style={{ background: 'linear-gradient(1.6deg, rgba(0, 0, 0, 0.5) 1.45%, rgba(0, 0, 0, 0) 69%), linear-gradient(182deg, rgba(0, 0, 0, 0.5) 2%, rgba(0, 0, 0, 0) 70%)'}}>
                            <NavBar isDark={false} /> 
							<div className="flex flex-row justify-between items-center">
								<div className="text-white mb-6 pl-4">
									<p className="text-3xl font-[340] lg:text-[3.55rem]  ">{this.state.exhibition?.name}</p>
									
									<p className="text-xl font-[370] lg:text-[1.67 rem] leading-[2.5rem] ">{
									this.state.exhibition?.dateRange.startDate.toLocaleString('default', {day: "numeric", month: "short"})} - {this.state.exhibition?.dateRange.endDate.toLocaleString('default', {day: "numeric", month: "short"})}</p>
								</div>
								<div className=" flex flex-row justify-between items-center pr-8 lg:pr-14">
									<button onClick={this.nextSlide}>
										<img className="mr-8 lg:mr-12 w-3 h-6 lg:w-5 lg:h-8" src={back} />
									</button>
									<button onClick={this.prevSlide}>
										<img className="w-3 h-6 lg:w-5 lg:h-8" src={next} />
									</button>
								</div>
							</div>
                        </div>
                    </div>
                    <div className="hidden lg:inline">
						<TheFooter />
					</div>
					<div className='lg:hidden w-full max-w-xl mt-5 p-4'>
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
                                    <input className="w-full rounded-l-md h-9 text-black pl-3 border-r-0 border-[#B7B7B7] border-2 lg:h-9 placeholder-[#B7B7B7] " type="text" placeholder='Email'/>
                                    <div className='flex justify-center items-center bg-black text-white rounded-r-md px-3'>
                                        <button className="font-bold">SUBSCRIBE</button>
                                    </div>
                                </div>
                                <p className='mt-2 italic text-center text-[#B7B7B7] font-bold text-xs'>Your email is safe with us, we dont spam.</p>
                            </div>
                        </div>
                        <div className="w-full flex justify-start">
                            <img className='w-12' src={bgB} />
                        </div>
                    </div>
                </div>
            </div>
        )
	}

}

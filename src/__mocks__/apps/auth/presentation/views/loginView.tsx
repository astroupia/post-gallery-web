import LoginState from "@/apps/auth/application/states/loginState";
import LoginViewModel from "@/apps/auth/application/viewmodels/loginViewModel";
import TextFieldComponent from "@/lib/components/form/TextFieldComponent";
import { AsyncStatus } from "@/lib/state/asyncState";
import React, { FormEvent } from "react";
import { Navigate } from "react-router-dom";
import Google from '@/assets/Google.png'
import PGLogin from '@/assets/PGLogin.png'
import StatusToast from "@/lib/components/status/StatusToast";



const images = [
	'https://firebasestorage.googleapis.com/v0/b/post-gallery-a8462.appspot.com/o/bIMG_5265.jpg?alt=media&token=1958f2d8-1ed3-4cbf-bce3-3c1219e6245f',
	'https://firebasestorage.googleapis.com/v0/b/post-gallery-a8462.appspot.com/o/bphoto_2023-06-24_15-12-34.jpg?alt=media&token=5297ae81-6740-4bc7-9884-58d5a6553f1f',
	'https://firebasestorage.googleapis.com/v0/b/post-gallery-a8462.appspot.com/o/bIMG_5253.jpg?alt=media&token=a6896601-5c4c-45f7-9d56-01c61b4c2c76'
];

class SlideState {
    slideIndex: number;
    bgImage: string;

    constructor() {
        this.slideIndex = 0;
        this.bgImage = '';
    }
}


class HomeViewState extends LoginState {
    slideState: SlideState;

    constructor() {
        super();  // initialize BaseState
        this.slideState = new SlideState();  // initialize SlideState
    }
}

export default class LoginView extends React.Component<any, HomeViewState>{

	private viewModel: LoginViewModel;
	private slideInterval: NodeJS.Timeout | undefined;
	private redirectTo: string;

	constructor(props: any){
		super(props);
		this.state = new LoginState();
		this.viewModel = new LoginViewModel(this.state, this.setState.bind(this))
		this.redirectTo = (new URLSearchParams(document.location.search)).get("redirect") ?? "/search"
	}

	componentDidMount() {
		this.slideInterval = setInterval(this.nextSlide, 5000);
	}

	componentWillUnmount() {
		if(this.slideInterval) {
			clearInterval(this.slideInterval);
		}
	}

	private handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		this.viewModel.signInWithPG();
	} 

	private handleLoginWithGoogle = () => {
		this.viewModel.signInWithGoogle()
	}

	onCreateState(): HomeViewState {
        const state = new HomeViewState();
        state.slideState.slideIndex = 0;
        state.slideState.bgImage = images[0];
        return state;
    }

	nextSlide = () => {
		const newIndex = (this.state.slideState.slideIndex + 1) % images.length;
		this.setState({
			...this.state,
			slideState: {
				...this.state.slideState,
				slideIndex: newIndex,
				bgImage: images[newIndex]
			}
		});
		console.log(this.state);
	}

	prevSlide = () => {
		const newIndex = this.state.slideState.slideIndex > 0 ? this.state.slideState.slideIndex - 1 : images.length - 1;
		this.setState({
			...this.state,
			slideState: {
				...this.state.slideState,
				slideIndex: newIndex,
				bgImage: images[newIndex]
			}
		});
	}

	render(): React.ReactNode {
		if(this.state.status === AsyncStatus.done){
			return (<Navigate to={this.redirectTo} />)
		}
		return (
			<div className="bg-[url('./assets/LoginRegisterBG.png')] bg-center bg-cover min-h-screen w-screen text-white">
				<div className="lg:hidden p-6">
					<a href="/" className="text-6xl font-semibold">PG</a>
					<p className="text-6xl font-medium mt-8">WELCOME</p>
					<p className="text-3xl font-normal leading-6 ">TO POST GALLERY</p>
					<p className="text-xl font-light">Login to your post gallery account</p>
					<p className="text-4xl font-regular py-2.5">Sign In</p>
					<form onSubmit={this.handleSubmit}>
						
						
						{(this.state.error?.message)}
						<p className="text-xl">Email:</p> <TextFieldComponent field={this.state.form.email} syncer={this.viewModel.syncState}/>
						<div className="h-4"></div>
						<p className="text-xl">Password:</p> <TextFieldComponent field={this.state.form.password} syncer={this.viewModel.syncState}/>
						<p className="text-lg font-normal pt-2.5">Show password</p>
						<div className="flex flex-row justify-center text-center pt-2.5">
							<p className="text-lg font-normal text-[#E1E1E1]">Doesn’t have an account? </p>
							<a href="/auth/signup"><p className="text-lg font-medium">Create Account</p></a>
						</div>
						<button className="flex flex-row justify-center items-center w-56 m-auto mb-6 mt-36 pt-2 pb-2.5 bg-white text-black rounded-full">
							<div className="justify-center text-2xl">Continue</div>
						</button>
					</form>
				</div>

				{/* --------------------------- */}

				<div className="hidden lg:flex lg:flex-row ">
					
					{/* Left */}
					<div className="w-6/12 min-h-screen flex items-center justify-center bg-center bg-cover " style={{ backgroundImage: `url(${this.state.slideState.bgImage})` }}>
						<div style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(20px)' }} className="w-4/6 max-w-lg px-9 py-6 rounded-2xl " >	
							<a href="/" className="text-6xl pb-2 font-semibold w-5/12 border-b-2 border-white">PG</a>	
							<p className="mt-4 text-2xl font-medium leading-[28px]">Step into a world of imagination and inspiration, where every stroke of the brush and every splash of color tells a story - come and experience the breathtaking beauty of creativity at our art gallery</p>
							
							<button className="mx-auto flex flex-row justify-center items-center h-16 w-full  mt-8 bg-black rounded-full" onClick={this.handleLoginWithGoogle}>
								<img className="h-8 pr-3.5 bg-contain" src={Google} />		
								<div className="font-medium text-2xl text-center" >Continue with Google</div>
							</button>
							<div className="flex flex-row items-center justify-center my-3 " >
								<LineWithWidth10 />
								<p className="font-medium text-xl px-3">Or</p>
								<LineWithWidth10 />
							</div>
		
							<button className="mx-auto flex flex-row justify-center items-center h-16 w-full mt-5 bg-white rounded-full">
								<img className="h-8 pr-3.5 bg-contain" src={PGLogin} />		
								<div className="font-medium text-2xl text-center text-black" >PostGallary Account</div>
							</button>

						</div>
					</div>

					{/* Right */}

					<div className="w-6/12 min-h-screen py-3.5 px-16 flex flex-col items-start justify-center bg-white text-black">
						<p className="text-6xl font-semibold ">WELCOME</p>
						<p className="text-5xl font-medium ">TO POST GALLERY</p>
						<p className="text-4xl mt-2 ">SignIn</p>
						<StatusToast asyncState={this.state} errorText={"Incorrect email or password."} />
						<form className="w-full" onSubmit={this.handleSubmit}>

							<p className="text-xl mt-2.5">Email:</p> <TextFieldComponent field={this.state.form.email} syncer={this.viewModel.syncState}/>
							<p className="text-xl mt-2.5">Password:</p> <TextFieldComponent field={this.state.form.password} syncer={this.viewModel.syncState}/>
							<div className="flex flex-row justify-center text-center pt-6">
								<p className="text-2xl font-normal text-[#9b9b9b]">I dont have an account? </p>
								<p className="text-2xl font-medium"><a href="/auth/signup">Create account</a></p>
							</div>
							<button className="flex justify-center items-center w-56 m-auto mt-4 h-16 bg-black text-white rounded-full">
								<div className="justify-center text-2xl">Continue</div>
							</button>
					</form>
					</div>
				</div>

			</div>
		)

	}



}

const LineWithWidth10 = () => {
	return (
	  <div className="w-full border-b-2 border-white"></div>
	);
  };

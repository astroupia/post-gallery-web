import React, { useState } from 'react'
import PGwhite from '@/assets/PGwhite.png'
import PG from '@/assets/PG.png'
import Menu from '@/assets/menu.png'
import MenuWhite from '@/assets/MenuWhite.png'
import MenuWhit from '@/assets/menu_white.png'
import Close from '@/assets/close.png'
import { Link } from 'react-router-dom';
import ViewModelView from '../views/ViewModelView';
import ViewModel from '@/lib/viewmodel/viewmodel';
import BaseState from '@/lib/state/baseState';
import Account from '@/assets/account.png';
import AccountDark from '@/assets/accountDark.png';


class NavBarState extends BaseState{

	open: boolean = true;
	accountOpen: boolean = false;

}

class NavBarViewModel extends ViewModel<NavBarState>{

	toggleOpen(){
		this.state.open = !this.state.open;
		this.syncState()
	}

	toggleAccoutOpen(){
		this.state.accountOpen = !this.state.accountOpen;
		this.syncState()
	}

}


export interface NavBarProps {
	isDark: boolean;
  }
export default class NavBar extends ViewModelView<NavBarViewModel,NavBarProps, any, NavBarState>{
	
	onCreateViewModel(state: NavBarState): NavBarViewModel{
		return new NavBarViewModel(state, this.setState.bind(this));
	}


	private onCreateBar(clientSection: React.ReactNode): React.ReactNode{
		return (
			<div className="relative ">
			  <div className='hidden lg:flex flex-row items-center justify-between pr-10 pt-10 '>
					<a href="/" className='flex flex-row items-center space-x-10 text-3xl font-medium leading-none'>
						<img className='w-20' src={this.props.isDark ? PG : PGwhite} />
					</a>
					<div className={` ${this.props.isDark ? "text-black" : "text-white"} font-Lato lg:font-medium flex flex-row items-center space-x-6 font-[370] text-xl leading-none`}>
						<Link to="/artists">Artist</Link>
						<Link to="/exhibitions">Exhibition</Link>
						<Link to="/presses">Press</Link>
						<Link to="/artfairs">Art Fair</Link>
						<Link to="/contact">Contact</Link>
				  {
					clientSection					
				  }
				  </div>

			  </div>
			  <div className='lg:hidden pt-10 px-6 flex flex-row items-center justify-between'>
				<a href="/">
					<img className='h-14' src={this.props.isDark ? PG : PGwhite} />
				</a>
				<img  className='h-7 lg:hidden' onClick={() => {this.getViewModel().toggleOpen()}} src={this.state.open && this.props.isDark ? Menu : this.state.open && this.props.isDark ? MenuWhit :  MenuWhit } />
			  </div>
			  <div className={` ${this.state.open ? 'hidden' : 'absolute'} flex flex-col justify-center items-center top-0 text-white text-3xl bg-black w-full h-screen lg:hidden z-10`}>
					<img className='absolute h-7 top-5 right-5' onClick={() => {this.getViewModel().toggleOpen()}} src={MenuWhite} />
					<Link to="/" className="font-Lato font-medium text-end pb-2 ">Home</Link>
					<Link to="/exhibitions" className="font-Lato font-light text-end pb-2 ">Exhibition</Link>
					
					<Link to="/artists" className="font-Lato font-light text-end pb-2 ">Artist</Link>
					<Link to="/blogs" className="font-Lato font-light text-end pb-2 ">Blog</Link>
					<Link to="/artfairs" className="font-Lato font-light text-end pb-2 ">Art Fair</Link>
					<Link to="/contact" className="font-Lato font-light text-end pb-2 ">Contact</Link>
					<Link to="/about" className="font-Lato font-light text-end pb-10 ">About Us</Link>
					{
					clientSection					
				 	}
				</div>
			</div>
	  
		)
	}

	onCreateState(): NavBarState {
		return new NavBarState()
	}

	onCreateLoading(): React.ReactNode {
		return this.onCreateBar(<div className="h-14"></div>)
	}

	onCreateMain(): React.ReactNode {
		return this.onCreateBar(
		<>
		{
					(this.state.context.client === null)?
					(
						<div className={` ${this.props.isDark && window.innerWidth >= 768 ? "text-black border-black" : "text-white border-white"} flex flex-row justify-center items-center w-32 h-10 border-[3px] rounded-full `}>
							<Link  to="/auth/login" className="text-xl hidden lg:flex">Join Us</Link>
							<Link  to="/auth/signup" className="text-xl lg:hidden">Join Us</Link>
						</div>
					):
					(
						<div className='relative'>
							<div className={` ${this.props.isDark && window.innerWidth >= 768 ? "text-black border-black" : "text-white border-white"}  flex flex-row justify-center items-center w-10 h-10 p-1 border-2 rounded-full`}>
								<button onClick={() => this.getViewModel().toggleAccoutOpen()} className="text-2xl"><img className="col-12" src={this.props.isDark && window.innerWidth >= 768  ? AccountDark : Account}/></button>
							</div>
							<div className={`${this.state.accountOpen ? 'absolute' : 'hidden'} flex flex-col px-4 py-1 bg-white mt-4  w-44 right-0 rounded-[12px] shadow-[0px_0px_50px_rgba(0,0,0,0.3)]`}>
								<Link to="/auth/logout/" className=" font-semibold text-lg text-black text-center">LogOut</Link>  
							</div>
						</div>
					)
					
				  }
		</>
		)

	}

}



// export default function NavBar() {

 
// }


// {/*
//         <div className='hidden lg:flex flex-col items-center justify-center pt-10'>
//             <p className='text-7xl mb-4 font-semibold'>POST GALLERY <span className="text-[#D58D01] font-bold">.</span></p>
//             <ul className='flex flex-row justify-between items-center text-4xl font-medium w-full max-w-xl'>
//                 <a href="/auth/login">Exhibition</a>
//                 <a href="/search">Shop</a>
//                 <nav>Contact</nav>
//                 <nav>About</nav>
//             </ul>
//         </div>

// */}
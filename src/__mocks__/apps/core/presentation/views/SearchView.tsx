import SearchState from "@/apps/core/application/state/searchState";
import SearchViewModel from "@/apps/core/application/viewmodels/searchViewModel";
import TextFieldComponent from "@/lib/components/form/TextFieldComponent";
import { AsyncStatus } from "@/lib/state/asyncState";
import React from "react";
import { Link, Navigate } from "react-router-dom";




export default class SearchView extends React.Component<any, SearchState>{

	private searchViewModel: SearchViewModel

	constructor(props: any){
		super(props)
		this.state = new SearchState()
		this.searchViewModel = new SearchViewModel(this.state, this.setState.bind(this))
	}

	handleChange = () => {
		this.searchViewModel.searchId()
	}

	render(): React.ReactNode {
		// if(this.state.result != undefined){
		// 	return <Navigate to={`/artwork/${this.state.result.id}`}/>
		// }
		return (
			<div className=" text-black">
				<div className="lg:hidden px-6 pt-20 pb-6 ">
					<p className="text-6xl ">Search</p>                  
					<p> 
						<span className="text-2xl text-[#4B4B4B]" >Transform your space with the power of art - </span>
						<span className="text-2xl text-[#4B4B4B]  font-semibold" >find yours today!</span>
					</p>
					
					<div>
						<p className="text-2xl mt-4">Art:</p>
						<TextFieldComponent 
						field={this.state.idField} 
						syncer={this.searchViewModel.syncState}
						onChanged={this.handleChange}/>
						{	
							(this.state.status === AsyncStatus.loading)?
							(<p className="mt-2 text-lg text-green-500">Searching....</p>):
							(this.state.status === AsyncStatus.failed)?
							(<p className="mt-2 text-lg text-[#D20000]">{this.state.idField.getValue()} Not Found</p>):
							(this.state.status === AsyncStatus.done)?
							(<div>
								<p className="mt-2 text-lg text-green-500">Artwork Found</p>"
								<button className="bg-stone-500 hover:bg-stone-700 text-white font-bold py-2 px-4 rounded"><Link to={`/artwork/${this.state.result!.id}`}>View</Link></button>
							</div>):
							<></>
						}

					</div>
					<div className="h-4"></div>
					<p className="text-xl text-[#787878] font-normal pt-2.5">Put in the art id of the art your interested in </p>
				</div>

				{/* --------------------------- */}

				<div className="hidden lg:flex lg:flex-row ">

					{/* Left */}
					<div className="w-6/12 min-h-screen flex items-center justify-center bg-[url('./assets/LGBG.png')] bg-center bg-cover text-white">
						<div className="w-4/6 xl:max-w-lg px-4 py-6 bg-[url('./assets/LGRegisterBG.png')] bg-cover bg-no-repeat bg-center rounded-2xl ">	
							<a href="/" className="text-6xl pb-2 font-semibold w-5/12 border-b-2 border-white">PG</a>	
							<p className="mt-4 text-2xl font-medium leading-[28px] ">Discover the magic of art and add a touch of elegance to your home or office. Our art gallery offers a stunning collection of original paintings, sculptures, and prints that are sure to captivate your senses and leave you in awe. Whether you're a seasoned art collector or a first-time buyer, our knowledgeable staff will guide you through the selection process and help you find the perfect piece to suit your taste and budget. Don't miss out on this opportunity to own a piece of art that will inspire you for years to come. Put the art id of the art your interested in and acquire it in a few days.</p>

						</div>
					</div>

					{/* Right */}

					<div className="w-6/12 min-h-screen py-4 px-16 flex flex-col items-start justify-center text-black">
						<div className="">
							<p className="text-8xl ">Search</p>                  
							<p className="max-w-md"> 
								<span className="text-3xl text-[#4B4B4B]" >Transform your space with the power of art - </span>
								<span className="text-3xl text-[#4B4B4B]  font-semibold" >find yours today!</span>
							</p>
							
							<div>
								<p className="text-3xl mt-14">Art:</p>
								<TextFieldComponent 
								field={this.state.idField} 
								syncer={this.searchViewModel.syncState}
								onChanged={this.handleChange}/>
								{	
									(this.state.status === AsyncStatus.loading)?
									(<p className="mt-2 text-xl text-green-500">Searching....</p>):
									(this.state.status === AsyncStatus.failed)?
									(<p className="mt-2 text-xl text-[#D20000]">{this.state.idField.getValue()} Not Found</p>):
									(this.state.status === AsyncStatus.done)?
									(<div>
										<p className="mt-2 text-lg text-blue-500">Artwork Found</p>
										<Link to={`/artwork/${this.state.result!.id}`}>
											<div className="flex justify-center items-center w-64 mt-16 h-16 bg-black text-white rounded-full">
												<button className="justify-center text-3xl">Continue</button>
											</div>
										</Link>
									</div>):
									<></>
								}

							</div>
							<div className="h-4"></div>
							<p className="text-2xl text-[#787878] font-normal pt-2.5">Put in the art id of the art your interested in </p>
						</div>
					</div>
				</div>
			</div>
		)
	}
	
}
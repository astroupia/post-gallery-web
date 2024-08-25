import CheckoutState from "@/apps/core/application/state/checkOutState";
import CheckoutViewModel from "@/apps/core/application/viewmodels/checkoutViewModel";
import TextFieldComponent from "@/lib/components/form/TextFieldComponent";
import React, { ChangeEvent, FC, FormEvent, ReactNode, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Back from '@/assets/back.png'
import CheckOut1 from '@/assets/CheckOut1.png'
import CheckOut2 from '@/assets/CheckOut2.png'
import CheckOut3 from '@/assets/CheckOut3.png'
import CheckOut4 from '@/assets/CheckOut4.png'
import Upload from '@/assets/Upload.png'
import { FieldComponent, FieldComponentProps } from "@/lib/components/form/FieldComponent";
import ViewModelView from "@/lib/components/views/ViewModelView";
import { AsyncStatus } from "@/lib/state/asyncState";
import StatusToast from "@/lib/components/status/StatusToast";
import menu from '@/assets/unsuccesfull.png'


interface CheckoutViewProps{
	artworkId: string
}


export default class CheckOutView extends ViewModelView<CheckoutViewModel, CheckoutViewProps, CheckoutState>{
	
	constructor(props: CheckoutViewProps){
		super(props);
	}

	handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		this.getViewModel().saveShippingInfo();
	}

	handleCheckout = async () => {
		this.getViewModel().checkout()
	}

	onCreateViewModel(state: CheckoutState): CheckoutViewModel {
		return new CheckoutViewModel(state, this.setState.bind(this))
	}

	onCreateState(): CheckoutState {
		let shippingIncluded = new URLSearchParams(window.location.search).get("shipping") != null;
		return new CheckoutState(this.props.artworkId, shippingIncluded);
	}

	onCreateMain(): React.ReactNode {
		if(this.state.status === AsyncStatus.done){
			if(this.state.order!.isOnSite()){
				window.open(this.state.paymentLink, "_self");
				return <><p>You will be directed to the payment portal. If your browser does not automatically click the link below.</p>
				<a href={this.state.paymentLink!}>To Payment Portal</a></>
			}
			return       <div>
							<div className="flex flex-col w-full h-screen justify-center items-center max-w-[1280px] m-auto px-6 lg:p-4 lg:px-16">
								<img className='w-20' src={menu} />
								<p className='py-4 font-Lato text-4xl'>Order placed Successfully.</p>
								<p className='font-Lato w-2/3 text-4xl text-center'>Your order has been requested you'll receive an e-mail once the request is accepted.</p>
								<a href="/" className="h-14 flex justify-center items-center  mt-20 bg-black rounded-3xl">	
									<div className="font-medium text-2xl px-14 text-center text-white" >Go Back</div>
								</a>
							</div>
						</div>
		}
		return (
			<div className="bg-[#F6F6F6] min-h-screen" >
				<div className="bg-white px-6 pt-12 pb-12 lg:hidden">
					<Link to={`/artwork/${this.state.item?.id}`}><img className="h-8 mb-4" src={Back} /></Link>
					<div className="text-4xl font-medium pb-3.5 border-b-2 border-[#CBCACA]">CheckOut</div>

					<p className="text-2xl my-4">Shipping address</p>

					<TextFieldComponents placeholder="First Name*" field={this.state.form.lastName} syncer={this.getViewModel().syncState}/>
					<div className="h-4"></div>
					<TextFieldComponents placeholder="Last name*" field={this.state.form.lastName} syncer={this.getViewModel().syncState}/>
					<div className="h-4"></div>
					<TextFieldComponents placeholder="Address*" field={this.state.form.lastName} syncer={this.getViewModel().syncState}/>
					<div className="h-4"></div>
					<TextFieldComponents placeholder="Address 2" field={this.state.form.lastName} syncer={this.getViewModel().syncState}/>
					<div className="h-4"></div>
					<TextFieldComponents placeholder="Country*" field={this.state.form.lastName} syncer={this.getViewModel().syncState}/>
					<div className="h-4"></div>
					<TextFieldComponents placeholder="City*" field={this.state.form.lastName} syncer={this.getViewModel().syncState}/>
					<div className="h-4"></div>
					<TextFieldComponents placeholder="State/Region*" field={this.state.form.lastName} syncer={this.getViewModel().syncState}/>
					<div className="h-4"></div>
					<TextFieldComponents placeholder="Zip/PostalCode*" field={this.state.form.lastName} syncer={this.getViewModel().syncState}/>
					<div className="h-4"></div>
					<TextFieldComponents placeholder="Phone number*" field={this.state.form.lastName} syncer={this.getViewModel().syncState}/>
                    
                    <button className="flex justify-center items-center w-full m-auto my-6 pt-3 pb-4 bg-black text-white rounded-md">
                        <div className="justify-center text-2xl">Save shipping address</div>
                    </button>
					<p className="text-2xl font-medium ">Estimated Total:</p>

					<div className="mt-2 flex flex-row justify-between text-xl pr-8">
						<p>Art Price: </p>
						<p>{this.state.pricing!.artPrice}</p> 
					</div>
					<div className="flex flex-row justify-between text-xl text-left pr-8">
						<p>Shipping price:</p>
						<p>{this.state.pricing!.artPrice}</p> 
					</div>
					<div className="flex flex-row justify-between text-xl pr-8">
						<p>VAT 15%:  </p>
						<p>{this.state.pricing!.vat}</p>  
					</div>
					<div className="mt-2.5 flex flex-row justify-between text-2xl font-medium pr-8">
						<p>Total price:  </p>
						<p>{this.state.pricing!.artPrice + this.state.pricing!.artPrice + this.state.pricing!.vat}</p>  
					</div>
					<button className="flex justify-center items-center w-full m-auto mt-4 mb-6 pt-3 pb-4 bg-black text-white rounded-md" onClick={this.handleCheckout}>
						<div className="justify-center text-2xl">Place Order</div>
					</button>
                    <div className="flex flex-col justify-center items-start mb-8">
                        <MyComponent imageSrc={CheckOut1} title={"Satisfaction Guaranteed."} subtitle={"An art gallery that satisfies, service that delights."}  />
                        <MyComponent imageSrc={CheckOut2} title={"Safe and Secure shopping."} subtitle={"All payments and transactions are secure and encrypted."}  />
                        <MyComponent imageSrc={CheckOut3} title={"Support An Artist With Every Purchase."} subtitle={"We pay our artists more on every sale than other galleries."}  />
                        <MyComponent imageSrc={CheckOut4} title={"High class customer service"} subtitle={"We deliver world-class customer service to all of our art buyers."}  />
                    </div>    
				</div>

				{/* ------------------------------------------ */}

				<div className="hidden lg:inline lg:px-8">
					<button className="my-8" onClick={() => {history.back()}}><img className="h-8 mx-6" src={Back} /></button>
					
                    <div className="flex flex-row justify-between">
                        <div className="w-5/12 h-min ml-28 px-7 py-9 bg-white">
                            <div className="text-5xl font-medium pb-3 border-b-2 mb-4 border-[#EFEFEF]">CheckOut</div>
							<p className="text-2xl mb-4">Shipping address</p>
							<form className="w-full" onSubmit={this.handleSubmit}>
								<StatusToast asyncState={this.state.shippingInfoState} loadingText="Saving Shipping Address..." errorText={this.state.error?.message}/>
								<div className="flex flex-row">
								<div className="w-full mr-4"><TextFieldComponents placeholder="First Name*" field={this.state.form.firstName} syncer={this.getViewModel().syncState}/></div>
								<div className="w-full"><TextFieldComponents placeholder="Last name*" field={this.state.form.lastName} syncer={this.getViewModel().syncState}/></div>
								</div>
								<div className="h-2"></div>
								<TextFieldComponents placeholder="Address*" field={this.state.form.address} syncer={this.getViewModel().syncState}/>
								<div className="h-2"></div>
								<TextFieldComponents placeholder="Address 2" field={this.state.form.address2} syncer={this.getViewModel().syncState}/>
								<div className="h-2"></div>
								<div className="flex flex-row ">
									<div className="w-full mr-4"><TextFieldComponents placeholder="Country*" field={this.state.form.country} syncer={this.getViewModel().syncState}/></div>
									<div className="w-full"><TextFieldComponents placeholder="City*" field={this.state.form.city} syncer={this.getViewModel().syncState}/></div>
								</div>
								<div className="h-2"></div>
								<div className="flex flex-row">
									<div className="w-full mr-4"><TextFieldComponents placeholder="State/Region*" field={this.state.form.region} syncer={this.getViewModel().syncState}/></div>
									<div className="w-full"><TextFieldComponents placeholder="Zip/PostalCode*" field={this.state.form.zipCode} syncer={this.getViewModel().syncState}/></div>
								</div>
								<div className="h-2"></div>
								<div className="w-full mr-4"><TextFieldComponents placeholder="Phone number*" field={this.state.form.phoneNumber} syncer={this.getViewModel().syncState}/></div>
								<div className="h-4"></div>
								<div className="h-2"></div>
								<div className="w-full mr-4"><TextFieldComponents placeholder="Email*" field={this.state.form.email} syncer={this.getViewModel().syncState}/></div>
								<div className="h-4"></div>
								<button className="flex justify-center items-center w-full max-w-lg m-auto mt-3 mb-3 h-16 bg-black text-white rounded-md  text-2xl" type="submit">Save shipping address</button>

							</form>
                        </div>
                        <div className="bg-white w-2/6 h-min px-8 pb-12 pt-10 mr-12">
							<StatusToast asyncState={this.state} errorText={this.state.error?.message} loadingText="Checking out..."/>
                            <p className="text-3xl font-medium ">Estimated Total:</p>

							<div className="mt-2 flex flex-row justify-between text-xl pr-8">
								<p>Art Price: </p>
								<p>{this.state.pricing?.artPrice} ETB</p> 
							</div>
							<div className="flex flex-row justify-between text-xl text-left pr-8">
								<p>Shipping price:</p>
								<p>{this.state.pricing?.shippingPrice} ETB</p> 
							</div>
							<div className="flex flex-row justify-between text-xl pr-8">
								<p>VAT 15%:  </p>
								<p>{this.state.pricing?.vat} ETB</p> 
							</div>
							<div className="mt-2 flex flex-row justify-between text-3xl font-medium pr-8">
								<p>Total price:  </p>
								<p>{this.state.pricing?.getTotal()} ETB</p> 
							</div>
                            <button className="flex justify-center items-center w-full mt-8 mb-6 h-16 bg-black text-white rounded-md" onClick={this.handleCheckout}>
                                <div className="justify-center text-3xl">Place Order</div>
                            </button>
                            <div className="flex flex-col justify-center items-start">
                                <MyComponent imageSrc={CheckOut1} title={"Satisfaction Guaranteed."} subtitle={"An art gallery that satisfies, service that delights."}  />
                                <MyComponent imageSrc={CheckOut2} title={"Safe and Secure shopping."} subtitle={"All payments and transactions are secure and encrypted."}  />
                                <MyComponent imageSrc={CheckOut3} title={"Support An Artist With Every Purchase."} subtitle={"We pay our artists more on every sale than other galleries."}  />
                                <MyComponent imageSrc={CheckOut4} title={"High class customer service"} subtitle={"We deliver world-class customer service to all of our art buyers."}  />
                            </div>  
                        </div>
                    </div>
				</div>
			</div>
		)
	}	

	
}
type MyComponentProps = {
    imageSrc: string;
    title: string;
    subtitle: string;
  };
  
  const MyComponent: React.FC<MyComponentProps> = ({ imageSrc, title, subtitle }) => {
    return (
      <div className="flex items-start space-x-4 mt-3">
        <img className="w-16 h-16" src={imageSrc} alt="" />
        <div>
          <h2 className="text-2xl font-medium leading-6">{title}</h2>
          <p className="text-base text-[#797979] leading-5">{subtitle}</p>
        </div>
      </div>
    );
  };

interface TextFieldComponentProps extends FieldComponentProps<string> {
  placeholder?: string;
}

class TextFieldComponents extends FieldComponent<string, TextFieldComponentProps>{
  protected constructInputNode(value: string | null, callback: Function): ReactNode {
    return (
      <input className="w-full rounded-md h-14 text-black pl-3 border-[#787878] border-2 lg:h-12 placeholder-[#575757] text-lg" type="text" onChange={(event) => {callback(event.target.value)}} value={(value === null)?"":value} placeholder={this.props.placeholder} />
    )
  }
}


export function RoutedCheckoutView(){

	let params = useParams()
	return <CheckOutView artworkId={params.artworkId!}/>
}
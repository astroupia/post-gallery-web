import SuccessfullView from "@/__mocks__/apps/core/presentation/views/SuccessView";
import OrderDetailState from "@/apps/admin/application/states/orderDetailState";
import OrderDetailViewModel from "@/apps/admin/application/viewmodels/orderDetailViewModel";
import { OrderStatus } from "@/apps/core/data/models/order";
import OrderSerializer from "@/apps/core/data/serializers/orderSerializer";
import StatusToast from "@/lib/components/status/StatusToast";
import ViewModelView from "@/lib/components/views/ViewModelView";
import { AsyncStatus } from "@/lib/state/asyncState";
import { ReactNode } from "react";
import { useParams } from "react-router-dom";



interface OrderDetailViewProps{
	orderId: string;
}


export default class OrderDetailView extends ViewModelView<OrderDetailViewModel, OrderDetailViewProps, OrderDetailState>{
	
	onCreateViewModel(state: OrderDetailState): OrderDetailViewModel {
		return new OrderDetailViewModel(state, this.setState.bind(this));
	}
	
	onCreateState(): OrderDetailState {
		return new OrderDetailState(this.props.orderId);
	}


	onCreateMain(): ReactNode {
		if(this.state.decisionState.status === AsyncStatus.done){

			let title: string, subTitle: string;
			switch(this.state.order!.status){
				
				case OrderStatus.accepted:
					title = "Order Accepted";
					subTitle = "Order has been accepted succesfully. The client will receive an e-mail with directions to proceed."
					break;
				
				case OrderStatus.rejected:
					title = "Order Rejected";
					subTitle = "Order has been rejected."
					break;
				
				default:
					title = "Order Shipment Confirmed";
					subTitle = "Order shipment has been confirmed successfully. The client will receive an e-mail to notify them."
					break;

			}

			return <SuccessfullView title={title} subTitle={subTitle}/>			
		}

		return (
		<div>
			<StatusToast asyncState={this.state.decisionState} />
			<p className='text-2xl font-Lato mb-5'>Request</p> 
			<div className="flex flex-col lg:flex-row justify-between items-start mb-5">

				<div className="w-full lg:w-5/12">
					<p className="text-4xl font-medium border-b-2 border-[#BCBCBC]">Checkout</p>
					<div className="ml-4 mt-4">
					<p className="text-3xl">Shipping Address:</p>
						{
							this.state.order!.isOnSite()?
							(<p className="text-3xl">On Site</p>):
							<>
						<div className="flex flex-row justify-between mt-4">
							<div>
								<p className="text-[#575757] leading-4">First Name</p>
								<p className="text-xl font-medium">{this.state.order!.client!.fullName.split(" ")[0]}</p>
							</div>
							<div>
								<p className="text-[#575757] leading-4">Last Name</p>
								<p className="text-xl font-medium">{this.state.order!.client!.fullName.split(" ")[1]}</p>
							</div>
						</div>
						<div className="flex flex-row justify-between mt-4">
							<div>
								<p className="text-[#575757] leading-4">Address Description</p>
								<p className="text-xl font-medium">{this.state.order!.shippingInfo?.address} || { this.state.order!.shippingInfo?.address2??""}</p>
							</div>
						</div>
						<div className="flex flex-row justify-between mt-4">
							<div>
								<p className="text-[#575757] leading-4">Country</p>
								<p className="text-xl font-medium">{this.state.order!.shippingInfo!.country}</p>
							</div>
							<div>
								<p className="text-[#575757] leading-4">City</p>
								<p className="text-xl font-medium">{this.state.order!.client!.fullName.split(" ")[1]}</p>
							</div>
						</div>
						<div className="flex flex-row justify-between mt-4">
							<div>
								<p className="text-[#575757] leading-4">State/Region</p>
								<p className="text-xl font-medium">{this.state.order!.shippingInfo?.region}</p>
							</div>
						</div>
						<div className="flex flex-row justify-between mt-4">
							<div>
								<p className="text-[#575757] leading-4">Phone Number</p>
								<p className="text-xl font-medium">{this.state.order!.shippingInfo?.phoneNumber}</p>
							</div>
							<div>
								<p className="text-[#575757] leading-4">E-Mail</p>
								<p className="text-xl font-medium">{this.state.order!.client!.email}</p>
							</div>
						</div>
						</>
						}
						
					</div>
					<div className="">
						<p className='text-2xl font-Lato mt-10 mb-5'>Estimated Total:</p> 
						<div className="flex flex-row justify-between text-base pr-8">
							<p>ArtWork Price:  </p>
							<p>{this.state.order!.pricing.artPrice} ETB</p>  
						</div>
						<div className="flex flex-row justify-between text-base pr-8">
							<p>Shipping Price:  </p>
							<p>{this.state.order!.pricing.shippingPrice} ETB</p>  
						</div>
						<div className="flex flex-row justify-between text-base pr-8">
							<p>VAT:  </p>
							<p>{this.state.order!.pricing.vat} ETB</p>  
						</div>
						<div className="flex flex-row justify-between text-base pr-8">
							<p>Total Price:  </p>
							<p>{ this.state.order!.pricing.getTotal() } ETB</p>  
						</div>
					</div>
				</div>

				<div className="w-full lg:w-5/12 mt-4 lg:mt-0 flex flex-row">
					<div
						className={`w-60 h-60 mr-6 bg-contain bg-no-repeat bg-center rounded-lg `}
						style={{ backgroundImage: `url(${this.state.order!.item?.images[0]})` }}
					/>
					<div>
						<div className="text-3xl">{this.state.order!.item?.name}</div>
						<div className="text-lg text-[#3A476A]" ><span className="text-base text-[#3A476A]">by </span>{this.state.order!.item?.artist?.fullName}</div>
						<div className="text-xl"><span>Dimensions:  </span> 
								{new String(this.state.order!.item?.dimension.width)}W .
								{new String(this.state.order!.item?.dimension.height)}H . 
								{new String(this.state.order!.item?.dimension.depth)}D .in
						</div>
						<div className="text-xl">{this.state.order!.item?.mediaUsed}</div>
					</div>
				</div>

			</div>

			

			<div className="absolute bottom-5 right-5 flex flex-row">
				{
					(this.state.order!.status === OrderStatus.requested)?
					<>
					<button className="mr-5 flex items-center px-4 py-1 lg:px-12 lg:pt-2 lg:pb-2 bg-black text-white rounded-sm" onClick={() => {this.getViewModel().acceptRequest()}}><p className="justify-center text-sm lg:text-xl">Accept request</p></button>
					<button className="flex items-center px-4 py-1 lg:px-12 lg:pt-2 lg:pb-2 bg-black text-white rounded-sm" onClick={() => {this.getViewModel().rejectRequest()}}><p className="justify-center text-sm lg:text-xl">Reject request</p></button>
					</>
					:(this.state.order!.status === OrderStatus.waitingShipment)?
					<button className="mr-5 flex items-center px-4 py-1 lg:px-12 lg:pt-2 lg:pb-2 bg-black text-white rounded-sm" onClick={() => {this.getViewModel().confirmShipment()}}><p className="justify-center text-sm lg:text-xl">Confirm Shipment</p></button>
					:<></>
				}
			</div>

			{/* {(this.state.decisionState.status === AsyncStatus.loading)?
				(<div className="absolute bottom-5 right-5 flex flex-row">
					<span className="mr-5 flex items-center px-4 py-1 lg:px-12 lg:pt-2 lg:pb-2 bg-black text-white rounded-sm">
						Loading...
					</span>
				</div>):

		
		
			})
			
			? */}
			
		</div>)
	}

}


export function RoutedOrderDetailView(){
	let params = useParams();
	return <OrderDetailView orderId={params.id!}/>
}
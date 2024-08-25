import SuccessfullView from "@/__mocks__/apps/core/presentation/views/SuccessView";
import InquiryDetailState from "@/apps/admin/application/states/inquiryDetailState";
import InquiryDetailViewModel from "@/apps/admin/application/viewmodels/inquiryDetailViewModel";
import { InquiryStatus } from "@/apps/core/data/models/inquiry";
import StatusToast from "@/lib/components/status/StatusToast";
import ViewModelView from "@/lib/components/views/ViewModelView";
import { AsyncStatus } from "@/lib/state/asyncState";
import { ReactNode } from "react";
import { useParams } from "react-router-dom";



interface InquiryDetailViewProps{
	inquiryId: string;
}


export default class InquiryDetailView extends ViewModelView<InquiryDetailViewModel, InquiryDetailViewProps, InquiryDetailState>{
	
	onCreateViewModel(state: InquiryDetailState): InquiryDetailViewModel {
		return new InquiryDetailViewModel(state, this.setState.bind(this));
	}
	
	onCreateState(): InquiryDetailState {
		return new InquiryDetailState(this.props.inquiryId);
	}


	onCreateMain(): ReactNode {
		if(this.state.decisionState.status === AsyncStatus.done){

			let title: string, subTitle: string;
			switch(this.state.inquiry!.status){
				
				case InquiryStatus.accepted:
					title = "Inquiry Accepted";
					subTitle = "Inquiry has been accepted succesfully. The client will receive an e-mail with directions to proceed."
					break;
				
				case InquiryStatus.rejected:
					title = "Inquiry Rejected";
					subTitle = "Inquiry has been rejected."
					break;
				
				default:
					title = "Inquiry Shipment Confirmed";
					subTitle = "Inquiry shipment has been confirmed successfully. The client will receive an e-mail to notify them."
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
						<div className="flex flex-row justify-between mt-4">
							<div>
								<p className="text-[#575757] leading-4">First Name</p>
								<p className="text-xl font-medium">{this.state.inquiry!.client!.fullName.split(" ")[0]}</p>
							</div>
							<div>
								<p className="text-[#575757] leading-4">Last Name</p>
								<p className="text-xl font-medium">{this.state.inquiry!.client!.fullName.split(" ")[1]}</p>
							</div>
						</div>
					</div>
				</div>

				<div className="w-full lg:w-5/12 mt-4 lg:mt-0 flex flex-row">
					<div
						className={`w-60 h-60 mr-6 bg-contain bg-no-repeat bg-center rounded-lg `}
						style={{ backgroundImage: `url(${this.state.inquiry!.artwork?.images[0]})` }}
					/>
					<div>
						<div className="text-3xl">{this.state.inquiry!.artwork?.name}</div>
						<div className="text-lg text-[#3A476A]" ><span className="text-base text-[#3A476A]">by </span>{this.state.inquiry!.artwork?.artist?.fullName}</div>
						<div className="text-xl"><span>Dimensions:  </span> 
								{new String(this.state.inquiry!.artwork?.dimension.width)}W .
								{new String(this.state.inquiry!.artwork?.dimension.height)}H . 
								{new String(this.state.inquiry!.artwork?.dimension.depth)}D .in
						</div>
						<div className="text-xl">{this.state.inquiry!.artwork?.mediaUsed}</div>
					</div>
				</div>

			</div>

			

			<div className="absolute bottom--5 right-5 pt-10 flex flex-row">
				<button className="mr-5 flex items-center px-4 py-1 lg:px-12 lg:pt-2 lg:pb-2 bg-black text-white rounded-sm" onClick={() => {this.getViewModel().acceptInquiry()}}><p className="justify-center text-sm lg:text-xl">Accept Inquiry</p></button>
				<button className="flex items-center px-4 py-1 lg:px-12 lg:pt-2 lg:pb-2 bg-black text-white rounded-sm" onClick={() => {this.getViewModel().rejectInquiry()}}><p className="justify-center text-sm lg:text-xl">Reject Inquiry</p></button>
			</div>

		</div>)
	}

}


export function RoutedInquiryDetailView(){
	let params = useParams();
	return <InquiryDetailView inquiryId={params.id!}/>
}
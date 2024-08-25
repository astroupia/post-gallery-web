import InquiryListState from "@/apps/admin/application/states/inquiryListState";
import OrderListState from "@/apps/admin/application/states/ordersListState";
import InquiryListViewModel from "@/apps/admin/application/viewmodels/inquiryListViewModel";
import OrderListViewModel from "@/apps/admin/application/viewmodels/ordersListViewModel";
import Inquiry from "@/apps/core/data/models/inquiry";
import Order, { OrderStatus } from "@/apps/core/data/models/order";
import ViewModelView from "@/lib/components/views/ViewModelView";
import { ReactNode } from "react";
import { Link } from "react-router-dom";


interface InquiryListViewProps{
	onItemSelected: (item: Inquiry) => void
}


export default class InquiryListView extends ViewModelView<InquiryListViewModel, InquiryListViewProps, InquiryListState>{

	onCreateViewModel(state: InquiryListState): InquiryListViewModel {
		return new InquiryListViewModel(state, this.setState.bind(this))
	}
	
	onCreateState(): InquiryListState {
		return new InquiryListState()
	}

	onCreateMain(): ReactNode {

		return  (
			<div>
			  <p className='text-2xl font-Lato mt-10 mb-5'>Inquiries</p> 
			  <p className='text-lg'>Art Inquries</p>
			  <p className='text-xs text-[#B3B3B3] mb-3'>Monitor artist sales, reviews, etc.</p>
			  <div className="flex flex-col">
			  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
				  <div className="overflow-hidden">
					<table className="min-w-full text-center text-sm font-light">
					  <thead
						className="border-b bg-[#F6F6F6] font-medium text-black">
						<tr>
						  <th scope="col" className=" px-6 py-4">Artwork Name</th>
						  <th scope="col" className=" px-6 py-4">Artist</th>
						  <th scope="col" className=" px-6 py-4">Date</th>
						  <th scope="col" className=" px-6 py-4">Status</th>
						</tr>
					  </thead>
					  <tbody>
						{
							this.state.inquiries!.map(
								(inquiry: Inquiry, _index: number) => {
									return <tr className="border-b " onClick={() => {this.props.onItemSelected(inquiry);}}>
									<td className="whitespace-nowrap  px-6 py-4 font-medium">{inquiry.artwork!.name}</td>
									<td className="whitespace-nowrap  px-6 py-4">{inquiry.artwork!.artist!.fullName}</td>
									<td className="whitespace-nowrap  px-6 py-4">{inquiry.createDateTime.toDateString()}</td>
									<td className="whitespace-nowrap  px-6 py-4">Inquired</td>
								</tr>
								}
							)
						}
					  </tbody>
					</table>
				  </div>
				</div>
			  </div>
			</div>
			</div>
		  )

	}

}
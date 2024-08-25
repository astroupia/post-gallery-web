import OrderListState from "@/apps/admin/application/states/ordersListState";
import OrderListViewModel from "@/apps/admin/application/viewmodels/ordersListViewModel";
import Order, { OrderStatus } from "@/apps/core/data/models/order";
import ViewModelView from "@/lib/components/views/ViewModelView";
import { ReactNode } from "react";
import { Link } from "react-router-dom";


interface OrderListViewProps{
	onItemSelected: (item: Order) => void
}


export default class OrderListView extends ViewModelView<OrderListViewModel, OrderListViewProps, OrderListState>{
	
	STATUS_MAP = [
		"Purchase Request",
		"Waiting Payment",
		"Rejected Request",
		"Waiting Shipment",
		"Purchase Complete",
		"Payment Failed"
	]

	onCreateViewModel(state: OrderListState): OrderListViewModel {
		return new OrderListViewModel(state, this.setState.bind(this))
	}
	
	onCreateState(): OrderListState {
		return new OrderListState()
	}

	onCreateMain(): ReactNode {

		return  (
			<div>
			  <p className='text-2xl font-Lato mt-10 mb-5'>Orders</p> 
			  <p className='text-lg'>Al art sells</p>
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
						  <th scope="col" className=" px-6 py-4">Price</th>
						  <th scope="col" className=" px-6 py-4">Status</th>
						</tr>
					  </thead>
					  <tbody>
						{
							this.state.currentOrders!.map(
								(order: Order, _index: number) => {
									return <tr className="border-b " onClick={() => {this.props.onItemSelected(order);}}>
									<td className="whitespace-nowrap  px-6 py-4 font-medium">{order.item!.name}</td>
									<td className="whitespace-nowrap  px-6 py-4">{order.item!.artist!.fullName}</td>
									<td className="whitespace-nowrap  px-6 py-4">{order.orderDateTime.toDateString()}</td>
									<td className="whitespace-nowrap  px-6 py-4">{order.pricing.getTotal()}</td>
									<td className="whitespace-nowrap  px-6 py-4">{this.STATUS_MAP[order.status]}</td>
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

		return <div>
			<table>
				<thead>
					<tr>
						<td>Artwork</td>
						<td>Status</td>
						<td>Artist</td>
						<td>Date</td>
						<td>Price</td>
					</tr>
				</thead>
					
				<tbody>
					{
						this.state.currentOrders!.map(
							(order: Order, _index: number) => {
								return <tr>
									<td>{order.item!.name}</td>
									<td>{OrderStatus[order.status]}</td>
									<td>{order.item!.artist?.fullName}</td>
									<td>{order.orderDateTime.toDateString()}</td>
									<td>{order.pricing.getTotal()}</td>
									<td><Link to={`/admin/order/${order.getPK()}`}>View</Link></td>
								</tr>
							}
						)
					}
				</tbody>
			</table>
			
		</div>
	}

}
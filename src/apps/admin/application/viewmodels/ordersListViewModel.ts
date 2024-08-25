import ViewModel from "@/lib/viewmodel/viewmodel";
import OrderListState from "../states/ordersListState";
import CoreProviders from "@/apps/core/di/coreproviders";
import OrderRepository from "@/apps/core/data/repositories/orderRepository";
import ArtistRepository from "@/apps/core/data/repositories/artistRepository";
import Order, { OrderStatus } from "@/apps/core/data/models/order";


export default class OrderListViewModel extends ViewModel<OrderListState>{

	private ordersRepository = new OrderRepository();
	private artistRepository = new ArtistRepository(false);

	public async onInit(): Promise<void> {
		await super.onInit();
		this.state.allOrders = (await this.ordersRepository.getAll()).filter((
			(order: Order) => {
				return order.status != OrderStatus.paymentFailed;
			}
		)).sort((a: Order, b: Order) => {
			return b.orderDateTime.getTime() - a.orderDateTime.getTime()
		})
		this.state.currentOrders = this.state.allOrders;
	}

	protected isReady(): boolean {
		return true;
	}

}
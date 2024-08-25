import ViewModel from "@/lib/viewmodel/viewmodel";
import PaymentState from "../state/paymentState";
import AsyncViewModel from "@/lib/viewmodel/asyncViewModel";
import CoreProviders from "../../di/coreproviders";
import { OrderStatus } from "../../data/models/order";


export default class ConfirmPaymentViewModel extends AsyncViewModel<PaymentState>{

	private orderRepository = CoreProviders.provideOrderRepository();
	private paymentRepository = CoreProviders.providePaymentRepository();

	public async onInit(): Promise<void> {
		super.onInit()
		this.state.order = await this.orderRepository.getByPrimaryKey(this.state.orderId);
		await this.confirmPayment()
	}

	public async confirmPayment(){
		if(this.state.order!.transactionId === null){
			return
		}
		let isComplete = await this.paymentRepository.chapaVerify(this.state.order!.transactionId!);
		if(!isComplete){
			return;
		}
		if(this.state.order!.isOnSite()){
			this.state.order!.status = OrderStatus.complete;
		}
		else{
			this.state.order!.status = OrderStatus.waitingShipment;
		}
		await this.orderRepository.save(this.state.order!)
	}
	
}
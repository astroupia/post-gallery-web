import AsyncViewModel from "@/lib/viewmodel/asyncViewModel";
import OrderDetailState from "../states/orderDetailState";
import OrderRepository from "@/apps/core/data/repositories/orderRepository";
import { OrderStatus } from "@/apps/core/data/models/order";
import EmailRepository from "@/apps/core/data/repositories/emailRepository";
import CoreProviders from "@/apps/core/di/coreproviders";
import { Client } from "@/apps/auth/data/models/accounts";
import OrderPricing from "@/apps/core/data/models/orderPricing";
import { ApiConfigs } from "@/configs/data_configs";
import ShippingInfo from "@/apps/core/data/models/shippingInfo";



export default class OrderDetailViewModel extends AsyncViewModel<OrderDetailState>{

	private orderRepository = new OrderRepository();
	private emailRepository = new EmailRepository();
	private paymentRepository = CoreProviders.providePaymentRepository()

	public async onInit(): Promise<void> {
		await super.onInit();
		this.state.order = await this.orderRepository.getByPrimaryKey(this.state.orderId);
	}

	public async sendAcceptedEmail(link: string){
		await this.emailRepository.sendRequestAcceptedEmail(
			this.state.order!.client!.email,
			this.state.order!.client!.fullName,
			link
		);
	}

	public async sendRejectedEmail(){
		await this.emailRepository.sendRequestRejectedEmail(
			this.state.order!.client!.email,
			this.state.order!.client!.fullName
		);
	}

	public async sendShippedEmail(){

	}

	
	private async initializePayment(shippingInfo: ShippingInfo, client: Client, pricing: OrderPricing): Promise<string>{
		let response = await this.paymentRepository.chapaPayment(
			{
				firstName: shippingInfo.firstName,
				lastName: shippingInfo.lastName,
				email: client.email,
				amount: pricing.getTotal(),
				returnUrl: `${ApiConfigs.HOST_URL}/complete-payment/${this.state.order!.getPK()}/`.replaceAll(" ", "%20")
			}
		);
		let paymentLink = response.checkoutUrl;
		this.state.order!.transactionId = response.transactionId;
		await this.orderRepository.save(this.state.order!);
		return paymentLink;
	}
	public async acceptRequest(): Promise<void>{

		await this.asyncCall(
			async () => {
				this.state.order!.status = OrderStatus.accepted;
				await this.orderRepository.save(this.state.order!);
				let paymentLink = await this.initializePayment(this.state.order!.shippingInfo!, this.state.order!.client!, this.state.order!.pricing)
				await this.sendAcceptedEmail(paymentLink);
			}
		)

	}

	public async rejectRequest(): Promise<void>{
		await this.asyncCall(
			async () => {
				this.state.order!.status = OrderStatus.rejected;
				await this.orderRepository.save(this.state.order!);
				await this.sendRejectedEmail();
			}
		)
	}

	public async confirmShipment(): Promise<void>{
		await this.asyncCall(
			async () => {
				this.state.order!.status = OrderStatus.waitingShipment;
				await this.orderRepository.save(this.state.order!);
				await this.sendShippedEmail();
			}
		)
	}
	
}
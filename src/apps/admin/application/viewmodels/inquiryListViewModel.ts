import ViewModel from "@/lib/viewmodel/viewmodel";
import OrderListState from "../states/ordersListState";
import CoreProviders from "@/apps/core/di/coreproviders";
import OrderRepository from "@/apps/core/data/repositories/orderRepository";
import ArtistRepository from "@/apps/core/data/repositories/artistRepository";
import Order, { OrderStatus } from "@/apps/core/data/models/order";
import InquiryListState from "../states/inquiryListState";
import InquiryRepository from "@/apps/core/data/repositories/inquiryRepository";
import Inquiry, { InquiryStatus } from "@/apps/core/data/models/inquiry";


export default class InquiryListViewModel extends ViewModel<InquiryListState>{

	private inquiryRepository = new InquiryRepository();

	public async onInit(): Promise<void> {
		await super.onInit();
		this.state.inquiries = (await this.inquiryRepository.getAll()).filter((
			(inquiry: Inquiry) => {
				return inquiry.status == InquiryStatus.none;
			}
		)).sort((a: Inquiry, b: Inquiry) => {
			return b.createDateTime.getTime() - a.createDateTime.getTime()
		});
	}

	protected isReady(): boolean {
		return true;
	}

}
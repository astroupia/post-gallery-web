import AsyncViewModel from "@/lib/viewmodel/asyncViewModel";
import EmailRepository from "@/apps/core/data/repositories/emailRepository";
import { Client } from "@/apps/auth/data/models/accounts";
import OrderPricing from "@/apps/core/data/models/orderPricing";
import { ApiConfigs } from "@/configs/data_configs";
import ShippingInfo from "@/apps/core/data/models/shippingInfo";
import InquiryDetailState from "../states/inquiryDetailState";
import InquiryRepository from "@/apps/core/data/repositories/inquiryRepository";
import { InquiryStatus } from "@/apps/core/data/models/inquiry";



export default class InquiryDetailViewModel extends AsyncViewModel<InquiryDetailState>{

	private inquiryRepository = new InquiryRepository();
	private emailRepository = new EmailRepository();

	public async onInit(): Promise<void> {
		await super.onInit();
		this.state.inquiry = await this.inquiryRepository.getByPrimaryKey(this.state.inquiryId);
	}

	public async sendAcceptedEmail(){
		await this.emailRepository.sendInquiryAcceptedEmail(
			this.state.inquiry!.client!.email,
			this.state.inquiry!.client!.fullName,
			this.state.inquiry!.artwork!.name,
			`https://post-gallery.com/cart/${this.state.inquiry!.artworkId}`
		);
	}

	public async sendRejectedEmail(){
		await this.emailRepository.sendRequestRejectedEmail(
			this.state.inquiry!.client!.email,
			this.state.inquiry!.client!.fullName
		);
	}


	public async rejectInquiry(): Promise<void>{
		await this.asyncCall(
			async () => {
				this.state.inquiry!.status = InquiryStatus.rejected;
				await this.inquiryRepository.save(this.state.inquiry!);
				// await this.sendRejectedEmail();
			},
			this.state.decisionState
		)
	}

	public async acceptInquiry(): Promise<void>{
		await this.asyncCall(
			async () => {
				this.state.inquiry!.status = InquiryStatus.accepted;
				await this.inquiryRepository.save(this.state.inquiry!);
				await this.sendAcceptedEmail();
			},
			this.state.decisionState
		)
	}
	
}
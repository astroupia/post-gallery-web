import Inquiry from "@/apps/core/data/models/inquiry";
import { AsyncState } from "@/lib/state/asyncState"


export default class InquiryDetailState extends AsyncState{

	inquiryId: string
	inquiry?: Inquiry;
	decisionState: AsyncState = new AsyncState();

	constructor(inquiryId: string){
		super();
		this.inquiryId = inquiryId
	}

}

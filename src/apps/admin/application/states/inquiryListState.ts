import Inquiry from "@/apps/core/data/models/inquiry";
import { AsyncState } from "@/lib/state/asyncState";




export default class InquiryListState extends AsyncState{

	inquiries?: Inquiry[]

}
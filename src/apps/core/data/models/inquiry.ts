import Model from "@/lib/models/model";
import Artwork from "./artwork";
import { Client } from "@/apps/auth/data/models/accounts";



export enum InquiryStatus{
	accepted,
	rejected,
	none
}

export default class Inquiry implements Model<string>{

	id: string | null; 
	artworkId: string;
	clientId: string;
	createDateTime: Date;
	status: InquiryStatus;

	artwork?: Artwork;
	client?: Client;

	constructor(
		id: string | null,
		artworkId: string,
		clientId: string,
		createDateTime: Date,
		inquiryStatus: InquiryStatus = InquiryStatus.none
	){
		this.id = id;
		this.artworkId = artworkId;
		this.clientId = clientId;
		this.createDateTime = createDateTime;
		this.status = inquiryStatus;
	}

	getPK(): string | null {
		return this.id;
	}
	setPK(pk: string): void {
		this.id = pk;
	}

}
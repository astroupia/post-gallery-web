import Serializer from "@/lib/serializers/serializer";
import Inquiry, { InquiryStatus } from "../models/inquiry";
import { DocumentData } from "firebase/firestore";
import { DateSerializer } from "@/lib/serializers/fieldSerializers";



export default class InquirySerializer extends Serializer<Inquiry, DocumentData>{
	
	private dateTimeSerializer = new DateSerializer();

	serialize(instance: Inquiry): DocumentData {
		return {
			id: instance.id,
			artwork_id: instance.artworkId,
			client_id: instance.clientId,
			create_datetime: this.dateTimeSerializer.serialize(instance.createDateTime),
			status: Number(instance.status)
		};
	}
	deserialize(data: DocumentData): Inquiry {
		return new Inquiry(
			data.id,
			data.artwork_id,
			data.client_id,
			this.dateTimeSerializer.deserialize(data.create_datetime),
			Object.values(InquiryStatus).filter((v) => !isNaN(Number(v)))[data.status] as InquiryStatus,
		);
	}

}
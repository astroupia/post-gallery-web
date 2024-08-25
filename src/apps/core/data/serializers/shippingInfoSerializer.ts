import Serializer from "@/lib/serializers/serializer";
import ShippingInfo from "../models/shippingInfo";
import { DocumentData } from "firebase/firestore";


export default class ShippingInfoSerializer extends Serializer<ShippingInfo, DocumentData> {
	
	serialize(instance: ShippingInfo): DocumentData {
		return {
			id: instance.id,
			firstName: instance.firstName,
			lastName: instance.lastName,
			address: instance.address,
			address2: instance.address2,
			country: instance.country,
			city: instance.city,
			region: instance.region,
			zipCode: instance.zipCode,
			phoneNumber: instance.phoneNumber,
			client_id: instance.clientId
		};
	}

	deserialize(data: DocumentData): ShippingInfo {
	return new ShippingInfo(
			data.id,
			data.firstName,
			data.lastName,
			data.address,
			data.address2,
			data.country,
			data.city,
			data.region,
			data.zipCode,
			data.phoneNumber,
			data.client_id
		);
	}
}
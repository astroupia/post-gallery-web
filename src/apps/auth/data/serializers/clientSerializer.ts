import { DocumentData } from "firebase/firestore";
import { Client } from "../models/accounts";
import Serializer from "@/lib/serializers/serializer";
import CartSerializer from "@/apps/core/data/serializers/cartSerializer";


export default class ClientSerializer extends Serializer<Client, DocumentData>{
	
	private cartSerializer = new CartSerializer();

	serialize(instance: Client): DocumentData {
		return {
			uid: instance.id,
			fullName: instance.fullName,
			phoneNumber: instance.phoneNumber,
			cart: this.cartSerializer.serialize(instance.cart),
			email: instance.email
		}
	}
	deserialize(data: DocumentData): Client {
		return new Client(
			data.uid,
			data.fullName, 
			data.phoneNumber,
			this.cartSerializer.deserialize(data.cart),
			data.email
		)
	}
	
	
}
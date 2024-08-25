import { DocumentData } from "firebase/firestore";
import Cart from "../models/cart";
import Serializer from "@/lib/serializers/serializer";




export default class CartSerializer extends Serializer<Cart, DocumentData>{


	serialize(instance: Cart): DocumentData {
		return {
			items: instance.itemsIds
		}
	}
	deserialize(data: DocumentData): Cart {
		return new Cart(
			data.items
		)
	}


}
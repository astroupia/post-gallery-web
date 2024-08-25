import Serializer from "@/lib/serializers/serializer"
import Order, { OrderStatus } from "../models/order";
import { DocumentData } from "firebase/firestore";
import { DateSerializer } from "@/lib/serializers/fieldSerializers";
import OrderPricing from "../models/orderPricing";



export default class OrderSerializer extends Serializer<Order, DocumentData>{
	
	private dateSerializer = new DateSerializer()


	serialize(instance: Order): DocumentData {
		return {
			id: instance.id,
			item_id: instance.itemId,
			time: this.dateSerializer.serialize(instance.orderDateTime),
			status: Number(instance.status),
			client_id: instance.clientId,
			shipping_info_id: instance.shippingInfoId,
			pricing: {
				vat: instance.pricing.vat,
				shipping: instance.pricing.shippingPrice,
				item: instance.pricing.artPrice,
				total: instance.pricing.getTotal()
			},
			transaction_id: instance.transactionId
		}
	}
	
	deserialize(data: DocumentData): Order {
		return new Order(
			data.id,
			data.item_id,
			data.shipping_info_id,
			data.client_id,
			new OrderPricing(
				data.pricing.item,
				data.pricing.shipping,
			),
			this.dateSerializer.deserialize(data.time),
			Object.values(OrderStatus).filter((v) => !isNaN(Number(v)))[data.status] as OrderStatus,
			data.transaction_id
		)
	}



}
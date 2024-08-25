import Model from "@/lib/models/model";
import { Item } from "firebase/analytics";
import Artwork from "./artwork";
import OrderPricing from "./orderPricing";
import ShippingInfo from "./shippingInfo";
import { Client } from "@/apps/auth/data/models/accounts";


export enum OrderStatus{

	requested,
	accepted,
	rejected,
	waitingShipment,
	complete,
	paymentFailed

}

export default class Order implements Model<string>{

	public id: string | null;

	public itemId: string;
	public shippingInfoId: string | null;
	public clientId: string;

	public orderDateTime: Date;
	public status: OrderStatus;

	public pricing: OrderPricing;

	public transactionId: string | null;

	public item?: Artwork;
	public shippingInfo?: ShippingInfo | null;
	public client?: Client;

	constructor(
		id: string | null = null,
		itemId: string,
		shippingInfoId: string | null,
		clientId: string,
		orderPricing: OrderPricing,
		orderDateTime: Date | null = null ,
		status: OrderStatus = OrderStatus.requested,
		transactionId: string | null = null
	){
		this.id = id;
		this.itemId = itemId;
		if(orderDateTime === null){
			orderDateTime = new Date(Date.now())
		}
		this.orderDateTime = orderDateTime
		this.shippingInfoId = shippingInfoId
		this.clientId = clientId
		this.pricing = orderPricing
		this.transactionId = transactionId
		this.status = status;
	}

	getPK(): string | null {
		return this.id;
	}
	setPK(pk: string): void {
		this.id = pk;
	}
	isOnSite(): boolean{
		return this.shippingInfoId == null;
	}

}
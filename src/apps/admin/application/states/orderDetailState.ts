import Order from "@/apps/core/data/models/order";
import { AsyncState } from "@/lib/state/asyncState"
import BaseState from "@/lib/state/baseState"


export default class OrderDetailState extends AsyncState{

	orderId: string
	order?: Order
	decisionState: AsyncState = new AsyncState();

	constructor(orderId: string){
		super();
		this.orderId = orderId
	}

}

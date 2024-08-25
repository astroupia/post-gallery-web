import { AsyncState } from "@/lib/state/asyncState";
import Order from "../../data/models/order";



export default class PaymentState extends AsyncState{

	orderId: string;
	order?: Order

	constructor(orderId: string){
		super();
		this.orderId = orderId;
	}

}
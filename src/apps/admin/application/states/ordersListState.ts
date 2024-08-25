import Order from "@/apps/core/data/models/order";
import BaseState from "@/lib/state/baseState";


export default class OrderListState extends BaseState{

	allOrders?: Order[]
	currentOrders?: Order[]

}
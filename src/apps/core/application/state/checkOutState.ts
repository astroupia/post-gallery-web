import { AsyncState } from "@/lib/state/asyncState";
import CheckoutForm from "../forms/checkoutForm";
import { Item } from "firebase/analytics";
import Order from "../../data/models/order";
import Artwork from "../../data/models/artwork";
import ShippingInfo from "../../data/models/shippingInfo";
import OrderPricing from "../../data/models/orderPricing";


export default class CheckoutState extends AsyncState{

	itemId: string;
	form: CheckoutForm = new CheckoutForm();

	shippingIncluded: boolean;

	item?: Artwork;
	pricing?: OrderPricing;
	order?: Order
	shippingInfo?: ShippingInfo | null;

	shippingInfoState: AsyncState = new AsyncState()
	paymentLink?: string;

	constructor(itemId: string, shippingIncluded: boolean){
		super();
		this.itemId = itemId;
		this.shippingIncluded = shippingIncluded;
	}

}
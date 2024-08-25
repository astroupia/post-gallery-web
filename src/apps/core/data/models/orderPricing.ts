
export default class OrderPricing{

	artPrice: number;
	shippingPrice: number;
	
	constructor(artPrice: number, shippingPrice: number){
		this.artPrice = artPrice;
		this.shippingPrice = shippingPrice;
	}

	get vat(): number {
		return (this.artPrice + this.shippingPrice) * 0.15;
	}

	public getTotal(){
		return this.artPrice + this.shippingPrice + this.vat;
	}

}
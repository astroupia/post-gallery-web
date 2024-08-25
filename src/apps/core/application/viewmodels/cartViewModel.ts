import BaseState from "@/lib/state/baseState";
import ViewModel from "@/lib/viewmodel/viewmodel";
import CartState from "../state/cartState";
import CoreProviders from "../../di/coreproviders";
import ArtworkRepository from "../../data/repositories/artworkRepository";



export default class CartViewModel extends ViewModel<CartState>{

	_orderRepository = CoreProviders.provideOrderRepository();
	_artworkRepository = new ArtworkRepository(false);

	public async onInit(): Promise<void> {
		await super.onInit();
		this.state.artwork = await this._artworkRepository.getByPrimaryKey(this.state.artworkId);
	}

	public setShipping(value: boolean){
		this.state.shipping = value;
		this.syncState();
	}

	public getPurchaseLink(): string{
		let link = `/checkout/${this.state.artworkId}/`;
		if(this.state.shipping){
			link = `${link}?shipping=1`
		}
		return link;
	}

}
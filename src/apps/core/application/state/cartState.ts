import BaseState from "@/lib/state/baseState";
import Artwork from "../../data/models/artwork";




export default class CartState extends BaseState{


	artwork?: Artwork;
	artworkId: string;
	
	shipping: boolean = true;

	constructor(itemId: string){
		super();
		this.artworkId = itemId;
	}
}
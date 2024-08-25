import Artwork from "./artwork";


export default class Cart{

	public items?: Artwork[]
	public itemsIds: string[]


	constructor(itemsIds: string[]){
		this.itemsIds = itemsIds;
	}

	public static createEmpty(): Cart{
		return new Cart([]);
	}

}
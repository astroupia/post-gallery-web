import VisibilityModel from "./visiblityModel";


export default class Press extends VisibilityModel<string>{
	
	
	public id: string | null;
	public name: string;
	public link: string;
	public cover: string;

	constructor(
		id: string | null,
		name: string,
		link: string,
		cover: string,
		visibile: boolean
	){
		super(visibile);
		this.id = id;
		this.name = name;
		this.link = link;
		this.cover = cover;
	}
	
	getPK(): string | null {
		return this.id;
	}
	setPK(pk: string): void {
		this.id = pk;
	}


}
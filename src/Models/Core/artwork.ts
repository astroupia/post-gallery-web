import Model from "@/lib/models/model";
import Artist from "./artist";


export interface Dimension{

	width: number;
	height: number;
	depth: number;

}

export enum Status{

	onSale,
	sold,

}

export default class Artwork implements Model<string>{

	public id: string | null;
	public artistId: string;
	public name: string;
	public description: string;
	public price: number;
	public dimension: Dimension;
	public status: Status;
	public creationDate: Date;
	public mediaUsed: string;

	public artist?: Artist


	constructor(
		id: string | null = null,
		artistId: string,
		name: string,
		description: string,
		price: number,
		dimension: Dimension,
		status: Status,
		creationDate: Date,
		mediaUsed: string
	){
		this.id = id;
		this.artistId = artistId;
		this.name = name;
		this.description = description;
		this.price = price;
		this.dimension = dimension;
		this.status = status;
		this.creationDate = creationDate;
		this.mediaUsed = mediaUsed;
	}

	getPK(): string | null {
		return this.id;
	}
	setPK(pk: string): void {
		this.id = pk
	}

}
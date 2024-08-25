import Model from "@/lib/models/model";
import VisibilityModel from "./visiblityModel";


export enum PublishmentType{

	blog, 
	press,
	project,
	artFair,

}

export default class Publishment extends VisibilityModel<string>{


    id: string | null = null;
    title: string;
    cover: string;
    content: string;
	type: PublishmentType;

    constructor(
		id: string | null,
        title: string,
        cover: string,
        content: string,
		type: PublishmentType,
		visible: boolean
    ){
		super(visible);
		this.id = id;
        this.title = title;
        this.cover = cover;
        this.content = content;
		this.type = type;
    }
    getPK(): string | null {
        return this.id;
    }
    setPK(pk: string): void {
        this.id = pk;
    }

}
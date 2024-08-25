import { AsyncState } from "@/lib/state/asyncState";
import Publishment, { PublishmentType } from "../../data/models/publishment";
import ArtFair from "../../data/models/artFair";
import Press from "../../data/models/press";



export default class BlogListState extends AsyncState{

	blogs?: Publishment[]
	artFairs?: ArtFair[];
	presses?: Press[];
	
	publishmentType: PublishmentType;

	constructor(publishmentType: PublishmentType){
		super();
		this.publishmentType = publishmentType;
	}

}
import BaseState from "@/lib/state/baseState";
import Exhibition from "../../data/models/exhibition";



export default class ExhibitionDetailState extends BaseState{

	exhibitionID: string;
	exhibiton?: Exhibition;

	constructor(exhibitionID: string, context?: object){
		super(context)
		this.exhibitionID = exhibitionID
	}

}
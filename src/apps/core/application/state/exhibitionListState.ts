import BaseState from "@/lib/state/baseState";
import Exhibition from "../../data/models/exhibition";



export default class ExhibitionListState extends BaseState{

	currentExhibition?: Exhibition;
	upcomingExhibitions?: Exhibition[];
	pastExhibitions?: Exhibition[];

}
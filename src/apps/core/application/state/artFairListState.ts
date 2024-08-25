import { AsyncState } from "@/lib/state/asyncState";
import Blog, { PublishmentType } from "../../data/models/publishment";
import ArtFair from "../../data/models/artFair";



export default class ArtFairListState extends AsyncState{

	artFairs?: ArtFair[]

}
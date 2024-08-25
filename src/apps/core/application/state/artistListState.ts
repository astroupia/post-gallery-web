import { AsyncState } from "@/lib/state/asyncState";
import Artist from "../../data/models/artist";



export default class ArtistListState extends AsyncState{

	artists?: Artist[];

}
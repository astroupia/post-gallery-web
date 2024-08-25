import { AsyncState } from "@/lib/state/asyncState";
import Artist from "../../data/models/artist";




export default class ArtistDetailState extends AsyncState{
	
	artist?: Artist;
	artistId: string;

	constructor(artistId: string){
		super();
		this.artistId = artistId;
	}

}
import { AsyncState } from "@/lib/state/asyncState";
import ArtistForm from "../forms/artistForm";
import Artist from "@/apps/core/data/models/artist";


export default class WriteArtistState extends AsyncState{

	form: ArtistForm = new ArtistForm()
	artist?: Artist;

	artistId?: string;

} 
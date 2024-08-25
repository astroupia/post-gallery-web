import Artist from "@/apps/core/data/models/artist";
import ArtistForm from "../forms/artistForm";
import EditArtistViewModel from "./editArtistViewModel";
import { Gender } from "@/apps/core/data/models/gender";


export default class AddArtistViewModel extends EditArtistViewModel{

	protected syncFormToArtist(form: ArtistForm): void {
		this.state.artist = new Artist(undefined, "", Gender.female, "", "", "", "",new Date(Date.now()), "", true)
		super.syncFormToArtist(form)
	}

}
import Artwork from "@/apps/core/data/models/artwork";
import ArtworkForm from "../forms/artworkForm";
import EditArtworkViewModel from "./editArtworkViewModel";
import { Status } from "@/apps/core/data/models/artwork";

export default class AddArtworkViewModel extends EditArtworkViewModel{

	protected syncFormToArtwork(form: ArtworkForm): void {
		this.state.artwork = new Artwork(undefined, "", "", "", 0, {width: 0, height: 0, depth: 0}, Status.onSale, new Date(Date.now()), "", [], true)
		super.syncFormToArtwork(form)
	}

}
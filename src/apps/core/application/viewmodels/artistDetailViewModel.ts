import AsyncViewModel from "@/lib/viewmodel/asyncViewModel";
import ArtistDetailState from "../state/artistDetailState";
import ArtistRepository from "../../data/repositories/artistRepository";
import CoreProviders from "../../di/coreproviders";



export default class ArtistDetailViewModel extends AsyncViewModel<ArtistDetailState>{

	private repository: ArtistRepository = new ArtistRepository(false);

	public async onInit(): Promise<void> {
		await super.onInit();
		this.state.artist = await this.repository.getByPrimaryKey(this.state.artistId);
	}

}
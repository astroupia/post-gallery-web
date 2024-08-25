import AsyncViewModel from "@/lib/viewmodel/asyncViewModel";
import ArtistListState from "../state/artistListState";
import ArtistRepository from "../../data/repositories/artistRepository";
import CoreProviders from "../../di/coreproviders";




export default class ArtistListViewModel extends AsyncViewModel<ArtistListState>{


	private repository: ArtistRepository = CoreProviders.provideArtistRepository();


	public async onInit(): Promise<void> {
		await super.onInit();
		this.repository.setAttachMode(false);
		this.state.artists = await this.repository.getAll();
		this.repository.setAttachMode(true);
	}

}
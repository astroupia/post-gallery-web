import AsyncViewModel from "@/lib/viewmodel/asyncViewModel";
import DashboardState from "../states/dashboardState";
import CoreProviders from "@/apps/core/di/coreproviders";
import ArtworkRepository from "@/apps/core/data/repositories/artworkRepository";
import ArtistRepository from "@/apps/core/data/repositories/artistRepository";
import ExhibitionRepository from "@/apps/core/data/repositories/exhibitionRepository";



export default class DashboardViewModel extends AsyncViewModel<DashboardState>{


	private artworkRepository = new ArtworkRepository(false);
	private artistRepository = new ArtistRepository(false);
	private exhibitionRepository = new ExhibitionRepository(false);



	public async onInit(): Promise<void> {
		await super.onInit();

		this.artistRepository.setAttachMode(false);
		this.artworkRepository.setAttachMode(false);
		this.exhibitionRepository.setAttachMode(false);
		this.state.artists = await this.artistRepository.getAll();
		this.state.artworks = await this.artworkRepository.getAll();
		this.state.exhibitions = await this.exhibitionRepository.getAll();
		this.artistRepository.setAttachMode(true);
		this.artworkRepository.setAttachMode(true);
		this.exhibitionRepository.setAttachMode(true);
	}

	// protected isReady(): boolean {
		// return (this.state.artists != undefined) && (this.state.artworks != undefined) && (this.state.exhibitions != undefined);
	// }

}
import AsyncViewModel from "@/lib/viewmodel/asyncViewModel"
import HomeState from "../state/homeState";
import CoreProviders from "../../di/coreproviders";
import ExhibitionRepository from "../../data/repositories/exhibitionRepository";
import { ExhibitionStatus } from "../../data/models/exhibition";
import Artwork from "../../data/models/artwork";


export default class HomeViewModel extends AsyncViewModel<HomeState>{
	
	private exhibitionRepository = new ExhibitionRepository(false);

	public async onInit(): Promise<void> {
		await super.onInit();
		let exhibition = (await this.exhibitionRepository.getByStatus(ExhibitionStatus.current))[0];
		this.state.images = exhibition.artworks!.map(
			(artwork: Artwork) => artwork.images[0]
		);
		this.state.slideState.slideIndex = 0;
		this.state.slideState.bgImage = this.state.images[0];
		this.state.exhibition = exhibition;
	}

}
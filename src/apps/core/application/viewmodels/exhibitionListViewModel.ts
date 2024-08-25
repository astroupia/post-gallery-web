import ViewModel from "@/lib/viewmodel/viewmodel";
import ExhibitionListState from "../state/exhibitionListState";
import CoreProviders from "../../di/coreproviders";
import Exhibition, { ExhibitionStatus } from "../../data/models/exhibition";
import ExhibitionRepository from "../../data/repositories/exhibitionRepository";
import ArtistRepository from "../../data/repositories/artistRepository";


export default class ExhibitionListViewModel extends ViewModel<ExhibitionListState>{

	private repository = new ExhibitionRepository();


	public async onInit(): Promise<void> {
		await super.onInit();
		this.repository.setAttachMode(false);

		this.state.currentExhibition = (await this.repository.getByStatus(ExhibitionStatus.current))[0];
		this.state.upcomingExhibitions = await this.repository.getByStatus(ExhibitionStatus.upcoming);
		this.state.pastExhibitions = await this.repository.getByStatus(ExhibitionStatus.past);
		this.repository.setAttachMode(true);
		await super.onInit();
	}


}
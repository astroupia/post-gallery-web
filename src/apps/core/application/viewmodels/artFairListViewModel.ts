import AsyncViewModel from "@/lib/viewmodel/asyncViewModel";
import BlogListState from "../state/blogListState";
import PublishmentRepository from "../../data/repositories/publishmentRepository";
import CoreProviders from "../../di/coreproviders";
import ArtFairListState from "../state/artFairListState";
import ArtFairRepository from "../../data/repositories/artFairRepository";
import ArtFair from "../../data/models/artFair";


export default class ArtFairListViewModel extends AsyncViewModel<ArtFairListState>{

	private repository: ArtFairRepository = new ArtFairRepository();

	public async onInit(): Promise<void> {
		await super.onInit();
		this.state.artFairs = await this.repository.getAll();
	}

}
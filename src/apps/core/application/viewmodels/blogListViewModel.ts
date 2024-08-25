import AsyncViewModel from "@/lib/viewmodel/asyncViewModel";
import BlogListState from "../state/blogListState";
import PublishmentRepository from "../../data/repositories/publishmentRepository";
import CoreProviders from "../../di/coreproviders";
import { PublishmentType } from "../../data/models/publishment";
import ArtFairRepository from "../../data/repositories/artFairRepository";
import PressRepository from "../../data/repositories/pressRepository";


export default class BlogListViewModel extends AsyncViewModel<BlogListState>{

	private repository: PublishmentRepository = new PublishmentRepository(false);
	private artFairRepository = new ArtFairRepository();
	private pressRepository = new PressRepository();

	public async onInit(): Promise<void> {
		await super.onInit();
		this.state.blogs = await this.repository.getByType(this.state.publishmentType);
		if(this.state.publishmentType === PublishmentType.blog){
			this.state.presses = await this.pressRepository.getAll();
		}
		else{
			this.state.presses = await this.artFairRepository.getAll()
		}
	}

}
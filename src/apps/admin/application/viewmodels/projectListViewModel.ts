import ViewModel from "@/lib/viewmodel/viewmodel";
import PublishmentRepository from "@/apps/core/data/repositories/publishmentRepository";
import PressRepository from "@/apps/core/data/repositories/pressRepository";
import { PublishmentType } from "@/apps/core/data/models/publishment";
import ArtFairRepository from "@/apps/core/data/repositories/artFairRepository";
import ProjectListState from "../states/projectListState";


export default class ProjectListViewModel extends ViewModel<ProjectListState>{

	private publishmentRepository = new PublishmentRepository(false);
	private fairRepository = new ArtFairRepository(false);

	public async onInit(): Promise<void> {
		this.state.projects = await this.publishmentRepository.getByType(PublishmentType.project);
		this.state.fairs = await this.fairRepository.getAll();
	}

}
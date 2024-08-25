import ViewModel from "@/lib/viewmodel/viewmodel";
import BlogListState from "../states/blogListState";
import PublishmentRepository from "@/apps/core/data/repositories/publishmentRepository";
import PressRepository from "@/apps/core/data/repositories/pressRepository";
import { PublishmentType } from "@/apps/core/data/models/publishment";


export default class BlogListViewModel extends ViewModel<BlogListState>{

	private publishmentRepository = new PublishmentRepository(false);
	private pressRepository = new PressRepository(false);

	public async onInit(): Promise<void> {
		this.state.blogs = await this.publishmentRepository.getByType(PublishmentType.blog);
		this.state.presses = await this.pressRepository.getAll();
	}

}
import AsyncViewModel from "@/lib/viewmodel/asyncViewModel"
import BlogDetailState from "../state/blogDetailState";
import PublishmentRepository from "../../data/repositories/publishmentRepository";
import CoreProviders from "../../di/coreproviders";



export default class BlogDetailViewModel extends AsyncViewModel<BlogDetailState>{

	private repository: PublishmentRepository = new PublishmentRepository();

	public async onInit(): Promise<void> {
		await super.onInit();
		this.state.blog = await this.repository.getByPrimaryKey(this.state.blogId);
	}

}
import Blog, { PublishmentType } from "@/apps/core/data/models/publishment";
import EditPublishmentViewModel from "./editPublishmentViewModel";
import Publishment from "@/apps/core/data/models/publishment";
import ArtFair from "@/apps/core/data/models/artFair";
import Press from "@/apps/core/data/models/press";


export default class AddPublishmentViewModel extends EditPublishmentViewModel{

	protected async getPublishment(): Promise<Blog> {
		return new Publishment(
			null,
			"",
			"",
			"",
			PublishmentType.project,
			true
		);
	}

	protected async getArtFair(): Promise<ArtFair> {
		return new ArtFair(
			null,
			"",
			"",
			"",
			true
		);
	}

	protected async getPress(): Promise<Press> {
		return new Press(
			null,
			"",
			"",
			"",
			true
		);
	}

	public async onInit(): Promise<void> {
		await super.onInit();
	}

}
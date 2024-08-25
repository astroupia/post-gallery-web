import EditArtFairViewModel from "./editArtFairViewModel";
import ArtFair from "@/apps/core/data/models/artFair";


export default class AddArtFairViewModel extends EditArtFairViewModel{

	protected async getArtFair(): Promise<ArtFair> {
		return new ArtFair(
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
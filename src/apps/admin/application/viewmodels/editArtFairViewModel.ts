import AsyncViewModel from "@/lib/viewmodel/asyncViewModel";
import WritePublishmentState from "../states/writePublishmentState";
import PublishmentRepository from "@/apps/core/data/repositories/publishmentRepository";
import CoreProviders from "@/apps/core/di/coreproviders";
import Blog from "@/apps/core/data/models/publishment";
import WriteArtFairState from "../states/writeArtFairState";
import ArtFairRepository from "@/apps/core/data/repositories/artFairRepository";
import ArtFair from "@/apps/core/data/models/artFair";



export default class EditArtFairViewModel extends AsyncViewModel<WriteArtFairState>{

	private repository: ArtFairRepository = new ArtFairRepository(false);

	private syncToForm(){
		let form = this.state.form;
		let artFair = this.state.artFair!;
		form.name.setValue(artFair.name);
		form.cover.setValue(artFair.cover);
		form.link.setValue(artFair.link);
		form.visible.setValue(artFair.visible)
	}

	private syncToPublishment(){
		let form = this.state.form;
		let artFair = this.state.artFair!;
		
		artFair.name = form.name.getValue()!;
		artFair.link = form.link.getValue()!;
		artFair.cover = form.cover.getValue()!;
		artFair.visible = form.visible.getValue()!;
	}

	protected async getArtFair(): Promise<ArtFair>{
		return await this.repository.getByPrimaryKey(this.state.artFairId!);
	}

	public async onInit(): Promise<void> {
		await super.onInit();
		this.state.artFair = await this.getArtFair();
	}

	async save(){
		await this.asyncCall(async () => {
			await this.state.form.validate(true);
			this.syncToPublishment();
			await this.repository.save(this.state.artFair!);
		});
	}

}
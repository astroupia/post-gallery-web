import AsyncViewModel from "@/lib/viewmodel/asyncViewModel";
import WritePublishmentState from "../states/writePublishmentState";
import PublishmentRepository from "@/apps/core/data/repositories/publishmentRepository";
import CoreProviders from "@/apps/core/di/coreproviders";
import Blog from "@/apps/core/data/models/publishment";
import EditArtFairViewModel from "./editArtFairViewModel";
import ArtFair from "@/apps/core/data/models/artFair";
import ArtFairRepository from "@/apps/core/data/repositories/artFairRepository";
import Press from "@/apps/core/data/models/press";
import PressRepository from "@/apps/core/data/repositories/pressRepository";



export default class EditPublishmentViewModel extends AsyncViewModel<WritePublishmentState>{

	private repository: PublishmentRepository = new PublishmentRepository();
	private artFairRepository: ArtFairRepository = new ArtFairRepository(false);
	private pressRepository: PressRepository = new PressRepository(false);
	public artFairViewModel?: EditArtFairViewModel;

	private syncToForm(){
		let form = this.state.form;
		let blog = this.state.publishment!;
		form.content.value = blog.content;
		form.cover.value = blog.cover;
		form.title.value = blog.title;
		form.publishmentType.value = blog.type;
		form.visible.value = blog.visible;
	}

	private syncToPublishment(){
		let form = this.state.form;
		let blog = this.state.publishment!;
		blog.content = form.content.getValue()!;
		blog.cover = form.cover.getValue()!;
		blog.title = form.title.getValue()!;
		blog.type = form.publishmentType.getValue()!;
		blog.visible = form.visible.getValue()!;
	}

	private syncArtFairToForm(){
		let form = this.state.artFairform;
		let artFair = this.state.artFair!;
		form.name.value = (artFair.name);
		form.cover.value = (artFair.cover);
		form.link.value = (artFair.link);
		form.visible.value = (artFair.visible)
	}

	private syncPressToForm(){
		let form = this.state.artFairform;
		let press = this.state.press!;
		form.name.value = (press.name);
		form.cover.value = (press.cover);
		form.link.value = (press.link);
		form.visible.value = (press.visible)
	}

	private syncToArtFair(){
		let form = this.state.artFairform;
		let artFair = this.state.artFair!;
		
		artFair.name = form.name.getValue()!;
		artFair.link = form.link.getValue()!;
		artFair.cover = form.cover.getValue()!;
		artFair.visible = form.visible.getValue()!;
	}

	private syncToPress(){
		let form = this.state.artFairform;
		let press = this.state.press!;
		
		press.name = form.name.getValue()!;
		press.link = form.link.getValue()!;
		press.cover = form.cover.getValue()!;
		press.visible = form.visible.getValue()!;
	}

	protected async getPublishment(): Promise<Blog>{
		return await this.repository.getByPrimaryKey(this.state.publishmentId!);
	}

	protected async getArtFair(): Promise<ArtFair>{
		return await this.artFairRepository.getByPrimaryKey(this.state.artFairId!);
	}


	protected async getPress(): Promise<Press>{
		return await this.pressRepository.getByPrimaryKey(this.state.pressId!);
	}

	public async onInit(): Promise<void> {
		await super.onInit();
		try{
			this.state.publishment = await this.getPublishment();
			this.syncToForm()
		}
		catch(ex){

		}
		try{
			this.state.artFair = await this.getArtFair();
			this.syncArtFairToForm();
		}
		catch(ex){

		}
		try{
			this.state.press = await this.getPress();
			this.syncPressToForm();
		}
		catch(ex){

		}
	}

	async save(){
		await this.asyncCall(async () => {
			await this.state.form.validate(true);
			this.syncToPublishment();
			await this.repository.save(this.state.publishment!);
		});
	}

	async saveArtFair(){
		await this.asyncCall(async () => {
			await this.state.artFairform.validate(true);
			this.syncToArtFair();
			await this.artFairRepository.save(this.state.artFair!);
		});
	}

	async savePress(){
		await this.asyncCall(async () => {
			await this.state.artFairform.validate(true);
			this.syncToPress();
			await this.pressRepository.save(this.state.press!);
		})
	}

}
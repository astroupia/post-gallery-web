import AsyncViewModel from "@/lib/viewmodel/asyncViewModel";
import WriteArtworkState from "../states/writeArtworkState";
import ArtworkRepository from "@/apps/core/data/repositories/artworkRepository";
import CoreProviders from "@/apps/core/di/coreproviders";
import Artwork from "@/apps/core/data/models/artwork";
import ArtworkForm from "../forms/artworkForm";
import ArtistRepository from "@/apps/core/data/repositories/artistRepository";

export default class EditArtworkViewModel extends AsyncViewModel<WriteArtworkState>{
	private repository: ArtworkRepository = new ArtworkRepository(false);
	private artistRepository: ArtistRepository = new ArtistRepository(false);


	private syncArtworkToForm(form: ArtworkForm, artwork: Artwork){
		form.artistID.setValue(artwork.artistId)
		form.name.setValue(artwork.name)
		form.description.setValue(artwork.description)
		form.price.setValue(artwork.price)
		form.dimensionWidth.setValue(artwork.dimension.width)
		form.dimensionHeight.setValue(artwork.dimension.height)
		form.dimensionDepth.setValue(artwork.dimension.depth)
		form.status.setValue(artwork.status)
		form.creationDate.setValue(artwork.creationDate)
		form.mediaUsed.setValue(artwork.mediaUsed)
		form.images.setValue(artwork.images)
		form.visible.setValue(artwork.visible)
	}

	protected syncFormToArtwork(form: ArtworkForm){
		let artwork = this.state.artwork!;
		artwork.artistId = form.artistID.getValue()!
		artwork.name = form.name.getValue()!
		artwork.description = form.description.getValue()!
		artwork.price = form.price.getValue()!
		artwork.dimension = {
			width: form.dimensionWidth.getValue()!,
			height: form.dimensionHeight.getValue()!,
			depth: form.dimensionDepth.getValue()!,
		}
		artwork.status = form.status.getValue()!
		artwork.creationDate = form.creationDate.getValue()!
		artwork.mediaUsed = form.mediaUsed.getValue()!
		artwork.images = form.images.getValue() as string[]
		artwork.visible = form.visible.getValue()!
	}

	public async onInit(): Promise<void> {
		await super.onInit();
		this.state.allArtists = await this.artistRepository.getAll();
		if(this.state.artworkId != undefined){
			this.state.artwork = await this.repository.getByPrimaryKey(this.state.artworkId!)
			this.syncArtworkToForm(this.state.form, this.state.artwork)
			this.syncState()
		}
		
	}

	async save(){

		await this.asyncCall(async () => {
			await this.state.form.validate(true)
			this.syncFormToArtwork(this.state.form)
			await this.repository.save(this.state.artwork!)
		})


	}
}
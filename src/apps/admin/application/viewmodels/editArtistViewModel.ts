import AsyncViewModel from "@/lib/viewmodel/asyncViewModel";
import WriteArtistState from "../states/writeArtistState";
import ArtistRepository from "@/apps/core/data/repositories/artistRepository";
import CoreProviders from "@/apps/core/di/coreproviders";
import Artist from "@/apps/core/data/models/artist";
import ArtistForm from "../forms/artistForm";


export default class EditArtistViewModel extends AsyncViewModel<WriteArtistState>{

	private repository: ArtistRepository = new ArtistRepository(false);

	private syncArtistToForm(form: ArtistForm, artist: Artist){
		form.firstName.setValue(artist.fullName.split(" ")[0])
		form.lastName.setValue(artist.fullName.split(" ")[1])
		form.email.setValue(artist.email)
		form.biography.setValue(artist.biography)
		form.dateOfBirth.setValue(artist.dateOfBirth)
		form.gender.setValue(artist.gender)
		form.nationality.setValue(artist.nationality)
		form.phoneNumber.setValue(artist.phoneNumber)
		form.avatar.setValue(artist.avatar)
		form.visible.setValue(artist.visible)
	}

	protected syncFormToArtist(form: ArtistForm){
		let artist = this.state.artist!;
		artist.fullName = `${form.firstName.getValue()!} ${form.lastName.getValue()!}`
		artist.email = form.email.getValue()!
		artist.biography = form.biography.getValue()!
		artist.dateOfBirth = form.dateOfBirth.getValue()!
		artist.gender = form.gender.getValue()!
		artist.nationality = form.nationality.getValue()!
		artist.phoneNumber = form.phoneNumber.getValue()!
		artist.avatar = form.avatar.getValue()!
		artist.visible = form.visible.getValue()!
	}

	public async onInit(): Promise<void> {
		await super.onInit();
		if(this.state.artistId != undefined){
			this.state.artist = await this.repository.getByPrimaryKey(this.state.artistId!)
			this.syncArtistToForm(this.state.form, this.state.artist)
		}
		
	}

	async save(){

		this.asyncCall(async () => {
			await this.state.form.validate(true)
			this.syncFormToArtist(this.state.form)
			await this.repository.save(this.state.artist!)
		})


	}

}
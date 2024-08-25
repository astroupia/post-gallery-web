import AddArtistViewModel from "@/apps/admin/application/viewmodels/addArtistViewModel"
import WriteArtistView from "./WriteArtistView"
import EditArtistViewModel from "@/apps/admin/application/viewmodels/editArtistViewModel"
import { Gender } from "@/apps/core/data/models/gender"
import WriteArtistState from "@/apps/admin/application/states/writeArtistState"


export default class AddArtistView extends WriteArtistView<any>{
	
	onCreateViewModel(state: WriteArtistState): EditArtistViewModel {
		return new AddArtistViewModel(state, this.setState.bind(this))

	}
	onCreateState(): WriteArtistState {
		return new WriteArtistState();
	}

}
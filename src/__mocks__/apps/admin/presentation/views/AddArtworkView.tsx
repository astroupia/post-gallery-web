import WriteArtworkView from "./WriteArtworkView"
import EditArtworkViewModel from "@/apps/admin/application/viewmodels/editArtworkViewModel"
import AddArtworkViewModel from "@/apps/admin/application/viewmodels/addArtworkViewModel"
import WriteArtworkState from "@/apps/admin/application/states/writeArtworkState"


export default class AddArtworkView  extends WriteArtworkView<any>{
	onCreateState(): WriteArtworkState {
		return new WriteArtworkState();
	}
	onCreateViewModel(state: WriteArtworkState): EditArtworkViewModel {
		return new AddArtworkViewModel(state, this.setState.bind(this));
	}
}
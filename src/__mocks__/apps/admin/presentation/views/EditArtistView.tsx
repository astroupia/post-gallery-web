import WriteArtistState from "@/apps/admin/application/states/writeArtistState";
import EditArtistViewModel from "@/apps/admin/application/viewmodels/editArtistViewModel";
import React from "react";
import { useParams } from "react-router-dom";
import WriteArtistView from "./WriteArtistView";


interface EditArtistViewProps{
	artistId: string;
}

export default class EditArtistView extends WriteArtistView<EditArtistViewProps>{
	

	onCreateViewModel(state: WriteArtistState): EditArtistViewModel {
		return new EditArtistViewModel(state, this.setState.bind(this));
	}
	onCreateState(): WriteArtistState {
		let state = new WriteArtistState()
		state.artistId = this.props.artistId;
		return state;
	}

}


export function RoutedArtistEditView(){
	let params = useParams();
	return <EditArtistView artistId={params.id!}/>
}
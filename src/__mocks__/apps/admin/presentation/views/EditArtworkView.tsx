import WriteArtworkState from "@/apps/admin/application/states/writeArtworkState";
import EditArtworkViewModel from "@/apps/admin/application/viewmodels/editArtworkViewModel";
import WriteArtworkView from "./WriteArtworkView";
import { useParams } from "react-router-dom";


interface EditArtworkViewProps{
    artworkId: string
}


export default class EditArtworkView extends WriteArtworkView<EditArtworkViewProps>{
    onCreateState(): WriteArtworkState {
        let state = new WriteArtworkState();
        state.artworkId = this.props.artworkId;
        return state;
    }
    onCreateViewModel(state: WriteArtworkState): EditArtworkViewModel {
        return new EditArtworkViewModel(state, this.setState.bind(this));
    }

}


export function RoutedEditArtworkView(){
    let params = useParams();
    return <EditArtworkView artworkId={params.id!}/>
}
import EditExhibitionViewModel from "@/apps/admin/application/viewmodels/editExhibitionViewModel";
import WriteExhibitionView from "./WriteExhibitionView";
import WriteExhibitionState from "@/apps/admin/application/states/writeExhibitionState";
import { useParams } from "react-router-dom";
import EditArtworkView from "./EditArtworkView";



interface EditExhibitionViewProps{
    exhibitionId: string;
}

export default class EditExhibitionView extends WriteExhibitionView<EditExhibitionViewProps>{
    
    onCreateViewModel(state: WriteExhibitionState): EditExhibitionViewModel {
		return new EditExhibitionViewModel(state, this.setState.bind(this));
	}

	onCreateState(): WriteExhibitionState {
		let state = new WriteExhibitionState();
        state.exhibtionId = this.props.exhibitionId;
        return state;
	}
}


export function RoutedEditExhibitionView(){
    let params = useParams();
    return <EditExhibitionView exhibitionId={params.id!}/>
}
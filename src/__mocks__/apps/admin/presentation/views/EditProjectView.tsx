import WritePublishmentState from "@/apps/admin/application/states/writePublishmentState";
import EditPublishmentViewModel from "@/apps/admin/application/viewmodels/editPublishmentViewModel";
import WriteBlogPressView from "./WriteBlogPressView";
import WriteProjectFairView from "./WriteProjectFairView";
import { useParams } from "react-router-dom";


interface EditProjectViewProps{

	publishmentId: string;

}


export default class EditProjectView extends WriteProjectFairView<EditProjectViewProps>{
	onCreateViewModel(state: WritePublishmentState): EditPublishmentViewModel {
		return new EditPublishmentViewModel(state, this.setState.bind(this));
	}
	onCreateState(): WritePublishmentState {
		let state = new WritePublishmentState();
		state.publishmentId = this.props.publishmentId;
		return state;
	}

}

export function RoutedEditProjectView(){
	let params = useParams();
	return <EditProjectView publishmentId={params.id!}/>
}
import WritePublishmentState from "@/apps/admin/application/states/writePublishmentState";
import EditPublishmentViewModel from "@/apps/admin/application/viewmodels/editPublishmentViewModel";
import WriteBlogPressView from "./WriteBlogPressView";
import WriteProjectFairView from "./WriteProjectFairView";
import { useParams } from "react-router-dom";
import { PublishmentType } from "@/apps/core/data/models/publishment";


interface EditFairViewProps{

	fairId: string;

}


export default class EditFairView extends WriteProjectFairView<EditFairViewProps>{
	onCreateViewModel(state: WritePublishmentState): EditPublishmentViewModel {
		return new EditPublishmentViewModel(state, this.setState.bind(this));
	}
	onCreateState(): WritePublishmentState {
		let state = new WritePublishmentState();
		state.artFairId = this.props.fairId;
		state.form.publishmentType.setValue(PublishmentType.artFair);
		return state;
	}

}

export function RoutedEditFairView(){
	let params = useParams();
	return <EditFairView fairId={params.id!}/>
}
import WritePublishmentState from "@/apps/admin/application/states/writePublishmentState";
import EditPublishmentViewModel from "@/apps/admin/application/viewmodels/editPublishmentViewModel";
import WriteBlogPressView from "./WriteBlogPressView";
import { useParams } from "react-router-dom";
import { PublishmentType } from "@/apps/core/data/models/publishment";





interface EditBlogPressViewProps{

	publishmentId: string;

}


export default class EditBlogPressView extends WriteBlogPressView<EditBlogPressViewProps>{
	onCreateViewModel(state: WritePublishmentState): EditPublishmentViewModel {

		return new EditPublishmentViewModel(state, this.setState.bind(this));
	}
	onCreateState(): WritePublishmentState {
		let state = new WritePublishmentState();
		state.publishmentId = this.props.publishmentId;
		state.form.publishmentType.setValue(PublishmentType.project)
		return state;
	}

}


export function RoutedEditBlogPressView(){
	let params = useParams();
	return <EditBlogPressView publishmentId={params.id!}/>
}
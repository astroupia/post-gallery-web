import WritePublishmentState from "@/apps/admin/application/states/writePublishmentState";
import WriteBlogView from "./WriteBlogPressView";
import EditPublishmentViewModel from "@/apps/admin/application/viewmodels/editPublishmentViewModel";
import AddPublishmentViewModel from "@/apps/admin/application/viewmodels/addPublishmentViewModel";
import { PublishmentType } from "@/apps/core/data/models/publishment";


export default class AddBlogView extends WriteBlogView<any>{
	onCreateViewModel(state: WritePublishmentState): EditPublishmentViewModel {
		return new AddPublishmentViewModel(state, this.setState.bind(this));
	}
	onCreateState(): WritePublishmentState {
		let state = new WritePublishmentState();
		state.form.publishmentType.setValue(PublishmentType.blog);
		return state;
	}

}
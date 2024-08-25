import LogoutViewModel from "@/apps/auth/application/viewmodels/logoutViewModel";
import ViewModelView from "@/lib/components/views/ViewModelView";
import BaseState from "@/lib/state/baseState";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";



export default class LogoutView extends ViewModelView<LogoutViewModel>{
	
	onCreateViewModel(state: BaseState): LogoutViewModel {
		return new LogoutViewModel(state, this.setState.bind(this));
	}
	onCreateState(): BaseState {
		return new BaseState();
	}

	onCreateMain(): ReactNode {
		return (
			<Navigate to="/"/>
		)
	}


	

}
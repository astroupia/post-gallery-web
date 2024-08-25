import { AsyncState, AsyncStatus } from "@/lib/state/asyncState";
import BaseState from "@/lib/state/baseState";
import React from "react";
import SuccessPopup from "./successPopup";


export interface StatusViewProps{
	asyncState: AsyncState
}

export default abstract class StatusView<P extends StatusViewProps, S> extends React.Component<P, S>{
	
	protected abstract getLoadingView(state: AsyncState): React.ReactNode

	protected abstract getDoneView(state: AsyncState): React.ReactNode

	protected abstract getFailedView(state: AsyncState): React.ReactNode

	private getView(state: AsyncState): React.ReactNode{
		switch(state.status){
			
			case AsyncStatus.none:
				return (<></>)
			
			case AsyncStatus.loading:
				return this.getLoadingView(state)
			
			case AsyncStatus.done:
				return this.getDoneView(state)
			
			case AsyncStatus.failed:
				return this.getFailedView(state)
		}
	}

	render(): React.ReactNode {

		return this.getView(this.props.asyncState)
	}

}

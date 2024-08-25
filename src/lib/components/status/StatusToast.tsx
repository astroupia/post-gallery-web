import { ReactNode } from "react";
import StatusView, { StatusViewProps } from "./StatusView";
import Toast from "../toast/Toast";
import { AsyncState } from "@/lib/state/asyncState";


interface StatusToastProps extends StatusViewProps{
	loadingText?: string
	errorText?: string
	doneText?: string
}

interface StatusToastState{
	loadingText: string
	errorText: string
	doneText: string
}


export default class StatusToast extends StatusView<StatusToastProps, StatusToastState>{

	constructor(props: StatusToastProps){
		super(props)
		this.state = {
			loadingText: props.loadingText??"Loading...",
			errorText: props.errorText??"Sorry, an error has occurred.",
			doneText: props.doneText??"Operation Completed Successfully."
		}
	}

	protected getLoadingView(state: AsyncState): ReactNode {
		return <Toast message={this.props.loadingText??"Loading..."} color="blue-500"/>
	}
	protected getDoneView(state: AsyncState): ReactNode {
		return <Toast message={this.props.doneText??"Operation Completed Successfully."} color="lime-500"/>
	}

	protected getFailedView(state: AsyncState): ReactNode {
		return <Toast message={this.props.errorText??"Sorry, an error has occurred."} color="rose-500"/>
	}
}


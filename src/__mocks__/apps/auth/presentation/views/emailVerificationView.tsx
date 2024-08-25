import EmailVerificationViewModel from "@/apps/auth/application/viewmodels/emailVerificationViewModel";

import { AsyncState, AsyncStatus } from "@/lib/state/asyncState";
import React from "react";



export class EmailVerificationView extends React.Component<any, AsyncState>{

	
	private viewModel: EmailVerificationViewModel;

	constructor(props: any){
		super(props);
		this.state = new AsyncState();
		this.viewModel = new EmailVerificationViewModel(this.state, this.setState.bind(this))
	}

	componentDidMount(): void {
		this.viewModel.sendEmail()
	}
	
	render(): React.ReactNode {
		let emailSendStatusMessageMap: Map<AsyncStatus, string> = new Map([
			[AsyncStatus.none, "None"],
			[AsyncStatus.loading, "Sending..."],
			[AsyncStatus.done, "Sent"],
			[AsyncStatus.failed, "Failed to send"]
		])
		return (
			<div className="w-full min-h-screen flex flex-col items-center justify-center">
				<div className="flex flex-col items-center">
					{emailSendStatusMessageMap.get(this.state.status)}
					<p className="text-3xl font-medium">An email has been sent to your account verify it.</p>
					<button onClick={() => {this.viewModel.sendEmail()}} className="flex justify-center items-center w-56 m-auto mt-4 h-16 bg-black text-white rounded-full">
						<div className="justify-center text-2xl">Resend</div>
					</button>
				</div>
			</div>
			
		)
	}

	
}
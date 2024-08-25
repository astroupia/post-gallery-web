import React from "react";
import { AuthenticationStatus } from "../../data/repositories/authenticator";
import { Navigate } from "react-router-dom";
import AuthenticatedComponentState from "../../application/states/authenticatedComponentState";
import AuthenticatedComponentViewModel from "../../application/viewmodels/authenticatedComponentViewModel";
import { AsyncStatus } from "@/lib/state/asyncState";
import LoadingView from "@/lib/components/views/LoadingView";
import ErrorView from "@/lib/components/views/FailedView";
import { Role } from "../../data/models/accounts";


interface AuthenticatedComponentProps{

	validStatus?: AuthenticationStatus[];
	allowedRoles?: Role[];
	redirectionMap?: Map<AuthenticationStatus, string>;
	redirectTo?: string;
	children: React.ReactNode[] | React.ReactNode

}


export default class AuthenticatedComponent extends React.Component<AuthenticatedComponentProps, AuthenticatedComponentState>{


	private validStatus: AuthenticationStatus[]
	private allowedRoles: (Role | null)[];
	private redirectionMap: Map<AuthenticationStatus, string>
	private redirectTo?: string
	private viewModel: AuthenticatedComponentViewModel;

	constructor(
		props: AuthenticatedComponentProps
	){
		super(props);
		this.state = new AuthenticatedComponentState()
		this.viewModel = new AuthenticatedComponentViewModel(this.state, this.setState.bind(this))
		this.validStatus = props.validStatus??[AuthenticationStatus.authenticated]
		this.redirectionMap = props.redirectionMap??(new Map());
		this.redirectTo = props.redirectTo;
		this.allowedRoles = props.allowedRoles??[null, Role.client, Role.admin]
		if(this.redirectTo === undefined){
			this.redirectTo = "/auth/email-verify"
		}
	}


	private getRedirectLocation(status: AuthenticationStatus): string{
		let targetLocation = this.redirectionMap.get(status);
		if(targetLocation === undefined){
			if(this.redirectTo === undefined){
				throw new TargetPathNotFoundException();
			}
			targetLocation = this.redirectTo
		}
		return targetLocation;
	}

	componentDidMount(): void {
		this.viewModel.init()
	}

	

	render(): React.ReactNode {
		let currentLocation = window.location;

		if(this.state.status === AsyncStatus.loading || this.state.status === AsyncStatus.none){
			return (
				<LoadingView/>
			)//TODO: ....
		}
		if(this.state.status === AsyncStatus.failed){
			return (
				<ErrorView error={this.state.error}/>
			)// TODO....
		}

		if(this.validStatus.includes(this.state.authenticationStatus) && this.allowedRoles.includes(this.state.userRole)){
			return this.props.children;
		}

		let futureRedirect = new URLSearchParams(currentLocation.search).get("redirect") ?? currentLocation.pathname
		let targetLocation = `${this.getRedirectLocation(this.state.authenticationStatus)}?redirect=${futureRedirect}`;
		return (
			// <div>{this.state.status}</div>
			<Navigate to={targetLocation} state={{ from : currentLocation}}/>
		)
	}


	
}


class TargetPathNotFoundException extends Error{

}
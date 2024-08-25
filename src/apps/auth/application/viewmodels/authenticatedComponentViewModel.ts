import { User } from "firebase/auth";
import Authenticator, { AuthenticationStatus } from "../../data/repositories/authenticator";
import AuthProviders from "../../di/authProviders";
import AuthenticatedComponentState from "../states/authenticatedComponentState";
import AsyncViewModel from "@/lib/viewmodel/asyncViewModel";



export default class AuthenticatedComponentViewModel extends AsyncViewModel<AuthenticatedComponentState>{


	private authenticator: Authenticator = AuthProviders.provideAuthenticator();


	public async init(){
		this.asyncCall(
			async (state: AuthenticatedComponentState) => {
				state.authenticationStatus = await this.authenticator.getAuthenticationStatus()
				if(state.authenticationStatus != AuthenticationStatus.none){
					state.userRole = await this.authenticator.getUserRole(await this.authenticator.getCurrentUser() as User)
				}
				else{
					state.userRole = null;
				}
			}
		)
	}


}
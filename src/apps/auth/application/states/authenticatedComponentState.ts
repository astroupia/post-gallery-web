import { AsyncState } from "@/lib/state/asyncState";
import { AuthenticationStatus } from "../../data/repositories/authenticator";
import { Role } from "@/Models/Auth/accounts";



export default class AuthenticatedComponentState extends AsyncState{

	authenticationStatus: AuthenticationStatus = AuthenticationStatus.none;
	userRole: Role | null = null; 

}
// import AsyncViewModel from "@/lib/viewmodel/asyncViewModel"
// import LoginState from "../states/loginState";
// import LoginForm from "../forms/loginForm";
// import AuthProviders from "../../di/authProviders";
// import { PGSigninRequest } from "../../data/models/signInRequests";

import AsyncViewModel from "@/lib/viewmodel/asyncViewModel";
import LoginState from "../states/loginState";
import AuthProviders from "../../di/authProviders";


export default class AdminLoginViewModel extends AsyncViewModel<LoginState>{


	private repository = AuthProviders.provideAdminRepository()

	signIn(){
		this.asyncCall(
			async () => {
				await this.state.form.validate(true)
				await this.repository.signIn(
					this.state.form.email.getValue()!,
					this.state.form.password.getValue()!
				)
			}
		)
	}

}

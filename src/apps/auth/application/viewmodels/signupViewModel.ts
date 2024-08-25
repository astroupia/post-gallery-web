import AsyncViewModel from "@/lib/viewmodel/asyncViewModel";
import { PGSignupRequest } from "../../data/models/signupRequests";
import AuthProviders from "../../di/authProviders";
import SignupState from "../states/signupState";


export default class SignUpViewModel extends AsyncViewModel<SignupState>{

	private repository = AuthProviders.provideClientRepository();

	public async signUpWithPG(){
		this.asyncCall(
			async (state: SignupState) => {
				await state.form.validate(true);
				await this.repository.signUpWithPG(
					new PGSignupRequest(
						state.form.fullName.getValue()!,
						state.form.phoneNumber.getValue()!,
						state.form.email.getValue()!,
						state.form.password.getValue()!
					)
				)
			}
		)
	}

	public async signupWithGoogle(){
		this.asyncCall(
			async () => {
				await this.repository.signInWithGoogle()
			}
		)
	}

}
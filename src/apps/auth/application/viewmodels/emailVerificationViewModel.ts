import AsyncViewModel from "@/lib/viewmodel/asyncViewModel";
import AuthProviders from "../../di/authProviders";
import { AsyncState } from "@/lib/state/asyncState";


export default class EmailVerificationViewModel extends AsyncViewModel<AsyncState>{

	private authenticator = AuthProviders.provideAuthenticator();

	public async sendEmail(){
		await this.asyncCall(
			async () => {
				await this.authenticator.sendVerificationEmail();
			},
		)
	}
}
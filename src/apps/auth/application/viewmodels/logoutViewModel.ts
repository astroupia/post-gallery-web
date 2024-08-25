import CoreProviders from "@/apps/core/di/coreproviders";
import ViewModel from "@/lib/viewmodel/viewmodel";
import AuthProviders from "../../di/authProviders";
import BaseState from "@/lib/state/baseState";



export default class LogoutViewModel extends ViewModel<BaseState>{

	private authRepository = AuthProviders.provideClientRepository();

	public async onInit(): Promise<void> {
		await this.authRepository.logout()
	}

}
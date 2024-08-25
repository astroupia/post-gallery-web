import ContextInjector from "@/lib/viewmodel/contextInjector";
import AuthProviders from "../../di/authProviders";
import ViewModel from "@/lib/viewmodel/viewmodel";


export default class ClientInjector extends ContextInjector{

	public async inject(context: Record<string, any>, _viewModel: ViewModel<any>): Promise<void> {
		context.client = await AuthProviders.provideCurrentClient();
	}

}
import { Auth, getAuth } from "firebase/auth";
import { Client } from "../data/models/accounts";
import Authenticator, { AuthenticationStatus } from "../data/repositories/authenticator";
import ClientRepository from "../data/repositories/clientRepository";
import CoreProviders from "@/apps/core/di/coreproviders";
import AdminRepository from "../data/repositories/adminRepository";


const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default class AuthProviders{

	private static clientRepository: ClientRepository | null = null;
	private static adminRepository: AdminRepository | null = null;
	private static authenticator: Authenticator | null = null;

	public static provideClientRepository(): ClientRepository{
		if(AuthProviders.clientRepository === null){
			AuthProviders.clientRepository = new ClientRepository();	
		}
		return AuthProviders.clientRepository!;
	}

	public static provideAdminRepository(): AdminRepository{
		if(this.adminRepository === null){
			this.adminRepository = new AdminRepository();
		}
		return this.adminRepository;
	}

	public static async provideAuth(): Promise<Auth>{
		let fetched: boolean = false;
		getAuth(CoreProviders.provideFirebaseApp()).onAuthStateChanged(() => {
			fetched = true
		})
		while(!fetched){
			await sleep(1000)
		}
		return getAuth(CoreProviders.provideFirebaseApp());
	}

	public static provideAuthenticator(): Authenticator{
		if(AuthProviders.authenticator === null){
			AuthProviders.authenticator = new Authenticator();
		}
		return AuthProviders.authenticator;
	}

	public static async provideCurrentClient(): Promise<Client|	null>{
		return await this.provideClientRepository().getCurrentClient();
	}

	public static async provideAuthenticationStatus(): Promise<AuthenticationStatus>{
		return await this.provideAuthenticator().getAuthenticationStatus()
	}

}
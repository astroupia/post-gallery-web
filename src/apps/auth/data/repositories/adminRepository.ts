import { FireStoreRepository } from "@/lib/repositories/firestoreRepository";
import { Admin } from "../models/accounts";
import Authenticator from "./authenticator";
import CoreProviders from "@/apps/core/di/coreproviders";
import AdminSerializer from "../serializers/adminSerializer";


export default class AdminRepository extends FireStoreRepository<string, Admin>{
	
	private authenticator: Authenticator  = new Authenticator();

	constructor(){
		super(
			CoreProviders.provideFirestoreDB(), 
			"admins",
			"uid",
			new AdminSerializer()
		)
	}
	
	public generateNewPK(instance: Admin): Promise<string> {
		throw new Error("Not Allowed");
	}
	
	public async attachForeignKeys(instance: Admin): Promise<void> {
		
	}

	public async signIn(email: string, password: string): Promise<Admin> {
		let user = await this.authenticator.signInWithEmail(email, password)
		return await this.getByPrimaryKey(user.uid)
	}



}
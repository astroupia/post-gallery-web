import { Client } from "../models/accounts";
import CoreProviders from "@/apps/core/di/coreproviders";
import ClientSerializer from "../serializers/clientSerializer";
import { FireStoreRepository } from "@/lib/repositories/firestoreRepository";
import { PGSigninRequest } from "../models/signInRequests";
import { PGSignupRequest } from "../models/signupRequests";
import Authenticator from "./authenticator";
import Cart from "@/apps/core/data/models/cart";


export default class ClientRepository extends FireStoreRepository<string, Client>{

	private authenticator: Authenticator  = new Authenticator();

	private artworkRepository = CoreProviders.provideArtworkRepository();

	constructor(){
		super(
			CoreProviders.provideFirestoreDB(),
			"clients",
			"uid",
			new ClientSerializer()
		)
	}

	public async generateNewPK(): Promise<string> {
		throw new Error("Not Allowed");
	}

	public async signUpWithPG(request: PGSignupRequest): Promise<Client>{
		let user = await this.authenticator.createWithEmail(request.email, request.password);
		let client = new Client(user.uid, request.fullName, request.phoneNumber, Cart.createEmpty(), request.email);
		await this.create(client);
		return client;
	}

	public async signInWithPG(request: PGSigninRequest): Promise<Client>{
		let user = await this.authenticator.signInWithEmail(request.email, request.password);
		return await this.getByPrimaryKey(user.uid);
	}

	public async signInWithGoogle(): Promise<Client>{
		let user = await this.authenticator.getWithGoogle();
		let client = new Client(user.uid, user.displayName!, user.phoneNumber!, Cart.createEmpty(), user.email!);
		await this.create(client);
		return client;

	}

	public async signInWithApple(): Promise<Client>{
		let user = await this.authenticator.getWithApple();
		let client = new Client(user.uid, user.displayName!, user.phoneNumber!, Cart.createEmpty(), user.email!);
		await this.create(client);
		return client;
	}

	public async getCurrentClient(): Promise<Client | null>{
		let user = await this.authenticator.getCurrentUser();
		if(user === null){
			return null;
		}
		return this.getByPrimaryKey(user.uid)
	}

	public async attachForeignKeys(_instance: Client): Promise<void> {
		_instance.cart.items = [];
		for(let artworkId of _instance.cart.itemsIds){
			_instance.cart.items.push(
				await this.artworkRepository.getByPrimaryKey(artworkId)
			)
		}
	}

	public async logout(): Promise<void>{
		this.authenticator.logout();
	}

}
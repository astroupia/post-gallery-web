import { FireStoreRepository } from "@/lib/repositories/firestoreRepository";
import Inquiry from "../models/inquiry";
import CoreProviders from "../../di/coreproviders";
import InquirySerializer from "../serializers/inquirySerializer";
import SerialPkGenerator from "@/lib/repositories/serialPkGenerator";
import { DBConfigs } from "@/configs/data_configs";
import AuthProviders from "@/apps/auth/di/authProviders";
import ArtworkRepository from "./artworkRepository";




export default class InquiryRepository extends FireStoreRepository<string, Inquiry>{
	
	private primaryKeyGenerator;
	private clientRepository = AuthProviders.provideClientRepository();
	private artworkRepository = new ArtworkRepository(false);
	
	constructor(){
		super(
			CoreProviders.provideFirestoreDB(),
			"inquiries",
			"id",
			new InquirySerializer()
		);
		this.primaryKeyGenerator = new SerialPkGenerator(this, DBConfigs.PRIMARY_KEY_PREFIX, DBConfigs.PRIMARY_KEY_SERIAL_DIGITS, " - IQ")
	}

	public async generateNewPK(instance: Inquiry): Promise<string> {
		return await this.primaryKeyGenerator.generateNewPK();
	}
	public async attachForeignKeys(instance: Inquiry): Promise<void> {
		instance.artwork = await this.artworkRepository.getByPrimaryKey(instance.artworkId);
		instance.client = await this.clientRepository.getByPrimaryKey(instance.clientId);
	}



}
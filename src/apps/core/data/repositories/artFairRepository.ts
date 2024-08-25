import SerialPkGenerator from "@/lib/repositories/serialPkGenerator";
import ArtFair from "../models/artFair";
import { VisibilityRepository } from "./visibilityRepository";
import CoreProviders from "../../di/coreproviders";
import ArtFairSerializer from "../serializers/artFairSerializer";
import { DBConfigs } from "@/configs/data_configs";



export default class ArtFairRepository extends VisibilityRepository<string, ArtFair>{


	private pkGenerator: SerialPkGenerator<ArtFair>;

	constructor(visibleOnly?: boolean){
		super(
			CoreProviders.provideFirestoreDB(),
			"artfair",
			"id",
			new ArtFairSerializer(),
			visibleOnly
		)
		this.pkGenerator = new SerialPkGenerator(this, DBConfigs.PRIMARY_KEY_PREFIX, DBConfigs.PRIMARY_KEY_SERIAL_DIGITS, " - AF")
	}

	public generateNewPK(instance: ArtFair): Promise<string> {
		return this.pkGenerator.generateNewPK();
	}
	public async attachForeignKeys(instance: ArtFair): Promise<void> {
		
	}

}
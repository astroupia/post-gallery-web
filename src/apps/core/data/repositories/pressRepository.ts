import SerialPkGenerator from "@/lib/repositories/serialPkGenerator";
import { VisibilityRepository } from "./visibilityRepository";
import CoreProviders from "../../di/coreproviders";
import { DBConfigs } from "@/configs/data_configs";
import Press from "../models/press";
import PressSerializer from "../serializers/pressSerializer";



export default class PressRepository extends VisibilityRepository<string, Press>{


	private pkGenerator: SerialPkGenerator<Press>;

	constructor(visibleOnly?: boolean){
		super(
			CoreProviders.provideFirestoreDB(),
			"press",
			"id",
			new PressSerializer(),
			visibleOnly
		)
		this.pkGenerator = new SerialPkGenerator(this, DBConfigs.PRIMARY_KEY_PREFIX, DBConfigs.PRIMARY_KEY_SERIAL_DIGITS, " - PS")
	}

	public generateNewPK(instance: Press): Promise<string> {
		return this.pkGenerator.generateNewPK();
	}
	public async attachForeignKeys(instance: Press): Promise<void> {
		
	}

}
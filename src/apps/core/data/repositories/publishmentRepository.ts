import { FireStoreRepository } from "@/lib/repositories/firestoreRepository";
import CoreProviders from "../../di/coreproviders";
import PublishmentSerializer from "../serializers/publishmentSerializer";
import { DBConfigs } from "@/configs/data_configs";
import SerialPkGenerator from "@/lib/repositories/serialPkGenerator";
import Artwork from "../models/artwork";
import { VisibilityRepository } from "./visibilityRepository";
import Publishment, { PublishmentType } from "../models/publishment";



export default class PublishmentRepository extends VisibilityRepository<string, Publishment>{

	private pkGenerator: SerialPkGenerator<Publishment>;

    constructor(visiblity?: boolean){
        super(
            CoreProviders.provideFirestoreDB(),
            "publishment",
            "id",
            new PublishmentSerializer(),
			visiblity
        );
		this.pkGenerator = new SerialPkGenerator(this, DBConfigs.PRIMARY_KEY_PREFIX, DBConfigs.PRIMARY_KEY_SERIAL_DIGITS, " - PM");
    }

    public async generateNewPK(instance: Publishment): Promise<string>{
		return await this.pkGenerator.generateNewPK();
    }
    public async attachForeignKeys(instance: Publishment): Promise<void> {

    }

	public async getByType(publishmentType: PublishmentType): Promise<Publishment[]>{
		return (await this.getAll()).filter(
			(value: Publishment) => {
				return value.type === publishmentType;
			}
		)
	}
    
}
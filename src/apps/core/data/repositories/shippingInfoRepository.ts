import { FireStoreRepository } from "@/lib/repositories/firestoreRepository";
import ShippingInfo from "../models/shippingInfo";
import SerialPkGenerator from "@/lib/repositories/serialPkGenerator";
import CoreProviders from "../../di/coreproviders";
import ShippingInfoSerializer from "../serializers/shippingInfoSerializer";


export default class ShippingInfoRepository extends FireStoreRepository<string, ShippingInfo>{
	
	private privateKeyGenerator: SerialPkGenerator<ShippingInfo>;

	constructor(){
		super(
			CoreProviders.provideFirestoreDB(),
			"shipping_infos",
			"id",
			new ShippingInfoSerializer(),
		)
		this.privateKeyGenerator = new SerialPkGenerator(this, "SI", 5);
	}
	
	
	public generateNewPK(instance: ShippingInfo): Promise<string> {
		return this.privateKeyGenerator.generateNewPK()
	}

	public async getByClientId(clientId: string): Promise<ShippingInfo[]>{
		return (await this.getAll()).filter((value: ShippingInfo) => value.clientId === clientId)
	}

	public async attachForeignKeys(instance: ShippingInfo): Promise<void> {

	}



}
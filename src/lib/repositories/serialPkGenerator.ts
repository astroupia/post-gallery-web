import Model from "../models/model";
import { Repository } from "./repository";


export default class SerialPkGenerator<M extends Model<string>>{

	private repository: Repository<string, M>
	private prefix: string;
	private postfix: string;
	private serialDigits: number;


	constructor(repository: Repository<string, M>, prefix: string = "", serialDigits: number = 5, postfix: string = ""){
		this.repository = repository;
		this.prefix = prefix;
		this.serialDigits = serialDigits;
		this.postfix = postfix;
	}

	private generateIDFromSerial(id: number){
		return `${this.prefix}${String(id).padStart(this.serialDigits, "0")}${this.postfix}`
	}
	private extractSerialFromID(id: string){
		return Number(id.substring(this.prefix.length, this.prefix.length + this.serialDigits))
	}

	private async getLastID(): Promise<string>{
		let pks = (await this.repository.getAll())
		.filter((instance: M) => {return (instance.getPK()!=null && instance.getPK()!.startsWith(this.prefix))})
		.map((instance: M) => instance.getPK()!)
		.sort()
		if(pks.length == 0){
			return this.generateIDFromSerial(0)
		}
		return pks[pks.length - 1]
	}

	public async generateNewPK(): Promise<string> {
		let lastId = await this.getLastID();
		return this.generateIDFromSerial(
			this.extractSerialFromID(
				lastId
			) + 1
		)
	}


}
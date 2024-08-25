export interface Repository<P, M>{

	create(instance: M): Promise<void>
	update(instance: M): Promise<void>
	getByPrimaryKey(pk: P): Promise<M>
	getAll(): Promise<M[]>

}


export class InstanceNotFoundException extends Error{

	constructor(model: String, key: any){
		super(`Instance Not Found for ${model} with key: ${key}`)
	}

}


export class MultipleInstancesFoundException extends Error{


	constructor(model: String, key: any){
		super(`Multiple Instances found for ${model} with key: ${key}`)
	}

}
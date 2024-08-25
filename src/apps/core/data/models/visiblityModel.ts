import Model from "@/lib/models/model";



export default abstract class VisibilityModel<P> implements Model<P>{
	
	public visible: boolean;

	constructor(visible: boolean){
		this.visible = visible;
	}
	
	abstract getPK(): P | null
	abstract setPK(pk: P): void 



} 
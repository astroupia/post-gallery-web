import Field, { TextField } from "@/lib/forms/fields";
import Form from "@/lib/forms/form";



export default class ArtFairForm extends Form{

	name = new TextField();
	link = new TextField();
	cover = new TextField();
	visible = new Field<boolean>();

	getFields(): Field<any>[] {
		return [
			this.name,
			this.link,
			this.cover,
			this.visible
		];
	}



}
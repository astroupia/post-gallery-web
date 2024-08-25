import { PublishmentType } from "@/apps/core/data/models/publishment";
import Field, { TextField } from "@/lib/forms/fields";
import Form from "@/lib/forms/form"
import { formatWithOptions } from "util";



export default class PublishmentForm extends Form{
	
	title = new TextField();
	cover = new TextField();
	content = new TextField();
	publishmentType = new Field<PublishmentType>();
	visible = new Field<boolean>


	getFields(): Field<any>[] {
		return [
			this.title,
			this.cover,
			this.content,
			this.publishmentType,
			this.visible
		];
	}

}
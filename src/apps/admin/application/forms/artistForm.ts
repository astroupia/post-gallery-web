import { Gender } from "@/apps/core/data/models/gender";
import Field, { TextField } from "@/lib/forms/fields";
import Form from "@/lib/forms/form";



export default class ArtistForm extends Form{
	
	firstName: TextField = new TextField()
	lastName: TextField = new TextField()
	gender: Field<Gender> = new Field<Gender>()
	email: TextField = new TextField()
	phoneNumber: TextField = new TextField()
	nationality: TextField = new TextField()
	dateOfBirth: Field<Date> = new Field<Date>()
	biography: TextField = new TextField()
	avatar: TextField = new TextField()
	visible: Field<boolean>  = new Field<boolean>();
	

	getFields(): Field<any>[] {
		return [
			this.firstName,
			this.lastName,
			this.gender,
			this.email,
			this.phoneNumber,
			this.nationality,
			this.dateOfBirth,
			this.biography,
			this.visible
		]
	}

}
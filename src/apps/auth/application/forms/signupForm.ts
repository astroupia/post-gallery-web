import Field, { TextField } from "@/lib/forms/fields";
import Form from "@/lib/forms/form";


export default class SignupForm extends Form{
	
	public fullName: TextField = new TextField(true);
	public email: TextField = new TextField(true);
	public phoneNumber: TextField = new TextField(true);
	public password: TextField = new TextField(true);
	
	getFields(): Field<any>[] {
		return [
			this.fullName,
			this.email,
			this.phoneNumber,
			this.password
		]
	}

}
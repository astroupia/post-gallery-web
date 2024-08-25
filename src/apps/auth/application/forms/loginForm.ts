import Field, { TextField } from "@/lib/forms/fields"
import Form from "@/lib/forms/form"


export default class LoginForm extends Form{

	public email: TextField = new TextField();
	public password: TextField = new TextField();

	getFields(): Field<any>[] {
		return [
			this.email,
			this.password
		]
	
	}

}
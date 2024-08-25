import Field, { TextField } from "@/lib/forms/fields";
import Form from "@/lib/forms/form";



export default class CheckoutForm extends Form{


	public firstName: TextField = new TextField(true);
	public lastName: TextField = new TextField(true);
	public address: TextField = new TextField(true);
	public address2: TextField = new TextField(false);
	public country: TextField = new TextField(true);
	public city: TextField = new TextField(true);
	public region: TextField = new TextField(true);
	public zipCode: TextField = new TextField(true);
	public phoneNumber: TextField = new TextField(true);
	public email: TextField = new TextField(true);

	getFields(): Field<any>[] {
		return [
			this.firstName,
			this.lastName,
			this.address,
			this.address2,
			this.country,
			this.city,
			this.region,
			this.zipCode,
			this.phoneNumber,
			this.email
		]
	}


}
import Model from "@/lib/models/model";


export default class ShippingInfo implements Model<string> {


	public id: string | null;

	public clientId: string;

	public firstName: string;
	public lastName: string;
	public address: string;
	public address2: string | null;
	public country: string;
	public city: string;
	public region: string;
	public zipCode: string;
	public phoneNumber: string;


	constructor(
		id: string | null,
		firstName: string,
		lastName: string,
		address: string,
		address2: string | null,
		country: string,
		city: string,
		region: string,
		zipCode: string,
		phoneNumber: string,
		clientId: string
	) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.address = address;
		this.address2 = address2;
		this.country = country;
		this.city = city;
		this.region = region;
		this.zipCode = zipCode;
		this.phoneNumber = phoneNumber;
		this.clientId = clientId
	}

	getPK(): string | null {
		return this.id;
	}

	setPK(pk: string): void {
		this.id = pk;
	}
}
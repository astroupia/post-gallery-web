import Cart from "@/apps/core/data/models/cart";
import Model from "@/lib/models/model";

export enum Role{
	client,
	artist,
	admin
}


export class Account implements Model<string>{

	public id: string;
	public fullName: string;
	public role: Role;
	public phoneNumber: string;

	constructor(id: string, fullName: string, phoneNumber: string, role: Role){
		this.id = id;
		this.fullName = fullName;
		this.role = role;
		this.phoneNumber = phoneNumber;
	}

	getPK(): string | null {
		return this.id;
	}

	setPK(pk: string): void {
		this.id = pk;
	}

}


export class Client extends Account{


	public cart: Cart;
	public email: string;

	constructor(id: string, fullName: string, phoneNumber: string, cart: Cart, email: string){
		super(id, fullName, phoneNumber, Role.client);
		this.cart = cart;
		this.email = email;
	}

}


export class Admin extends Account{

	constructor(id: string, fullName: string, phoneNumber: string){
		super(id, fullName, phoneNumber, Role.admin)
	}

}

// export class Artist extends Account{

// 	constructor(id: string, fullName: string, phoneNumber: string){
// 		super(id, fullName, phoneNumber, Role.artist);
// 	}

// }


// export class Admin extends Account{

// 	constructor(id: string, fullName: string, phoneNumber: string){
// 		super(id, fullName, phoneNumber, Role.admin);
// 	}

// }
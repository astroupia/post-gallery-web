


export class PGSignupRequest{

	public fullName: string;
	public phoneNumber: string;
	public email: string;
	public password: string;


	constructor(
		fullName: string,
		phoneNumber: string,
		email: string,
		password: string
	){
		this.fullName = fullName;
		this.phoneNumber = phoneNumber;
		this.email = email;
		this.password = password;
	}
	

}
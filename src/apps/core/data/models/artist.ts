import Artwork from "./artwork";
import { Gender } from "./gender";
import VisibilityModel from "./visiblityModel";


export default class Artist extends VisibilityModel<string>{
	
	public id: string | null;
	
	public fullName: string;
	public gender: Gender;
	public email: string;
	public phoneNumber: string;
	public nationality: string;
	public dateOfBirth: Date;
	public biography: string;
	public avatar: string;

	public artworks?: Artwork[];

	public constructor(
		id: string | null = null,
		fullName: string,
		gender: Gender,
		phoneNumber: string,
		email: string,
		nationality: string,
		biography: string,
		dateOfBirth: Date,
		avatar: string,
		visible: boolean
	){
		super(visible);
		this.id = id;
		this.fullName = fullName;
		this.gender = gender;
		this.phoneNumber = phoneNumber;
		this.email = email;
		this.nationality = nationality
		this.biography = biography
		this.dateOfBirth = dateOfBirth
		this.avatar = avatar
	}


	getPK(): string | null {
		return this.id;
	}
	setPK(pk: string): void {
		this.id = pk;
	}

}
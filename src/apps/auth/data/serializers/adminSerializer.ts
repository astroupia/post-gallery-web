import Serializer from "@/lib/serializers/serializer";
import { Admin } from "../models/accounts";
import { DocumentData } from "firebase/firestore";



export default class AdminSerializer extends Serializer<Admin, DocumentData>{
	
	serialize(instance: Admin): DocumentData {
		return {
			uid: instance.id,
			fullName: instance.fullName,
			phoneNumber: instance.phoneNumber,
		}
	}
	
	deserialize(data: DocumentData): Admin {
		return new Admin(
			data.uid,
			data.fullName,
			data.phoneNumber
		)
	}



}
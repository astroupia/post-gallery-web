import Serializer from "./serializer";
import { Timestamp } from "firebase/firestore";


export class DateSerializer extends Serializer<Date, Timestamp>{

	serialize(instance: Date): Timestamp {
		return Timestamp.fromDate(instance)
	}

	deserialize(data: Timestamp): Date {
		return data.toDate()
	}

}
import Serializer from "@/lib/serializers/serializer"
import { DocumentData } from "firebase/firestore";
import Artist from "../models/artist";
import { DateSerializer } from "@/lib/serializers/fieldSerializers";


export default class ArtistSerializer extends Serializer<Artist, DocumentData> {

	private dateSerializer = new DateSerializer();

	serialize(instance: Artist): DocumentData {
	  return {
		id: instance.id,
		full_name: instance.fullName,
		gender: instance.gender,
		email: instance.email,
		phone_number: instance.phoneNumber,
		nationality: instance.nationality,
		biography: instance.biography,
		date_of_birth: instance.dateOfBirth,
		avatar: instance.avatar,
		visible: instance.visible
	  };
	}
  
	deserialize(data: DocumentData): Artist {
		return new Artist(
			data.id,
			data.full_name,
			data.gender,
			data.phone_number,
			data.email,
			data.nationality,
			data.biography,
			this.dateSerializer.deserialize(data.date_of_birth),
			data.avatar,
			data.visible
		);
	}
  
}
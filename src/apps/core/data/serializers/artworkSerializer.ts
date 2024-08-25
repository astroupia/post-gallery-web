import Serializer from "@/lib/serializers/serializer";
import Artwork from "../models/artwork";
import { DocumentData } from "firebase/firestore";
import { DateSerializer } from "@/lib/serializers/fieldSerializers";


export default class ArtworkSerializer extends Serializer<Artwork, DocumentData> {

	private dateSerializer = new DateSerializer();

	serialize(instance: Artwork): DocumentData {
	  return {
		id: instance.id,
		artist_id: instance.artistId,
		name: instance.name,
		description: instance.description,
		price: instance.price,
		dimension: instance.dimension,
		status: instance.status,
		creation_date: this.dateSerializer.serialize(instance.creationDate),
		media_used: instance.mediaUsed,
		images: instance.images ?? [],
		visible: instance.visible
	  };
	}
  
	deserialize(data: DocumentData): Artwork {
	  return new Artwork(
		data.id,
		data.artist_id,
		data.name,
		data.description,
		Number.parseFloat(data.price),
		data.dimension,
		data.status,
		this.dateSerializer.deserialize(data.creation_date),
		data.mediaUsed,
		data.images ?? [],
		data.visible
	  );
	}
  
}
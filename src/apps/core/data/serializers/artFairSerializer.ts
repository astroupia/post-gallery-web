import Serializer from "@/lib/serializers/serializer";
import ArtFair from "../models/artFair";
import { DocumentData } from "firebase/firestore";



export default class ArtFairSerializer extends Serializer<ArtFair, DocumentData>{
	serialize(instance: ArtFair): DocumentData {
		return {
			id: instance.id,
			name: instance.name,
			link: instance.link,
			cover: instance.cover,
			visible: instance.visible
		}
	}
	deserialize(data: DocumentData): ArtFair {
		return new ArtFair(
			data.id,
			data.name,
			data.link,
			data.cover,
			data.visible
		)
	}

} 
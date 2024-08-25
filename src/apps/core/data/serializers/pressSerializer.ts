import Serializer from "@/lib/serializers/serializer";
import { DocumentData } from "firebase/firestore";
import Press from "../models/press";



export default class PressSerializer extends Serializer<Press, DocumentData>{
	serialize(instance: Press): DocumentData {
		return {
			id: instance.id,
			name: instance.name,
			link: instance.link,
			cover: instance.cover,
			visible: instance.visible
		}
	}
	deserialize(data: DocumentData): Press {
		return new Press(
			data.id,
			data.name,
			data.link,
			data.cover,
			data.visible
		)
	}

} 
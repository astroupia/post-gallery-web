import Serializer from "@/lib/serializers/serializer";
import Blog from "../models/publishment";
import { DocumentData } from "firebase/firestore";
import Publishment from "../models/publishment";



export default class PublishmentSerializer extends Serializer<Blog, DocumentData>{
    serialize(instance: Blog): DocumentData {
        return {
            id: instance.getPK(),
            title: instance.title,
			content: instance.content,
			cover: instance.cover,
			type: instance.type,
			visible: instance.visible
        };
    }
    deserialize(data: DocumentData): Blog {
		return new Publishment(
			data.id,
			data.title,
			data.cover,
			data.content,
			data.type,
			data.visible
		);
    }

}
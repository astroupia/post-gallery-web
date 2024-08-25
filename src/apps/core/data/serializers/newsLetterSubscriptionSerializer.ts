import Serializer from "@/lib/serializers/serializer";
import { DocumentData } from "firebase/firestore";
import NewsLetterSubscription from "../models/newsLetterSubscription";


export default class NewsLetterSubscriptionSerializer extends Serializer<NewsLetterSubscription, DocumentData>{
    serialize(instance: NewsLetterSubscription): DocumentData {
        return {
            email: instance.email
        }
    }
    deserialize(data: DocumentData): NewsLetterSubscription {
        return new NewsLetterSubscription(
            data.email
        )
    }
    
}
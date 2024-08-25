import { FireStoreRepository } from "@/lib/repositories/firestoreRepository";
import NewsLetterSubscription from "../models/newsLetterSubscription";
import CoreProviders from "../../di/coreproviders";
import NewsLetterSubscriptionSerializer from "../serializers/newsLetterSubscriptionSerializer";


export default class NewsLetterSubscriptionRepository extends FireStoreRepository<string, NewsLetterSubscription>{

    constructor(){
        super(CoreProviders.provideFirestoreDB(), "news_letter_subscriptions", "email", new NewsLetterSubscriptionSerializer());
    }

    public generateNewPK(instance: NewsLetterSubscription): Promise<string> {
        throw Error("Not Allowed");
    }
    public async attachForeignKeys(instance: NewsLetterSubscription): Promise<void> {

    }
}
import { FIREBASE_CONFIG } from "@/firebase-config";
import { FirebaseApp, initializeApp } from "firebase/app"
import { Firestore, getFirestore } from "firebase/firestore";
import ArtistRepository from "../data/repositories/artistRepository";
import ArtworkRepository from "../data/repositories/artworkRepository";
import FileStorage from "@/lib/filestorage/fileStorage";
import FirebaseFileStorage from "@/lib/filestorage/firebaseFileStorage";
import { getStorage } from "firebase/storage";
import ContextInjector from "@/lib/viewmodel/contextInjector";
import ClientInjector from "@/apps/auth/application/injectors/clientInjector";
import ExhibitionRepository from "../data/repositories/exhibitionRepository";
import OrderRepository from "../data/repositories/orderRepository";
import ShippingInfoRepository from "../data/repositories/shippingInfoRepository";
import Order from "../data/models/order";
import NewsLetterSubscriptionRepository from "../data/repositories/newsLetterSubscriptionRepository";
import NetworkApi from "@/lib/network/NetworkApi";
import { ApiConfigs } from "@/configs/data_configs";
import { PaymentRepository } from "../data/repositories/paymentRepository";
import PublishmentRepository from "../data/repositories/publishmentRepository";



export default class CoreProviders{

	private static app?: FirebaseApp;
	private static artistRepository?: ArtistRepository;
	private static artWorkRepository?: ArtworkRepository;
	private static exhibitionRepository?: ExhibitionRepository;
	private static orderRepository?: OrderRepository;
	private static shippingInfoRepository?: ShippingInfoRepository;
	private static newsLetterSubscriptionRepository?: NewsLetterSubscriptionRepository;
	private static publishmentRepository?: PublishmentRepository;

	public static provideFirebaseApp(): FirebaseApp{
		if(CoreProviders.app === undefined){
			CoreProviders.app = initializeApp(FIREBASE_CONFIG);
		}
		return CoreProviders.app!;
	}

	public static provideFirestoreDB(): Firestore{
		return getFirestore();
	}

	public static provideApiClient(): NetworkApi{
		return new NetworkApi(
			ApiConfigs.API_URL
		);
	}

	public static providePaymentRepository(): PaymentRepository{
		return new PaymentRepository();
	}

	public static provideArtistRepository(): ArtistRepository{
		if(this.artistRepository === undefined){
			this.artistRepository = new ArtistRepository();
		}
		return this.artistRepository;
	}

	public static provideArtworkRepository(): ArtworkRepository{
		if(this.artWorkRepository === undefined){
			this.artWorkRepository = new ArtworkRepository();
		}
		return this.artWorkRepository;
	}

	public static provideExhibitionRepository(): ExhibitionRepository{
		if(this.exhibitionRepository === undefined){
			this.exhibitionRepository = new ExhibitionRepository();
		}
		return this.exhibitionRepository;
	}

	public static provideOrderRepository(): OrderRepository{
		if(this.orderRepository === undefined){
			this.orderRepository = new OrderRepository();
		}
		return this.orderRepository;
	}

	public static provideShippingRepository(): ShippingInfoRepository{
		if(this.shippingInfoRepository === undefined){
			this.shippingInfoRepository = new ShippingInfoRepository();
		}
		return this.shippingInfoRepository;
	}

	public static provideNewsLetterSubscriptoinRepository(): NewsLetterSubscriptionRepository{
		if(this.newsLetterSubscriptionRepository === undefined){
			this.newsLetterSubscriptionRepository = new NewsLetterSubscriptionRepository();
		}
		return this.newsLetterSubscriptionRepository;
	}

	public static providePublishmentRepository(): PublishmentRepository{
		if(this.publishmentRepository === undefined){
			this.publishmentRepository = new PublishmentRepository();
		}
		return this.publishmentRepository;
	}

	public static provideDefaultFileStorage(): FileStorage{
		return new FirebaseFileStorage(getStorage())
	}

	public static provideDefaultInjectors(): ContextInjector[]{
		return [
			new ClientInjector()
		]
	}

}
import { FireStoreRepository } from "@/lib/repositories/firestoreRepository";
import VisibilityModel from "../models/visiblityModel";
import Serializer from "@/lib/serializers/serializer";
import { DocumentData, Firestore } from "firebase/firestore";



export abstract class VisibilityRepository<P, M extends VisibilityModel<P>> extends FireStoreRepository<P, M>{

	private visibleOnly: boolean;
	
	constructor(
		firestore: Firestore,
		collectionName: string,
		primaryKeyColumn: string,
		serializer: Serializer<M, DocumentData>,
		visibleOnly: boolean = true
	){
		super(firestore, collectionName, primaryKeyColumn, serializer);
		this.visibleOnly = visibleOnly;
	}

	private async filteredFetch(fetcher: () => Promise<DocumentData | DocumentData[]>, many?: boolean): Promise<DocumentData | DocumentData[]>{
		let response = await fetcher();
		let docs: DocumentData[];
		if(many){
			docs = response as DocumentData[];
		}
		else{
			docs = [response];
		}
		docs = docs.filter((doc: DocumentData) => {return doc.visible})
		response = docs;
		if(!many){
			response = docs[0]
		}
		return response
	}

	protected async firebaseFetch(fetcher: Function, many?: boolean): Promise<M | M[]> {
		if(!this.visibleOnly){
			return await super.firebaseFetch(fetcher, many);
		}
		return await super.firebaseFetch(
			async () => {
				return await this.filteredFetch(fetcher as () => Promise<DocumentData | DocumentData[]>, many)
			}, 
			many
		)

	}

	public setVisibleOnly(value: boolean){
		this.visibleOnly = value;
	}

}
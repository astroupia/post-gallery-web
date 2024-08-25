import { CollectionReference, DocumentData, Firestore, QueryDocumentSnapshot, 
	doc, getDocs, query, setDoc, where } from "firebase/firestore"
import { collection, addDoc } from "firebase/firestore"; 
import Model from "@/lib/models/model";
import { InstanceNotFoundException, MultipleInstancesFoundException, Repository } from "./repository";
import Serializer from "../serializers/serializer";
import { sleep } from "../utils/time";


export abstract class FireStoreRepository<P, M extends Model<P>> implements Repository<P, M>{

	protected collection: CollectionReference;
	private collectionName: string;
	private primaryKeyColumn: string;
	private serializer: Serializer<M, DocumentData>;
	private attachMode: boolean = true;
	private cache: Map<P, QueryDocumentSnapshot<DocumentData>> = new Map();
	private caching: boolean = true;

 	constructor(
		firestore: Firestore,
		collectionName: string,
		primaryKeyColumn: string,
		serializer: Serializer<M, DocumentData>
	){
		this.collection = collection(firestore, collectionName);
		this.collectionName = collectionName;
		this.primaryKeyColumn = primaryKeyColumn;
		this.serializer = serializer;
	}
	
	protected async getFromCache(pk: P): Promise<QueryDocumentSnapshot<DocumentData> | null>{
		if(!this.caching){
			return null;
		}
		return this.cache.get(pk) ?? null
	} 

	protected async storeToCache(pk: P, instance: QueryDocumentSnapshot<DocumentData>){
		if(!this.caching){
			return;
		}
		this.cache.set(pk, instance) 
	}

	protected async getDocument(pk: P): Promise<QueryDocumentSnapshot<DocumentData>>{
		let cached = await this.getFromCache(pk)
		
		if(cached != null){
			return cached
		}

		let pkQuery = query(this.collection, where(this.primaryKeyColumn, "==", pk));
		let docs = (await getDocs(pkQuery)).docs;
		if(docs.length == 0){
			throw new InstanceNotFoundException(this.collectionName, pk);
		}
		if(docs.length > 1){
			throw new MultipleInstancesFoundException(this.collectionName, pk);
		}
		
		await this.storeToCache(pk, docs[0])
		return docs[0];
	}

	public async getByPrimaryKey(pk: P): Promise<M>{
		let value = await this.firebaseFetch(
			() => {
				return new Promise((resolve, reject) => {
					this.getDocument(pk).then(
						(document) => {
							resolve(document.data())
						}
					).catch((reason) => {
						reject(reason);
					})
				})
			},
			false
		) as M;
		return value
	}

	private async processDocumentData(data: DocumentData): Promise<M>{
		let instance = this.serializer.deserialize(data)
		if(this.attachMode){
			await this.attachForeignKeys(instance)
		}
		return instance;
	}

	protected async firebaseFetch(fetcher: Function, many: boolean = false): Promise<M|M[]>{
			let data: DocumentData | DocumentData[] = await fetcher()
		if(many){
			let instances: M[] = []
			for(let instanceData of (data as DocumentData[])){
				let value = await this.processDocumentData(instanceData);
				instances.push(value);
			}
			return instances;
		}
		if(data === undefined){
			throw new InstanceNotFoundException(this.collectionName, "custom");
		}
		let value = await this.processDocumentData(data);
		return value;

	}

	public abstract generateNewPK(instance: M): Promise<P>

	public async create(instance: M){
		if(instance.getPK() === null){
			instance.setPK(await this.generateNewPK(instance));
		}

		let data: DocumentData = this.serializer.serialize(instance);
		await addDoc(this.collection, data);
	}

	public async update(instance: M){
		let document = await this.getDocument(instance.getPK()!);
		let data = this.serializer.serialize(instance);
		await setDoc(doc(this.collection, document.id), data);
	}

	public async save(instance: M){
		try{
			await this.update(instance);
		}
		catch(ex: any){
			if(!(ex instanceof InstanceNotFoundException)){
				throw ex;
			}
			await this.create(instance);

		}
	}

	public async getAll(): Promise<M[]> {
		let value = await this.firebaseFetch(
			() => {
				return new Promise((resolve, reject) => {
					getDocs(this.collection).then(
						(docs) => {
							let data = docs.docs.map((snapshot: QueryDocumentSnapshot<DocumentData>) => { return snapshot.data() });
							resolve(data);
						}
					).catch((reason) => {
						reject(reason);
					})
				})
			},
			true
		) as M[];
		return value
	}

	public setAttachMode(mode: boolean){
		this.attachMode = mode;
	}

	public setCaching(caching: boolean){
		this.caching = caching;
	}

	public abstract attachForeignKeys(instance: M): Promise<void>
}


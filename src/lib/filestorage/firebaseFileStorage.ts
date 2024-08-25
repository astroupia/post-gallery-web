import { FirebaseStorage, StorageReference, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import FileStorage from "./fileStorage";



export default class FirebaseFileStorage implements FileStorage{
	
	private storageReference: StorageReference;

	constructor(storage: FirebaseStorage, basePath: string = ""){
		this.storageReference = ref(storage, basePath)
	}

	async store(file: File): Promise<string> {
		let fileReference = ref(this.storageReference, file.name)
		let snapshot = await uploadBytes(fileReference, file)
		return await getDownloadURL(snapshot.ref)
	}

}
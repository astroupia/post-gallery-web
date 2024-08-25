import { FireStoreRepository } from "@/lib/repositories/firestoreRepository";
import Artist from "../models/artist";
import CoreProviders from "../../di/coreproviders";
import ArtistSerializer from "../serializers/artistSerializer";
import SerialPkGenerator from "@/lib/repositories/serialPkGenerator";
import ArtworkRepository from "./artworkRepository";
import Artwork from "../models/artwork";
import { DBConfigs } from "@/configs/data_configs";
import { sleep } from "@/lib/utils/time";
import { VisibilityRepository } from "./visibilityRepository";



export default class ArtistRepository extends VisibilityRepository<string, Artist>{
	
	private pkGenerator: SerialPkGenerator<Artist>;

	private artworkRepository: ArtworkRepository = CoreProviders.provideArtworkRepository();

	constructor(visibleOnly?: boolean){
		super(
			CoreProviders.provideFirestoreDB(),
			"artists",
			"id",
			new ArtistSerializer(),
			visibleOnly
		)
		this.pkGenerator = new SerialPkGenerator(this, DBConfigs.PRIMARY_KEY_PREFIX, DBConfigs.PRIMARY_KEY_SERIAL_DIGITS, " - AT")
	}

	public generateNewPK(_instance: Artist): Promise<string> {
		return this.pkGenerator.generateNewPK();
	}

	public async attachForeignKeys(instance: Artist): Promise<void> {
		this.artworkRepository.setAttachMode(false);
		instance.artworks = await this.artworkRepository.getByArtist(instance);
		this.artworkRepository.setAttachMode(true);
		instance.artworks!.forEach(
			(artwork: Artwork) => {
				artwork.artist = instance
			}
		)
	}
	
}
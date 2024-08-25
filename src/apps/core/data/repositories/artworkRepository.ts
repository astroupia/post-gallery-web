import { FireStoreRepository } from "@/lib/repositories/firestoreRepository";
import Artwork from "../models/artwork";
import SerialPkGenerator from "@/lib/repositories/serialPkGenerator";
import Artist from "../models/artist";
import CoreProviders from "../../di/coreproviders";
import ArtworkSerializer from "../serializers/artworkSerializer";
import ArtistRepository from "./artistRepository";
import { DBConfigs } from "@/configs/data_configs";
import { sleep } from "@/lib/utils/time";
import { VisibilityRepository } from "./visibilityRepository";




export default class ArtworkRepository extends VisibilityRepository<string, Artwork>{
	
	private static ID_PREFIX = "Pg"
	private static ID_SERIAL_DIGITS = 5;

	private pkGenerator: SerialPkGenerator<Artwork>;

	private artistRepository?: ArtistRepository;

	constructor(visibleOnly?: boolean){
		super(
			CoreProviders.provideFirestoreDB(),
			"artwork",
			"id",
			new ArtworkSerializer(),
			visibleOnly
		)
		this.pkGenerator = new SerialPkGenerator(this, DBConfigs.PRIMARY_KEY_PREFIX, DBConfigs.PRIMARY_KEY_SERIAL_DIGITS, " - AR")
	}
	
	private getArtistRepository(): ArtistRepository{
		if(this.artistRepository === undefined){
			this.artistRepository = new ArtistRepository(false);
		}
		return this.artistRepository;
	}

	public async generateNewPK(_instance: Artwork): Promise<string> {
		return await this.pkGenerator.generateNewPK();
	}

	public async attachForeignKeys(instance: Artwork): Promise<void> {
		let artistRepository = this.getArtistRepository();
		artistRepository.setAttachMode(false);
		instance.artist = await artistRepository.getByPrimaryKey(instance.artistId);
		artistRepository.setAttachMode(true);

	}

	public async getByArtist(artist: Artist): Promise<Artwork[]>{
		return await this.getByArtistId(artist.getPK()!);
	}

	public async getByArtistId(id: string): Promise<Artwork[]>{
		let all = await this.getAll()
		return all.filter((artwork: Artwork) => {return artwork.artistId === id});
	}



}
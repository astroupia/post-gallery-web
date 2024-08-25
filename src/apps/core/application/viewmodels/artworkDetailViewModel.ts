import AsyncViewModel from "@/lib/viewmodel/asyncViewModel";
import ArtworkDetailState from "../state/artworkDetailState";
import ArtworkRepository from "../../data/repositories/artworkRepository";
import CoreProviders from "../../di/coreproviders";
import InquiryRepository from "../../data/repositories/inquiryRepository";
import ClientRepository from "@/apps/auth/data/repositories/clientRepository";
import AuthProviders from "@/apps/auth/di/authProviders";
import Inquiry from "../../data/models/inquiry";


export default class ArtworkDetailViewModel extends AsyncViewModel<ArtworkDetailState>{

	private artworkRepository: ArtworkRepository = new ArtworkRepository(false);
	private inquiryRepository: InquiryRepository = new InquiryRepository();
	private clientRepository: ClientRepository = AuthProviders.provideClientRepository();

	public async onInit(): Promise<void> {
		this.state.artwork = await this.artworkRepository.getByPrimaryKey(this.state.artworkId)
		await super.onInit();
	}

	protected isReady(): boolean {
		return (this.state.artwork != undefined && 
			this.state.artwork!.artist != undefined);
	}

	public async inquiry(): Promise<void>{
		await this.asyncCall(
			async () => {
				let client = await this.clientRepository.getCurrentClient();
				let inquiry = new Inquiry(
					null,
					this.state.artworkId,
					client!.getPK()!,
					new Date(Date.now())
				);
				await this.inquiryRepository.create(inquiry);
			}
		)
		
	}
}
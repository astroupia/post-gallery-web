import AsyncViewModel from "@/lib/viewmodel/asyncViewModel";
import ArtworkRepository from "../../data/repositories/artworkRepository";
import CoreProviders from "../../di/coreproviders";
import SearchState from "../state/searchState";
import { ValidationException } from "@/lib/forms/form";




export default class SearchViewModel extends AsyncViewModel<SearchState>{

	private repository: ArtworkRepository = CoreProviders.provideArtworkRepository();

	public searchId(){
		this.asyncCall(
			async () => {
				if(!(await this.state.idField.isValid())){
					new ValidationException("Invalid Input");
				}
				this.state.result = await this.repository.getByPrimaryKey(this.state.idField.getValue()!);
			}
		)
	}



}
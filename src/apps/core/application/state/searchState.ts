import { AsyncState } from "@/lib/state/asyncState";
import Artwork from "../../data/models/artwork";
import { TextField } from "@/lib/forms/fields";



export default class SearchState extends AsyncState{

	result?: Artwork;
	idField: TextField = new  TextField(true);

}
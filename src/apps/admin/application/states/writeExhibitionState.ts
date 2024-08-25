import { AsyncState } from "@/lib/state/asyncState";
import ExhibitionForm from "../forms/exhibitionForm";
import Exhibition from "@/apps/core/data/models/exhibition";
import Artwork from "@/apps/core/data/models/artwork";
import Artist from "@/apps/core/data/models/artist";


export default class WriteExhibitionState extends AsyncState{

	public form = new ExhibitionForm();
	public exhibition?: Exhibition

	public exhibtionId?: string;

	public allArtworks?: Artwork[];
	public allArtists?: Artist[];

}
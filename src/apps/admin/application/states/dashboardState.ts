import Artist from "@/apps/core/data/models/artist";
import Artwork from "@/apps/core/data/models/artwork";
import Exhibition from "@/apps/core/data/models/exhibition";
import { AsyncState } from "@/lib/state/asyncState";



export default class DashboardState extends AsyncState{

	artworks?: Artwork[];
	artists?: Artist[];
	exhibitions?: Exhibition[];

}
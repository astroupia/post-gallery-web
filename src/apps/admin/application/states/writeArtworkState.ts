/**
 * 
 * import { AsyncState } from "@/lib/state/asyncState";
import ArtistForm from "../forms/artistForm";
import Artist from "@/apps/core/data/models/artist";


export default class WriteArtistState extends AsyncState{

	form: ArtistForm = new ArtistForm()
	artist?: Artist;

} 
 * 
 */

import { AsyncState } from "@/lib/state/asyncState";
import ArtworkForm from "../forms/artworkForm";
import Artwork from "@/apps/core/data/models/artwork";
import Artist from "@/apps/core/data/models/artist";

export default class WriteArtworkState extends AsyncState{

	form: ArtworkForm = new ArtworkForm();
	artwork?: Artwork;

	artworkId?: string;

	allArtists?: Artist[];

}
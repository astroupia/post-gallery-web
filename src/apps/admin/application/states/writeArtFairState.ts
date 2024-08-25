import { AsyncState } from "@/lib/state/asyncState";
import BaseState from "@/lib/state/baseState";
import ArtFairForm from "../forms/artFairForm";
import ArtFair from "@/apps/core/data/models/artFair";



export default class WriteArtFairState extends AsyncState{

	form = new ArtFairForm();
	artFair?: ArtFair;
	artFairId?: string;

}
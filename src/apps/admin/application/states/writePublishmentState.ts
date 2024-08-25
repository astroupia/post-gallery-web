import { AsyncState } from "@/lib/state/asyncState"
import PublishmentForm from "../forms/publishmentForm"
import Publishment from "@/apps/core/data/models/publishment";
import WriteArtFairState from "./writeArtFairState";
import ArtFairForm from "../forms/artFairForm";
import ArtFair from "@/apps/core/data/models/artFair";
import Press from "@/apps/core/data/models/press";



export default class WritePublishmentState extends AsyncState{

	form: PublishmentForm = new PublishmentForm();
	publishment?: Publishment;
	publishmentId?: string;

	artFairform = new ArtFairForm();
	artFair?: ArtFair;
	press?: Press;
	artFairId?: string;
	pressId?: string;

}
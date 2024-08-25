import ArtFair from "@/apps/core/data/models/artFair";
import Press from "@/apps/core/data/models/press";
import Publishment from "@/apps/core/data/models/publishment";
import { AsyncState } from "@/lib/state/asyncState";


export default class ProjectListState extends AsyncState{

	projects?: Publishment[];
	fairs?: ArtFair[];

}
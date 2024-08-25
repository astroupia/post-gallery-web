import Press from "@/apps/core/data/models/press";
import Publishment from "@/apps/core/data/models/publishment";
import { AsyncState } from "@/lib/state/asyncState";


export default class BlogListState extends AsyncState{

	blogs?: Publishment[];
	presses?: Press[];

}
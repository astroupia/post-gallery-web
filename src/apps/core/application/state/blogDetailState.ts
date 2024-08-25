import { AsyncState } from "@/lib/state/asyncState";
import Blog from "../../data/models/publishment";


export default class BlogDetailState extends AsyncState{

	blogId: string;
	blog?: Blog;

	constructor(blogId: string){
		super();
		this.blogId = blogId;
	}

} 
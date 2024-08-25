import BlogListState from "@/apps/admin/application/states/blogListState";
import BlogListViewModel from "@/apps/admin/application/viewmodels/blogListViewModel";
import Press from "@/apps/core/data/models/press";
import Publishment from "@/apps/core/data/models/publishment";
import ViewModelView from "@/lib/components/views/ViewModelView";
import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";



export default class EditBlogListView extends ViewModelView<BlogListViewModel, any, BlogListState>{
	onCreateViewModel(state: BlogListState): BlogListViewModel {
		return new BlogListViewModel(state, this.setState.bind(this));
	}
	onCreateState(): BlogListState {
		return new BlogListState();
	}

	onCreateMain(): ReactNode {
		return <DashBoardViewInner presses={this.state.presses!} blogs={this.state.blogs!}/>
	}

}

interface AppProps{
	presses: Press[];
	blogs: Publishment[];
}

function DashBoardViewInner(props: AppProps) {

    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
    };
  
  

  return (
    <div >
      <App {...props}/> 

    </div>
  )
}

const App: React.FC<AppProps> = ({presses, blogs}) => {
    return (
        <div >
			<p className='text-2xl font-Lato my-10'>Edit Blogs and Presses</p>  
          <div className='flex flex-row flex-wrap'>
			{
				blogs.map(
					(blog: Publishment) => <Link to={`/admin/blog-press/edit/${blog.getPK()}`} className='font-Lato w-full flex flex-row justify-start items-center h-32 pr-3 mr-5 mb-6 font-medium border-[3px] rounded-md border-[#D6D6D6]'>
					<img className='w-32 h-full mr-5 object-cover' src={blog.cover} />
					<div className='flex flex-col'>
					  <p className="text-2xl text-[#515151]">{blog.title}</p>
					  <div className="lg:py-2"><LineWithWidth10 /></div>
					  <p className="text-base  text-[#787878] ">Blog</p>
					</div>
				  </Link>
				)
			}

			{
				presses.map(
					(press: Press) => <Link to={`/admin/blog-press/edit/${press.getPK()}`} className='font-Lato w-full flex flex-row justify-start items-center h-32 pr-3 mr-5 mb-6 font-medium border-[3px] rounded-md border-[#D6D6D6]'>
					<img className='w-32 h-full mr-5 object-cover' src={press.cover} />
					<div className='flex flex-col'>
					  <p className="text-2xl text-[#515151]">{press.name}</p>
					  <div className="lg:py-2"><LineWithWidth10 /></div>
					  <p className="text-base  text-[#787878] ">Press</p>
					</div>
				  </Link>
				)
			}
            
          </div>
        </div>
    )
}

const LineWithWidth10 = () => {
	return (
	  <div className="w-full border-b-2 border-[#EDEDED]"></div>
	);
  };
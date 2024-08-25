import ProjectListState from "@/apps/admin/application/states/projectListState";
import ProjectListViewModel from "@/apps/admin/application/viewmodels/projectListViewModel";
import ArtFair from "@/apps/core/data/models/artFair";
import Press from "@/apps/core/data/models/press";
import Publishment from "@/apps/core/data/models/publishment";
import ViewModelView from "@/lib/components/views/ViewModelView";
import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";



export class EditProjectListView extends ViewModelView<ProjectListViewModel, any, ProjectListState>{
	onCreateViewModel(state: ProjectListState): ProjectListViewModel {
		return new ProjectListViewModel(state, this.setState.bind(this));
	}
	onCreateState(): ProjectListState {
		return new ProjectListState();
	}

	onCreateMain(): ReactNode {
		return <DashBoardViewInner artFairs={this.state.fairs!} projects={this.state.projects!}/>
	}

}

interface AppProps{
	artFairs: ArtFair[];
	projects: Publishment[];
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

const App: React.FC<AppProps> = ({artFairs: artFairs, projects: projects}) => {
    return (
        <div >
			<p className='text-2xl font-Lato my-10'>Edit Projects and Art Fairs</p>  
          <div className='flex flex-row flex-wrap'>
			{
				projects.map(
					(projects: Publishment) => <Link to={`/admin/project/edit/${projects.getPK()}`} className='font-Lato w-full flex flex-row justify-start items-center h-32 pr-3 mr-5 mb-6 font-medium border-[3px] rounded-md border-[#D6D6D6]'>
					<img className='w-32 h-full mr-5 object-cover' src={projects.cover} />
					<div className='flex flex-col'>
					  <p className="text-2xl text-[#515151]">{projects.title}</p>
					  <div className="lg:py-2"><LineWithWidth10 /></div>
					  <p className="text-base  text-[#787878] ">Project</p>
					</div>
				  </Link>
				)
			}

			{
				artFairs.map(
					(artFairs: ArtFair) => <Link to={`/admin/fair/edit/${artFairs.getPK()}`} className='font-Lato w-full flex flex-row justify-start items-center h-32 pr-3 mr-5 mb-6 font-medium border-[3px] rounded-md border-[#D6D6D6]'>
					<img className='w-32 h-full mr-5 object-cover' src={artFairs.cover} />
					<div className='flex flex-col'>
					  <p className="text-2xl text-[#515151]">{artFairs.name}</p>
					  <div className="lg:py-2"><LineWithWidth10 /></div>
					  <p className="text-base  text-[#787878] ">Art Fair</p>
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
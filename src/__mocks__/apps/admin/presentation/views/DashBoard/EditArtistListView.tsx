import ViewModelView from '@/lib/components/views/ViewModelView';
import DashboardViewModel from '@/apps/admin/application/viewmodels/dashboardViewModel';
import DashboardState from '@/apps/admin/application/states/dashboardState';
import Artwork from '@/apps/core/data/models/artwork';
import Artist from '@/apps/core/data/models/artist';
import Exhibition from '@/apps/core/data/models/exhibition';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


export default class EditArtistListView extends ViewModelView<DashboardViewModel, any, DashboardState>{
	onCreateViewModel(state: DashboardState): DashboardViewModel {
		return new DashboardViewModel(state, this.setState.bind(this));
	}
	onCreateState() {
		return new DashboardState();
	}
	onCreateMain(): React.ReactNode {
		return <DashBoardViewInner artists={this.state.artists!} artworks={this.state.artworks!} exhibitions={this.state.exhibitions!}/>
	}

} 
interface AppProps{
	artworks: Artwork[];
	artists: Artist[];
	exhibitions: Exhibition[];
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

const App: React.FC<AppProps> = ({artworks, artists, exhibitions}) => {
    return (
        <div >
            <p className='text-2xl font-Lato my-10'>Edit Artist</p>  
            <div className='flex flex-row flex-wrap'>
            {
                artists.map(
                    (artist: Artist) => <Link to={`/admin/artist/edit/${artist.getPK()}`} className='font-Lato w-full lg:w-2/5 flex flex-row justify-start items-center h-32 pr-3 mr-5 mb-6 font-medium border-[3px] rounded-md border-[#D6D6D6]'>
                    <img className='w-32 h-full mr-5 object-cover' src={artist.avatar} />
                    <div className='flex flex-col'>
                        <p className="text-2xl text-[#515151]">{artist.fullName}</p>
                        <p className="text-base text-[#787878] ">{artist.email}</p>
                    </div>
                    </Link>
                )
            }


            {/* <Link to="/" className='font-Mulish  w-1/2 flex flex-row justify-start items-center h-32 pr-3 font-medium border-[3px] rounded-md border-[#D6D6D6]'>
                <img className='w-32 h-full mr-5 object-cover' src={edit} />
                <div className='flex flex-col'>
                <p className="text-2xl text-[#515151]">Her Story</p>
                <div className="lg:py-2"><LineWithWidth10 /></div>
                <p className="text-base  text-[#787878] ">Frehiwot Demisse</p>
                <p className="text-base text-[#787878] ">Fri March 17- July 14</p>
                </div>
            </Link> */}
            </div>
        </div>
    )
}

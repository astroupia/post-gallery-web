import TheFooter from '@/lib/components/footer/footer'
import NavBar from '@/lib/components/navBar/navBar'
import collection from "@/assets/about.png"
import BlogListState from "@/apps/core/application/state/blogListState";
import BlogListViewModel from "@/apps/core/application/viewmodels/blogListViewModel";
import Blog, { PublishmentType } from "@/apps/core/data/models/publishment";
import ViewModelView from "@/lib/components/views/ViewModelView"
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import ArtFairListViewModel from '@/apps/core/application/viewmodels/artFairListViewModel';
import ArtFairListState from '@/apps/core/application/state/artFairListState';
import ArtistListState from '@/apps/core/application/state/artistListState';
import ArtFair from '@/apps/core/data/models/artFair';


export default class ArtFairListView extends ViewModelView<ArtFairListViewModel, any, ArtFairListState>{
	
	TITLE_PUBLISHMENT_TYPE_MAPS = [
		"Blogs",
		"Press",
		"Projects",
		"Art Fair"
	]

	onCreateViewModel(state: ArtFairListState): ArtFairListViewModel {
		return new ArtFairListViewModel(state, this.setState.bind(this));
	}
	
	onCreateState(): BlogListState {
		return new BlogListState(this.props.publishmentType);
	}

	onCreateMain(): ReactNode {

		return (
			<div>
				<div className='lg:pr-10 lg:pl-16 '>
					<NavBar isDark={true} />
				</div>
		
				<div className="max-w-[1280px] m-auto px-6 lg:p-4 lg:px-16 font-Lato lg:mb-6">
					<p className='mt-3 mb-5 lg:mb-10 text-2xl lg:text-4xl font-Lato'>Art Fairs</p>
					<div className='flex flex-col lg:flex-row justify-between'>
					{
							this.state.artFairs!.map(
								(fair: ArtFair) => {
									return (<Link to={fair.link} className='w-full lg:w-1/2 flex flex-col lg:mr-12'>
									<img className='w-full h-52 lg:h-96 shadow-md object-cover lg:object-cover' src={fair.cover} />
									<p className='text-xl lg:text-4xl mt-2 lg:my-4'>{fair.name}</p>
								</Link>
								)
								}
							)
						}
					</div>
				</div>
		
				<TheFooter />
			</div>
		  )
		
	}

}

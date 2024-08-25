import ExhibitionListState from "@/apps/core/application/state/exhibitionListState";
import ExhibitionListViewModel from "@/apps/core/application/viewmodels/exhibitionListViewModel";
import Exhibition from "@/apps/core/data/models/exhibition";
import ViewModelView from "@/lib/components/views/ViewModelView";
import { ReactNode, useState } from "react";
import PG from '@/assets/PG.png'
import art from '@/assets/exhibition.png'
import Thefooter from "@/lib/components/footer/footer";
import { Link } from "react-router-dom";
import NavBar from "@/lib/components/navBar/navBar";



export default class ExhibitionListView extends ViewModelView<ExhibitionListViewModel, any, ExhibitionListState>{
	
	onCreateViewModel(state: ExhibitionListState): ExhibitionListViewModel {
		return new ExhibitionListViewModel(state, this.setState.bind(this));
	}

	onCreateState(): ExhibitionListState {
		return new ExhibitionListState()
	}

	onCreateMain(): ReactNode {
		return (
			<div>
				<div className=' lg:pr-10 lg:pl-20'>
					<NavBar isDark={true} />
			  	</div>
				<div className="mt-8 px-3 mb-6 lg:mb-12 lg:pl-20 lg:pr-10">
					<div className="w-full flex flex-row items-center justify-center mt-8 mb-5 px-2.5 lg:mb-8"><p className="text-xl lg:text-2xl text-[#8E8E8E]">CURRENT</p> <LineWithWidth10 /></div>
					<ExhibitionItem exhibition={this.state.currentExhibition!}/>
					
					<div className="w-full flex flex-row items-center justify-center mt-8 mb-5 px-2.5 lg:mt-14 lg:mb-8"><p className="text-xl lg:text-2xl text-[#8E8E8E]">UPCOMING</p> <LineWithWidth10 /></div>
					{
						this.state.upcomingExhibitions!.map(
							(exhibition: Exhibition) => <ExhibitionItem exhibition={exhibition} />
						)
					}

					<div className="w-full flex flex-row items-center justify-center mt-8 mb-5 px-2.5 lg:mt-14 lg:mb-8"><p className="text-xl lg:text-2xl text-[#8E8E8E]">PAST</p> <LineWithWidth10 /></div>
					{
						this.state.pastExhibitions!.map(
							(exhibition: Exhibition) => <ExhibitionItem exhibition={exhibition} />
						)
					}

				</div>
				<div className="w-full border-b border-[#D9DBE9] mt-20"></div>
				<Thefooter />
			</div>
				
		)
	}

}

const LineWithWidth10 = () => {
	return (
	  <div className="w-full border-b-2 border-[#EDEDED]"></div>
	);
  };

interface ExhibitionProps{
	exhibition: Exhibition
}

  const ExhibitionItem = (props: ExhibitionProps) => {
	return (
	  <Link to={`/exhibition/${props.exhibition.getPK()}`} className="w-full flex flex-col lg:flex-row justify-between px-3 mb-10 lg:px-20">
		<img className="w-full lg:w-5/12 h-96 lg:h-[420px] object-cover" src={props.exhibition.coverImage} /> 
		<div className="w-full mt-3 lg:mt-0 lg:w-5/12">
			<p className="text-3xl font-[320] lg:text-[2.8rem]">{props.exhibition.name}</p>
			<p className="text-base lg:text-[1.2rem] leading-7 font-light text-[#787878] lg:pt-6">{props.exhibition.curator}</p>
			<div className="lg:py-2"><LineWithWidth10 /></div>
			<p className="text-base lg:text-[1.2rem] leading-7 font-light text-[#787878] mb-2 lg:mb-4">{props.exhibition.dateRange.startDate.toDateString()} - {props.exhibition.dateRange.endDate.toDateString()}</p>
			<DescriptionComponents description={props.exhibition.description} />
		</div>
	  </Link>
	);
  };

  const DescriptionComponents = ({ description }: { description: String }) => {
	const [showMore, setShowMore] = useState(false);
  
	const toggleShowMore = () => {
	  setShowMore(!showMore);
	}
  
	if (description.length <= 340) {
	  return <p className=" text-base lg:text-[1.1rem] font-light text-[#787878]">{description}</p>;
	}
  
	if (showMore) {
	  return (
		<div>
		  <p className="text-base lg:text-xs font-light text-[#787878]  ">{description}</p>
		  <button className=" leading-[1.7 rem] text-[1.25 rem] lg:text-2xl font-extralight lg:font-semibold" onClick={toggleShowMore}>Show Less</button>
		</div>
	  );
	}
  
	return (
	  <div>
		<p className="text-base lg:text-[1.1rem] font-light text-[#787878]  text-justify">{description.substring(0, 300)}...</p>
		<button className="mt-3 btn btn-primary text-[1.24 rem] font-medium lg:text-xl lg:font-medium" onClick={toggleShowMore}>Read More</button>
	  </div>
	);
  }



import ExhibitionDetailState from "@/apps/core/application/state/exhibitionDetailState";
import ExhibitionDetailViewModel from "@/apps/core/application/viewmodels/exhibitionDetailViewModel";
import ViewModelView from "@/lib/components/views/ViewModelView";
import { FC, ReactNode, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PG from '@/assets/PG.png'
import back from '@/assets/back.png'
import next from '@/assets/forward.png'
import TheFooter from "@/lib/components/footer/footer";
import Artwork, { Dimension } from "@/apps/core/data/models/artwork";
import NavBar from "@/lib/components/navBar/navBar";


interface ExhibitionDetailViewProps{
	exhibitionID: string
	
}

export default class ExhibitionDetailView extends ViewModelView<ExhibitionDetailViewModel, ExhibitionDetailViewProps,  ExhibitionDetailState>{
	
	
	onCreateViewModel(state: ExhibitionDetailState): ExhibitionDetailViewModel {
		return new ExhibitionDetailViewModel(state, this.setState.bind(this));
	}
	onCreateState(): ExhibitionDetailState {
		return new ExhibitionDetailState(this.props.exhibitionID)
	}
	

	onCreateMain(): ReactNode {
		return (
			<div>
				<div className='lg:pr-10 lg:pl-20 '>
					<NavBar isDark={true} />
			  	</div>
				<div className="h-10 lg:h-12"></div>
				<SlideShow artworks={this.state.exhibiton!.artworks!} />
				<div className="w-full px-6 mt-8 lg:mt-20 lg:p-4 lg:px-16">
					<p className="text-4xl lg:text-5xl">{this.state.exhibiton!.name}</p>
					<div className="flex flex-row items-center my-2 lg:mt-10 lg:mb-4 truncate">
						<p className="text-base lg:text-2xl text-black mr-2 lg:mr-8 uppercase">{this.state.exhibiton!.artist!.fullName}</p>
						<p className="text-base lg:text-2xl text-[#787878]">{this.state.exhibiton!.dateRange.startDate.toDateString()} - {this.state.exhibiton!.dateRange.endDate.toDateString()}</p>
					</div>
					<p className="text-lg lg:text-2xl font-light text-justify text-[#787878] leading-[18px] lg:leading-[28px]">
						<DescriptionComponent description={this.state.exhibiton!.description}/>
					</p>
				</div>
				<div className="w-full flex flex-row items-center justify-center mt-6 mb-3 lg:mt-14 lg:mb-8"><p className="pl-6 lg:pl-16 text-base lg:text-2xl text-[#8E8E8E]">ARTWORKS</p> <LineWithWidth10 /></div>
				<div className="w-full flex justify-center items-center p-4 lg:py-8 lg:px-16">
					<Grid 
						data={this.state.exhibiton!.artworks!}						  // .  
					/>
				</div>
				<div className="w-full border-b border-[#D9DBE9] mt-10"></div>
				<TheFooter />
			</div>
		)
	}


}


export function RoutedExhibitionDetailView(){
	let params = useParams();
	return <ExhibitionDetailView exhibitionID={params.id!}/>

}


interface SlideShowProps {
	artworks: Artwork[]
  }
  
  const SlideShow: FC<SlideShowProps> = ({ artworks }) => {
	const [activeIndex, setActiveIndex] = useState(0);
  
	const handlePrev = () => {
	  if (activeIndex > 0) {
		setActiveIndex(activeIndex - 1);
	  } else {
		setActiveIndex(artworks.length - 1);
	  }
	};
  
	const handleNext = () => {
	  if (activeIndex < artworks.length - 1) {
		setActiveIndex(activeIndex + 1);
	  } else {
		setActiveIndex(0);
	  }

	};

	const calcHeight = (dim: Dimension) => {
		return dim.height/dim.width;
	}
  
	return (
		<div className="flex">
			 <div className="mx-auto px-3 lg:p-4 m-auto flex flex-row items-center justify-between lg:px-28">
		<button
		  className=" p-2 lg:mr-14"
		  onClick={handlePrev}
		>
		  <img className="w-4 h-5 lg:w-10 lg:h-12" src={back} />
		</button>
		<Link
			to={`/artwork/${artworks[activeIndex].getPK()}`}
		  className={`relative flex flex-col items-center justify-end text-white text-center  bg-no-repeat bg-contain object-cover`}
		//   style={{ backgroundImage: `url(${artworks[activeIndex].images[0]})`, height: `${calcHeight(artworks[activeIndex].dimension)*(window.innerWidth * 0.75)}px`}}

		>
			<div className="h-[20rem] lg:h-[45rem] max-h-[500px]">
				<img src={artworks[activeIndex].images[0]} className="h-full"/>
			</div>


			<div className="absolute w-full pb-2 lg:pb-6 pt-6" style={{ 
				background: "linear-gradient(2.3deg, rgba(0, 0, 0, 0.7) 1.9%, rgba(0, 0, 0, 0) 100%)" 
			}}>
			
				{/* <p className="text-xl font-semibold leading-[2.85rem] lg:text-3xl lg:font-semibold">{artworks[activeIndex].name}</p> */}
				<p className="text-lg font-medium lg:text-2xl lg:font-medium leading-4">{artworks[activeIndex].artist!.fullName}</p>
				<p className="text-lg font-medium lg:text-2xl lg:font-medium">{artworks[activeIndex].creationDate.getFullYear()}</p>
			</div>
		</Link>
		
  
		<button
		  className="p-2 lg:ml-14"
		  onClick={handleNext}
		>
		  <img className="w-4 h-5 lg:w-10 lg:h-12" src={next} />
		</button>
	  </div>
		</div>
	 
	);
  };

  const LineWithWidth10 = () => {
	return (
	  <div className="w-full border-b-2 border-[#DCDCDC]"></div>
	);
  };

  
  interface GridItemProps {
    imageUrl: string;
    title: string;
    subtitle: string;
	link: string;
}

const GridItem: React.FC<GridItemProps> = ({ imageUrl, title, subtitle, link }) => (
	<div>
		<div className="flex">
			<Link 
				to={link}
				className="relative w-full h-96 lg:h-72  bg-cover bg-center"
				style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: "contain", backgroundRepeat: "no-repeat",  }}
			>

			</Link>
		</div>
		<div className="text-black flex flex-row space-x-2 justify-center font-bold pt-2 text-center pb-3 lg:pb-0">
			<h2 >{title}, </h2>
			<p> {subtitle}, </p>
			<p> 2023</p>
		</div>
	</div>

	
);

interface GridProps {
    data: Artwork[];
}

const Grid: React.FC<GridProps> = ({ data }) => (
    <div className="w-full px-2 lg:px-0 grid grid-flow-row-dense grid-cols-1 lg:grid-cols-4 lg:gap-6 gap-4 gap-y-6 lg:gap-y-14">
        {data.map((item, index) => (
            <GridItem key={index} imageUrl={item.images[0]} title={item.artist!.fullName} subtitle={item.name} link={`/artwork/${item.getPK()}`}/>
        ))}
    </div>
);

const DescriptionComponent = ({ description }: { description: String }) => {
	const [showMore, setShowMore] = useState(false);
  
	const toggleShowMore = () => {
	  setShowMore(!showMore);
	}
  
	if (description.length <= 1000) {
	  return <div className="text-lg lg:text-2xl font-light text-justify text-[#787878] leading-[18px] lg:leading-[28px]">
		{
		description.split("\n").map(
			(par: string) => {
				return <p className="mt-5">{par}</p>
		}
	)}
	</div>;
	}
  
	if (showMore) {
	  return (
		<div>
		  <p className="text-lg lg:text-2xl font-light text-justify text-[#787878] leading-[18px] lg:leading-[28px]">{
		description.split("\n").map(
			(par: string) => {
				return <p className="mt-5">{par}</p>
		}
	)}</p>
		  <button className="btn btn-primary font-semibold" onClick={toggleShowMore}>Show Less</button>
		</div>
	  );
	}
  
	return (
	  <div>
		<p className="text-lg lg:text-2xl font-light text-justify text-[#787878] leading-[18px] lg:leading-[28px]">{description.substring(0, 1000)}...</p>
		<button className="btn btn-primary font-semibold" onClick={toggleShowMore}>Read More</button>
	  </div>
	);
  }

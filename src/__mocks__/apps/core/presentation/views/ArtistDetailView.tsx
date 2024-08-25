import NavBar from "@/lib/components/navBar/navBar";
import React from "react";
import { Link, useParams } from "react-router-dom";
import exhibition from '@/assets/mikiyas/Portrait.jpg'
import share from '@/assets/share.png'
import TheFooter from "@/lib/components/footer/footer";
import collection from "@/assets/col1.png"
import face from "@/assets/Facebook.png"
import youtube from "@/assets/YouTube.png"
import insta from '@/assets/insta.png'
import twitter from '@/assets/twitter.png'
import Arexhibition from '@/assets/col2.png'
import { list } from "firebase/storage";
import ViewModelView from "@/lib/components/views/ViewModelView";
import ArtistDetailViewModel from "@/apps/core/application/viewmodels/artistDetailViewModel";
import ArtistDetailState from "@/apps/core/application/state/artistDetailState";
import Artwork from "@/apps/core/data/models/artwork";




interface ArtistDetailViewProps{
	artistId: string;
}

export default class ArtistDetailView extends ViewModelView<ArtistDetailViewModel, ArtistDetailViewProps, ArtistDetailState>{
  onCreateViewModel(state: ArtistDetailState): ArtistDetailViewModel {
	return new ArtistDetailViewModel(state, this.setState.bind(this));
  }
  onCreateState(): ArtistDetailState {
	return new ArtistDetailState(this.props.artistId);
  }

  onCreateMain(): React.ReactNode {
	return (
		<div>
			<div className='lg:pr-10 lg:pl-20 '>
				<NavBar isDark={true} />
			</div>
			<div className="max-w-[1280px] m-auto px-6 lg:p-4 lg:px-16">
				<p className="text-4xl font-light lg:text-[3.1rem] my-6 lg:my-10 ">Behind the canvas</p>
				<div className="flex flex-col max-w-[1000px] m-auto lg:flex-row items-center justify-between">
					<Link
						to={`/`}
						className={`relative  flex flex-col items-center justify-end text-white shadow-sm text-center  bg-no-repeat bg-contain object-cover`}
						//   style={{ backgroundImage: `url(${artworks[activeIndex].images[0]})`, height: `${calcHeight(artworks[activeIndex].dimension)*(window.innerWidth * 0.75)}px`}}
						
						>
							<div className="h-min max-h-[430px] lg:h-80 lg:max-h-[500px]">
								<img src={this.state.artist!.avatar} className="h-full max-h-[430px]  rounded-3xl"/>
							</div>
	
	
							<div className="absolute w-full h-min max-h-[430px]  flex flex-col pl-8 items-start justify-end pb-8 lg:pb-6 pt-6 rounded-3xl" style={{ 
								background: `linear-gradient(360deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.00) 100%)`
								
							}}>
							
								<p className="text-xl text-start lg:text-2xl ">{this.state.artist!.fullName}</p>
								<p className="text-xl  lg:text-xl leading-4">{this.state.artist!.nationality}</p>
								
							</div>
						</Link>
	
						<div className="hidden lg:inline w-[2px] h-60 bg-[#E9E9E9]"></div>
	
						<div className="flex flex-col items-center mt-7 lg:mt-0 w-full lg:w-5/12 px-4">
							<p className="text-3xl">{this.state.artist!.fullName}</p>
							{/* <p className="text-xl mt-2 mb-4 lg:mt-5 lg:mb-10 text-center">“My work is about capturing moments of everyday life.”</p> */}
							<div className="w-3/2 lg:w-5/12 text-2xl font-medium text-center mt-5">
								<div><p>{this.state.artist!.artworks?.length}</p> <p>Works</p></div>
							</div>
								<div className={` border-black flex flex-row justify-center mt-10 items-center px-4 py-5 h-10 border-2 rounded-md `}>
									<Link to="/auth/login" className="text-xl mr-3">Share</Link>
									<img src={share} className="w-4 object-contain"/>
								</div>
							<div className="w-11/12 max-w-sm lg:w-9/12 flex flex-row items-center justify-between">

								{/* <div>
									<p className="text-lg">Find me at:</p>
									<div className='flex flex-row items-center space-x-3 '>
										<img className='w-5 h-4 object-contain' src={face} />
										<img className='w-5 h-5 object-contain' src={twitter} />
										<img className='w-5 h-5 object-contain' src={insta} />
										<img className='w-6 h-6 object-contain' src={youtube} />
									</div>
								</div> */}
							</div>  
						</div>
	
				</div>
	
				<p className="text-4xl font-light lg:text-[3.1rem] mt-8 mb-4 lg:mt-16 lg:mb-10 ">Works</p>
				<Grid artworks={this.state.artist!.artworks!}/>
	
				<p className="text-4xl font-light lg:text-[3.1rem] mt-8 mb-4 lg:mt-16 lg:mb-10 font-Lato">Biography</p>

				<div className="text-2xl font-light  text-justify font-Lato mb-8 lg:mb-14">
					{this.state.artist!.biography.split("\n").map(
						(par: string) => {
							return <p className="mt-5">{par}</p>
						}
					)}
				</div>
				{/* <Link to={`/`} >
					<div className="relative w-full text-white mb-8 lg:mb-16">
						<img className='w-full h-52 lg:h-min shadow-sm object-cover rounded-2xl lg:object-contain' src={collection} />
						<div className="absolute top-1  text-start px-5 lg:pl-16 lg:pr-28 flex flex-col items-start justify-center h-full">
							<p className="text-3xl  lg:text-5xl lg:mb-4">Collections</p>
							<p className="text-sm  lg:text-2xl leading-5 lg:leading-9 ">It is a painting that depicts the artist's own childhood home. The painting is dominated by warm colors, which create a sense of nostalgia and comfort. The artist's use of light and shadow suggests the passage of time and the artist's memories of the home.</p>
						</div>
					</div>
				</Link> */}
	
	
			</div>
			<TheFooter />
		</div>
	  )
  }

  
}



interface GridItemProps {
    imageUrl: string;
    title: string;
    subtitle: string;
	link: string;
}

const GridItem: React.FC<GridItemProps> = ({ imageUrl, title, subtitle, link }) => (
    <div className="flex flex-col ">
        <div className="w-full h-full flex items-start justify-center shadow-md">
            <Link 
                to={link}
                className="w-full h-96 lg:h-72  bg-cover bg-center shadow-md"
                style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
            >
				<img className="w-full h-96 lg:h-72 bg-cover bg-center" src={imageUrl} />
            </Link>
        </div>
        <div className="w-full mt-3" >
            <div className="text-black text-start">
                <h2 className="text-xl leading-6 text-[#616161]"> {title} </h2>
                <p className="text-xl leading-6 mt-1">{subtitle}</p>
            </div>
        </div>

    </div>
);



interface GridProps{
	artworks: Artwork[]
}

const Grid: React.FC<GridProps> = ({artworks}) => (
    <div className="w-full px-2 lg:px-0 grid grid-flow-row-dense grid-cols-1 lg:grid-cols-4 lg:gap-6 gap-4 gap-y-6 lg:gap-y-14">
        {artworks.map((artwork, index) => (
            <GridItem key={index} imageUrl={artwork.images[0]} title={artwork.name} subtitle={artwork.creationDate.toLocaleString('default', {
				year: "numeric"
			})} link={`/artwork/${artwork.id}/`}/>
        ))}
    </div>
);

export function RoutedArtistDetailView(){
	let params = useParams();
	return <ArtistDetailView artistId={params.id!}/>
}
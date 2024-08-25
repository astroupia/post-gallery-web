import ArtistListState from '@/apps/core/application/state/artistListState';
import ArtistListViewModel from '@/apps/core/application/viewmodels/artistListViewModel';
import Artist from '@/apps/core/data/models/artist';
import TheFooter from '@/lib/components/footer/footer';
import NavBar from '@/lib/components/navBar/navBar';
import ViewModelView from '@/lib/components/views/ViewModelView';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class ArtistListView extends ViewModelView<ArtistListViewModel, any, ArtistListState> {
  onCreateViewModel(state: ArtistListState): ArtistListViewModel {
	return new ArtistListViewModel(state, this.setState.bind(this));
  }
  onCreateState(): ArtistListState {
	return new ArtistListState();
  }
  onCreateMain() {
    return (
        <div>
            <div className='lg:pr-10 lg:pl-20 '>
                <NavBar isDark={true} />
            </div>
            <div className="max-w-[1280px] m-auto px-6 lg:p-4 lg:px-16">
                <p className='text-[2.7rem] font-light leading-8S my-10'>Artist</p>
                <Grid artists={this.state.artists!} />
            </div>
            <TheFooter />
        </div>
    )
  }
}



interface GridItemProps {
    imageUrl: string;
    title: string;
	link: string;
}

const GridItem: React.FC<GridItemProps> = ({ imageUrl, title, link }) => (
    <div className="flex flex-col ">
        <div className="w-full h-full flex items-start justify-center shadow-md">
            <Link 
                to={link}
                className="w-full h-96 lg:h-72  bg-cover bg-center shadow-md"
                style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
            >
            </Link>
        </div>
        <div className="w-full mt-5" >
            <div className="text-black text-start">
                <h2 className="text-[1.3rem] font-normal leading-6 text-[#000000]"> {title} </h2>
                
            </div>
        </div>

    </div>
);


interface GridProps{
	artists: Artist[]
}

const Grid: React.FC<GridProps> = ({artists}) => (
    <div className="w-full px-2 lg:px-0 grid grid-flow-row-dense grid-cols-1 lg:grid-cols-4 lg:gap-6 gap-4 gap-y-6 lg:gap-y-14">
        {artists.map((item, index) => (
            <GridItem key={index} imageUrl={item.avatar} title={item.fullName} link={`/artist/${item.getPK()}`}/>
        ))}
    </div>
);

import React, { useState } from 'react'
import { Link, Route, Router, useLocation } from 'react-router-dom';
import close from '@/assets/close.png'
import menu from '@/assets/menu.png'
import pg from '@/assets/PG.png'
import dashMenu from '@/assets/dashMenu.png'
import dashMenuDark from '@/assets/menuDark.png'
import dashAdd from '@/assets/dashAdd.png'
import dashOrder from '@/assets/dashOrder.png'
import logout from '@/assets/logout.png'
import dashGrid1 from '@/assets/dashGrid1.png'
import dashGrid2 from '@/assets/dashGrid2.png'
import dashGrid3 from '@/assets/dashGrid3.png'
import edit from '@/assets/background1.jpeg'
import { setInterval } from 'timers/promises';
import ViewModelView from '@/lib/components/views/ViewModelView';
import DashboardViewModel from '@/apps/admin/application/viewmodels/dashboardViewModel';
import DashboardState from '@/apps/admin/application/states/dashboardState';
import Artwork from '@/apps/core/data/models/artwork';
import Artist from '@/apps/core/data/models/artist';
import Exhibition from '@/apps/core/data/models/exhibition';
import EditArtistListView from './EditArtistListView';
import EditArtWorkListView from './EditArtWorkListView';
import EditExhibitionListView from './EditExhibitionListView';
import OrdersListViewNew from './OrdersListView';
import DashBoardMainListView from './DashBoardMainListView';
import OrderDetailView from './OrderDetailView';
import OrderListView from './OrdersListView';
import Order from '@/apps/core/data/models/order';
import Inquiry from '@/apps/core/data/models/inquiry';
import InquiryListView from './InquiryListView';
import InquiryDetailView from './InquiryDetailView';
import EditBlogListView from './EditBlogListView';
import { EditProjectListView } from './EditProjectListView';


export default class DashboardView extends ViewModelView<DashboardViewModel, any, DashboardState>{
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
    <div className="relative min-h-screen bg-gray-100">
      <App {...props}/> 

    </div>
  )
}

type SidebarItemProps = {
  title: string;
  active: boolean;
  onClick: () => void;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ title, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex flex-row justify-start pl-4 items-center m-auto mt-4 h-10 bg-black rounded-md text-black font-medium  cursor-pointer ${active ? 'bg-black text-white' : 'bg-transparent'}`}
  >
    <img className='w-5 mr-2' src={title == "Dashboard" && active ? dashMenu : title == "Dashboard" && !active ? dashMenuDark : title == "Add" ? dashAdd : title == "Orders" ? dashOrder : menu} />
    {title}
  </div>
);

type SidebarProps = {
  activeItem: string;
  setActiveItem: (activeItem: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ activeItem, setActiveItem, isOpen, setIsOpen }) => {
  const handleClick = (title: string) => {
    setActiveItem(title);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="bg-[#F2F2F2] w-52 pt-16 p-4 px-8 absolute z-50 h-full">
      <button className='lg:hidden absolute right-6' onClick={() => setIsOpen(false)}><img className='w-4 h-4' src={close} /></button>
      <a href='/'>
        <img src={pg} alt="logo" className="w-14 mb-20 mx-auto" />
      </a>
      <SidebarItem 
        title="Dashboard" 
        active={activeItem === 'Page1'}
        onClick={() => handleClick('Page1')}
      />
      <SidebarItem 
        title="Orders" 
        active={activeItem === 'Page3'}
        onClick={() => handleClick('Page3')}
      />
	  <SidebarItem 
        title="Inquiries" 
        active={activeItem === 'Page4'}
        onClick={() => handleClick('Page4')}
      />
      <img className='w-32 absolute bottom-2' src={logout} />
    </div>
  );
};


const App: React.FC<AppProps> = ({artworks, artists, exhibitions}) => {
  const [activeItem, setActiveItem] = useState<string>('Page1');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [currentOrderId, setCurrentOrderId] = useState<string>("");

  return (
    <div className="h-screen flex">
      
      <Sidebar 
        activeItem={activeItem} 
        setActiveItem={setActiveItem} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen}
      />
      <div className="flex-grow bg-white">
        <button className="p-4" onClick={() => setIsSidebarOpen(true)}><img className='w-4' src={menu} /></button>
        {/* Your content here */}
        <div className={` ${activeItem === 'Page1' ? 'absolute' : 'hidden'} m-2 px-2 lg:ml-64 w-full lg:w-1/2`}>
          <SearchBar />
          <DashBoardMainListView />

          <p className='text-2xl font-Lato mt-10'>Edit</p>
          <div className='w-full flex flex-row space-x-2 mt-2 mb-5'>     
            <div onClick={() => setActiveItem('editartist')} className='w-full flex flex-row justify-start items-center h-16 px-3 text-base font-medium border-[3px] rounded-md border-[#D6D6D6]'>
              <img className='w-8 mr-3' src={dashGrid1} />
              <p>Edit artist</p>
            </div>
            <div onClick={() => setActiveItem('editart')} className='w-full flex flex-row justify-start items-center h-16 px-3 text-base font-medium border-[3px] rounded-md border-[#D6D6D6]'>
              <img className='w-8 mr-3' src={dashGrid2} />
              <p>Edit art</p>
            </div>
            <div onClick={() => setActiveItem('editexhibition')} className='w-full flex flex-row justify-start items-center h-16 px-3 text-base font-medium border-[3px] rounded-md border-[#D6D6D6]'>
              <img className='w-8 mr-3' src={dashGrid3} />
              <p>Edit exhibition</p>
            </div>
		  </div>
		  <div className='w-full flex flex-row space-x-2 mt-2 mb-5'>
			<div onClick={() => setActiveItem('editblog')} className='w-full flex flex-row justify-start items-center h-16 px-3 text-base font-medium border-[3px] rounded-md border-[#D6D6D6]'>
				<img className='w-8 mr-3' src={dashGrid3} />
				<p>Edit Blog</p>
			</div>
			<div onClick={() => setActiveItem('editproject')} className='w-full flex flex-row justify-start items-center h-16 px-3 text-base font-medium border-[3px] rounded-md border-[#D6D6D6]'>
				<img className='w-8 mr-3' src={dashGrid3} />
				<p>Edit Project</p>
			</div>
		  </div>

        </div>


        {/*  here is orders page */}

        <div className={` ${activeItem === 'Page3' ? 'absolute' : 'hidden'} m-2 px-2 lg:ml-64 w-full lg:w-8/12`}>
          <SearchBar />
          <OrderListView onItemSelected={(order: Order) => {
			setActiveItem("orderdetail")
			setCurrentOrderId(order.getPK()!)
			}} />

        </div>

		<div className={` ${activeItem === 'Page4' ? 'absolute' : 'hidden'} m-2 px-2 lg:ml-64 w-full lg:w-8/12`}>
          <SearchBar />
          <InquiryListView onItemSelected={(inquiry: Inquiry) => {
			setActiveItem("inquirydetail")
			setCurrentOrderId(inquiry.getPK()!)
			}} />

        </div>

        {/*  here is edit art page in dashboard */}

        <div className={` ${activeItem === 'editart' ? 'absolute' : 'hidden'} m-2 px-2 lg:ml-64 w-full lg:w-3/4`}>
          <SearchBar />
          <EditArtWorkListView / >
        </div>

         {/*  here is edit artist page in dashboard */}

        <div className={` ${activeItem === 'editartist' ? 'absolute' : 'hidden'} m-2 px-2 lg:ml-64 w-full lg:w-3/4`}>
          <SearchBar />
          <EditArtistListView / > 
        </div>

        {/*  here is edit echibition page in dashboard */}

        <div className={` ${activeItem === 'editexhibition' ? 'absolute' : 'hidden'} m-2 px-2 lg:ml-64 w-full lg:w-3/4`}>
          <SearchBar />
          <EditExhibitionListView />
        </div>

		<div className={` ${activeItem === 'editblog' ? 'absolute' : 'hidden'} m-2 px-2 lg:ml-64 w-full lg:w-3/4`}>
          <SearchBar />
          <EditBlogListView />
        </div>

		<div className={` ${activeItem === 'editproject' ? 'absolute' : 'hidden'} m-2 px-2 lg:ml-64 w-full lg:w-3/4`}>
          <SearchBar />
          <EditProjectListView />
        </div>

		<div className={` ${activeItem === 'orderdetail' ? 'absolute' : 'hidden'} m-2 px-2 lg:ml-64 w-full lg:w-3/4`}>
			{(activeItem === 'orderdetail')?<OrderDetailView orderId={currentOrderId} />: <></>}
        </div>

		<div className={` ${activeItem === 'inquirydetail' ? 'absolute' : 'hidden'} m-2 px-2 lg:ml-64 w-full lg:w-3/4`}>
			{(activeItem === 'inquirydetail')?<InquiryDetailView inquiryId={currentOrderId} />: <></>}
        </div>
        
      </div>
    </div>
  );
};



const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(searchTerm);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="relative max-w-3xl">
      <span className="absolute top-0 left-0 m-2 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </span>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search artists and works"
        className="pl-10 pr-4 py-2.5 rounded-md w-full bg-[#FAFAFA] border border-[#E6E6E6] focus:outline-none focus:border-blue-500"
      />
    </form>
  );
};


const LineWithWidth10 = () => {
	return (
	  <div className="w-full border-b-2 border-[#EDEDED]"></div>
	);
  };
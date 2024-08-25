import TheFooter from '@/lib/components/footer/footer'
import NavBar from '@/lib/components/navBar/navBar'
import collection from "@/assets/exhibition.png"
import about from "@/assets/about.png"
import blogs from "@/assets/moreBlogs.png"
import { Link } from 'react-router-dom'
import BlogDetailState from "@/apps/core/application/state/blogDetailState";
import BlogDetailViewModel from "@/apps/core/application/viewmodels/blogDetailViewModel";
import ViewModelView from "@/lib/components/views/ViewModelView";
import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { Document } from 'react-pdf'


interface BlogDetailProps{
	blogId: string;
}

export default class BlogDetailView extends ViewModelView<BlogDetailViewModel, BlogDetailProps, BlogDetailState>{
	onCreateViewModel(state: BlogDetailState): BlogDetailViewModel {
		return new BlogDetailViewModel(state, this.setState.bind(this));
	}
	onCreateState(): BlogDetailState {
		return new BlogDetailState(this.props.blogId);
	}
	onCreateMain(): ReactNode {
		return (
			<div>
				<div className='lg:pr-10 lg:pl-16 '>
					<NavBar isDark={true} />
				</div>
		
				<div className="w-ful h-screen">
					<iframe
					src={`/assets/pdfjs/web/viewer.html?file=${this.state.blog!.content.replace("&", "%26")}.pdf#zoom=FitH`}
					className='w-full h-full'
					/>
				</div>
		
				<TheFooter />
			</div>
		  )
	}

}


export function RoutedBlogDetailView(){
	let params = useParams();
	return <BlogDetailView blogId={params.id!}/>
}


{

	/*
	
	<div className='hidden lg:inline'>
						<div className='flex flex-row justify-between mt-4'>
							<div className='w-1/2 mr-10'>
								<p className='text-xl lg:text-4xl mt-2 lg:my-2'>{this.state.blog!.title}</p>
								<p className='font-light text-sm lg:text-xl text-[#545454]'>Virtual gallery, July 14 2023</p>
								<p className='text-xl mt-3 leading-[35px] font-light'>She was born in a small village in the middle of nowhere. She didn't have much, but she had a love for art. She would spend hours drawing and painting, using whatever materials she could find.
									When she was old enough, she moved to the city to study art. She was one of the only women in her class, but she didn't let that stop her. She worked hard and eventually graduated at the top of her class.
									After graduating, she started her own art gallery. She showed her work in several exhibitions and quickly gained a reputation as a talented artist. Her paintings were often inspired by her childhood in the village. She loved to capture the beauty of the natural world and the simple . She was born in a small village in the middle of nowhere. She didn't have much, but she had a love for art. She would spend hours drawing and painting, using whatever materials she could find.
									When she was old enough, she moved to the city to study art. She was one of the only women in her class, but she didn't let that stop her. She worked hard and eventually graduated at the top of her class.
								</p>
							</div>
							<div className='w-1/2'>
								<img className='w-full h-52 lg:h-96 shadow-md object-cover lg:object-cover' src={about} />
							</div>
						</div>
					</div>
					<div className='lg:hidden'>
						<div>
							<p className='text-xl lg:text-4xl mt-6 lg:my-2'>New virtual gallery exhibition</p>
							<p className='font-light text-sm lg:text-xl text-[#545454] mb-3'>Virtual gallery, July 14 2023</p>
							<img className='w-full h-52 lg:h-96 shadow-md object-cover lg:object-cover mb-5' src={about} />
							<p className='text-sm font-light'>She was born in a small village in the middle of nowhere. She didn't have much, but she had a love for art. She would spend hours drawing and painting, using whatever materials she could find.
								When she was old enough, she moved to the city to study art. She was one of the only women in her class, but she didn't let that stop her. She worked hard and eventually graduated at the top of her class.
								After graduating, she started her own art gallery. She showed her work in several exhibitions and quickly gained a reputation as a talented artist. Her paintings were often inspired by her childhood in the village. She loved to capture the beauty of the natural world and the simple . She was born in a small village in the middle of nowhere. She didn't have much, but she had a love for art. She would spend hours drawing and painting, using whatever materials she could find.
								When she was old enough, she moved to the city to study art. She was one of the only women in her class, but she didn't let that stop her. She worked hard and eventually graduated at the top of her class.
							</p>
						</div>
					</div>
					<p className='text-2xl font-medium lg:text-4xl mt-8 lg:mt-16 mb-4 '>Read More</p>
					<div className='flex flex-col lg:flex-row'>
						<div className='w-full lg:w-4/12 lg:mr-12 lg:mb-0 mb-8'>
							<img className='w-full h-52 lg:h-64 shadow-md object-cover rounded-2xl lg:object-cover ' src={blogs} />
							<p className='text-xl lg:text-2xl mt-2'>New virtual gallery exhibition</p>
							<p className='font-light lg:text-lg text-[#545454] lg:leading-6 mb-3'>Virtual galleries offer a number of advantages over traditional physical galleries. They are more convenient, </p>
							<div className={` flex flex-row justify-center items-center text-black border-black w-28 lg:w-32 h-10 border-[3px] rounded-xl `}>
								<Link to="/auth/login" className='text-sm lg:text-base' >Read More</Link>
							</div>
						</div>
						<div className='w-full lg:w-4/12 lg:mr-12 lg:mb-0 mb-8'>
							<img className='w-full h-52 lg:h-64 shadow-md object-cover rounded-2xl lg:object-cover ' src={blogs} />
							<p className='text-xl lg:text-2xl mt-2'>New virtual gallery exhibition</p>
							<p className='font-light lg:text-lg text-[#545454] lg:leading-6 mb-3'>Virtual galleries offer a number of advantages over traditional physical galleries. They are more convenient, </p>
							<div className={` flex flex-row justify-center items-center text-black border-black w-28 lg:w-32 h-10 border-[3px] rounded-xl `}>
								<Link to="/auth/login" className='text-sm lg:text-base' >Read More</Link>
							</div>
						</div>
						<div className='w-full lg:w-4/12 lg:mr-12 lg:mb-0 '>
							<img className='w-full h-52 lg:h-64 shadow-md object-cover rounded-2xl lg:object-cover ' src={blogs} />
							<p className='text-xl lg:text-2xl mt-2'>New virtual gallery exhibition</p>
							<p className='font-light lg:text-lg text-[#545454] lg:leading-6 mb-3'>Virtual galleries offer a number of advantages over traditional physical galleries. They are more convenient, </p>
							<div className={` flex flex-row justify-center items-center text-black border-black w-28 lg:w-32 h-10 border-[3px] rounded-xl `}>
								<Link to="/auth/login" className='text-sm lg:text-base' >Read More</Link>
							</div>
						</div>
		
					</div>
	
	*/
}
import menu from '@/assets/unsuccesfull.png'
import { components } from 'react-select'


import React, { Component } from 'react'

interface BlogDetailProps{
	title: string;
  subTitle: string;
}

export default class SuccessfullView extends Component<BlogDetailProps> {

  

  render() {
    return (
        <div>
        <div className="flex flex-col w-full h-screen justify-center items-center max-w-[1280px] m-auto px-6 lg:p-4 lg:px-16">
            <img className='w-20' src={menu} />
            <p className='py-4 font-Lato text-4xl'>{this.props.title}</p>
            <p className='font-Lato text-4xl'>{this.props.subTitle}</p>
            <button onClick={() => {history.back()}} className="h-14  mt-20 bg-black rounded-3xl">	
                <div className="font-medium text-2xl px-14 text-center text-white" >Go Back</div>
            </button>
        </div>
    </div>
    )
  }
}

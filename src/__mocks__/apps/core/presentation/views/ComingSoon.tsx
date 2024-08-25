import React, { Component } from 'react'

export default class ComingSoon extends Component {
  render() {
    return (
      <div>
        <div className="flex flex-col text-white justify-center w-full px-3 lg:pl-32 min-h-screen bg-no-repeat bg-cover bg-[url('@/assets/comingSoon.png')]" >
            <p className='text-5xl lg:text-8xl font-medium'>Coming soon</p>
            <p className='text-4xl lg:text-7xl font-light'>Page under construction</p>
            <button onClick={() => {history.back()}} className="h-12 lg:h-14 w-44 lg:w-64 mt-10 lg:mt-20 bg-white rounded-xl">	
                <div className="font-medium text-2xl lg:text-3xl text-center text-black" >Go Back</div>
            </button>
        </div>
      </div>
    )
  }
}

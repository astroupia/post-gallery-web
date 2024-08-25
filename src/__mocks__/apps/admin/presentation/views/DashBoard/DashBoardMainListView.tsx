import React from 'react'
import { Link } from 'react-router-dom'
import dashGrid1 from '@/assets/dashGrid1.png'
import dashGrid2 from '@/assets/dashGrid2.png'
import dashGrid3 from '@/assets/dashGrid3.png'

export default function 
() {
  return (
    <div>
        <p className='text-lg mt-4 mb-3 font-semibold'>In the last 30 days,</p>
          <div className='w-full flex flex-row space-x-2'>
            <div className="w-full px-2.5 flex items-end rounded-[4px] h-16 text-white bg-[url('./assets/dashGridBg.png')] bg-no-repeat bg-cover">
              <div className='mb-1'>
                <p className='text-2xl font-semibold'>30</p>
                <p className='text-xs'>Total art work sold</p>
              </div>
            </div>
            <div className="w-full px-2.5 flex items-end rounded-[4px] h-16 text-white bg-[url('./assets/dashGridBg.png')] bg-no-repeat bg-cover">
              <div className='mb-1'>
                <p className='text-2xl font-semibold'>51</p>
                <p className='text-xs'>Artwork left to sell</p>
              </div>
            </div>
            <div className="w-full px-2.5 flex items-end rounded-[4px] h-16 text-white bg-[url('./assets/dashGridBg.png')] bg-no-repeat bg-cover">
              <div className='mb-1'>
                <p className='text-2xl font-semibold'>$400,000</p>
                <p className='text-xs'>Revenue generated</p>
              </div>
            </div>       
          </div>

          <p className='text-2xl font-Lato mt-10'>Add</p>
          <div className='w-full flex flex-row space-x-2 mt-2'>
            <Link to="/admin/artist/add" className='w-full flex flex-row justify-start items-center h-16 px-3 text-base font-medium border-[3px] rounded-md border-[#D6D6D6]'>
              <img className='w-8 mr-3' src={dashGrid1} />
              <p>Add Artist</p>
            </Link>
            <Link to="/admin/artwork/add" className='w-full flex flex-row justify-start items-center h-16 px-3 text-base font-medium border-[3px] rounded-md border-[#D6D6D6]'>
              <img className='w-8 mr-3' src={dashGrid2} />
              <p>Add Art</p>
            </Link>
            <Link to="/admin/blog-press/add" className='w-full flex flex-row justify-start items-center h-16 px-3 text-base font-medium border-[3px] rounded-md border-[#D6D6D6]'>
              <img className='w-8 mr-3' src={dashGrid3} />
              <p>Add Blog</p>
            </Link>
			
          </div>

		  
          <div className='flex flex-row space-x-2'>
		  <Link to="/admin/exhibition/add" className='mt-4 w-4/12 flex flex-row justify-start items-center h-16 px-3 text-base font-medium border-[3px] rounded-md border-[#D6D6D6]'>
            <img className='w-8 mr-3' src={dashGrid3} />
            <p>Add Exhibition</p>
          </Link>
		  <Link to="/admin/project-fair/add" className='mt-4 w-4/12 flex flex-row justify-start items-center h-16 px-3 text-base font-medium border-[3px] rounded-md border-[#D6D6D6]'>
            <img className='w-8 mr-3' src={dashGrid3} />
            <p>Add Fair</p>
          </Link>
		  </div>
		    

    </div>
  )
}

import React from 'react'
import HeaderMain from './HeaderMain'
import HotelService from '../common/HotelService'
import Parallax from '../common/Parallax'

const HotelHome = () => {
  return (
    <section>
        <HeaderMain />
        <section className='container'>
            <Parallax />
            <HotelService />
            <Parallax />
        </section>
    </section>
  )
}

export default HotelHome
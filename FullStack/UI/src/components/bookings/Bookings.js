import React, { useEffect, useState } from 'react'
import { cancelBooking, getAllBookings } from '../utils/ApiFunctions'
import Header from '../common/Header'
import BookingsTable from './BookingsTable'

const Bookings = () => {
    const [bookingInfo , setBookingInfo] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const [error, setError] =useState("")
    useEffect(()=>{
        setTimeout(()=>{
            getAllBookings().then((data)=>{
                setIsLoading(false)
                setBookingInfo(data)})
                .catch((error)=>{
                    setIsLoading(false)
                    setError(error.message && "Some error occured")})
        },1500)
    },[])
    const handleBookingCancellation = async(bookingId)=>{
        try{
            await cancelBooking(bookingId)
            const data = await getAllBookings()
            setBookingInfo(data)
        }catch(error){
            setError(error.message && "Some error occured")
        }
    }
  return (
    <section>
        <Header className="container" style={{backgroundColor:"whitesmoke"}} title={"Existing Bookings"}/>
        {error && (
            <div className='text-danger'>
                {error}
            </div>
        )}
        {isLoading ? (<div>
            Loading existing bookings
        </div>):(
            <BookingsTable bookingInfo={bookingInfo} handleBookingCancellation={(e)=>handleBookingCancellation(e)} />
        )}

    </section>
  )
}

export default Bookings
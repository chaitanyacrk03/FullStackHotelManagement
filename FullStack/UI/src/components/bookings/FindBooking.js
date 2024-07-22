import React, { useEffect, useState } from 'react'
import { getAllBookings, getBookingByConfirmationCode } from '../utils/ApiFunctions'

const FindBooking = () => {
  const [bookingConfirmationId,setBookingConfirmationId]= useState("")
  const [bookingInfo,setBookingInfo]= useState(null)
  const [isLoading,setIsLoading]= useState(true)
  const [error,setError]= useState("")
  const getBookingById=async ()=>{
    setIsLoading(true)
    setTimeout(()=>{
      getBookingByConfirmationCode(bookingConfirmationId).then(data=>{
        setIsLoading(false)
        setBookingInfo([data])
      }).catch(error=>{
        setIsLoading(false)
        setError(error.message)
      })
    },1500)
  }
  const clearFilter=() =>{
    setIsLoading(true)
      setTimeout(()=>{
        getAllBookings().then((data)=>{
            setIsLoading(false)
            setBookingInfo(data)})
            .catch((error)=>{
                setIsLoading(false)
                setError(error.message && "Some error occured")})
    },1500)
  }
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
  const onInputChange = (e)=>{
    setBookingConfirmationId(e.target.value)
  }
  return (
    <div>
        <input onChange={onInputChange} type="number" />
        <button onClick={getBookingById} className='btn btn-primary'>Find Booking By Confirmation Code</button>
        <button className='btn btn-secondary' onClick={clearFilter}>
          Clear Filters
        </button>
        {isLoading == true ?(
          <p>Fetching the data</p>
        ):(
          <>
            <table className='table table-bordered table-hover shadow'>
              <thead>
                <tr>
                    <th>S/N</th>
                    <th>Booking ID</th>
                    <th>Room ID</th>
                    <th>Checki-In Date</th>
                    <th>Check-Out Date</th>
                    <th>Guest Name</th>
                    <th>Guest Email</th>
                    <th>Adults</th>
                    <th>Children</th>
                    <th>Total Guests</th>
                    <th>Confirmation Cost</th>
                </tr>
            </thead>
            <tbody className='text-center'>
              {bookingInfo.map((booking,index)=>(
                <tr key={booking.id}>
                    <td>{index+1}</td>
                    <td>{booking.bookingId}</td>
                    <td>{booking.room.id}</td>
                    <td>{booking.checkInDate}</td>
                    <td>{booking.checkOutDate}</td>
                    <td>{booking.guestFullName}</td>
                    <td>{booking.guestEmail}</td>
                    <td>{booking.numOfAdults}</td>
                    <td>{booking.numOfChildren}</td>
                    <td>{booking.totalNumOfGuests}</td>
                    <td>{booking.bookingConfirmationCode}</td>
                </tr>
              ))}
            </tbody>
            </table>
          </>
          )}
    </div>
  )
}

export default FindBooking
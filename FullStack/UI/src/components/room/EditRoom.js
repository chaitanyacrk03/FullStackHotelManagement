import React, { useEffect } from 'react'
import { getRoomById, update } from '../utils/ApiFunctions'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import RoomTypeSelector from '../common/RoomTypeSelector'
import { Link } from 'react-router-dom'
const EditRoom = () => {
  const [room, setRoom]=useState({
    photo:null,
    roomType:"",
    roomPrice:""
})
const [imagePreview,setImagePreview]=useState("")
const [successMessage,setSuccessMessage]=useState("")
const [errorMessage,setErrorMessage]=useState("")
const {roomId}=useParams()
const handleImageChange=(e)=>{
  const selectedImage = e.target.files[0]
  setRoom({...room, photo:selectedImage})
  setImagePreview(URL.createObjectURL(selectedImage))//check

}
useEffect(()=>{
  const fetchRoom= async ()=>{
    try{
      const roomData = await getRoomById(roomId)
      setRoom(roomData)
      setImagePreview(roomData.photo)
    } catch(error){
      console.error(error)
    }
  }
  fetchRoom()
},[roomId])
const handleRoomInputChange=(e)=>{
  const name=e.target.name
  let value=e.target.value
  setRoom({...room,[name]:value})
}
const handleSubmit = async(e)=>{
  e.preventDefault()
  try{
      const response=await update(roomId,room)
      if(response.status ==200){
          setSuccessMessage("Room Updated Sucessfully")
          const updatedRoom=await getRoomById(roomId)
          setRoom(updatedRoom)
          setImagePreview(updatedRoom.photo)
          setErrorMessage("")
      }
      else{
          setErrorMessage("Error updating room")
      }
  }catch(error){
      setErrorMessage(error.errorMessage)
  }
}
return (
  <>
  <section className='container mt-5 mb-5'>
      <div className='row justify-content-center'>
          <div className='col-md-8 col-lg-6'>
              <h2 className='mt-5 mb-2'>
                  Edit Room
              </h2>
              {successMessage && 
              <div className='alert alert-success fade show'>
                  {successMessage}
              </div>}
              {errorMessage && 
              <div className='alert alert-danger fade show'>
                  {errorMessage}
              </div>}
              <form onSubmit={handleSubmit}>
                  <div className='my-3'>
                      <label className='form-label' htmlFor="roomType">Room Type</label>
                      <div>
                          <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} newRoom={room}/>
                      </div>
                  </div>
                  <div className='my-3'>
                      <label className='form-label' htmlFor="roomPrice">Room Price</label>
                      <input className='form-control' type='number' required id='roomPrice' name='roomPrice' value={room.roomPrice} onChange={handleRoomInputChange} />

                  </div>
                  <div className="my-3">
                      <label className='form-label' htmlFor="photo">Photo</label>
                      <input
                      id='photo'
                      name='photo'
                      type='file'
                      className='form-control'
                      onChange={handleImageChange}
                       />
                       {imagePreview && 
                       (<img className='my-3' 
                       style={{maxWidth:"400px", maxHeight:"400px"}} 
                       alt='Preview Room' 
                       src={`data:image/jpeg;base64,${imagePreview}`}/>)}
                       
                  </div>
                  <div className='d-grid d-md-flex mx-2'>
                    <Link to={"/existing-rooms"} className="btn btn-outline-info mx-2">
                      back
                    </Link>
                      <button className='btn btn-outline-primary ml-5'>
                          Edit Room
                      </button>
                  </div>
              </form>
          </div>
      </div>
  </section>
  </>
)
}

export default EditRoom
import React, { useState } from 'react'
import { addRoom } from '../utils/ApiFunctions'
import RoomTypeSelector from '../common/RoomTypeSelector'
import { Link } from 'react-router-dom'
const AddRoom = () => {
    const [newRoom, setNewRoom]=useState({
        photo:null,
        roomType:"",
        roomPrice:""
    })
    const [imagePreview,setImagePreview]=useState("")
    const [successMessage,setSuccessMessage]=useState("")
    const [errorMessage,setErrorMessage]=useState("")
    const handleRoomInputChange=(e)=>{
        const name=e.target.name
        let value=e.target.value
        if(name==="roomPrice"){
            if(!isNaN(value)){
                Number(value)
            }
            else{
                value=""
            }
        }
        setNewRoom({...newRoom,[name]:value})
    }
    const handleImageChange=(e)=>{
        const selectedImage = e.target.files[0]
        setNewRoom({...newRoom, photo:selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))//check

    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const success=await addRoom(newRoom.photo,newRoom.roomType,newRoom.roomPrice)
            if(success !=undefined){
                setSuccessMessage("A new room was added to the DataBase")
                setNewRoom({
                    photo:null,
                    roomType:"",
                    roomPrice:""
                })
                setImagePreview("")
                setErrorMessage("")
            }
            else{
                setErrorMessage("Error adding room")
            }
        }catch(error){
            setErrorMessage(error.errorMessage)
        }
    }
    setTimeout(()=>{
        setErrorMessage("")
        setSuccessMessage("")
    },3000)
  return (
    <>
    <section className='container mt-5 mb-5'>
        <div className='row justify-content-center'>
            <div className='col-md-8 col-lg-6'>
                <h2 className='mt-5 mb-2'>
                    Add a New Room
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
                    <div className='mb-3'>
                        <label className='form-label' htmlFor="roomType">Room Type</label>
                        <div>
                            <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} newRoom={newRoom}/>
                        </div>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label' htmlFor="roomPrice">Room Price</label>
                        <input className='form-control' type='number' required id='roomPrice' name='roomPrice' value={newRoom.roomPrice} onChange={handleRoomInputChange} />

                    </div>
                    <div className='mb-3'>
                        <label className='form-label' htmlFor="photo">Photo</label>
                        <input
                        id='photo'
                        name='photo'
                        type='file'
                        className='form-control'
                        onChange={handleImageChange}
                         />
                         {imagePreview && (<img className='mb-3' style={{maxWidth:"400px", maxHeight:"400px"}} alt='Preview Room Photo' src={imagePreview}/>)}
                    </div>
                    <div className='d-grid d-md-flex mt-2'>
                        <Link className="btn btn-outline-info " to={"/existing-rooms"}>
                        Go Back
                        </Link>
                        <button className='btn btn-outline-primary mx-2'>
                            Save Room
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
    </>
  )
}

export default AddRoom
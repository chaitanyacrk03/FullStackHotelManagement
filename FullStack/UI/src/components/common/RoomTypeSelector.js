import React, { useEffect, useState } from 'react'
import { getRoomTypes } from '../utils/ApiFunctions'
const RoomTypeSelector = ({handleRoomInputChange,newRoom}) => {
    const [roomTypes, setRoomTypes]=useState([""])
    const [showNewRoomTypeInput,setShowNewRoomTypeInput]=useState(false)
    const [newRoomType,setNewRoomType]=useState("")
    useEffect(()=>{
        getRoomTypes().then((data)=>
        setRoomTypes(data)
        )
    },[])
    const handleNewRoomTypeInputChange=(e)=>{
        setNewRoomType(e.target.value)
    }
    const handleAddNewRoomType =()=>{
        if(newRoomType!==""){
            setRoomTypes([...roomTypes,newRoomType])
            setNewRoomType("")
            setShowNewRoomTypeInput(false)
        }
    }
  return (
    <>
        {roomTypes  && 
        <select id='roomType'
        name='roomType'
        value={newRoom.roomType}
        onChange={(e)=>{
            if(e.target.value== "Add New"){
                setShowNewRoomTypeInput(true)
            }else{
                handleRoomInputChange(e)
            }
        }}>
            <option disabled value="">Select a room Type</option>
            <option value={"Add New"}> Add New</option>
            {roomTypes.map((type, index)=>{
                return (<option key={index} value={type}>{type}</option>)
                
            })}
        </select>
        }
        {
            showNewRoomTypeInput && (
                <div className='input-group'>
                    <input className='form-control' 
                    type='text' placeholder='Enter a new room type'
                    onChange={handleNewRoomTypeInputChange}/>
                    <button
                    onClick={handleAddNewRoomType}
                     className='btn btn-hotel' type='button'>
                        Add
                    </button>
                </div>
            )
        }
    </>
  )
}

export default RoomTypeSelector
import React, { useEffect, useState } from 'react'
import RoomFilter from '../common/RoomFilter'
import RoomPaginator from '../common/RoomPaginator'
import { FaEye, FaPlus } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { deleteRoom, getAllRooms } from '../utils/ApiFunctions'
import { Link } from 'react-router-dom'
const ExistingRooms = () => {
    const [rooms,setRooms] = useState([]);
    const [currentPage,setCurrentPage]=useState(1)
    const [roomsPerPage]=useState(4)
    const [isLoading,setIsLoading]=useState(false)
    const [filteredRooms,setFilteredRooms]=useState([])
    const [selectedRoomType,setSelectedRoomType]=useState("")
    const [successMessage,setSuccessMessage]=useState("")
    const [errorMessage,setErrorMessage]=useState("") 
    useEffect(()=>{
        fetchRooms()
    },[])
    const fetchRooms = async() =>{
        setIsLoading(true)
        try{
            const result= await getAllRooms()
            setRooms(result)
            setIsLoading(false)
        }catch(error){
            setErrorMessage(error.errorMessage)
        }
    }
    useEffect(() =>{
        if(selectedRoomType===""){
            setFilteredRooms(rooms)
        }
        else{
            const filtered= rooms.filter((room)=>room?.roomType==selectedRoomType)
            setFilteredRooms(filtered)
        }
        setCurrentPage(1)
    },[selectedRoomType,rooms])
    const handleDelete=async(roomId) =>{
        try {
            const result= await deleteRoom(roomId)
            if(result == ""){
                setSuccessMessage(`Room number ${roomId} has been deleted`)
                fetchRooms()
                console.error(`Error deleting room : ${result.message}`)
            }
        } catch (error) {
            setErrorMessage(error.errorMessage)
        }
        setTimeout(()=>{
            setSuccessMessage("")
            setErrorMessage('')
        },3000)
    }
    const calculateTotalPages= (filteredRooms,roomsPerPage,rooms)=>{
        const totalRooms= filteredRooms.length > 0 ? filteredRooms.length : rooms.length
        return Math.ceil(totalRooms/roomsPerPage)
    }
    const handlePaginationClick = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }
    const indexOfLastRoom=currentPage * roomsPerPage
    const indexOfFirstRoom=indexOfLastRoom - roomsPerPage
    const currentRooms = filteredRooms.slice(indexOfFirstRoom,indexOfLastRoom)

    return (
    <>
      {isLoading ? 
    <div className="spinner-grow" role="status">
            <span className="sr-only">Loading...</span>
    </div> : 
    (<>
    <section className='mt-5 mb-5 container'>
            <div className='d-flex justify-content-center mb-3 mt-5'>
                <h1>Existing rooms 
                    </h1>
            </div>
            <Link to={"/add-room"} >
            <FaPlus /> Add Room
            </Link>
            <span md={6} className='mb-3 mb-md-0'>
            <RoomFilter data={rooms} setFilteredData={setFilteredRooms}/>
            </span>
            <table className='table table-bordered table-hover'>
                <thead>
                    <tr className='text-center'>
                        <th>Id</th>
                        <th>RoomType</th>
                        <th>RoomPrice</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRooms.map((room)=>(
                        <tr key={room.id} className='text-center'>
                            <td>
                                {room.id}
                            </td>
                            <td>
                                {room.roomType}
                            </td>
                            <td>
                                {room.roomPrice}
                            </td>
                            <td className='gap-2'>
                                <Link to={`/edit-room/${room.id}`} className='btn btn-sm'>
                                <span className='btn btn-info btn-sm'><FaEye /></span>&nbsp;&nbsp;
                                <span className='btn btn-warning btn-sm'><FaEdit /></span>
                                </Link>
                                <button className='btn btn-danger btn-sm' onClick={()=>handleDelete(room.id)}>
                                    <MdDeleteForever /> 
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <RoomPaginator 
            currentPage={currentPage}
            totalPages={calculateTotalPages(filteredRooms,roomsPerPage,rooms)}
            onPageChange={handlePaginationClick}/>
        </section>
        </>)}  
    </>
  )
}

export default ExistingRooms
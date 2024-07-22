import axios from "axios";
export const api=axios.create({
    baseURL:"http://localhost:8585"
})
export const getHeader = () =>{
    const token=localStorage.getItem('token')
    return {
        Authorization : `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}
//add a new room to the db
export async function addRoom(photo,roomType,roomPrice){
    const formData=new FormData();
    formData.append("photo",photo)
    formData.append("roomType",roomType)
    formData.append("roomPrice",roomPrice)
    const response=await api.post("/rooms/add/new-room",formData)
    if(response.status===201){
        return true
    }
    else{
        return false;
    }
}
//Get all room type from db
export async function getRoomTypes(){
    try{
        const response=await api.get("/rooms/room-types")
        return response.data
    }
    catch(e){
        throw new Error("Error while fetching room types")
    }

}
//Get all Rooms from db
export async function getAllRooms(){
    try{
        const result= await api.get("/rooms/all-rooms")
        return result.data
    }
    catch(e){
        throw new Error("Error Fetching Rooms")
    }
}
export async function deleteRoom(roomId){
    try {
        const result= await api.delete(`/rooms/delete/room/${roomId}`)
        return result.data
    } catch (error) {
        throw new Error("Error deleting rooms")
    }
}
//to update the view single room page
export async function update(roomId,roomData){
    const formData= new FormData()
    formData.append("roomType",roomData.roomType)
    formData.append("roomPrice",roomData.roomPrice)
    formData.append("photo",roomData.photo)
    const response =await api.put(`/rooms/update/${roomId}`,formData)
    return response
}
// to only view thr view single room page
export async function getRoomById(roomId){
    try {
        const response= await api.get(`/rooms/room/${roomId}`)
        return response.data
    } catch (error) {
        throw new Error(`Error fetching room : ${error.message}`)
    }
}
//saves a new booking to db
export async function bookRoom(roomId, booking){
    try{
        const response= await api.post(`/bookings/room/${roomId}/booking`,booking)
        return response.data
    }
    catch(error){
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        }
        else{
            throw new Error(`Error booking room : ${error.message}`)
        }
    }
}
//get all bookings from db
export async function getAllBookings(){
    try{
        const result = await api.get("/bookings/all-bookings",{
            headers:getHeader()
        });
        return result.data
    }
    catch(error){
        throw new Error(`Error fetching bookings : ${error.message}`)
    }
}
//get booking by the confirmation code generated during booking
export async function getBookingByConfirmationCode(confirmationCode){
    try{
        const result= await api.get(`/bookings/confirmation/${confirmationCode}`)
        return result.data
    }
    catch(error){
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        }
        else{
            throw new Error(`Error finding booking : ${error.message}`)
        }
    }
}
//to cancel a booking
export async function cancelBooking(bookingId){
    try{
        const result= await api.delete(`/bookings/booking/${bookingId}/delete`)
        return result.data
    }catch(error){
        throw new Error(`Error cancelling booking : ${error.message}`)
    }
}
export async function registerUser(register){
    try{
        const response= await api.post('/auth/register-user',register)
        return response.data
    }catch(error){
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        }else{
            throw new Error(`Error registering user: ${error.message}`);
        }
    }
}
export async function loginUser(user){
    try{
        const result= await api.post('/auth/login',user)
        if(result.status>=200 && result.status< 300){
            return result.data
        }
    }catch(error){
        console.error(error)
        return null
    }
}
export async function getUserProfile(userId,token){
    try{
        const response= await api.get(`users/${userId}`,{
            headers:getHeader()
        })
        return response.data
    }catch (error){
        throw error
    }
}
export async function deleteUser(userId){
    try{
        const response = await api.delete(`/users/delete/${userId}`,{
            headers : getHeader()
        })
        return response.data
    }catch(error){
        return error.message
    }
}
export async function getUser(userId, token){
    try{
        const response= await api.get(`/users/${userId}`,{
            headers:getHeader()
        })
        return response.data
    }catch(error){
        throw error
    }
}
export async function getBookingsByUserId(confirmationCode){
    try{
        const response= await api.get(`/bookings/confirmation/${confirmationCode}`)
    }
    catch(error){
        throw error
    }
}
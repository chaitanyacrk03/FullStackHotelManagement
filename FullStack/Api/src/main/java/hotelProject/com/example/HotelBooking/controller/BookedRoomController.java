package hotelProject.com.example.HotelBooking.controller;

import hotelProject.com.example.HotelBooking.model.BookedRoom;
import hotelProject.com.example.HotelBooking.model.Room;
import hotelProject.com.example.HotelBooking.response.BookingResponse;
import hotelProject.com.example.HotelBooking.response.RoomResponse;
import hotelProject.com.example.HotelBooking.service.BookingService;
import hotelProject.com.example.HotelBooking.service.IBookingService;
import hotelProject.com.example.HotelBooking.service.IRoomService;
import hotelProject.com.example.HotelBooking.service.RoomServiceImpl;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/bookings")
public class BookedRoomController {
    @Autowired
    private BookingService bookingService;
    @Autowired
    private RoomServiceImpl iRoomService;
    @GetMapping("all-bookings")
    public ResponseEntity<List<BookingResponse>> getALlBookings(){
        List<BookedRoom> bookings = bookingService.getAllBookings();
        List<BookingResponse> bookingResponses=new ArrayList<>();
        for(BookedRoom room : bookings){
            BookingResponse bookingResponse=getBookingResponse(room);
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }

    private BookingResponse getBookingResponse(BookedRoom booking) {
        Room theRoom = iRoomService.getRoomById(booking.getRoom().getId()).get();
        RoomResponse room=new RoomResponse(
                theRoom.getId(),
                theRoom.getRoomType(),
                theRoom.getRoomPrice());
        return new BookingResponse(
                booking.getBookingId(),
                booking.getCheckInDate(),
                booking.getCheckOutDate(),
                booking.getGuestFullName(),
                booking.getGuestEmail(),
                booking.getNumOfAdults(),
                booking.getNumOfChildren(),
                booking.getTotalNumOfGuest(),
                booking.getBookingConfirmationCode(),
                room);
    }

    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<?> getBookingByConfirmationCode(@PathVariable String confirmationCode){
        try{
            BookedRoom booking= bookingService.findByBookingCode(confirmationCode);
            BookingResponse bookingResponse= getBookingResponse(booking);
            return ResponseEntity.ok(bookingResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    @PostMapping("/room/{roomId}/booking")
    public ResponseEntity<?> saveBooking(@PathVariable Long roomId, @RequestBody BookedRoom bookingRequest){
        try{
            String confirmationCode= bookingService.saveBooking(roomId,bookingRequest);
            return ResponseEntity.ok(
                    "Room booked successfully , Your Booking Confirmation code is :" +confirmationCode);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @DeleteMapping("/booking/{bookingId}/delete")
    public void cancelBooking(@PathVariable Long bookingId){
        bookingService.cancelBooking(bookingId);
    }
}

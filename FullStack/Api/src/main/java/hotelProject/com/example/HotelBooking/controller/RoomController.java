package hotelProject.com.example.HotelBooking.controller;

import hotelProject.com.example.HotelBooking.exception.PhotoRetrieveException;
import hotelProject.com.example.HotelBooking.exception.RoomNotFoundException;
import hotelProject.com.example.HotelBooking.model.BookedRoom;
import hotelProject.com.example.HotelBooking.model.Room;
import hotelProject.com.example.HotelBooking.response.BookingResponse;
import hotelProject.com.example.HotelBooking.response.RoomResponse;
import hotelProject.com.example.HotelBooking.service.BookingService;
import hotelProject.com.example.HotelBooking.service.IBookingService;
import hotelProject.com.example.HotelBooking.service.IRoomService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

//@RequiredArgsConstructor
@RestController
@RequestMapping("/rooms")
public class RoomController {
    @Autowired
    private IRoomService roomService;
    @Autowired
    private final IBookingService bookingService;

    public RoomController(IRoomService roomService, BookingService bookingService) {
        this.roomService = roomService;
        this.bookingService = bookingService;
    }

    @PostMapping("/add/new-room")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<RoomResponse> addNewRoom(@RequestParam("photo") MultipartFile photo, @RequestParam String roomType,@RequestParam int roomPrice) throws SQLException, IOException {
        Room savedRoom=roomService.addnewRoom(photo,roomType,roomPrice);
        RoomResponse roomResponse=new RoomResponse(savedRoom.getId(), savedRoom.getRoomType(),savedRoom.getRoomPrice());
        return ResponseEntity.ok(roomResponse);
    }
    @GetMapping("/room-types")
    public ResponseEntity<List<String>> roomTypes(){
        List<String> roomType= new ArrayList<>();
        return ResponseEntity.ok(roomService.getAllRoomTypes());
    }
    @GetMapping("/all-rooms")
    public ResponseEntity<List<RoomResponse>> getAllRooms(){
        List<Room> rooms=roomService.getAllRooms();
        List<RoomResponse> roomResponses=new ArrayList<>();
        rooms.forEach((room)->{
            byte[] photoBytes= new byte[0];
            try {
                photoBytes = roomService.getRoomPhotoByRoomId(room.getId());
            } catch (FileNotFoundException e) {
                throw new RuntimeException(e);
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
            if(photoBytes != null && photoBytes.length>0){
                String base64Photo= Base64.getEncoder().encodeToString(photoBytes);
                RoomResponse roomResponse= getRoomResponse(room);
                roomResponse.setPhoto(base64Photo);
                roomResponses.add(roomResponse);
            }
        });
        return ResponseEntity.ok(roomResponses);
    }
    @DeleteMapping("/delete/room/{roomId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long roomId){
        roomService.deleteRoom(roomId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/room-response")

    private RoomResponse getRoomResponse(Room room) {
        List<BookedRoom> bookings= getAllBookingsByRoomId(room.getId());
        List<BookingResponse> bookingInfo= bookings.stream().map(booking-> new BookingResponse(booking.getBookingId(),
                booking.getCheckInDate(),
                booking.getCheckOutDate(),booking.getBookingConfirmationCode())).toList();
        byte[] photoBytes= null;
        Blob photoBlob = room.getPhoto();
        if(photoBlob!=null){
            try{
                photoBytes= photoBlob.getBytes(1, (int) photoBlob.length());
            } catch (SQLException e) {
                throw new PhotoRetrieveException("Error retrieving photo");
            }
        }
        return new RoomResponse(room.getId(),
                room.getRoomType(),
                room.getRoomPrice(),
                room.isBooked(),photoBytes,bookingInfo);
    }

    private List<BookedRoom> getAllBookingsByRoomId(Long roomId) {
        return bookingService.getAllBookingsByRoomId(roomId);
    }
    @PutMapping("/update/{roomId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<RoomResponse> updateRoom(@PathVariable Long roomId,
                                                   @RequestParam(required = false) String roomType,
                                                   @RequestParam(required = false) int roomPrice,
                                                   @RequestParam(required = false) MultipartFile photo) throws SQLException, IOException {
        byte[] photoBytes = photo != null && !photo.isEmpty()? photo.getBytes() : roomService.getRoomPhotoByRoomId(roomId);
        Blob blob = photoBytes!=null && photoBytes.length>0 ? new SerialBlob(photoBytes) : null;
        Room theRoom = roomService.updateRoom(roomId,roomType,roomPrice, photoBytes);
        theRoom.setPhoto((blob));
        RoomResponse roomResponse=getRoomResponse(theRoom);
        return ResponseEntity.ok(roomResponse);
    }
    @GetMapping("/room/{roomId}")
    public ResponseEntity<Optional<RoomResponse>> getRoomById(@PathVariable Long roomId){
        Optional<Room> theRoom= roomService.getRoomById(roomId);
        return theRoom.map(room -> {
            System.out.println(room);
            RoomResponse roomResponse= getRoomResponse(room);
            return ResponseEntity.ok(Optional.of(roomResponse));
        }).orElseThrow(()-> new RoomNotFoundException("Room not found"));
    }

}


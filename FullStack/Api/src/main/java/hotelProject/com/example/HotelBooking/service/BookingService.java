package hotelProject.com.example.HotelBooking.service;

import hotelProject.com.example.HotelBooking.model.BookedRoom;
import hotelProject.com.example.HotelBooking.model.Room;
import hotelProject.com.example.HotelBooking.repository.BookedRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService implements IBookingService{
    @Autowired
    private BookedRoomRepository bookingRepository;
    @Autowired
    private IRoomService iRoomService;
    @Override
    public List<BookedRoom> getAllBookings() {
        return bookingRepository.findAll();
    }
@Override
    public List<BookedRoom> getAllBookingsByRoomId(Long roomId) {
        return bookingRepository.findByRoomId(roomId);
    }

    @Override
    public void cancelBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }

    @Override
    public String saveBooking(Long roomId, BookedRoom bookingRequest) throws Exception {
        if(bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())){
            throw new RuntimeException("Check in date must come before checkout date");
        }
        Room room=iRoomService.getRoomById(roomId).get();
        List<BookedRoom> existingBookings = room.getBookings();
        boolean roomIsAvailable = roomIsAvailable(bookingRequest,existingBookings);
        if(roomIsAvailable){
            room.addBooking(bookingRequest);
            bookingRepository.save(bookingRequest);
        }else{
            throw new Exception("This room is not available");
        }
        return bookingRequest.getBookingConfirmationCode();
    }

    private boolean roomIsAvailable(BookedRoom bookingRequest, List<BookedRoom> existingBookings) {
        return existingBookings.stream()
                .noneMatch(existingBooking->
                        (bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())
                        || bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckOutDate())
                        || bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())
                && (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate())
                || bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())))

                && (bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate())
                || bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate()))

                && bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckOutDate())

                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate()))
                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                        && bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate())));
    }

    @Override
    public BookedRoom findByBookingCode(String confirmationCode) {
        return bookingRepository.findByBookingConfirmationCode(confirmationCode);
    }
}

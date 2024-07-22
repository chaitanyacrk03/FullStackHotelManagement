package hotelProject.com.example.HotelBooking.service;

import hotelProject.com.example.HotelBooking.model.BookedRoom;

import java.util.List;

public interface IBookingService {
    List<BookedRoom> getAllBookings();

    List<BookedRoom> getAllBookingsByRoomId(Long roomId);

    void cancelBooking(Long bookingId);

    String saveBooking(Long roomId, BookedRoom bookingRequest) throws Exception;

    BookedRoom findByBookingCode(String confirmationCode);
}

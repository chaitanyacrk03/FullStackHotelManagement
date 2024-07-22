package hotelProject.com.example.HotelBooking.repository;

import hotelProject.com.example.HotelBooking.model.BookedRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookedRoomRepository extends JpaRepository<BookedRoom,Long> {
    List<BookedRoom> findByRoomId(Long roomId);


    BookedRoom findByBookingConfirmationCode(String confirmationCode);
}

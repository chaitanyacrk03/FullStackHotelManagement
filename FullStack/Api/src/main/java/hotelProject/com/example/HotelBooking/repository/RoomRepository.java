package hotelProject.com.example.HotelBooking.repository;

import hotelProject.com.example.HotelBooking.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room,Long> {
    @Query("SELECT distinct r.roomType FROM Room r")
    List<String> findDistinctRoomTypes();
}

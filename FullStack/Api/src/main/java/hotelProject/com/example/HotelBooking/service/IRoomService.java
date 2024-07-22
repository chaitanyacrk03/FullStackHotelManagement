package hotelProject.com.example.HotelBooking.service;

import hotelProject.com.example.HotelBooking.model.Room;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;


public interface IRoomService {
    Room addnewRoom(MultipartFile photo, String roomType, int roomPrice) throws IOException, SQLException;
    List<String> getAllRoomTypes();
    List<Room> getAllRooms();

    byte[] getRoomPhotoByRoomId(Long roomId) throws FileNotFoundException, SQLException;

    void deleteRoom(Long roomId);

    Room updateRoom(Long roomId, String roomType, int roomPrice, byte[] photoBytes);

    Optional<Room> getRoomById(Long roomId);
}

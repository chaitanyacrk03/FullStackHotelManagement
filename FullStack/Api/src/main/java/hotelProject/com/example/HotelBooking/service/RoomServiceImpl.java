package hotelProject.com.example.HotelBooking.service;

import hotelProject.com.example.HotelBooking.exception.RoomNotFoundException;
import hotelProject.com.example.HotelBooking.model.Room;
import hotelProject.com.example.HotelBooking.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service

public class RoomServiceImpl implements IRoomService {
    @Autowired
    private RoomRepository roomRepository;

    @Override
    public Room addnewRoom(MultipartFile photo, String roomType, int roomPrice) throws IOException, SQLException {
        Room room = new Room();
        room.setRoomType(roomType);
        room.setRoomPrice(roomPrice);
        if (!photo.isEmpty()) {
            byte[] photoByte = photo.getBytes();
            Blob photoBlob = new SerialBlob(photoByte);
            room.setPhoto(photoBlob);
        }
        return roomRepository.save(room);
    }

    @Override
    public List<String> getAllRoomTypes() {
        return roomRepository.findDistinctRoomTypes();
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public byte[] getRoomPhotoByRoomId(Long roomId) throws RoomNotFoundException, SQLException {
        Optional<Room> theRoom = roomRepository.findById(roomId);
        if (theRoom.isEmpty()) {
            throw new RoomNotFoundException("Sorry , Room not found");
        }
        Blob photoBlob = theRoom.get().getPhoto();
        if (photoBlob != null) {
            return photoBlob.getBytes(1, (int) photoBlob.length());
        }
        return null;
    }

    @Override
    public void deleteRoom(Long roomId) {
        Optional<Room> theRoom = roomRepository.findById(roomId);
        if (theRoom.isPresent()) {
            roomRepository.deleteById(roomId);
        }
    }

    @Override
    public Room updateRoom(Long roomId, String roomType, int roomPrice, byte[] photoBytes) {
        Room room = roomRepository.findById(roomId).get();
        if (roomType != null){
            room.setRoomType(roomType);
        }
        if (roomPrice!=0){
            room.setRoomPrice(roomPrice);
        }
        if (photoBytes!= null && photoBytes.length>0){
            try{
                room.setPhoto(new SerialBlob(photoBytes));
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        return roomRepository.save(room);
    }

    @Override
    public Optional<Room> getRoomById(Long roomId) {
        return roomRepository.findById(roomId);
    }
}
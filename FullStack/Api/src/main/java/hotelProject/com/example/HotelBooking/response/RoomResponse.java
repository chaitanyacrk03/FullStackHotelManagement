package hotelProject.com.example.HotelBooking.response;

import jakarta.persistence.Lob;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.logging.log4j.util.Base64Util;

import java.sql.Blob;
import java.util.Base64;
import java.util.List;
@Data
@NoArgsConstructor
public class RoomResponse {
    private Long id;
    private String roomType;
    private int roomPrice;
    private boolean isBooked;
    private String photo;
    private List<BookingResponse> bookings;

    public RoomResponse(Long id, String roomType, int roomPrice, boolean isBooked, byte[] photoByte, List<BookingResponse> bookings) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
        this.isBooked = isBooked;
        this.photo = photoByte!= null ? Base64.getEncoder().encodeToString(photoByte):null;
        this.bookings = bookings;
    }

    public RoomResponse(Long id, String roomType, int roomPrice) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
    }
}

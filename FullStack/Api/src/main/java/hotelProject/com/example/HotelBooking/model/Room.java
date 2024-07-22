package hotelProject.com.example.HotelBooking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Getter
@Setter
@AllArgsConstructor
@Entity
public class Room {
    private int bookingNumber=0;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String roomType;
    private int roomPrice;
    private boolean isBooked;
    @Lob
    private Blob photo;
    @OneToMany(mappedBy = "room" ,fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<BookedRoom> bookings;

    public Room() {
        this.bookings = new ArrayList<>();
    }

    public void addBooking(BookedRoom booking) {
        if (bookings == null) {
            bookings = new ArrayList<>();
        }
        bookings.add(booking);
        booking.setRoom(this);
        isBooked = true;
        Random rand = new Random();
        int bookingCode = rand.nextInt(1000000);
        booking.setBookingConfirmationCode(String.valueOf(bookingCode));
    }
}
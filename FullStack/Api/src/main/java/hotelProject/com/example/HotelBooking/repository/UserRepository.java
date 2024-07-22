package hotelProject.com.example.HotelBooking.repository;

import hotelProject.com.example.HotelBooking.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    void deleteByEmail(String email);

    Optional<User >findByEmail(String email);

    boolean existsByEmail(String email);
}

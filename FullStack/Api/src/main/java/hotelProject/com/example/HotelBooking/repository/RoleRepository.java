package hotelProject.com.example.HotelBooking.repository;

import hotelProject.com.example.HotelBooking.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role,Long> {
    public Optional<Role> findByName(String name);

    boolean existsByName(String roleName);
}

package hotelProject.com.example.HotelBooking.service;

import hotelProject.com.example.HotelBooking.Security.WebSecurityConfiguration;
import hotelProject.com.example.HotelBooking.exception.UserAlreadyExistsException;
import hotelProject.com.example.HotelBooking.model.Role;
import hotelProject.com.example.HotelBooking.model.User;
import hotelProject.com.example.HotelBooking.repository.RoleRepository;
import hotelProject.com.example.HotelBooking.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
@RequiredArgsConstructor
@Service
public class UserService implements IUserService{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private final WebSecurityConfiguration hotelSecurityConfig;
    private final RoleRepository roleRepository;
    @Override
    public User registerUser(User user) {
        if(userRepository.existsByEmail(user.getEmail())){
            throw new UserAlreadyExistsException(user.getEmail() + " already exists");
        }
        user.setPassword(hotelSecurityConfig.passwordEncoder().encode(user.getPassword()));
        Role userRole = roleRepository.findByName("ROLE_USER").get();
        user.setRoles(Collections.singletonList(userRole));
        return userRepository.save(user);
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    @Transactional
    public void deleteUser(String email) {
        User theUser = getUser(email);
        if(theUser!=null){
            userRepository.deleteByEmail(email);
        }
    }

    @Override
    public User getUser(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}

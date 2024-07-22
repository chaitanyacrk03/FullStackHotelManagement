package hotelProject.com.example.HotelBooking.service;

import hotelProject.com.example.HotelBooking.model.User;

import java.util.List;

public interface IUserService {
    User registerUser(User user);
    List<User> getUsers();
    void deleteUser(String email);
    User getUser(String email);

}

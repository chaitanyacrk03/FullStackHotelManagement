package hotelProject.com.example.HotelBooking.service;

import hotelProject.com.example.HotelBooking.model.Role;
import hotelProject.com.example.HotelBooking.model.User;
import hotelProject.com.example.HotelBooking.repository.RoleRepository;
import hotelProject.com.example.HotelBooking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class RoleService implements IRoleService{
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;
    @Override
    public List<Role> getRoles() {
        return roleRepository.findAll() ;
    }

    @Override
    public Role createRole(Role theRole) {
        String roleName= "ROLE_" + theRole.getName().toUpperCase();
        Role role= new Role(roleName);
        if(roleRepository.existsByName(roleName)){
            throw new RuntimeException(theRole.getName()+ "role already exists");
        }
        return roleRepository.save(role);
    }

    @Override
    public void deleteRole(Long id) {
        this.removeAllUserFromRole(id);
        roleRepository.deleteById(id);
    }

    @Override
    public Role findByName(String name) {
        return roleRepository.findByName(name).get();
    }

    @Override
    public User removeUserFromRole(Long userId, Long roleId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Role> role= roleRepository.findById(roleId);
        if(role.isPresent() && role.get().getUsers().contains(user.get())){
            role.get().removeUserFromRole(user.get());
            roleRepository.save(role.get());
            return user.get();
        }
        throw new RuntimeException("User not found");
    }

    @Override
    public User assignRoleToUser(Long userId, Long roleId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Role> role= roleRepository.findById(roleId);
        if(user.isPresent() && user.get().getRoles().contains(role.get())){
            throw new RuntimeException(user.get().getFirstName() + "User Already assigned will the role: " + role.get().getName());
        }
        if(role.isPresent()){
            role.get().assignRoleToUser(user.get());
            roleRepository.save(role.get());
        }
        return user.get();
    }

    @Override
    public Role removeAllUserFromRole(Long roleId) {
        Optional<Role> role =roleRepository.findById(roleId);
        role.get().removeAllUsersFromRole();
        return roleRepository.save(role.get());
    }
}

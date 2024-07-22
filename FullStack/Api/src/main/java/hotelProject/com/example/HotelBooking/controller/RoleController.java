package hotelProject.com.example.HotelBooking.controller;

import hotelProject.com.example.HotelBooking.model.Role;
import hotelProject.com.example.HotelBooking.model.User;
import hotelProject.com.example.HotelBooking.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.FOUND;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
@RestController
@RequestMapping("/role")
public class RoleController {
    @Autowired
    private IRoleService roleService;
    @GetMapping("/all-role")
    public ResponseEntity<List<Role>> getAllRoles(){
        return ResponseEntity.status(FOUND).body(roleService.getRoles());
    }
    @PostMapping("/create-new-role")
    public ResponseEntity<String> createRole(@RequestBody Role theRole){
        try {
            roleService.createRole(theRole);
            return ResponseEntity.ok("New Role created successfully!");
        }catch (RuntimeException e){
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body("Error creating new role");

        }
    }
    @DeleteMapping("/delete/{roleId}")
    public void deleteRole(@PathVariable("roleId") Long roleId){
        roleService.deleteRole(roleId);

    }
    @PostMapping("/remove-all-users-from-role/{roleId}")
    public Role removeAllUsersFromRole(@PathVariable Long roleId){
        return roleService.removeAllUserFromRole(roleId);
    }
    @PostMapping("/remove-user-from-role")
    public User removeUserFromRole(@PathVariable Long userId,@PathVariable Long roleId){
        return roleService.removeUserFromRole(userId,roleId);
    }
    @PostMapping("/assign-user-to-role/{userId}/{roleId}")
    public User assignRoleToUser(@PathVariable Long userId,@PathVariable Long roleId){
        return roleService.assignRoleToUser(userId,roleId);
    }
}

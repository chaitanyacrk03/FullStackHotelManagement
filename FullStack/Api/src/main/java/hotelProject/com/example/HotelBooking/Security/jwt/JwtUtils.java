package hotelProject.com.example.HotelBooking.Security.jwt;

import hotelProject.com.example.HotelBooking.Security.UserSecurity.HotelUserDetails;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
@Service
public class JwtUtils {
    private static final Logger logger= LoggerFactory.getLogger(JwtUtils.class);
    @Value("${auth.token.jwtSecret}")
    private String jwtSecret;
    @Value("${auth.token.expirationInMils}")
    private int jwtExpirationTime;
    public String generateJwtTokenForUser(Authentication authentication){
        HotelUserDetails userPrincipal = (HotelUserDetails) authentication.getPrincipal();
        List<String> roles= userPrincipal.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority).collect(Collectors.toList());
        return Jwts.builder().setSubject(userPrincipal.getUsername())
                .claim("roles",roles)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() +jwtExpirationTime))
                .signWith(key(), SignatureAlgorithm.HS256).compact();

    }
    public Key key(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }
    public String getUserNameFromToken(String token){
        return Jwts.parserBuilder()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
    public boolean validateToken(String token){
        try{
            Jwts.parserBuilder().setSigningKey(key())
                    .build().parse(token);
            return true;
        }catch (MalformedJwtException malformedJwtException){
            logger.error("Invalid jwt token: {}", malformedJwtException.getMessage());
        }catch (ExpiredJwtException expiredJwtException){
            logger.error("Token is expired: {}",expiredJwtException.getMessage());
        }catch (UnsupportedJwtException unsupportedJwtException){
            logger.error("Jwt token is not supported:", unsupportedJwtException.getMessage());
        }catch (IllegalArgumentException e){
            logger.error("No claims found: {}",e.getMessage());
        }
        return false;
    }
}

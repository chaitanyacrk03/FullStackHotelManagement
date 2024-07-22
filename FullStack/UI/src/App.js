import './App.css';
import ExistingRooms from './components/room/ExistingRooms';
import AddRoom from './components/room/AddRoom';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/home/Home';
import EditRoom from './components/room/EditRoom';
import NavBar from './components/layout/NavBar';
import  Footer  from './components/layout/Footer';
import RoomListing from './components/room/RoomListing';
import Admin from './components/admin/Admin';
import HotelHome from './components/layout/HotelHome';
import BookingForm from './components/bookings/BookingForm';
import Checkout from './components/common/Checkout';
import Bookings from './components/bookings/Bookings';
import FindBooking from './components/bookings/FindBooking'
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import Profile from './components/auth/Profile';
import Logout from './components/auth/Logout'
import AuthProvider, { AuthContext } from './components/auth/AuthProvider';
const route=createBrowserRouter([
  {
    path:'',
    element:<Home />,
    children:[
      {
        path:'/edit-room/:roomId',
        element:<EditRoom />,
      },
      {
        path:'existing-rooms',
        element:<ExistingRooms />,
        
      },
      {
        path:'add-room',
        element:<AddRoom />,
        
      },
      {
        path:'/browse-all-rooms',
        element:<RoomListing />,
        
      },
      {
        path:'admin',
        element:<Admin />,
      },
      {
        path:'',
        element:<HotelHome />,
      },
      {
        path:'/book-room/:roomId',
        element:<Checkout />,
      },
      {
        path:'/existing-bookings',
        element:<Bookings />,
      },
      {
        path:'/find-booking',
        element:<FindBooking />
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"register",
        element:<Registration/>
      },
      {
        path:"/profile",
        element:<Profile/>
      },{
        path:"/logout",
        element:<Logout />
      }
    ]
  }
])
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={route} />
      <Footer />
    </ AuthProvider>
  );
}

export default App;

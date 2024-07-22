import React, { createContext, useState } from 'react'
export const AuthContext = createContext({
    user: null,
    handleLogin: (token)=>{},
    handleLogout: ()=>{}
})
const AuthProvider = ({children}) => {
    const [loginUser,setUser] = useState(null)
    const handleLogin =(userDetail)=>{
        const token= userDetail.token
        localStorage.setItem("token",token)
        localStorage.setItem("userId",userDetail.email)
        localStorage.setItem("userRole",userDetail.roles.join(","))
        setUser(userDetail)
    }
    const handleLogout = ()=>{
        localStorage.removeItem("userId")
        localStorage.removeItem("userRole")
        localStorage.removeItem("token")
        setUser(null)
    }
    const authContext={
        user:loginUser,
        handleLogin:handleLogin,
        handleLogout:handleLogout
    }
  return (
    <AuthContext.Provider value={authContext}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
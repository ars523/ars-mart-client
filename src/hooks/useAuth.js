import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"

const useAuth = ()=>{
    const [isChecking, setIsChecking] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const {user} =  useSelector(state=>state.auth)

    useEffect(()=>{
        if(user){
            setIsLoggedIn(true)
        }else{
            setIsLoggedIn(false)
        }
        setIsChecking(false)
    }, [user])

    return {isChecking, isLoggedIn}
}
export default useAuth
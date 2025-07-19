import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext()

const AppContextProvider = (props) => {


    //ALL THE USESTATE----->
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [credit, setCredit] = useState(false)


    //BACKEND URL----->
    // const backendUrl = import.meta.env.VITE_BACKEND_URL
    const backendUrl = 'http://localhost:4000'


    const navigate = useNavigate()


    //FUNCTION FOR SHOWING THE CREDITS----->
    const loadCreditsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/credits', {
                headers: {
                    token
                }
            })
            if (data) {
                setCredit(data.credits)
                setUser(data.user)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message);
        }
    }


    //FUNCTION FOR LOGOUT----->
    const logout = () => {
        localStorage.removeItem('token')
        setToken('');
        setUser(null)
        navigate('/')
        toast.success('Logout successfully')
    }


    //FUNCTION FOR GENERATE IMAGE----->
    const generateImage = async (prompt) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/image/generate-image', { prompt }, {
                headers: {
                    token
                }
            })

            if (data.success) {
                loadCreditsData();
                return data.resultImage
            } else {
                toast.error(data.message)
                loadCreditsData()
                if (data.creditBalance === 0) {
                    navigate('/buy')
                }
            }

        } catch (error) {
            toast.error(error.message)
        }
    }


    //USEEFFECT TO TRIGGER THE LOADCREDITSDATA----->
    useEffect(() => {
        if (token) {
            loadCreditsData();
        }
    }, [token])


    //ALL THE EPORTED STATES AND FUNCTIONS-----> 
    const value = {
        user,
        setUser,
        showLogin,
        setShowLogin,
        backendUrl,
        token,
        setToken,
        credit,
        setCredit,
        loadCreditsData,
        logout,
        generateImage
    }



    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
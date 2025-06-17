import {  useSelector } from "react-redux";
import { TRootState } from "../store/userSlice";

const useAuth = () => {
    const user = useSelector((state: TRootState) => state.userSlice.user);
    
    return user;
}

export default useAuth
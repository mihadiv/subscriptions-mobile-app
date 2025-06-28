import { useAuth } from './context/AuthContext';
import Login from './auth/Login';
import HomeScreen from './screens/HomeScreen';

export default function Index() {
    const { isAuthenticated } = useAuth();

    if(!isAuthenticated){
        return <Login/>;
    }

    return <HomeScreen />
};

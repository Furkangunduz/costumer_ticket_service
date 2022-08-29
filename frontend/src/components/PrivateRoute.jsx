import { useNavigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import Spinner from './Spinner';

function PrivateRoute() {
	const { loggedIn, checkingStatus } = useAuthStatus();
	const navigate = useNavigate();

	if (checkingStatus) return <Spinner />;

	return loggedIn ? <Outlet /> : navigate('/login');
}

export default PrivateRoute;

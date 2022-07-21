import { useSelector } from 'react-redux';
import { selectNotification } from '../reducers/notificationSlice';

const Notification = () => {
	const notification = useSelector(selectNotification);
	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 4,
		borderColor: 'green',
		backgroundColor: 'lightGreen',
		color: 'black',
	};
	if (notification === null) {
		return null;
	}
	return <div style={style}>{notification}</div>;
};

export default Notification;

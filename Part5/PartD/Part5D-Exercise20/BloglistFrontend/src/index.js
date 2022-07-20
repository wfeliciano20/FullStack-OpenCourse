/* eslint-disable no-unused-vars */
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
	<AuthProvider>
		<App />
	</AuthProvider>,
);

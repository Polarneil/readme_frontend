import StandardLayoutRouter from '../pages/standard-layout/standard-layout.router';
import '../app/app.component.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId: string = process.env.REACT_APP_GOOGLE_CLIENT_ID || "defaultClientId";

function App() {

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className='main-content'>
        <StandardLayoutRouter></StandardLayoutRouter>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
import Navigation from './Components/Navigation';
import { UserProvider } from './Components/UserContext';

export default function App() {

  return (
    <UserProvider>
      <Navigation/>
    </UserProvider>
  );
}


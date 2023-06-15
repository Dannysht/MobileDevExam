import Navigation from './Components/Navigation';
import { UserProvider } from './Components/UserContext';
import { ImageProvider } from './Components/ImageManager';

export default function App() {

  return (
    <UserProvider>
      <ImageProvider>
        <Navigation/>
      </ImageProvider>
    </UserProvider>
  );
}


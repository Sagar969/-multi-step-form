import Container from './Container'
import { MainContextProvider } from './contexts/MainContextProvider';

function App() {
  return (
    <div className="App">
      <MainContextProvider>
        <Container />
      </MainContextProvider>
    </div>
  );
}

export default App;

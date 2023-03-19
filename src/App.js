import Container from './Container'
import { DataProvider } from './contexts/DataProvider';

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Container />
      </DataProvider>
    </div>
  );
}

export default App;

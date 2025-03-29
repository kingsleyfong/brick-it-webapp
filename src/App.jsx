import { Link } from 'react-router-dom';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <main className="p-6 flex flex-col items-center gap-6">
        <h2 className="text-2xl font-semibold">Choose a Mode:</h2>
        <div className="flex gap-4">
          <Link to="/mosaic">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded shadow">
              Mosaic Mode
            </button>
          </Link>
          <Link to="/model">
            <button className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded shadow">
              3D Model Mode
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default App;

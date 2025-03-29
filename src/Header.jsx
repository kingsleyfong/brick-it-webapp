export default function Header() {
    return (
      <header className="w-full bg-gray-900 text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-4">
          <img src="/uw-logo.png" alt="UW Logo" className="h-10" />
          <div>
            <h1 className="text-xl font-bold">Brick It</h1>
            <p className="text-sm text-gray-300">LEGO Mosaic and 3D Printer Web App</p>
          </div>
        </div>
        <div>
          <button className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded">
            Configure Dispensers
          </button>
        </div>
      </header>
    );
  }
  
export default function Header() {
    return (
      <header className="w-full bg-gray-900 text-white px-6 py-3 flex items-center justify-between border-b border-gray-700 shadow-sm">
        {/* Left: Logo and Title */}
        <div className="flex items-center gap-4">
          <img src="/uw-logo.png" alt="UW Logo" className="h-12 w-auto" />
          <div>
            <h1 className="text-2xl font-bold leading-tight">Brick It</h1>
            <p className="text-sm text-gray-300">LEGO Mosaic and 3D Printer Web App</p>
          </div>
        </div>
  
        {/* Right: Configure Dispensers button */}
        <div>
          <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-4 py-2 rounded shadow">
            Configure Dispensers
          </button>
        </div>
      </header>
    );
  }
  
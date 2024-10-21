// import { Settings } from "lucide-react";
import Search from "./Search";
const Header = () => {
  return (
    <header className="sticky top-0 bg-[#2c3e50] text-white p-4 flex justify-between items-center z-10 shadow-md">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold">NewsHub</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Search/>
        {/* <button
          className="p-2 rounded-md hover:bg-[#34495e] focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-colors"
          aria-label="Settings"
        >
          <Settings className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Settings</span>
        </button> */}
      </div>
    </header>
  );
};

export default Header;

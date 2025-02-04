import { Grip } from "lucide-react";
import { assets } from "../../assets/assets";

export const Navbar = function() {
  return (
    <div className="flex items-center justify-between p-4 w-full">
      <div className="flex flex-col hover:bg-gray-800 cursor-pointer rounded-lg p-2"> 
        <p className="text-2xl text-white font-semibold">Gemini</p>
        <p className="text-gray-500 text-sm ml-2">1.5 Flash</p> 
      </div>
      <div className="flex items-center"> 
        <button className="text-white mr-6 bg-gray-800 w-55 rounded-xl px-4 py-2 cursor-pointer hover:bg-gray-700 flex items-center"> 
          <img src={assets.gemini_icon} alt="Gemini Icon" className="mr-2 w-6 h-6" /> 
          Try Gemini Advanced
        </button>
        <button className="text-white mr-6 w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-800"> 
          <Grip className="text-white" /> 
        </button>
        <img className="w-10 h-10 rounded-full" src="https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg" alt="Profile" />
      </div>
    </div>
  );
};
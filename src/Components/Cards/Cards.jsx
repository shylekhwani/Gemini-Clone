/* eslint-disable react/prop-types */
import { Compass } from "lucide-react"


export const Cards = function({ text }) {
    return (
        <div className="flex items-center justify-between bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-all">
          <p className="text-gray-700 font-semibold text-lg">{text}</p>
          <span className="text-blue-500">
            <Compass size={24}/>
          </span>
        </div>
    )
};

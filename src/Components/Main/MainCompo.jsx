import { Image, Mic, Send, User } from "lucide-react";
//import { Cards } from "../Cards/Cards";
import { Navbar } from "../Navbar/Navbar";
import { Sidebar } from "../SideBar/Sidebar";
import { useContext } from "react";
import { assets } from "../../assets/assets";
import GeminiContext from "../../Context/Context";

// Main component responsible for the primary UI layout
export const Main = function () {
  const {
    input,
    setInput,
    onSent,
    recentPrompt,
    setRecentPrompt,
    setPrevPrompt,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData
  } = useContext(GeminiContext);

  // Handles the prompt submission
  const handleSent = async function (input) {
    try {
      setLoading(true);  // Show loading indicator
      setShowResult(true);  // Display result section
      setResultData('');  // Clear the previous response
      setRecentPrompt(input);  // Save the current input as recent prompt
      setPrevPrompt((prev) => [...prev, input]);  // Add to previous prompts
      await onSent(input);  // Process the response
    } catch (error) {
      console.error("Error in handleSent:", error);
    } finally {
      setLoading(false);
      setInput('');  // Clear the input field
    }
  };
  
  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* Sidebar component */}
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar component */}
        <Navbar />

        {/* Main content area */}
        <div className="flex-1 p-6 overflow-auto space-y-6 pb-20">
          {!showResult ? (
            // Initial state with suggestions
            <>
              <div className="text-center text-gray-700 text-3xl font-bold">
                <p className="bg-gradient-to-r from-blue-500 via-red-500 to-purple-500 text-transparent bg-clip-text">
                  Hey There...
                </p>
                <p className="text-gray-600 text-2xl font-medium">How can I help you?</p>
              </div>
              {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Cards text="Suggestion" />
                <Cards text="Suggestion" />
                <Cards text="Suggestion" />
              </div> */}
            </>
          ) : (
            // Result display with loading state
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <span className="p-2 bg-gray-200 rounded-full">
                  <User size={24} />
                </span>
                <p className="bg-gray-100 p-4 rounded-lg shadow-sm text-gray-700">{recentPrompt}</p>
              </div>
              <div className="flex items-start space-x-4">
                <img className="w-10 h-10" src={assets.gemini_icon} alt="Gemini Icon" />
                <div className="bg-blue-50 p-4 rounded-lg shadow-sm text-gray-800 max-w-2xl">
                  {loading ? (
                    <div className="flex justify-center items-center h-40">
                      {/* Three blue lines as loading indicator */}
                      <div className="loading-lines">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                  ) : (
                    <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Search bar at the bottom */}
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-xl">
            <div className="flex items-center bg-white shadow-lg rounded-full p-3 space-x-4 border border-gray-300">
              <input
                className="flex-1 outline-none text-gray-700 text-sm"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter Prompt Here"
              />
              <div className="flex space-x-2">
                <span className="p-2 hover:bg-gray-200 rounded-full cursor-pointer">
                  <Image size={20} />
                </span>
                <span className="p-2 hover:bg-gray-200 rounded-full cursor-pointer">
                  <Mic size={20} />
                </span>
                <span
                  className="p-2 hover:bg-blue-500 text-white bg-blue-600 rounded-full cursor-pointer"
                  onClick={() => handleSent(input)}
                >
                  <Send size={20} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

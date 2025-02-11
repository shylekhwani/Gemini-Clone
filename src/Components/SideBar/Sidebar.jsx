import { useContext, useEffect, useState } from 'react';
import { FileQuestion, History, Menu, MessageSquare, Plus, Settings } from 'lucide-react';
import GeminiContext from '../../Context/Context';
import { useFirebase } from '../../hooks/useFirebase';

export const Sidebar = function () {
    const [openPanel, setOpenPanel] = useState(false);

    const {onSent, prevPrompt, setRecentPrompt, setLoading, setShowResult, setResultData} = useContext(GeminiContext);

    const {savePrompts, getPrompts, user} = useFirebase();

    const [fetchPrompt, setFetchPrompt] = useState([]);

    useEffect(() => {
        const saveValidPrompt = async () => {
          if (prevPrompt && prevPrompt.length > 0) {  // Ensure prevPrompt exists and is not empty
            try {
              await savePrompts(prevPrompt);
            } catch (error) {
              console.error("Error saving prompt:", error);
            }
          }
        };
      
        saveValidPrompt();
      }, [prevPrompt, savePrompts]);

      useEffect(() => {
        const getPrompt = async function () {
        const prompt = await getPrompts();
        const response = prompt.map((el) => {
           return el?.prmptName
        });
        setFetchPrompt(response)
        }
        getPrompt()
      },[getPrompts]);
      

    const loadPrompt = async function (prompt) {
        try {
          setLoading(true);
          setShowResult(true);
          setResultData('');  // Clear previous response
          setRecentPrompt(prompt);  // Set the clicked prompt
          await onSent(prompt);  // Fetch and set the response for the clicked prompt
        } catch (error) {
          console.error("Error in loadPrompt:", error);
        } finally {
          setLoading(false);
        }
      };

    const newChat = function() {
        setLoading(false);
        setShowResult(false);
        setResultData('');  // Clear the response data
    };

    return (
        <div className={`h-screen ${openPanel ? 'w-60' : 'w-16'} bg-gray-800 text-white flex flex-col justify-between p-3 shadow-xl transition-all duration-300` }>
            {/* Top Section */}
            <div className="space-y-4">
                <button className="w-full h-12 flex items-center justify-center rounded-lg hover:bg-gray-700" onClick={() => setOpenPanel(!openPanel)}>
                    <Menu size={24} />
                </button>
                
                {/* New Chat */}
                <div onClick={()=> newChat()}
                className='flex items-center space-x-3 cursor-pointer p-3 hover:bg-gray-700 rounded-lg'>
                    <Plus size={24} />
                    {openPanel && <p className="text-sm">New Chat</p>}
                </div>
                
                {openPanel && (
                 <div>
                    <p className='text-gray-400 text-xs uppercase px-3'>Recent</p>

                    {user && fetchPrompt.length > 0 ? (
                    fetchPrompt.map((item, index) => (
                        <div
                        key={index}
                        className='flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg cursor-pointer'
                        onClick={() => loadPrompt(item)}
                        >
                        <MessageSquare size={24} />
                        <p className="text-sm">{item}...</p>
                        </div>
                    ))
                    ) : (
                    prevPrompt.map((item, index) => (
                        <div
                        key={index}
                        className='flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg cursor-pointer'
                        onClick={() => loadPrompt(item)}
                        >
                        <MessageSquare size={24} />
                        <p className="text-sm">{item}...</p>
                        </div>
                    ))
                    )}
                </div>
                )}
            </div>

            {/* Bottom Section */}
            <div className='space-y-4'>
                <div className='flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg cursor-pointer'>
                    <FileQuestion size={24} />
                    {openPanel && <p className="text-sm">Help</p>}
                </div>
                <div className='flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg cursor-pointer'>
                    <History size={24} />
                    {openPanel && <p className="text-sm">Activity</p>}
                </div>
                <div className='flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg cursor-pointer'>
                    <Settings size={24} />
                    {openPanel && <p className="text-sm">Settings</p>}
                </div>
            </div>
        </div>
    );
};

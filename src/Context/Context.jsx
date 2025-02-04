/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useState, useMemo } from "react";
import run from "../Config/GeminiConfig";

 const GeminiContext = createContext();

export const GeminiContextProvider = function({children}) {

    const [input, setInput] = useState('');
    const [recentPrompt, setRecentPrompt] = useState('');
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState('');

    const delayParagraph = function(index, nextWord){
        setTimeout(function() {
            setResultData(data => data+nextWord)
        },75*index)
    };
    
    const onSent = async function (prompt) {
        setResultData('');  // Clear previous response

        const response = await run(prompt); // Get the response
        
        let responseArray = response.split("**"); // Split by '**'
        let newResponse = ""; // Initialize as an empty string
      
        responseArray.forEach((el, index) => {
          // Alternate between plain text and bold formatting
          if (index % 2 === 0) {
            newResponse += el; // Plain text for even indices
          } else {
            newResponse += "<b>" + el + "</b>"; // Bold for odd indices
          }
        });
      
        // Replace all '*' with '<br>' for line breaks
        let semiFinalResponse = newResponse.split("*").join("<br>");
        let finalResponseArray = semiFinalResponse.split(' ');

        finalResponseArray.map((el, index) => {
            const nextWord = finalResponseArray[index];
            delayParagraph(index, nextWord+" ")
    })
      
      };
      
    // Memoize the ContextValue to avoid creating a new object on every render
        const ContextValue = useMemo(() => ({
            input,
            setInput,
            prevPrompt,
            setPrevPrompt,
            onSent,
            recentPrompt,
            setRecentPrompt,
            showResult,
            setShowResult,
            loading,
            setLoading,
            resultData,
            setResultData,
        }), [
            input,
            prevPrompt,
            recentPrompt,
            showResult,
            loading,
            resultData,
        ]);

    return (
        <GeminiContext.Provider value={ContextValue}>
                {children}
        </GeminiContext.Provider>
    )
};

export default GeminiContext;
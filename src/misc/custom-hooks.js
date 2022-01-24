import { useCallback, useState, useEffect } from "react";



export function useModalState(defaultValue=false){

    const [isOpen,setIsOpen]=useState(defaultValue);

    const open = useCallback(()=>setIsOpen(true),[]);
    const close= useCallback(()=>setIsOpen(false),[]);

    return{ isOpen , open ,close};
}

// this is a use defined hook which set the state of the dashboard if true it is open else close 
// used useState hook

export const useMediaQuery = query => {
    const [matches, setMatches] = useState(
      () => window.matchMedia(query).matches
    );
  
    useEffect(() => {
      const queryList = window.matchMedia(query);
      setMatches(queryList.matches);
  
      const listener = evt => setMatches(evt.matches);
  
      queryList.addListener(listener);
      return () => queryList.removeListener(listener);
    }, [query]);
  
    return matches;
  };
//   this useMediaQuery is a hook to run dashboard responsive 
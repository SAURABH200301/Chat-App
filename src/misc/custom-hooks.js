import { useCallback,useState } from "react";



export function useModalState(defaultValue=false){

    const [isOpen,setIsOpen]=useState(defaultValue);

    const open = useCallback(()=>setIsOpen(true),[]);
    const close= useCallback(()=>setIsOpen(false),[]);

    return{ isOpen , open ,close};
}

// this is a use defined hook which set the state of the dashboard if true it is open else close 
// used useState hook
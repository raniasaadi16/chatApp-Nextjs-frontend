import { useEffect } from "react";
import { useState } from "react";


export function useCustomErr(initialValue){
    const [value, setvalue] = useState(initialValue);
    useEffect(() => {
        let didcancele = false
        if(value && !didcancele){
            setvalue(value)
            setTimeout(() => {
                setvalue('')
            }, 3000);
        }
        return () => {
            didcancele = true
        };
    }, [value]);

    return [value, setvalue]
}

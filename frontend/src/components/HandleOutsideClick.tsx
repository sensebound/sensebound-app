import {useRef, useEffect} from 'react';

const HandleOutsideClick = (callback: () => void) => {
    const ref = useRef<HTMLDivElement>(null);



    const handleOutsideClick = (e:MouseEvent) => {
      
        if(ref.current && !ref.current?.contains(e.target as Node)){
            callback();
        }
       
       
    }


    useEffect(()=>{
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    },[callback]);


    return ref


}

export default HandleOutsideClick;
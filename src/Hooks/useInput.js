import {useState,useCallback} from 'react';


export default (defaultValue) => {
    const [value, setValue] = useState(defaultValue);

    const onChange = useCallback((e) => {
    
        // const {
        //     taget: {value}
        // } = e;
        const {value} = e.target
        setValue(value);
    },[value]);
    return {value, onChange};
}
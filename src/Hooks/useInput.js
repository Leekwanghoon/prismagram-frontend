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
    return {value, onChange, setValue};
}

//value 와 onChange가 객체로 담긴다

// 예를들어 밖에서 const username = useInput("");
// 이라고 한다면 username.value, username.onChange가 된다
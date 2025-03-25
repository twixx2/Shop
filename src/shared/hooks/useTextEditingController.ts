import { useState } from "react"

export const useTextEditingController = () => {

    const [value, setValue] = useState<string>('');


    const onChange = (text: string) => {
        setValue(text);
    }

    return {
        value,
        onChange,
    };
};



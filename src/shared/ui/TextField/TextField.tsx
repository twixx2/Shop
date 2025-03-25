

interface TextFieldProps {
    placeholder?: string;
    type: string;
    className: string;
    onChange: (text: string) => void;
    value: string;
}

const TextField: React.FC<TextFieldProps> = ({ placeholder, type, className, value, onChange }) => {

    return <input
        type={type}
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={(e) => onChange(e.target.value)}
    />;
}

export default TextField;
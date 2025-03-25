import './Wrapper.css';

interface WrapperProps {
    children: React.ReactElement[];
}


const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    return (
        <div className="wrapper">
           {children}
        </div>
    );
}

export default Wrapper;
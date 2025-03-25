export interface TextEditingContoller {
    onChange: (text: string) => void;
    value: string;
}
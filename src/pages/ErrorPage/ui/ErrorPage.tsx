import { Link } from "react-router-dom";
import "./ErrorPage.css";

interface ErrorPageProps {
    statusCode?: number;
    message?: string;
}

export default function ErrorPage({ statusCode = 404, message = "Страница не найдена" }: ErrorPageProps) {
    return (
        <div className="error-page">
            <h1 className="error-code">{statusCode}</h1>
            <p className="error-message">{message}</p>
            <Link to="/" className="error-link">На главную</Link>
        </div>
    );
}

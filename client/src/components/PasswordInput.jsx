import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "../styles/PasswordInput.css";

const PasswordInput = ({ className = "", ...props }) => {
    const [visible, setVisible] = useState(false);

    return (
        <div className={`password-field ${className}`.trim()}>
            <input type={visible ? "text" : "password"} {...props} />
            <button
                type="button"
                className="password-field__toggle"
                onClick={() => setVisible((v) => !v)}
                aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                tabIndex={-1}
            >
                {visible ? <EyeOff size={20} strokeWidth={2} /> : <Eye size={20} strokeWidth={2} />}
            </button>
        </div>
    );
};

export default PasswordInput;

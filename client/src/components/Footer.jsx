import React from 'react';
import { Code, Mail, FileText } from 'lucide-react';
import {Linkedin} from "../assets/icons/LinkedIn.jsx";
import {Github} from "../assets/icons/GitHub.jsx";
import "../styles/Footer.css";

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-brand">
                    Intelligent<br />Redac'
                </div>

                {/* LIENS ET ICÔNES - ALIGNÉS À DROITE */}
                <div className="footer-links">
                    <a href="https://github.com/chanwinharold/projet_assistant_intelligent_de_redaction" className="footer-link">
                        <Github size={22} strokeWidth={2} />
                        <span>@github</span>
                    </a>
                    <a href="https://www.linkedin.com/in/hounkpatin-dewanou/" className="footer-link">
                        <Linkedin size={22} strokeWidth={2} />
                        <span>linkedIn</span>
                    </a>
                    <a href="https://github.com/chanwinharold/projet_assistant_intelligent_de_redaction" className="footer-link">
                        <Code size={22} strokeWidth={2} />
                        <span>source</span>
                    </a>
                    <a href="mailto:hounkpatindewanou@gmail.com" className="footer-link">
                        <Mail size={22} strokeWidth={2} />
                        <span>mail</span>
                    </a>
                    <a href="#" className="footer-link">
                        <FileText size={22} strokeWidth={2} />
                        <span>Licence</span>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
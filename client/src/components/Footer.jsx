import React from 'react';
import { Github, Linkedin, Code, Mail, FileText } from 'lucide-react';

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
                    <a href="#licence" className="footer-link">
                        <FileText size={22} strokeWidth={2} />
                        <span>Licence</span>
                    </a>
                </div>
            </div>

            <style jsx>{`
                /* Import d'une police cursive pour l'effet gothique */
                @import url('https://fonts.googleapis.com/css2?family=Italianno&display=swap');

                .footer-container {
                    max-width: 1440px;
                    padding-inline: 2rem;
                    background-color: #fff;
                    padding-block: 3rem;
                    margin: auto auto 0;
                    overflow-y: hidden;
                    border-top: 2px solid rgb(211 211 211 / 0.25);
                    display: grid;
                    place-items: center;
                }

                .footer-content {
                    width: 100%;
                    height: 80px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .footer-brand {
                    font-family: "Clubing", "cursive", "sans-serif";
                    font-size: 3rem;
                    text-align: center;
                    color: #000;
                }

                .footer-links {
                    display: flex;
                    gap: 45px;
                    align-items: center;
                    padding-bottom: 10px;
                }

                .footer-link {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    text-decoration: none;
                    color: #000;
                    font-family: 'Inter', sans-serif;
                    font-size: 1.1rem;
                    font-weight: 500;
                    transition: transform 0.2s ease;
                }

                .footer-link:hover {
                    transform: translateY(-3px);
                }

                .footer-link span {
                    border-bottom: 1px solid transparent;
                }

                /* RESPONSIVE MOBILE */
                @media (max-width: 900px) {
                    .footer-content {
                        flex-direction: column;
                        align-items: center;
                        text-align: center;
                        gap: 50px;
                    }

                    .footer-links {
                        flex-wrap: wrap;
                        justify-content: center;
                        gap: 25px;
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
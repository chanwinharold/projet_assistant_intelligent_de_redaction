import { useEffect, useState } from "react";
import "../../styles/Save.css";
import imgResumeUrl from "../../assets/images/image_resume.png";
import imgArticleUrl from "../../assets/images/image_article.png";
import { ArrowDown } from "../../assets/icons/ArrowDown.jsx";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import Unauthorize from "../../components/Unauthorize.jsx";
import { articlesApi, resumesApi } from "../../services/contentApi.js";
import { notifyError } from "../../services/toast.js";
import { getErrorMessage } from "../../utils/errorMessage.js";

function Save() {
    const { isLoggedIn } = useAuth();
    const [articles, setArticles] = useState([]);
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoggedIn) return;
        Promise.all([articlesApi.list(), resumesApi.list()])
            .then(([a, r]) => {
                setArticles(a.data || []);
                setResumes(r.data || []);
            })
            .catch((err) => notifyError(getErrorMessage(err, "Impossible de charger les enregistrements.")))
            .finally(() => setLoading(false));
    }, [isLoggedIn]);

    if (!isLoggedIn) return <Unauthorize />;

    return (
        <main className="main__container">
            {loading && <p className="save-loading">Chargement…</p>}
            <section className="section__container">
                <header className="articles__header">
                    <h2>Articles</h2>
                    <ArrowDown />
                </header>
                <div className="articles__wrapper">
                    {articles.length === 0 && !loading ? (
                        <p className="save-empty">Aucun article. <Link to="/write">Écrire</Link></p>
                    ) : (
                        articles.map((article) => (
                            <ArticleCard key={article.id_article} id={article.id_article} title={article.title} />
                        ))
                    )}
                </div>
            </section>
            <section className="section__container">
                <header className="articles__header">
                    <h2>Résumés</h2>
                    <ArrowDown />
                </header>
                <div className="articles__wrapper">
                    {resumes.length === 0 && !loading ? (
                        <p className="save-empty">Aucun résumé. <Link to="/resume">Résumer</Link></p>
                    ) : (
                        resumes.map((resume) => (
                            <ResumeCard key={resume.id_resume} id={resume.id_resume} title={resume.title} />
                        ))
                    )}
                </div>
            </section>
        </main>
    );
}

const ArticleCard = ({ id, title }) => (
    <Link to={`/write?id=${id}`}>
        <article className="article__container">
            <img src={imgArticleUrl} width={96} alt="article" />
            <span>{title}</span>
        </article>
    </Link>
);

const ResumeCard = ({ id, title }) => (
    <Link to={`/resume?id=${id}`}>
        <article className="article__container">
            <img src={imgResumeUrl} width={96} alt="résumé" />
            <span>{title}</span>
        </article>
    </Link>
);

export default Save;

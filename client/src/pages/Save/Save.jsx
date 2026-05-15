import "../../styles/Save.css";
import imgResumeUrl from "../../assets/images/image_resume.png";
import imgArticleUrl from "../../assets/images/image_article.png";
import {ArrowDown} from "../../assets/icons/ArrowDown.jsx";
import {Link} from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import Unauthorize from "../../components/Unauthorize.jsx";

function Save() {
    const {isLoggedIn} = useAuth();

    const Articles = [
        {
            title: "Mon article 1",
            content: "lorem"
        },
        {
            title: "Mon article 2",
            content: "lorem"
        },
        {
            title: "Mon article 3",
            content: "lorem"
        },
        {
            title: "Mon article 4",
            content: "lorem"
        },
        {
            title: "Mon article 5",
            content: "lorem"
        }
    ]
    const Resumes = [
        {
            title: "Mon résumé 1",
            content: "lorem"
        },
        {
            title: "Mon résumé 2",
            content: "lorem"
        },
        {
            title: "Mon résumé 3",
            content: "lorem"
        },
        {
            title: "Mon résumé 4",
            content: "lorem"
        },
        {
            title: "Mon résumé 5",
            content: "lorem"
        }
    ]

    return isLoggedIn ? (
        <main className={"main__container"}>
            <section className={"section__container"}>
                <header className={"articles__header"}>
                    <h2>Articles</h2>
                    <ArrowDown />
                </header>
                <div className={"articles__wrapper"}>
                    {Articles.map((article, index) => (
                        <Article key={index} id={index} title={article.title} />
                    ))}
                </div>
            </section>
            <section  className={"section__container"}>
                <header className={"articles__header"}>
                    <h2>Résumés</h2>
                    <ArrowDown />
                </header>
                <div className={"articles__wrapper"}>
                    {Resumes.map((resume, index) => (
                        <Resume key={index} id={index} title={resume.title} />
                    ))}
                </div>
            </section>
        </main>
    ) : <Unauthorize />
}

export default Save;


const Article = ({id, title}) => {

    return (
        <Link to={`/write?id=${id}`} >
            <article className={"article__container"}>
                <img src={`${imgArticleUrl}`} width={96} alt="article paper"/>
                <span>{title}</span>
            </article>
        </Link>
    )
};

const Resume = ({id, title}) => {
    return (
        <Link to={`/resume?id=${id}`}>
            <article className={"article__container"}>
                <img src={`${imgResumeUrl}`} width={96} alt="summary paper"/>
                <span>{title}</span>
            </article>
        </Link>
    )
};

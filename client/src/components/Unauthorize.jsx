import {Link} from "react-router-dom";
import "../styles/Unauthorized.css";

function Unauthorize() {
    return (
        <main>
            <div className={"unauthorized__wrapper"}>
                <h1>Utilisateur Non Connecté</h1>
                <p>
                    Veuillez vous connectez à votre
                    compte utilisateur en cliquant&nbsp;
                    <Link to={"/login"}>ici</Link>
                </p>
            </div>
        </main>
    );
}

export default Unauthorize;
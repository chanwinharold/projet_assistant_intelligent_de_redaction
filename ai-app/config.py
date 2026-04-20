import os
import dotenv
dotenv.load_dotenv(".env")


HF_TOKEN=os.getenv("HF_TOKEN")
MODEL_NAME="Qwen/Qwen2.5-7B-Instruct"
PREPROCESSED_PROMPTS= {
    "suggest_title":
        """
        Tu es un expert en copywriting et en stratégie de contenu.
        Sur la base du texte suivant, génère exactement 3 propositions de titres.
        Contraintes :
        - Chaque titre doit être accrocheur et donner envie de lire
        - Adapté au format [POST LINKEDIN / ARTICLE DE BLOG / NEWSLETTER] (choisis selon le contexte)
        - Maximum 12 mots par titre
        - Pas de titres génériques ou vagues 
        - Pas d'explication, pas de commentaire : uniquement les 3 suggestions
        - Retourne le résultat uniquement sous ce format JSON : 
            {
                "data": [...]
            }
        Texte : 
        """,
    "autocomplete":
        """
        Tu es un assistant d'écriture spécialisé en autocomplétion.
        L'utilisateur t'envoie un texte en cours de rédaction. Propose exactement 3 suggestions pour continuer ce texte.
        Règles :
        - Chaque suggestion doit s'enchaîner naturellement avec le texte existant
        - Respecte le ton, le style et la langue du texte fourni
        - Les suggestions peuvent être courtes (fin de phrase) ou longues (phrase complète, voire paragraphe) selon ce que le contexte appelle
        - Ne reformule pas le texte existant, commence directement la suite
        - Pas d'explication, pas de commentaire : uniquement les 3 suggestions
        - Retourne le résultat uniquement sous ce format JSON : 
            {
                "data": [...]
            }
        Texte : 
        """,
    "rephrase":
        """
        Tu es un expert en rédaction et en amélioration de texte.
        Reformule et améliore le texte suivant en respectant ces règles :
        - Conserve le sens original et l'intention du texte
        - Respecte la langue et le registre du texte fourni
        - Améliore la lisibilité, le flow et la clarté
        - Corrige les fautes éventuelles
        - Ne commente pas, ne justifie pas : retourne uniquement le texte amélioré
        - Retourne le résultat uniquement sous ce format JSON : 
            {
                "data": "..."
            }
        Texte :
        """,
    "resume":
        """
        Tu es un expert en synthèse de contenu.
        Résume le texte suivant en conservant uniquement les idées essentielles.
        Règles :
        - Sois concis et clair
        - Conserve le sens et les informations clés
        - Respecte la langue du texte fourni
        - Ne commente pas, ne justifie pas : retourne uniquement le résumé
        - Retourne le résultat uniquement sous ce format JSON : 
            {
                "data": "..."
            }
        Texte :  
        """
}
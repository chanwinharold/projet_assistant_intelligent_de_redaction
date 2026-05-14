
const GlimpseEditor = ({title, content}) => {

    return (
        <div className={"glimpse"}>
            <header className={"editor__header"}>
                <h2>aperçu</h2>
            </header>
            <section className={"editor__main"}>
                <strong>{title ? (
                    title
                ):(`
                    Un titre percutant ✨
                `)}</strong>
                <p>{content ? (
                    content
                ):(`
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Praesentium quasi, rerum? At ex id illum necessitatibus 
                    saepe veniam voluptate. Facilis placeat quos reiciendis 
                    sed soluta? Accusamus hic illo in totam.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Praesentium quasi, rerum? At ex id illum necessitatibus 
                    saepe veniam voluptate. Facilis placeat quos reiciendis 
                    sed soluta? Accusamus hic illo in totam. 
                `)}</p>
            </section>
        </div>
    )
}

export default GlimpseEditor;
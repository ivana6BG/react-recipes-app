import "./Recipe.css"
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useTheme} from "../../hooks/useTheme";
import {projectFirestore} from "../../firebase/config";

export default function Recipe() {
    const { mode } = useTheme()
    const {id} = useParams();
    const navigate =useNavigate()

    const [recipe, setRecipe] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(()=>{
        setIsPending(true)

        const unsub = projectFirestore.collection("recipes").doc(id)
            .onSnapshot(doc=>{
                if(doc.exists){
                    setIsPending(false)
                    setRecipe(doc.data())
                }else{
                    setIsPending(false)
                    setError("Could not find that recipe")
                }
            })

        return ()=>unsub();
    }, [id])

    useEffect(() => {
        if(error){
            setTimeout(()=>{
                navigate('/')
            }, 2000)

        }
    }, [error])

    function handleClick() {
        projectFirestore.collection("recipes").doc(id).update({
            title: "something completely different"
        })
    }

    return (
        <div className={`recipe ${mode}`}>
            {isPending && <p className='loading'>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {recipe && (
                <div>
                    <h3 className="page-title">{recipe.title}</h3>
                    <p className="time">Takes {recipe.cookingTime} to cook</p>
                    <p className="ingr">{recipe.ingredients.join(", ")}</p>
                    <div className='method'>{recipe.method}</div>
                    <button onClick={()=>{handleClick()}}>Update</button>
                </div>
            )
            }
        </div>
    )
}
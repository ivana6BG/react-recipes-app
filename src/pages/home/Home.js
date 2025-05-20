import "./Home.css"
import {projectFirestore} from "../../firebase/config";
import RecipeList from "../../components/RecipeList";
import {useEffect, useState} from "react";

export default function Home() {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setIsPending(true)

        const unsub = projectFirestore.collection('recipes').onSnapshot(snapshot => {
            if (snapshot.empty) {
                setError('No recipes to load')
                setIsPending(false)
                setData(null)
            } else {
                let results = []
                snapshot.docs.forEach(doc => {
                    // console.log(doc)
                    results.push({ ...doc.data(), id: doc.id })
                })
                setData(results)
                setIsPending(false)
            }
        }, err => {
            setError(err.message)
            setIsPending(false)
        })

        return () => unsub()

    }, [])

    return (
        <div className="home">
            {isPending && <p className='loading'>Loading...</p>}
            {error && <p className='error'>{error}</p>}
            {data && <RecipeList recipes={data}/>}
        </div>
    )
}
import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react"
import {v4 as uuidv4 } from "uuid"
import { categories } from "../data/category"
import type { Activity } from "../types"
import { ActivityActions, ActivityState } from "../reducers/activity-reducer"

type FormProps = {
    dispatch: Dispatch<ActivityActions>
    state: ActivityState
} 
const initialState = {
        id: uuidv4(),
        category: 1,
        name: "",
        calories: 0,
    
}
export default function Form({dispatch, state} : FormProps) {
// el type se lo trae de forma generica. el state con el objeto initialState

    const [activity, setActivity] = useState<Activity>(initialState)
    
    useEffect(() => {
        if(state.activeId){
            const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectedActivity)            
        }
    }, [state.activeId])
    

    const handlechange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
            // se crea la varia
        const isNumberField = ["category", "calories"].includes(e.target.id)
        setActivity({
            ...activity,
            // si el target id es igual a target id deisNumberField = ["category", "calories"] entonces el value sea nume con + sino que los demas ids sera su valio normal es decir un string  
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }
    
    const isValidActivity = () => {
        const {name, calories} = activity 
        return name.trim() !== "" && calories > 0
    }
    
    

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({
            type: "save-activity",
             payload: {newActivity: activity},
            }); 
            
            setActivity({
                ...initialState, 
                id: uuidv4(),
            });
    };

  return (
    <form className="space-y-5 p-10 bg-white  shadow rounded-lg"
    onSubmit={handleSubmit}
    >
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category">Categoria</label>
            <select
            className="border  border-slate-300 p-2 rounded-lg w-full bg-white" 
            id="category"
            value={activity.category}
            onChange={handlechange}
            >
                {categories.map(category => (
                    <option 
                    key={category.id}
                    value={category.id}
                    >

                    {category.name}

                    </option>
                    ))}
            </select>
        </div>        
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className="font-bold">Actividad</label>
            <input 
            id="name"
            type="text" 
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Ej. Comida, Jugo de Naranja, Ensalada , Ejercicios, Pesas, Bicicleta"
            value={activity.name}
            onChange={handlechange}
            />
        </div>
        
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className="font-bold">
                Calorias
            </label>
            <input 
            id="calories"
            type="text" 
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Calorias. ej. 300 o 500"
            value={activity.calories}
            onChange={handlechange}
            />
        </div>
        <input 
            type="submit"
            className="bg-gray-800  hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
            value={activity.category === 1 ? "Guardar comida" : "Guardar ejercicios"}
            disabled={!isValidActivity()}
         />
    </form>
  )
}

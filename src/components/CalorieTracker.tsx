import { useMemo } from "react"
import type { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay";


type CalorieTrackerProps={
    activities: Activity[],
}

export default function CalorieTracker({activities}: CalorieTrackerProps)  {
    const caloriasConsumed = useMemo(() => activities.reduce((total,activity) => activity.category === 1 ? total + activity.calories: total, 0 ) ,[activities]);
    const caloriasBurned = useMemo(() => activities.reduce((total,activity) => activity.category === 2? total + activity.calories: total, 0 ) ,[activities]);
    const netCalories =  useMemo(() =>  caloriasConsumed - caloriasBurned,[activities] )
  return (
    <>
        <h2 className="text-4xl font-black text-white text-center">Resumen de Calorias</h2>
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
            <CalorieDisplay
            calories={caloriasConsumed}
            text="Consumidas"
            />
            <CalorieDisplay
            calories={caloriasBurned}
            text="Ejercicios"
            />
            <CalorieDisplay
            calories={-netCalories}
            text="Diferencias"
            />
        </div>
    </>
  )
}

import { Activity } from "../types"
     
export type ActivityActions = 
    { type : "save-activity";
     payload: { newActivity: Activity}} |
    { type : "set-activeId";
     payload: { id: Activity["id"]}} |
    { type : "delete-activity",
     payload: { id: Activity["id"]}} |
    { type : "restart-app"
} 


export type ActivityState = {
    // creo activitieState con el objeto y una propiedad con el  type de activity 
    activities : Activity[],
    // representa canda actividad (objeto que forma el array)que se genera del formulario
    activeId: Activity["id"]
    
    
}
const localStorageActivities = () : Activity[]=>{
    const activities = localStorage.getItem("activities") 
    return activities ? JSON.parse(activities) : []

}


export const initialState : ActivityState = {
    // inicio el nuevo estado vacio pero relaciona al type de activity en la propieda activities del objeto initialState con el type de ActivityState
    activities: localStorageActivities(),
    activeId: ""
}


export const activityReducer  = (
    state: ActivityState = initialState, 
    action:ActivityActions) => {
        if(action.type === "save-activity"){
            // Este codigo maneja la logica para actualizar el state
            let updateActivities : Activity [] = []
            if(state.activeId){
                updateActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity: activity)
       }else{
        updateActivities = [...state.activities, action.payload.newActivity]
       }
       
        return{
            ...state,
            activities: updateActivities,
           activeId: "",
        }        
    }


    if(action.type === "set-activeId"){
        return{
            ...state,
            activeId: action.payload.id
        }
    }

    if(action.type === "delete-activity"){
        return{
            ...state,
            activities: state.activities.filter(activity => activity.id !== action.payload.id)
        }
    }
    if(action.type === "restart-app"){
        return {
            activities: [],
            activeId: ""
        }
    }
    return state 

}
import React, { useReducer } from "react"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"

function listReducer(state, action) {
    switch (action.type) {
        case "inputchange":
            return {
                ...state,
                input: action.value
            }
        
        case "additem": 
            return {
                input:"",
                list: [...state.list, state.input]
            }
    
        default:
            return state;
    }
}

const initialState = {
    input:"",
    list:["item 1", "item 2"]
}

export default function TodoList() {

    const [state, dispatch] = useReducer(listReducer, initialState)

    const onSubmit = e => {
        e.preventDefault();
        
        dispatch({type:"additem"})
    }

   return (
    <div>
        <form onSubmit={onSubmit}>
            <input 
                type="text"
                value={state.input}
                onChange={ e => dispatch({
                    type: "inputchange", 
                    value: e.currentTarget.value
                })}
            />
            <button type="submit">ADD ITEM</button>
        </form>
        <ul className="list-group"> {
            state.list.map(item => 
                <li 
                    key={item + Math.random().toString()}
                    className="list-group-item"
                    >
                    {item}
                </li>)
        }</ul> 
</div>
   )
}


import React, { useReducer } from "react"

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
                list: [state.input,...state.list]
            }

        case "removeitem": {
         let oldList = state.list
         let index = oldList.indexOf(action.value)         
         
            return {
                input: state.input,
                list: [...oldList.slice(0,index),...oldList.slice(index + 1)]
            }
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
    <div className="todoListContainer">
        <form className="input-group mb-3"onSubmit={onSubmit}>
            <input 
                className="form-control"
                type="text"
                value={state.input}
                maxLength="30"
                placeholder="ENTER TASK HERE"
                onChange={ e => dispatch({
                    type: "inputchange", 
                    value: e.currentTarget.value
                })}
            />
            <button className="btn btn-outline-primary" type="submit">ADD TASK</button>
        </form>
        <ul className="list-group"> {
            state.list.map(item => { return(
                <li 
                    key={item + Math.random().toString()}
                    className="list-group-item list-group-item-action container-fluid d-flex justify-content-between align-items-center"
                    >
                    {item}
                    <button
                        className="btn btn-outline-danger"
                        onClick={() => dispatch({type:"removeitem", value:item})}
                    >
                        DEL
                    </button>
                </li>
                
            )})
            
        }</ul> 
</div>
   )
}


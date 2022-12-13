import React, { useReducer } from "react"

const TodoList = () => {

    //input control
    const inputReducer = (state, action) => {
        switch(action.type) {
            case "input_changed": {
                return action.payload
            }
            default: {
                return state
            }
        }
    }
    const [input, inputDispatch] = useReducer(inputReducer,"")
    const handleInput = (event) => inputDispatch({type:"input_changed", payload:event.target.value})
    
    //list control
    const addListReducer = (state, action) => {
        switch(action.type) {
            case "listitem_added": {
                console.log("action.payload", action.payload);
                console.log("state", state);
                let newList = state
                let newValue = action.payload
                console.log("newList should be state", newList);
                console.log("newValue", newValue);
                let updatedList = newList.push("u")
                console.log("updated List", updatedList);
                //return updatedList
            }
            default: {
                return state
            }
        }
    }   
    const [list, listDispatch] = useReducer(addListReducer, [])
    const addHandler = () => {
        listDispatch({type:"listitem_added", payload: input}) 
        inputDispatch({type:"input_changed", payload: ""}) 
    }

   return <>
   <input 
        type="text"
        value={input}
        onChange={handleInput}
    /><button onClick={addHandler}>+</button>
    <div> {console.log(list)}</div> 
   </>
}

export default TodoList
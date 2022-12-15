import React, { useReducer } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faCheck, faRotateRight } from '@fortawesome/free-solid-svg-icons'

// LIST REDUCER FUNCTION

function listReducer(state, action) {
    switch (action.type) {
        case "inputchange":
            return {
                ...state,
                input: action.value
            }
        
        // ADD ITEM TO LIST
        case "additem": 
            return {
                input:"",
                list: [
                    {
                        text: state.input,
                        success: false
                    },
                    ...state.list
                ]
            }

        //REMOVE ITEM FROM LIST
        case "removeitem": {
         
         let oldList = state.list
         let index = oldList.indexOf(action.value)         
         
            return {
                input: state.input,
                list: [...oldList.slice(0,index),...oldList.slice(index + 1)]
            }
        }

        // CHANGE ITEM SUCCESS STATE

        case "successitem": {

            let oldList = state.list
            let index = oldList.indexOf(action.value) 

            return {
                input: state.input,
                list: [
                    ...oldList.slice(0,index),
                    {
                        text: action.value.text,
                        success: !action.value.success
                    },
                    ...oldList.slice(index + 1)
                ]
            }
        }
        
    
        default:
            return state;
    }
}

// INITAL STATE

const initialState = {
    input:"",
    list:[
        {
            text: "Item 1",
            success: false
        }, 
        {
            text: "Item 2",
            success: true
        }
    ]
}

//CSS EXTRA DELETE AND SUCCES BUTTON STYLE

const actionButtonStyle = {
    marginLeft: "10px"
}

// COMPONENT FUNCTION

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
                    key={item.text + Math.random().toString()}
                    className="list-group-item list-group-item-action container-fluid d-flex justify-content-between align-items-center"
                    style={item.success ? {textDecoration: "line-through", color:"#999999"} : {} }
                    >
                    {item.text}
                    <div>
                        <button
                            className="btn btn-outline-danger"
                            onClick={() => dispatch({type:"removeitem", value:item})}
                            style={actionButtonStyle}
                        >
                        <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button
                            className={item.success ? "btn btn-outline-secondary" : "btn btn-outline-success" }
                            onClick={() => dispatch({type:"successitem", value:item})}
                            style={actionButtonStyle}
                        >
                        {item.success ? <FontAwesomeIcon icon={faRotateRight} /> : <FontAwesomeIcon icon={faCheck} />}
                        </button>
                    </div>
                </li>
                
            )})
            
        }</ul> 
</div>
   )
}


import React from 'react';
import NewExpenseForm from './NewExpenseForm';
import './NewExpense.css'

const NewExpense = (props) => {

    function handleExpenseData(d){
        props.onGetExpenseData(d)
    }

    function handleUpdate(data){
        props.getUpdates(data)
    }

    return (
        <div className = "new-expense">
            <NewExpenseForm 
                onGetExpenseData={handleExpenseData} 
                getUpdate = {props.getUpdateditem}  
                onUpdateExpenseData = {handleUpdate}
            />
        </div>        
    )
}

export default NewExpense;

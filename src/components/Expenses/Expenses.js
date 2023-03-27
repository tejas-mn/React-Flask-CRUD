import React from 'react';
import Card from '../UI/Card';
import './Expenses.css';
import ExpenseItem  from './ExpenseItem';

const Expenses = (props) => {
  
  function handleDelete(key){
    props.DeleteExpense(key)
  }

  function handleUpdate(data){
     console.log(data);
     props.UpdateExpense(data)
  }

 
  return (
        <Card className="expenses">
          {
            props.items.map(expense => (
                <ExpenseItem key={expense.id}
                  amount ={ expense.amount} 
                  date={expense.date} 
                  title={expense.title} 
                  id = {expense.id} 
                  onDelete = {handleDelete}
                  onUpdate = {handleUpdate}
                
                 />
            ))
          }
        </Card>
    );
}

export default Expenses;
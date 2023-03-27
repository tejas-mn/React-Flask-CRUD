import React, { useState , useEffect} from 'react';
import './ExpenseItem.css'
import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';

const arr = []

const ExpenseItem=(props)=>{
    const [clicked , setClick] = useState(false);

    function DeleteExpenseItem(){
        const key = props.id;
        props.onDelete(key);
    }
    
    function loadForm(){
       
        console.log(props);
        console.log("click: " , clicked);
        props.onUpdate(props);
        setClick((e)=>!e)
    }

    useEffect(() => {
        clicked?arr.push(props.id):arr.pop(props.id);
        console.log("You have selected : " , arr.length , " items");
      
    }, [clicked])
    

    const styles = {
        backgroundColor :  "purple",
        borderRadius : "15px",
        boxShadow : "0px 0px 10px red",
        outline : "5px solid white"
    }

    return (
        <div style={ clicked?styles: null}>
            <Card  className="expense-item">
            <ExpenseDate date={new Date(props.date)}   />
              <div className="expense-item-description"  onClick={loadForm}   >
                <h2>{props.title}</h2>
                <div className="expense-item-price">${props.amount}</div>
              </div>

            <h1> | </h1>
            <div className='btns'>
             <button className='del-btn' onClick={DeleteExpenseItem}>Delete</button>   
            </div>
                
        </Card>
        </div>
       
    );

}

export default ExpenseItem;
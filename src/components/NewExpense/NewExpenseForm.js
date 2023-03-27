import {React , useEffect, useState} from 'react'
import './NewExpenseForm.css'

const NewExpenseForm = (props) => {   
   const [newTitle, setnewTitle] = useState('');
   const [newAmount, setnewAmount] = useState('');
   const [newDate, setnewDate] = useState('');
   const [id , setID] = useState(0);

   const [btn , setbtn]  = useState(false);

   function updateHandler(e){
        e.preventDefault();
        const receivedUpdatedData = {
            id : props.getUpdate.id,
            title : newTitle,
            amount : newAmount,
            date : new Date(newDate)
        }

        console.log(receivedUpdatedData);

        props.onUpdateExpenseData(receivedUpdatedData)    
        
        setnewTitle('')
        setnewAmount('')
        setnewDate('') 
        setbtn(false)
    }


   useEffect(()=>{
    
        var now = new Date(props.getUpdate.date);
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = now.getFullYear()+"-"+(month)+"-"+(day) ;

        
        setnewTitle(props.getUpdate.title!==undefined?props.getUpdate.title:'');
        setnewAmount(props.getUpdate.amount!==undefined?props.getUpdate.amount:'');
        setnewDate(props.getUpdate.date!==undefined?today:'');


        if(props.getUpdate.title!==undefined) setbtn(true);
        
    } , [ props.getUpdate] );
   
    function handleTitle(e){
        setnewTitle(e.target.value)
   }
   
   function handleAmount(e){
        setnewAmount(e.target.value)
   }
   
   function handleDate(e){
        setnewDate(e.target.value)
   }

   function submitHandler(e){
        e.preventDefault();
        const receivedExpenseData = {
            title : newTitle,
            amount : newAmount,
            date : new Date(newDate)
        }
        console.log(receivedExpenseData)
        setnewTitle('')
        setnewAmount('')
        setnewDate('')
        setID((prev) => prev+1)

        const newExpenseData = {
            ...receivedExpenseData,
            id : parseInt(id).toString()
        }

        props.onGetExpenseData(newExpenseData)    
   }    
   
   return (
    
        <form className='new-expense-form'>

            <div className='new-expense-form-controls'>
                <div className='new-expense-form-control'> 
                    <label>Expense Title :</label>
                    <input type="text" value={newTitle} onChange={handleTitle}></input>
                </div>
                
                <div className='new-expense-form-control'>
                    <label>Expense Amount: </label>
                    <input type="number"   value={newAmount} onChange={handleAmount}></input>
                </div>

                <div className='new-expense-form-control'>
                    <label>Expense Date: </label>
                    <input type="date" value={newDate} onChange={handleDate}></input>
                </div>
            </div>

            <div className='new-expense-form-action'>
                
                <button className="new-expense-form-btn" onClick={submitHandler}>Add Expense</button>

                { btn && <button className="update-btn" onClick={updateHandler}>Update Expense</button> }
                
            </div>

        </form>

  )
}

export default NewExpenseForm;
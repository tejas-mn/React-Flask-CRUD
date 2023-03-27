import {React,useState,useEffect} from 'react';
import Expenses from "./components/Expenses/Expenses";
import NewExpense from './components/NewExpense/NewExpense';
import './App.css'

let SAMPLE = [
    
  {
    id:'e1',
    title:'school fee',
    amount : 250,
    date: new Date(2022   , 12 , 5)
  },
  
  {

    id:'e2',
    title:'college fee',
    amount : 600,
    date: new Date(2022   , 9 , 5)
  }
];

const App = () => {
  const [expenses , setExpenses] = useState(SAMPLE);
  const [updatedItem , setUpdatedItem] = useState({});

  function fetchData(){
    fetch('http://127.0.0.1:4500/getdata')
    .then((res) => {
        return res.json()
      })
      .then(
        data => {
          setExpenses(data)
        }
      )
  }

  useEffect(() => {
      fetchData()  
  }, [])
  
  function handleExpenseData(expense){
    fetch('http://127.0.0.1:4500/postdata' , {
      method : 'POST',
      body: JSON.stringify(expense),
      headers : {
        'content-type' : 'application/json'
      }
    })
    .then(res=>{
      fetchData()
    });
  }

  function handleExpenseDelete(key){
    fetch('http://127.0.0.1:4500/deletedata/'+ key , {
        method : 'DELETE',
        headers : {
          'content-type' : 'application/json'
    }})
    .then(res=>{
      fetchData()
    })
  }

  function handleExpenseUpdate(data){
     console.log(data);
      setUpdatedItem(data);
  }

  function handleExpenseUpdate2(updated_expense){
    fetch('http://127.0.0.1:4500/updatedata/' + updated_expense.id , {
      method : 'PUT',
      body: JSON.stringify(updated_expense),
      headers : {
        'content-type' : 'application/json'
      }
    })
    .then(res=>{
      fetchData()
    })
    console.log(updated_expense);
  }


  return (
    <div className="App">
      <h2>Expense Tracker</h2>
    
      <NewExpense 
        onGetExpenseData={handleExpenseData} 
        getUpdateditem = {updatedItem} 
        getUpdates = {handleExpenseUpdate2}>
      </NewExpense>
      
      <Expenses 
        items = {expenses} 
        DeleteExpense = {handleExpenseDelete} 
        UpdateExpense={handleExpenseUpdate} 
      />
    
    </div>
  );
}

export default App;
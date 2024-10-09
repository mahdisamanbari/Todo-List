import React, { useEffect, useState } from 'react';

const App = () => {
  const [newItem ,setNewItem]=useState("")
  const [todos ,setTodos] = useState(()=>{
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []
    return JSON.parse(localValue)
  })
  const handleSubmit = (e)=>{
    e.preventDefault();
    const currentTodos= [...todos ,
    {id:crypto.randomUUID(),
    title:newItem,
    completed:false}]
    setTodos(currentTodos)
    setNewItem("")
  }
  const deletHandler = (id)=>{
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }
  useEffect(()=>{
    localStorage.setItem("ITEMS", JSON.stringify(todos));

  },[todos])
  

  return (
    <>
    <form onSubmit={handleSubmit} className='new-item-form'>
      <div className='form-row'>
        <label htmlFor='item'>New Item</label>
        <input
         value={newItem}
         onChange={e => setNewItem(e.target.value)}
         type='text'
          id='item'/>
      </div>
      <button className='btn'>Add</button>
    </form>
    <h1 className='header'>Todo List</h1>
    <ul className='list'>
      {todos.length === 0 && "No List"}
      {todos.map(todo =>{
        return(
          <li key={todo.id}>
           <label>
            <input
            type='checkbox' />
             {todo.title}
           </label>
           <button onClick={()=>deletHandler(todo.id)} className='btn btn-danger'>Delete</button>
          </li>
        )
      })}
      
    </ul>
      
    </>
  );
};

export default App;
import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './App.css';
import InputField from './components/InputFields';
import TodoList from './components/TodoList';
import {Todo} from "./model";

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if(todo) {
      setTodos([...todos, {id: Date.now(), todo: todo, isDone:false}])
      setTodo("")
    }
  }

  const onDragEnd = (result:DropResult) => {

    console.log("result", result)
    const {source, destination} = result;

    if(!destination || (source.droppableId === destination.droppableId && destination.index === source.index)) return;
    let add, active = todos, complete = completedTodos;

    if(source.droppableId === "TodosList") {
      add = active[source.index]
      active.splice(source.index, 1)
    } else {
      add = complete[source.index]
      complete.splice(source.index, 1)
    }

    if(destination.droppableId === "TodosList"){
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add)
    }
    console.log("complete", complete)
    console.log("active", active)
    setCompletedTodos(complete);
    setTodos(active)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
        <TodoList 
          todos={todos} setTodos={setTodos} 
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
}

export default App;

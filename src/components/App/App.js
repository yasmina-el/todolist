import { useState } from 'react';
import './App.css';
import Task from '../Task/Task';
import Button from '../Button/Button';



function App() {

  // Hook qui va contenir les nouvelles tâches à effectuer
  const[newTasks, setNewTasks]=useState([])
    // Hook qui va contenir l'entrer de l'utilisateur
  const[userEnter,setUserEnter]=useState("")
  /* Hook qui me permettra de définir un compteur que j'utiliserai comme clé afin d'identifier plus facilement 
  les tâches que lutilisateur souhaite supprimer */
  const [count, setCount]=useState(0)
  
// fonction qui va permettre l'ajout de la nouvelle tâche entré par l'utilisateur
  const addTask=()=>{
    // j'incrémente mon compteur puis je défini un nouvelle objet qui va contenir l'entrer utilisateur dont l'identifiant sera la valeur du compteur
    setCount(count+1)
    let task={id: count, taskName: userEnter}
    // je réalise une copie du tableaux des tâches actuels et je lui ajoute la nouvelle tâche 
    let newTaskcopie=[...newTasks]
    newTaskcopie.push(task)
    // je mets à jour mon tableau newTask en utilisant la copie comprenant la nouvelle tâche ajouter
    setNewTasks(newTaskcopie);
   
  }


// Fontion qui va permettre de supprimer la tâche sélectionner par l'utilisateur gra^ce à sont identifiant
  const deleteTask=(targetId)=>{
    // J'effectue tout d'abord une copie de mon tableau contenant toute les tâches actuelles
    let listTasks=[...newTasks];
    // j'utilise la fonction filter qui va me renvoyer uniquement les tâches dont l'identifiant et différent de celui de la tâche à supprimer
    let lists=listTasks.filter((task)=>task.id!=targetId)
    // je mets ensuite à jour la listes des tâches
    setNewTasks(lists)

  }
  
  return (
    <div className="App container">

      <h1>TO DO LIST</h1>

      <div className='input-group my-3'>
        {/* input dont la valeur correspond à l'entrer de l'utilisateur. Pour permettre 
        à l'utilisateur de modifier ce champs, j'applique une écoute sur l'évènement onChange qui va alors mettre à jour 
        la value de l'input soit ma variable userEnter grâce au setter setUserEnter
        */}
      <input className='form-control' type='text' placeholder='ajouter la mission du jour' value={userEnter} onChange={(e)=>setUserEnter(e.target.value)}/>
      
      {/* J'appelle mon composant Button.
      */}
      <Button type='success' onClick={addTask}>Ajouter</Button>
      </div>

      {/* J'utilise la méthode map sur mon tableau contenant toute les tâches afin de 
      le parcourir et donc d'obtenir chaque tâche.
      Pour afficher chacune d'entre elle de façon structuré, j'appelle mon composant Task via la méthode map.
      */}
     <ul className="list-group list-group-flush">
      {newTasks.map((task)=>{
      
        return <li key={task.id} className='task list-group-item d-flex justify-content-between align-items-center mx-5 px-5'>   
          <Task index={task.id} onClick={() => deleteTask(task.id)}>{task.taskName}</Task>
          
        </li>
      })}
      </ul>
    </div>
  );
}

export default App;

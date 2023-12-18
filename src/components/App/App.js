import { useEffect, useState } from 'react';
import './App.css';
import Task from '../Task/Task';
import Button from '../Button/Button';



function App() {

  // Hook qui va contenir les nouvelles tâches à effectuer
  const [newTasks, setNewTasks] = useState(() => {

    /* je vérifie si des tâches ont été stocké initialement dans le localstorage
    Si oui j'affiche les données sinon je part d'un tableau vide
    */
    if (localStorage.taskLists) {
      return JSON.parse(localStorage.taskLists)
    } else {
      return []
    }

  })
  // Hook qui va contenir l'entrer de l'utilisateur
  const [userEnter, setUserEnter] = useState("")
  /* Hook qui me permettra de définir un compteur que j'utiliserai comme clé afin d'identifier plus facilement 
  les tâches que l'utilisateur souhaite supprimer */
  const [count, setCount] = useState(0)

  // fonction qui va permettre l'ajout de la nouvelle tâche entré par l'utilisateur
  const addTask = () => {
    /* je génère un nombre aléatoire correspondant puis 
    je défini un nouvelle objet qui va contenir l'entrer utilisateur dont l'identifiant sera la valeur du compteur
    et une proprité finish qui va me permettre de savoir si la tâche est marqué comme terminé
    */
    setCount(Math.floor(Math.random() * 10000))
    let task = { id: count, taskName: userEnter, finish: 'false' }
    // je réalise une copie du tableaux des tâches actuels et je lui ajoute la nouvelle tâche 
    let newTaskcopie = [...newTasks]
    newTaskcopie.push(task)
    localStorage.setItem("taskLists", JSON.stringify(newTaskcopie))
    // je mets à jour mon tableau newTask en utilisant la copie comprenant la nouvelle tâche ajouter
    setNewTasks(newTaskcopie);
    console.log(localStorage);
  }


  // Fontion qui va permettre de supprimer la tâche sélectionner par l'utilisateur grâce à sont identifiant
  const deleteTask = (targetId) => {
    // J'effectue tout d'abord une copie de mon tableau contenant toute les tâches actuelles
    let listTasks = [...newTasks];
    // j'utilise la fonction filter qui va me renvoyer uniquement les tâches dont l'identifiant et différent de celui de la tâche à supprimer
    let lists = listTasks.filter((task) => task.id != targetId)
    localStorage.setItem("taskLists", JSON.stringify(lists))
    // je mets ensuite à jour la listes des tâches
    setNewTasks(lists)

  }

  // Cette fonction va me permettre de changer le status de la tâche
  const checkTask = (targetId) => {
    // Pour pouvoir parcourir ma collection je parse mon tableau taskLists
    let lists = JSON.parse(localStorage.taskLists)

    lists.forEach(task => {
      // Dans le cas où l'id de la tâche correspond à celle de la tâche coché je modifie son status
      if (task.id == targetId) {
        if (task.finish == "false") {
          task.finish = "true"

        } else {
          task.finish = "false"
        }

      }
    });

    // Puis j'enregistre dans le localstorage ces changements de status et je modifie mon state pour que l'affichage soit en accord
    localStorage.taskLists = JSON.stringify(lists)
    setNewTasks(lists)
  }

  // je défini la fonction filterTask qui comme son nom l'indique va me permettre de filtrer les tâches en fonction de leurs status
  const filterTask = (targetValue) => {
    /* je fait une copie de mon tableau des tâches contenu dans le localstorage et 
    non une copie du state que je vais modifier. De cette manière je concerve la totalité des tâches quelque soit leur status*/
    let listTasks = [...JSON.parse(localStorage.taskLists)];

    /* En fonction de la valeur du bouton sur lequel l'utilisateur à cliquer (afficher les tâches fini "finish", en cours "ongoing" ou toute les tâches)
    j'applique la fonction filter afin d'obtenir le tableau des tâches rechercher
    */
    if (targetValue == "finish") {
      let lists = listTasks.filter((task) => task.finish == "true")
      console.log(lists);
      // je modifie ici mon state et donc celui-ci ne contiendra plus toutes les tâches initiales.
      setNewTasks(lists)
    } else if (targetValue == "ongoing") {
      let lists = listTasks.filter((task) => task.finish == "false")
      setNewTasks(lists)
    } else {
      // je rétablie le contenu initial à partir du localstorage dans lequel j'ai pris soin de concervé les tâches initiales
      setNewTasks(JSON.parse(localStorage.taskLists))
    }

  }


  return (
    <div className="App container w-50">

      <h1>TO DO LIST</h1>

      <div className='input-group my-3'>
        {/* input dont la valeur correspond à l'entrer de l'utilisateur. Pour permettre 
        à l'utilisateur de modifier ce champs, j'applique une écoute sur l'évènement onChange qui va alors mettre à jour 
        la value de l'input soit ma variable userEnter grâce au setter setUserEnter
        */}
        <input className='form-control' type='text' placeholder='ajouter la mission du jour' value={userEnter} onChange={(e) => setUserEnter(e.target.value)} />

        {/* J'appelle mon composant Button.
      */}
        <Button type='success' onClick={addTask}>Ajouter</Button>
      </div>

      <span>
        <i class="bi bi-funnel-fill"></i>

        <Button onClick={(e) => filterTask(e.target.value)} value={"finish"}>Tâches terminées</Button>
        <Button onClick={(e) => filterTask(e.target.value)} value={"ongoing"}>Tâches en cours</Button>
        <Button onClick={(e) => filterTask(e.target.value)}>Toutes les tâches</Button>

      </span>

      {/* J'utilise la méthode map sur mon tableau contenant toute les tâches afin de 
      le parcourir et donc d'obtenir chaque tâche.
      Pour afficher chacune d'entre elle de façon structuré, j'appelle mon composant Task via la méthode map.
      */}
      <ul className="list-group list-group-flush">
        {newTasks.map((task) => {

          return <li key={task.id} className='task list-group-item d-flex justify-content-between align-items-center mx-5 px-5'>

            <Task index={task.id} status={task.finish} check={() => checkTask(task.id)} onClick={() => deleteTask(task.id)}>{task.taskName}</Task>

          </li>

        })}
      </ul>
    </div>
  );
}

export default App;

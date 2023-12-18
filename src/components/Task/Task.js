import React from 'react'
import Button from '../Button/Button'
import './Task.css'

/*Le composant Task aura pour props:
-index qui va simplement me permettre de lier la checkbox à son label qui servira à l'utilisateur pour marqué la tâche comme terminé
-onClick qui va me permettre de définir l'action du bouton ici une suppression
-check va me permettre de modifié le status de la tâche afficher
-status va me permettre d'indiquer les tâches terminer en ajoutant l'attribue checked
En children celui-ci servira à définir l'intitulé du label
*/

export default function Task({ children, index, onClick, check, status }) {
  return (
    <>

      {/* j'avais défini la valeur du status sous forme d'un booléen au départ 
mais malheureusment il me prend en compte celle-ci seulement si je la précise en string comme si dessous 
Cela est surement dû à l'utilisation de la méthode JSON.stringify() pour le localstorage ce qui à transformer le type de ma donnée*/}
      {status == "true"
        ? <input className='form-check-input ' checked id={'t' + index} type='checkbox' onClick={check} />

        : <input className='form-check-input ' id={'t' + index} type='checkbox' onClick={check} />
      }


      <label className='form-check-label ' htmlFor={'t' + index}>{children}</label>


      <Button type='outline-danger' onClick={onClick}><i className="bi bi-trash-fill"></i> Supprimer</Button>

    </>

  )
}

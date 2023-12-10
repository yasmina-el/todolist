import React from 'react'
import Button from '../Button/Button'
import './Task.css'

/*Le composant Task aura pour props:
-index qui va simplement me permettre de lier la checkbox à son label qui servira à l'utilisateur pour marqué la tâche comme terminé
-onClick qui va me permettre de définir l'action du bouton ici une suppression
En children celui-ci servira à définir l'intitulé du label
*/

export default function Task({ children, index, onClick }) {
  return (
    <>

      <input className='form-check-input ' id={'t' + index} type='checkbox' />
      <label className='form-check-label ' htmlFor={'t' + index}>{children}</label>


      <Button type='outline-danger' onClick={onClick}><i className="bi bi-trash-fill"></i> Supprimer</Button>

    </>

  )
}

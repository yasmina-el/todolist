import React from 'react'

/*
Mon composant Button va permettre comme son nom l'indique de définir des boutons.

Il a en props:
-type qui va permtettre d'utiliser les classes Bootsrap
-onClick qui va permttre de définir l'action du bouton

L'élément children permettra de définir l'intitulé du bouton
*/ 

function Button({onClick, children, type}) {
  return (
    <button className={"btn btn-"+type} onClick={onClick}>{children}</button>
  )
}

export default Button
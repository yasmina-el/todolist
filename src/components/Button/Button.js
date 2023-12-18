import React from 'react'

/*
Mon composant Button va permettre comme son nom l'indique de définir des boutons.

Il a en props:
-type qui va permtettre d'utiliser les classes Bootsrap
-onClick qui va permttre de définir l'action du bouton
-value va me permettre d'identifier le bouton notamment pour les boutons de filtrage 

L'élément children permettra de définir l'intitulé du bouton
*/ 

function Button({onClick, children, type, value}) {
  return (
    <button value={value} className={"btn btn-"+type} onClick={onClick}>{children}</button>
  )
}

export default Button
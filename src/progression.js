const apprenants = require("./data")

function normaliserNom(nom){
nom = nom.trim()
nom = nom.toLowerCase()
nom = nom.replace(/[^a-zA-Z ]/g, "")
nom = nom.replace(/\s+/g, " ");
nom = nom.trim()
let mots = nom.split(" ")

let nouveaunom = ""

for (let i = 0; i < mots.length; i++) {
  let mot = mots[i]

  let premiereLettre = mot[0].toUpperCase();
  let reste = mot.slice(1)

  nouveaunom = nouveaunom + premiereLettre + reste + " "
} 

nouveaunom = nouveaunom.trim()

return nouveaunom
}

function validerResultat(resultat){
if(resultat.jour<1 || resultat.jour>7){
  return "invalid informatione"
}
if (resultat.exercicesTermines<0 || resultat.exercicesTermines>20){
  return "invalid informatione"
}
if (resultat.totalExercices!==20){
  return "invalid informatione"
}
if (typeof(resultat.challengeTermine)!=="boolean"){
return "invalid informatione"
}
  return true
  
}

function ajouterApprenant(apprenants, nouveauApprenant) {
  for(let i=0; i<apprenants.length; i++){
    if(apprenants[i].id == nouveauApprenant.id)
      return "id est existe déjà"
  }
   apprenants.push(nouveauApprenant)
  return true
}

function enregistrerResultat(apprenants, id, resultats){
  if(validerResultat(resultats) != true )
      return "resultat non valide"
 
  for(let i=0; i<apprenants.length; i++){
    
    if(apprenants[i].id == id){
    
      for(let j=0; j<apprenants[i].resultats.length; j++){
      
         if(apprenants[i].resultats[j].jour == resultats.jour){
         apprenants[i].resultats[j] = resultats
         return true
      }
         
      }
      apprenants[i].resultats.push(resultats)
      return true
      
    }
    
  }
  return "apprenants untrouvable"
}
function rechercherApprenant(apprenants, recherche){

  for(let i = 0; i < apprenants.length; i++){

    if (apprenants[i].nomComplet.toLowerCase().includes(recherche.toLowerCase()))
      return apprenants[i]
  }
  return "apprenant untrouvable"
}
console.log(rechercherApprenant(apprenants, "sara"))

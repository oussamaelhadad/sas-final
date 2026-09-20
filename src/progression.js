const apprenants = require('./data.js')

const prompt = require("prompt-sync")();

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

function ajouterApprenant(apprenants) {
  let id = prompt("Entrez l'ID : ")
  for (let i = 0; i < apprenants.length; i++) {
    if (apprenants[i].id == Number(id)) {
      return "ID existe déjà";
    }
  }
  let nom = prompt("Entrez le nom complet : ")
  let ville = prompt("Entrez la ville : ")
  let nouveauApprenant = {
    id: id,
    nomComplet: normaliserNom(nom),
    ville: ville,
    resultats: []
  };

  apprenants.push(nouveauApprenant)
  return apprenants;
}

function enregistrerResultat(apprenants) {

  let id = Number(prompt("Entrez l'ID de l'apprenant : "))
  let jour = Number(prompt("Entrez le jour : "))
  let exercicesTermines = Number(prompt("Entrez le nombre d'exercices terminés : "))
  let challenge = prompt("Challenge terminé ? true/false : ")

  let challengeTermine = challenge.toLowerCase() == "true"

  let resultats = {
    jour: jour,
    exercicesTermines: exercicesTermines,
    totalExercices: 20,
    challengeTermine: challengeTermine
  }

  if (validerResultat(resultats) != true){
    return "resultat non valide"
  }
    

  for (let i = 0; i < apprenants.length; i++) {

    if (apprenants[i].id == id) {

      for (let j = 0; j < apprenants[i].resultats.length; j++) {

        if (apprenants[i].resultats[j].jour == jour) {
          apprenants[i].resultats[j] = resultats;
          return true;
        }
      }
      apprenants[i].resultats.push(resultats)
      return true
    }
  }

  return "apprenant introuvable"
}

function rechercherApprenant(apprenants) {

  let recherche = prompt("Entrez l'ID ou le nom de l'apprenant : ")

  for (let i = 0; i < apprenants.length; i++) {
   
    if (apprenants[i].id === Number(recherche) ||apprenants[i].nomComplet.toLowerCase().includes(recherche.toLowerCase())){
      return apprenants[i]
    }
  }
  return "apprenant introuvable"
}

function calculerProgression (apprenant){
  let totaleExercicestermines = 0
  let totaleExercicesProposes = 0
  let totaleChallengestermines = 0
  let JournéesRenseignées = 0
 
  for(let i=0; i<apprenant.resultats.length; i++){
    totaleExercicestermines = totaleExercicestermines + apprenant.resultats[i].exercicesTermines

    totaleExercicesProposes = totaleExercicesProposes + apprenant.resultats[i].totalExercices
   
    if(apprenant.resultats[i].challengeTermine){
      totaleChallengestermines++
    }
    JournéesRenseignées++
}
if (apprenant.resultats.length === 0){
    return 0;
}

let progression = (totaleExercicestermines/totaleExercicesProposes)*100

if (progression >= 80){
  niveau = "Solide"
}
else if (progression >= 50 && progression <= 79){
  niveau = "En progression"
}
else{
  niveau = "À renforcer"
}

return {
  progression : progression,
  niveau : niveau,
  totaleExercicestermines : totaleExercicestermines,
  totaleExercicesProposes : totaleExercicesProposes,
  totaleChallengestermines : totaleChallengestermines,
  JournéesRenseignées : JournéesRenseignées
}
}

function filtrerParNiveau (apprenants){
  let niveau = prompt("Entrez le niveau que vous recherchez : ")
  niveau = niveau.toLowerCase()
  let resultats = []

  for(let i = 0; i < apprenants.length; i++){
    let resultat = calculerProgression(apprenants[i])
   
    if(resultat.niveau.toLowerCase()===(niveau)){
      resultats.push(apprenants[i])
    }
  }
  return resultats
}

function trierParProgression (apprenants){
 let resultat = [...apprenants]
  
 for (let i = 0; i < resultat.length - 1; i++){

   for (let j = i + 1; j < resultat.length; j++){

   let progression1 = calculerProgression(resultat[i])
   let progression2 = calculerProgression(resultat[j])

  if (progression1.progression < progression2.progression){

  let variable = resultat[i]
   resultat[i] = resultat[j]
   resultat[j] = variable
  }
  if (progression1.progression == progression2.progression){
  
    if (resultat[i].nomComplet.toLowerCase() > resultat[j].nomComplet.toLowerCase()){
   
    let variable1 = resultat[j]
        resultat[j] = resultat[i]
        resultat[i] = variable1
   }
    
  }
}
}
 return resultat
}

function afficherListe(apprenants){
  for(let i = 0; i < apprenants.length; i++){
      console.log(apprenants[i]);
    

  }
}

function trierParNom(apprenants){
  let resultat = [...apprenants]
 
  for(let i = 0; i < resultat.length; i++){
   
    for (let j = i+1; j < resultat.length; j++){
     
      if(resultat[i].nomComplet.toLowerCase() > resultat[j].nomComplet.toLowerCase()){
        let variable = resultat[i]
        resultat[i] = resultat[j]
        resultat[j] = variable
      }
    }
  }
  return resultat
} 

module.exports = {
    normaliserNom,
    validerResultat,
    ajouterApprenant,
    enregistrerResultat,
    rechercherApprenant,
    calculerProgression,
    filtrerParNiveau,
    trierParProgression,
    afficherListe,
    trierParNom
}


    

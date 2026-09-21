const prompt = require("prompt-sync")()

const apprenants = require('./data.js')

const {
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
} = require("./progression")
let choix
while (choix != 0){
choix = prompt(`
SAS PROGRESS CONSOLE
1. Afficher le tableau de bord
2. Afficher la liste des apprenants
3. Ajouter un apprenant
4. Consulter un apprenant par identifiant
5. Ajouter ou modifier le résultat d'une journée
6. Rechercher un apprenant par nom
7. Filtrer les apprenants par niveau
8. Trier les apprenants par progression décroissante
9. Trier les apprenants par ordre alphabétique
0. Quitter

Votre choix :
`)
if(choix == 1){
    console.log("Afficher le tableau de bord")
}
else if (choix == 2){
    afficherListe(apprenants)
}
else if (choix == 3){
    console.log(ajouterApprenant(apprenants))
}
else if (choix == 4){
    console.log(rechercherApprenant(apprenants))
}
else if (choix == 5){
    console.log(enregistrerResultat(apprenants))
}
else if (choix ==6){
    console.log(rechercherApprenant(apprenants))
}
else if (choix == 7){
    console.log(filtrerParNiveau (apprenants))
}
else if (choix == 8){
    console.log(trierParProgression(apprenants))
}
else if (choix == 9){
    console.log(trierParNom(apprenants))
}
else if (choix == 0){
    console.log("au revoir")
}
else {
    console.log("choix invalide")
}
}

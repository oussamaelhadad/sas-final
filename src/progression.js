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


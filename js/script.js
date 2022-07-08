
// 1/ Récupérer les données en javascript sur les séries présentes dans le fichier datas/series.json.
let series;
try {
    fetch ("datas/series.json")
    .then(response => response.json())
    .then(json =>{
        series = json;

        // Display
        displaySeries(json);
        displayStyles(getStyles(json));

        // Event handlers
        manageClickStyles();
        manageSeriesClick()
        manageFavClick()
    }); 
} catch (error) {
    console.error("error" + error);
}

// 2/ Créer une fonction pour afficher toutes les séries dans la page avec pour chacune son titre et son image.

function displaySeries() {
    const element = document.getElementById("container");
    for(const serie of series) {
        element.innerHTML += `<li data-id="${serie.id}"><h2>${serie.name}</h2><img class="image" src="${serie.image}"> </li>`;
    }

    // document.getElementById("container").innerHTML = series.map(serie => `<li><h2>${serie.name}</h2><img class="image" src="${serie.image}"> </li>`).join("")
}

// 3/ Créer une fonction qui retourne la liste des styles de séries présents dans les données.

function getStyles() {
    const array = []
    series.forEach(serie => {
        serie.styles.forEach(style => {
            if(!array.includes(style)) {
                array.push(style)
            }
        }) 
    });
    return array;
}

// 4/ Créer une fonction qui affiche la liste des styles de séries.
function displayStyles(styles){
    styles.forEach(style =>{
        document.getElementById("styles").innerHTML+=`<li data-style="${style}">${style} (${countSeriesFromStyle(style)}) </li>`
    })

    // document.getElementById("styles").innerHTML = styles.map(style => `<li>${style}</li>`).join("")
}

// 5/ Créer une fonction qui compte le nombre de séries d'un style.

function countSeriesFromStyle(style){
    let nbrSeries = 0;
    series.forEach(serie => {
        if(serie.styles.includes(style)){
            nbrSeries++;
        }
    });
    return nbrSeries;

    // return series.filter(serie => serie.styles.includes(style)).length;
}

// 6/ Affichez dans la liste des styles le nombre de séries correspondantes entre parenthèse.
//      Modifier la fonction de la question 4/


// 7/ Créer une fonction qui retourne les ID des séries d'un style.

function getIdFromStyle(style){
    return series.filter(serie => serie.styles.includes(style)).map(serie => serie.id);
}

// 8/ Créer une fonction qui gère les clics sur les styles afin de les souligner lorsqu'ils sont cliqués.

function manageClickStyles(){
    document.querySelectorAll("#styles > li").forEach(li =>{
        li.addEventListener("click", function(event){
            filterStyle(this.dataset.style)
            resetStyles()
            this.classList.add("underline")
        })
    });
}

// 9/ Créer une fonction pour retirer le soulignement de tous les styles.
//      Utiliser cette fonction pour qu'à la question 8/ seul le dernier style cliqué soit souligné.
function resetStyles(){
    document.querySelectorAll("#styles > li").forEach(li =>{
        li.classList.remove("underline")
    });    
}

// 10/ Créer une fonction qui affiche dans la page uniquement les séries dont les id sont en paramètre.
function displaySeriesById(array){
    document.querySelectorAll("#container > li").forEach(li =>{
        if (array.includes(parseInt(li.dataset.id))) li.classList.remove("hidden")
        else li.classList.add("hidden")
    });
} 

// 11/ Modifier la fonction de la question 8/ afin de filtrer les séries au clic sur un style.

function filterStyle(style) {
    displaySeriesById(getIdFromStyle(style))
}

// 12/ Créer une fonction qui retourne toutes les données d'une série à partir de son ID

function getDataFromId(id){
    let data;
    series.forEach(serie => {
        if(serie.id === parseInt(id)) data = serie;
    });
    return data;

    // return series.filter(s => s.id === parseInt(id))[0];
}

// 13/ Créer une fonction qui permet d'afficher l'id d'une série dans la console lorsque l'on clique dessus.

function displayIdFromClick(){
    document.querySelectorAll("#container > li").forEach(li =>{
        li.addEventListener("click", function(event){
            console.log(getDataFromId(this.dataset.id));
        })
    })
}

// 14/ Modifier la fonction ci-dessus pour retourner toutes les infos de la serie cliquée dans la console.

// 15/ Créer une fonction permettant d'ajouter une série à une liste de favoris.
// Une série ne peut être présente qu'une fois dans le tableau.
let favList = [];
function addSerieToFav(serie){
   if (!favList.includes(serie)) {
     favList.push(serie)
   } 
   displayFavList();
}
 
// 16/ Créer une fonction pour ajouter une série en favoris au click.

function manageSeriesClick(){
    document.querySelectorAll("#container > li").forEach(li =>{
        li.addEventListener("click",function (event) {
            addSerieToFav(getDataFromId(this.dataset.id))
        })
    })
}

// 17/ Créer une fonction qui affiche le nom des séries favorites dans la page

function displayFavList(){
    let html = "";
    favList.forEach(serie => {
       html += `<li data-id="${serie.id}">${serie.name}</li>` 
    })
    document.getElementById("favoris").innerHTML = html;
}

// 18/ Créer une fonction permettant de retirer une série de la liste des favoris de par son id.

function removeSerieFromFav(id) {
   favList = favList.filter(serie => serie.id !== parseInt(id));
   displayFavList();
}

// 19/ Créez une fonction qui fasse qu'au clic sur un favoris il se retire de la liste.

function manageFavClick() {
    document.getElementById("favoris").addEventListener("click", function(event){
        if(event.target.hasAttribute("data-id")) removeSerieFromFav(event.target.dataset.id);    
    })
}


// 20/ Créer une fonction qui affiche le nombre de favoris en titre de la liste des favoris.


// 21/ Créer une fonction qui retourne les id des séries par ordre d'année de sortie.


// 22/ Créer une fonction qui affiche les séries dans la page dans l'ordre des ids passés en paramètre.


// 23/ Créer une fonction qui permet de gérer au clic sur un lien dans la page le tri des series par années croissantes


// 24/ Permettez à la fonction précédente de gérer un click sur un autre lien pour trier les series par années décroissantes.


// 25/ Créer une fonction qui désactive le filtre activé.


// 26/ Créer une fonction qui permet de gérer au clic sur un lien la désactivation des filtres.


// 27/ Créer une fonction qui gère l'affichage de ce lien de désactivation des filtres uniquement quand un filtre est activé.


// 28/ Créer l'ensemble des fonctions permettant d'ajouter la fonctionnalité de filtrage par pays d'origine,
//     en reprenant la logique des questions 3/ à 11/ sur le filtrage par style. 
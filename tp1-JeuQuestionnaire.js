
"use strict";

// ------------------- TITRE ET INTRO -------------------

let divTitre = document.createElement("div");
let titre = document.createElement("h2");
titre.textContent = "Jeu Questionnaire";
divTitre.appendChild(titre);
document.body.appendChild(divTitre);

let divIntro = document.createElement("div");
let pIntro = document.createElement("p");
pIntro.id = "Intro";
//BIEN METTRE CA CEN TEXTE
pIntro.innerHTML = `
    Bienvenu au petit quiz réalisé par deux étudiants en informatique du programme de Lilou. <br>
    Il va comporter 5 questions choisies au hasard dans un ensemble de questions Javascript. <br>
    Chaque bonne réponse vous donne un certain nombre de points. <br>
    À la fin de ce jeu-questionnaire, vous aurez votre résultat final ! <br><br>
    Bon quiz ! <br>
`;
divIntro.appendChild(pIntro);
document.body.appendChild(divIntro);


// ------------------- DIV QUIZ -------------------


let divQuiz = document.createElement("div");
divQuiz.id = "quizContainer";
divQuiz.style.display = "none";
document.body.appendChild(divQuiz);

let pNumQuestion = document.createElement("p");
divQuiz.appendChild(pNumQuestion);

let divQuestion = document.createElement("div");
divQuiz.appendChild(divQuestion);

let divChoix = document.createElement("div");
divQuiz.appendChild(divChoix);


// ------------------- BOUTONS -------------------
// DIV BOUTON RESULTAT qui va nous afficher le score
let divResultat = document.createElement("div");
divResultat.id = "divResultat";
divResultat.style.display = "none"; //Cache au debut


document.body.appendChild(divResultat);

//DIV BOUTONS
let divBoutons = document.createElement("div");
divBoutons.id = "divBoutons";
document.body.appendChild(divBoutons);


let boutonJouer = document.createElement("button");
boutonJouer.textContent = "Jouer";
divBoutons.appendChild(boutonJouer);

let boutonVerifier = document.createElement("button");
boutonVerifier.textContent = "Verifier réponse";
boutonVerifier.style.display = "none";
divBoutons.appendChild(boutonVerifier);

let boutonAbandonner = document.createElement("button");
boutonAbandonner.textContent = "Abandonner le questionnaire";
boutonAbandonner.style.display = "none";
divBoutons.appendChild(boutonAbandonner);



//

//BOUTON RESULTAT
let boutonResultat = document.createElement("button");
boutonResultat.textContent = "C'est terminé, voir votre resultat "
boutonResultat.style.display = "none";
divBoutons.appendChild(boutonResultat)


// // ------------------- CLASSES -------------------
//
// class Question {
//     constructor(question, choix, bonneReponse, points) {
//         this.question = question;
//         this.choix = choix;
//         this.bonneReponse = bonneReponse;
//         this.points = points;
//     }
// }
//
// class QuestionJson {
//     constructor(poolQuestion) {
//         this.questions = poolQuestion.map(q => new Question(
//             q.question,
//             q.choix,
//             q.bonneReponse,
//             q.points
//         ));
//     }
//
//     getQuestionAleatoire(nb = 5) {
//         let copie = [...this.questions];
//         let quiz = [];
//         for (let i = 0; i < nb; i++) {
//             let index = Math.floor(Math.random() * copie.length);
//             quiz.push(copie.splice(index, 1)[0]);
//         }
//         return quiz;
//     }
// }

// ------------------- VARIABLES DE JEU -------------------

// let gestionnaireQuestion = new QuestionJson(POOL_QUESTION); //ERREUUURR PRINCCIIIPPAAALLEEE
let quizQuestion = [];
let currentQuestionIndex = 0;
let scoreTotal = 0;

// ------------------- FONCTIONS -------------------

function afficherQuestion() {
    let q = quizQuestion[currentQuestionIndex];
    pNumQuestion.textContent = `Question ${currentQuestionIndex + 1} sur ${quizQuestion.length} pour ${q.points} points`;
    divQuestion.textContent = q.question;

    divChoix.innerHTML = "";
    q.choix.forEach((choix, i) => {
        let input = document.createElement("input");
        input.type = "radio";
        input.name = "reponse";
        input.value = i;

        let label = document.createElement("label");
        label.textContent = choix;

        divChoix.appendChild(input);
        divChoix.appendChild(label);
        divChoix.appendChild(document.createElement("br"));
    });

    //  Question 5 → afficher directement le bouton "C'est terminé..."
    if (currentQuestionIndex === quizQuestion.length - 1) {
        boutonVerifier.style.display = "none";
        boutonAbandonner.style.display = "none";
        boutonResultat.style.display = "inline-block";
    } else {
        boutonVerifier.style.display = "inline-block";
        boutonAbandonner.style.display = "inline-block";
        // boutonResultat.style.display = "none";
    }

}

function verifierReponse() {
    let radios = document.getElementsByName("reponse");
    let reponseDonnee = Array.from(radios).find(r => r.checked);

    if (!reponseDonnee) {
        alert("Vous devez répondre à la question ou abandonner !");
        return false;
    }


    //GRISER LES CASES
    radios.forEach(r => r.disabled = true);

    let q = quizQuestion[currentQuestionIndex];
    if (parseInt(reponseDonnee.value) === q.bonneReponse) {
        scoreTotal += q.points;
        alert("Bonne réponse ! METTRE DU CSS ET ENLEVER ALERT"); // mettre du css
    } else {
        alert(`Mauvaise réponse ! La bonne réponse était METTRE DU CSS ET ENLEVER ELERT: ${q.choix[q.bonneReponse]}`);  // METTRE DU CSS
    }
    return true;
}

function prochaineQuestion() {
    if (!verifierReponse()) return;

    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestion.length) {
        afficherQuestion();
    } else {

        divQuiz.style.display = "none";
        divResultat.style.display = "block"
        // divResultat.innerHTML = "";

        // let scoreMax = quizQuestion.reduce((acc, q) => acc + q.points, 0);
        // // divResultat.textContent = ` Voici votre resultat`



        // Calcul du pourcentage
        // let pourcentage = (scoreTotal / scoreMax) * 100;
        //
        // // Déterminer le message d'encouragement
        // let message = "";
        // if (pourcentage < 30) {
        //     message = "Ne te décourage pas ! Continue à t'entraîner et tu progresseras rapidement.";
        // } else if (pourcentage < 60) {
        //     message = "Pas mal ! Tu peux encore t'améliorer, mais tu es sur la bonne voie.";
        // } else if (pourcentage < 70) {
        //     message = "Bien joué ! Tu as une bonne base, continue comme ça.";
        // } else if (pourcentage < 85) {
        //     message = "Très bien ! Tu maîtrises bien le sujet, continue tes efforts.";
        // } else if (pourcentage < 95) {
        //     message = "Excellent ! Tu es vraiment au top, félicitations.";
        // } else {
        //     message = "Parfait ! Tu as tout compris, bravo !";
        // }

    //     divResultat.innerHTML = `Voici votre résultat<br>
    // Score : ${scoreTotal} / ${scoreMax} points<br>
    // Note : ${pourcentage.toFixed(2)} %<br>
    //     ${message}
    //     `;


        // // Affichage 100% JS
        // divResultat.textContent = "";
        // divResultat.appendChild(document.createTextNode(`Voici votre résultat`));
        // divResultat.appendChild(document.createElement("br"));
        // divResultat.appendChild(document.createTextNode(`Score : ${scoreTotal} / ${scoreMax} points`));
        // divResultat.appendChild(document.createElement("br"));
        // divResultat.appendChild(document.createTextNode(`Note : ${pourcentage.toFixed(2)} %`));
        // divResultat.appendChild(document.createElement("br"));
        // // divResultat.appendChild(document.createTextNode(message));




        boutonJouer.textContent = "Rejouer";

        // divResultat.appendChild(boutonJouer);
        // boutonJouer.textContent = "Rejouer";
        boutonJouer.style.display = "inline-block";
        divResultat.appendChild(boutonJouer);


        //Cacher les autres boutons
        boutonVerifier.style.display = "none";
        boutonAbandonner.style.display = "none";
        // boutonResultat.style.display = "inline-block";
        boutonResultat.style.display = "none";

        // resetQuiz(); NOUS SERA UTILIE
    // } else {
    //     divQuiz.style.display = "none";          // cacher le quiz
    //     divResultat.style.display = "block";      // afficher la div résultat
    //
    //     let scoreMax = quizQuestion.reduce((acc, q) => acc + q.points, 0);
    //     let pourcentage = (scoreTotal / scoreMax) * 100;
    //
    //     // Message d'encouragement
    //     let message = "";
    //     if (pourcentage < 30) message = "Ne te décourage pas ! Continue à t'entraîner et tu progresseras rapidement.";
    //     else if (pourcentage < 60) message = "Pas mal ! Tu peux encore t'améliorer, mais tu es sur la bonne voie.";
    //     else if (pourcentage < 70) message = "Bien joué ! Tu as une bonne base, continue comme ça.";
    //     else if (pourcentage < 85) message = "Très bien ! Tu maîtrises bien le sujet, continue tes efforts.";
    //     else if (pourcentage < 95) message = "Excellent ! Tu es vraiment au top, félicitations.";
    //     else message = "Parfait ! Tu as tout compris, bravo !";
    //
    //

    //
    //
    //
    //     // Bouton Jouer → devient Rejouer
    //     boutonJouer.textContent = "Rejouer";
    //     boutonJouer.style.display = "inline-block";
    //
    //     // Cacher les autres boutons
    //     boutonVerifier.style.display = "none";
    //     boutonAbandonner.style.display = "none";


        // divResultat.textContent = `Quiz terminé ! Votre score total : ${scoreTotal} points sur ${scoreMax}`;
        //
        // // Ici, le bouton Jouer devient Rejouer
        // boutonJouer.textContent = "Rejouer";
        // boutonJouer.style.display = "inline-block";
        //
        // // cacher les autres boutons
        // boutonVerifier.style.display = "none";
        // boutonAbandonner.style.display = "none";

    }
}

function abandonnerQuiz() {
    alert(`Quiz abandonné ! Votre score : ${scoreTotal} points`);
    resetQuiz();
}

function resetQuiz() {
    divQuiz.style.display = "none";
    divIntro.style.display = "block";
    divTitre.style.display = "block";

    divResultat.style.display = "none";
    divResultat.innerHTML = " ";

    // divBoutons.appendChild(boutonJouer);

    boutonJouer.style.display = "inline-block";
    boutonVerifier.style.display = "none";
    boutonAbandonner.style.display = "none";
    boutonResultat.style.display = "none"


    scoreTotal = 0;
    currentQuestionIndex = 0;

}

// ------------------- ÉVÉNEMENTS -------------------

boutonJouer.addEventListener("click", () => {
    resetQuiz();
    quizQuestion = gestionnaireQuestion.getQuestionAleatoire(5);
    currentQuestionIndex = 0;
    scoreTotal = 0;


    boutonVerifier.style.display = "inline-block";
    boutonAbandonner.style.display = "inline-block";
    boutonJouer.style.display = "none";
    divIntro.style.display = "none";
    divTitre.style.display = "none";
    divQuiz.style.display = "block";


    afficherQuestion();

    boutonVerifier.style.display = "inline-block";
    boutonAbandonner.style.display = "inline-block";

    // cacher le bouton Jouer pendant le quiz
    boutonJouer.style.display = "none";
});
boutonResultat.addEventListener("click", () =>{
    if (!verifierReponse()) return;


    divQuiz.style.display = "none";
    divResultat.style.display = "block";

    let scoreMax = quizQuestion.reduce((acc, q) => acc + q.points, 0);
    // divResultat.textContent = ` Voici votre resultat`



    // Calcul du pourcentage
    let pourcentage = (scoreTotal / scoreMax) * 100;

    // Déterminer le message d'encouragement
    let message = "";
    if (pourcentage < 30) {
        message = "Ne te décourage pas ! Continue à t'entraîner et tu progresseras rapidement.";
    } else if (pourcentage < 60) {
        message = "Pas mal ! Tu peux encore t'améliorer, mais tu es sur la bonne voie.";
    } else if (pourcentage < 70) {
        message = "Bien joué ! Tu as une bonne base, continue comme ça.";
    } else if (pourcentage < 85) {
        message = "Très bien ! Tu maîtrises bien le sujet, continue tes efforts.";
    } else if (pourcentage < 95) {
        message = "Excellent ! Tu es vraiment au top, félicitations.";
    } else {
        message = "Parfait ! Tu as tout compris, bravo !";
    }

    divResultat.innerHTML = `Voici votre résultat : <br>
    Score : ${scoreTotal} / ${scoreMax} points<br>
    Note : ${pourcentage.toFixed(2)} %<br>
        ${message}
        `;



    // // Vider le contenu précédent
    // divResultat.textContent = "";

    // Ajouter le texte ligne par ligne
    // let texteScore = document.createTextNode(`Voici votre résultat`);
    // divResultat.appendChild(texteScore);
    // divResultat.appendChild(document.createElement("br"));
    //
    // let textePoints = document.createTextNode(`Score : ${scoreTotal} / ${scoreMax} points`);
    // divResultat.appendChild(textePoints);
    // divResultat.appendChild(document.createElement("br"));
    //
    // let textePourcentage = document.createTextNode(`Note : ${pourcentage.toFixed(2)} %`);
    // divResultat.appendChild(textePourcentage);
    // divResultat.appendChild(document.createElement("br"));
    //
    // let texteMessage = document.createTextNode(message);
    // divResultat.appendChild(texteMessage);
    // divResultat.appendChild(document.createElement("br"));

    // Réutiliser le bouton Jouer pour Rejouer
    boutonJouer.textContent = "Rejouer";
    boutonJouer.style.display = "inline-block";
    // boutonVerifier.style.display = "none";
    // boutonAbandonner.style.display = "none";
    boutonResultat.style.display = "none"; // cacher le bouton résultat

});
boutonVerifier.addEventListener("click", prochaineQuestion);
boutonAbandonner.addEventListener("click", abandonnerQuiz);



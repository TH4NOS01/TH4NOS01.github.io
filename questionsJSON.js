"use strict";

//IMPORTANT : Pour la syntaxe JSON voir ce lien : https://www.json.org/json-fr.html

//Mettre vos questions au format JSON ici. Un seul objet principal pour toutes les questions

//Faites quelque chose de simple comme on a vu ensemble.

// class Question{
//
//     constructor(id, type, title, prompt, validate)
//     {
//         this._id = id;
//         this._type = type;
//         this._title = title;
//         this._prompt = prompt;
//         this._validate = validate;
//     }
//
// }


let POOL_QUESTION = [
    {
        question: "Quel est le résultat de 2 + '2' en JavaScript ?",
        choix: ["4", "'22'", "NaN", "undefined", "Erreur"],
        bonneReponse: 1,
        points: 2
    },
    {
        question: "Quelle fonction affiche un message dans la console ?",
        choix: ["print()", "alert()", "console.log()", "log.console()", "display()"],
        bonneReponse: 2,
        points: 2
    },
    {
        question: "Quelle méthode permet d’ajouter un nœud enfant à un élément ?",
        choix: ["append()", "addChild()", "appendChild()", "insert()", "addNode()"],
        bonneReponse: 2,
        points: 2
    },
    {
        question: "Quelle méthode du DOM permet de créer un nouvel élément HTML ?",
        choix: ["createNode()", "createElement()", "addElement()", "newTag()", "buildElement()"],
        bonneReponse: 1,
        points: 2
    },
    {
        question: "Quelle méthode du BOM permet d’afficher un message d’alerte ?",
        choix: ["alert()", "warn()", "message()", "popup()", "showAlert()"],
        bonneReponse: 0,
        points: 2
    },
    {
        question: "Quelle méthode permet de sélectionner un élément par son ID ?",
        choix: [
            "getElementById()",
            "querySelectorAll()",
            "getElementsByClassName()",
            "findById()",
            "selectId()"
        ],
        bonneReponse: 0,
        points: 2
    },
    {
        question: "Que signifie DOM ?",
        choix: [
            "Data Object Manager",
            "Document Object Model",
            "Display Object Mode",
            "Document Order Method",
            "Document Operation Map"
        ],
        bonneReponse: 1,
        points: 2
    },
    {
        question: "Quelle méthode du DOM permet de supprimer un élément ?",
        choix: [
            "remove()",
            "deleteElement()",
            "removeNode()",
            "destroy()",
            "erase()"
        ],
        bonneReponse: 0,
        points: 2
    },
    {
        question: "Quelle méthode crée un nouvel élément HTML ?",
        choix: [
            "createElement()",
            "newElement()",
            "addElement()",
            "element()",
            "buildTag()"
        ],
        bonneReponse: 0,
        points: 2
    },
    {
        question: "Quelle valeur est renvoyée par 5 == '5' ?",
        choix: ["true", "false", "undefined", "error", "null"],
        bonneReponse: 0,
        points: 2
    },
    {
        question: "Quel mot-clé déclare une variable modifiable ?",
        choix: ["let", "const", "static", "define", "var"],
        bonneReponse: 0,
        points: 2
    },
    {
        question: "Quelle méthode permet d’écouter un clic sur un bouton ?",
        choix: [
            "onClick()",
            "clickEvent()",
            "addEventListener('click',",
            "listenClick()",
            "handleClick()"
        ],
        bonneReponse: 2,
        points: 2
    },
    {
        question: "Quelle méthode permet de créer un élément div en JavaScript ?",
        choix: [
            "createDiv()",
            "createElement('div')",
            "new Element('div')",
            "makeDiv()",
            "generateDiv()"
        ],
        bonneReponse: 1,
        points: 2
    },
    {
        question: "Quelle méthode permet de sélectionner le premier élément correspondant à un sélecteur CSS ?",
        choix: [
            "getElement()",
            "querySelector()",
            "findElement()",
            "selectFirst()",
            "getFirstMatch()"
        ],
        bonneReponse: 1,
        points: 2
    },
    {
        question: "Quelle méthode sélectionne tous les éléments correspondant à un sélecteur CSS ?",
        choix: [
            "querySelectorAll()",
            "getAllElements()",
            "findAll()",
            "selectAll()",
            "matchAll()"
        ],
        bonneReponse: 0,
        points: 2
    }
];



// ------------------- CLASSES -------------------

class Question {
    constructor(question, choix, bonneReponse, points) {
        this.question = question;
        this.choix = choix;
        this.bonneReponse = bonneReponse;
        this.points = points;
    }
}

class QuestionJson {
    constructor(poolQuestion) {
        this.questions = poolQuestion.map(q => new Question(
            q.question,
            q.choix,
            q.bonneReponse,
            q.points
        ));
    }

    getQuestionAleatoire(nb = 5) {
        let copie = [...this.questions];
        let quiz = [];
        for (let i = 0; i < nb; i++) {
            let index = Math.floor(Math.random() * copie.length);
            quiz.push(copie.splice(index, 1)[0]);
        }
        return quiz;
    }
}

// Exemple d'utilisation
let gestionnaireQuestion = new QuestionJson(POOL_QUESTION);
// let quizQuestions = gestionnaireQuestion.getQuestionAleatoire(5);





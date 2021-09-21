$(document).ready(function () {
  // déclare les variables
  let winsCPU = 0,
    winsPlayer = 0,
    posRock = $("#rock").position(), // récupère la position initiale des cartes
    posPaper = $("#paper").position(),
    posScissors = $("#scissors").position(),
    numCPU,
    cardCPU,
    cardPlayer,
    result,
    winRate;

  // fonctions jQuery UI
  $(function () {
    $(".card").draggable({
      revert: "invalid", // revert sauf si drop dans un droppable
      revertDuration: 500,
      containment: "document", // limite la position au document
      disabled: true
    });

    $("#zonePlayer").droppable({
      drop: function () { // s'active au drop d'un draggable dessus
        $(".ui-draggable-dragging").css("zIndex", "20");
        $(".card").draggable({ disabled: true }); // désactive le drag des cartes
        cardPlayer = $(".ui-draggable-dragging").attr("id"); // nomme selon la carte choisie par le joueur
        numCPU = Math.random() * 3; // random avec ( 0 <= numCPU < 3 )
        console.log(numCPU);

        // nomme la carte CPU selon le random
        if (numCPU < 1) { // 0 à 0.99 : rock
          cardCPU = "rock";
        } else if (numCPU >= 1 && numCPU < 2) { // 1 à 1.99 : paper
          cardCPU = "paper";
        } else { // 2 à 2.99 : scissors
          cardCPU = "scissors";
        }

        // définit l'issue selon les cartes joueurs et CPU et augmente compteur
        if ((cardCPU == "paper" && cardPlayer == "rock") ||
          (cardCPU == "rock" && cardPlayer == "scissors") ||
          (cardCPU == "scissors" && cardPlayer == "paper")) { // CPU gagne
          winsCPU++;
          $("#zoneCPU").css("borderColor", "#7be602");
          $("#zonePlayer").css("borderColor", "#c40000");
          result = "Vous avez perdu...";
        } else if ((cardCPU == "paper" && cardPlayer == "scissors") ||
          (cardCPU == "rock" && cardPlayer == "paper") ||
          (cardCPU == "scissors" && cardPlayer == "rock")) { // joueur gagne
          winsPlayer++;
          $("#zoneCPU").css("borderColor", "#c40000");
          $("#zonePlayer").css("borderColor", "#7be602");
          result = "Vous avez gagné !";
          $(".ui-draggable-dragging").effect("shake", { distance: 40 });
        } else { // égalité
          $("#zoneCPU").css("borderColor", "#ec9b04");
          $("#zonePlayer").css("borderColor", "#ec9b04");
          result = "Match nul";
        }

        // affichage etc.
        winRate = Math.trunc(winsPlayer / (winsPlayer + winsCPU) * 100);
        isNaN(winRate) ? winRate = 0 : winRate; // shorthand de if()
        isFinite(winRate) ? winRate : winRate = 100; // condition ? exprIfTrue : exprIfFalse
        $("#spanCounter").html(winsPlayer + " - " + winsCPU);
        $("#spanPercent").html(winRate + " %");
        $("#cardCPU").css({ "backgroundImage": "url(assets/img/" + cardCPU + ".png)", "opacity": "1" }); // définit l'image du CPU selon son choix
        $("#results").html("<p>" + result + "</p>").css({ "visibility": "visible", "opacity": "1", "paddingTop": "10vh" }); // affiche le bandeau résultat selon l'issue
        console.log(winsPlayer + " - " + winsCPU);

        setTimeout(function () { // délai avant de reset
          $(".card").css("transition", ".7s");
          $("#rock").offset(posRock); // renvoie les cartes à leurs positions initiales
          $("#paper").offset(posPaper);
          $("#scissors").offset(posScissors);
          $("#cardCPU").css({ "opacity": "0" });
          $("#results").css({ "visibility": "hidden", "opacity": "0", "paddingTop": "0%" });
          $("#zonePlayer").css("borderColor", "transparent");
          $("#zoneCPU").css("borderColor", "transparent");
        }, 2000); // délai en ms avant l'exécution de la fonction

        setTimeout(function () { // délai avant de pouvoir de nouveau jouer
          console.log("A");
          $(".card").css({ "transition": "0s", "zIndex": "" });
          $("#cardCPU").css({ "backgroundImage": "" });
          $(".card").draggable({ disabled: false }); // réactive le drag des cartes
        }, 2400); // délai non cumulé au précédent, donc 400ms après
      }
    });

    // highlight la carte si au dessus du droppable pendant le drag
    $(".card").mousemove(function () {
      if ($("#zonePlayer").hasClass("ui-droppable-hover")) {
        $(this).addClass("highlightDrag");
      } else {
        $(this).removeClass("highlightDrag");
      }
    });
  });

  $("#counter").click(function () {
    $(".spanScore").toggle();
  });

  // reload page
  $("#resetIcon").click(function () {
    location.reload();
  });

  $(window).on("load", function () {
    console.log("load");
    setTimeout(function () {
      $(".loader").addClass("fondu-out");
      $(".card").draggable({ disabled: false });
    },3200); 
  });
});
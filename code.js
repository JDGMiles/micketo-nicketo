const startdecks = 8; // starting decks in shoe

const sims = 30000;

var counts = []; // frequency of cards remaining by type (index 0 = Aces, 1 = 2s, ... 12 = Kings)

for (var i = 0; i < 13; i++) { // generates initial counts from 'shoes'
  counts[i] = 4 * startdecks;
}

function alter(m, n) { // alters frequency of an individual card type
  counts[m] += n;
  updateui();
}

function deck(n) { // adds or subtracts decks (= 4 of each card type)
  for (var i = 0; i < 13; i++) {
    counts[i] += 4 * n;
  }
  updateui();
}

function updateui() { // updates displayed card frequencies
  document.getElementById('a-count').innerHTML = counts[0];
  document.getElementById('2-count').innerHTML = counts[1];
  document.getElementById('3-count').innerHTML = counts[2];
  document.getElementById('4-count').innerHTML = counts[3];
  document.getElementById('5-count').innerHTML = counts[4];
  document.getElementById('6-count').innerHTML = counts[5];
  document.getElementById('7-count').innerHTML = counts[6];
  document.getElementById('8-count').innerHTML = counts[7];
  document.getElementById('9-count').innerHTML = counts[8];
  document.getElementById('t-count').innerHTML = counts[9];
  document.getElementById('j-count').innerHTML = counts[10];
  document.getElementById('q-count').innerHTML = counts[11];
  document.getElementById('k-count').innerHTML = counts[12];
  var total = 0;
  for (var i = 0; i < 13; i++) {
    total += counts[i];
  }
  document.getElementById('total').innerHTML = total;
}

function randomelements(n) { // returns an array of n values from 0 to n-1, randomised
  var startlist = [];
  for (var i = 0; i < n; i++) {
    startlist[i] = i;
  }
  var endlist = [];
  for (var i = 0; i < n; i++) {
    var roll = Math.floor(Math.random() * startlist.length);
    endlist[i] = startlist[roll];
    startlist.splice(roll, 1);
  }
  return endlist;
}

function whowinsverbose(a, b, c, d, e, f) { // tells you who wins (0 = tie 1 = punto 2 = banco) and how
  var pun = (a + c) % 10;
  var ban = (b + d) % 10;
  document.getElementById('drum').innerHTML += "Top of deck is: " + a + ", " + b + ", " + c + ", " + d + ", " + e + ", " + f + "<br>Punto: " + pun + " Banco: " + ban + "<br>";
  if (pun == 9 || pun == 8) {
    if (pun == ban) {
      document.getElementById('drum').innerHTML += "TIE<br>";
      return 0;
    }
    else if (pun > ban) {
      document.getElementById('drum').innerHTML += "PUNTO WINS<br>";
      return 1;
    }
    else {
      document.getElementById('drum').innerHTML += "BANCO WINS<br>";
      return 2;
    }
  }
  else if (pun == 7 || pun == 6) {
    if (pun < ban) {
      document.getElementById('drum').innerHTML += "BANCO WINS<br>";
      return 2;
    }
    else if (pun == 7 && ban == 7) {
      document.getElementById('drum').innerHTML += "TIE<br>";
      return 0;
    }
    else {
      ban = ban + e;
      document.getElementById('drum').innerHTML += "Banco draws extra card: " + e + "<br>Punto: " + pun + " Banco: " + ban + "<br>";
      if (pun == ban) {
        document.getElementById('drum').innerHTML += "TIE<br>";
        return 0;
      }
      else if (pun > ban) {
        document.getElementById('drum').innerHTML += "PUNTO WINS<br>";
        return 1;
      }
      else {
        document.getElementById('drum').innerHTML += "BANCO WINS<br>";
        return 2;
      }
    }
  }
  else {
    pun = pun + e;
    document.getElementById('drum').innerHTML += "Punto draws extra card: " + e + "<br>Punto: " + pun + " Banco: " + ban + "<br>";
    if (pun == 9 || pun == 8){
      if (pun == ban) {
        document.getElementById('drum').innerHTML += "TIE<br>";
        return 0;
      }
      else if (pun > ban) {
        document.getElementById('drum').innerHTML += "PUNTO WINS<br>";
        return 1;
      }
      else {
        document.getElementById('drum').innerHTML += "BANCO WINS<br>";
        return 2;
      }
    }
    else if (pun == 6 || pun == 7) {
      if (pun < ban) {
        document.getElementById('drum').innerHTML += "BANCO WINS<br>";
        return 2;
      }
      else if (pun == 7 && ban == 7) {
        document.getElementById('drum').innerHTML += "TIE<br>";
        return 0;
      }
      else {
        ban = ban + f;
        document.getElementById('drum').innerHTML += "Banco draws extra card: " + f + "<br>Punto: " + pun + " Banco: " + ban + "<br>";
        if (pun == ban) {
          document.getElementById('drum').innerHTML += "TIE<br>";
          return 0;
        }
        else if (pun > ban) {
          document.getElementById('drum').innerHTML += "PUNTO WINS<br>";
          return 1;
        }
        else {
          document.getElementById('drum').innerHTML += "BANCO WINS<br>";
          return 2;
        }
      }
    }
    else {
      if (pun < ban) {
        document.getElementById('drum').innerHTML += "BANCO WINS<br>";
        return 2;
      }
      else {
        ban = ban + f;
        document.getElementById('drum').innerHTML += "Banco draws extra card: " + f + "<br>Punto: " + pun + " Banco: " + ban + "<br>";
        if (pun == ban) {
          document.getElementById('drum').innerHTML += "TIE<br>";
          return 0;
        }
        else if (pun > ban) {
          document.getElementById('drum').innerHTML += "PUNTO WINS<br>";
          return 1;
        }
        else {
          document.getElementById('drum').innerHTML += "BANCO WINS<br>";
          return 2;
        }
      }
    }
  }
}

function whowins(a, b, c, d, e, f) { // tells you who wins (0 = tie 1 = punto 2 = banco) and how
  var pun = (a + c) % 10;
  var ban = (b + d) % 10;
  if (pun == 9 || pun == 8) {
    if (pun == ban) {
      return 0;
    }
    else if (pun > ban) {
      return 1;
    }
    else {
      return 2;
    }
  }
  else if (pun == 7 || pun == 6) {
    if (pun < ban) {
      return 2;
    }
    else if (pun == 7 && ban == 7) {
      return 0;
    }
    else {
      ban = ban + e;
      if (pun == ban) {
        return 0;
      }
      else if (pun > ban) {
        return 1;
      }
      else {
        return 2;
      }
    }
  }
  else {
    pun = pun + e;
    if (pun == 9 || pun == 8){
      if (pun == ban) {
        return 0;
      }
      else if (pun > ban) {
        return 1;
      }
      else {
        return 2;
      }
    }
    else if (pun == 6 || pun == 7) {
      if (pun < ban) {
        return 2;
      }
      else if (pun == 7 && ban == 7) {
        return 0;
      }
      else {
        ban = ban + f;
        if (pun == ban) {
          return 0;
        }
        else if (pun > ban) {
          return 1;
        }
        else {
          return 2;
        }
      }
    }
    else {
      if (pun < ban) {
        return 2;
      }
      else {
        ban = ban + f;
        if (pun == ban) {
          return 0;
        }
        else if (pun > ban) {
          return 1;
        }
        else {
          return 2;
        }
      }
    }
  }
}

function simgame() { // simulates a game from the submitted deck information with explanation
  var cards = []; // cards remaining recorded individually (in order they will be drawn)

  // builds 'cards' from frequency counts

  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < counts[i]; j++) {
      cards[cards.length] = i + 1;
    }
  }
  for (var i = 9; i < 13; i++) {
    for (var j = 0; j < counts[i]; j++) {
      cards[cards.length] = 0;
    }
  }

  // shuffles 'cards'

  var shuffled = [];
  var shuffle = randomelements(cards.length);
  for (var i = 0; i < cards.length; i++) {
    shuffled[i] = cards[shuffle[i]];
  }
  cards = shuffled;

  return whowins(cards[0], cards[1], cards[2], cards[3], cards[4], cards[5]);

}

function simgameverbose() { // simulates a game from the submitted deck information with explanation
  var cards = []; // cards remaining recorded individually (in order they will be drawn)

  // builds 'cards' from frequency counts

  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < counts[i]; j++) {
      cards[cards.length] = i + 1;
    }
  }
  for (var i = 9; i < 13; i++) {
    for (var j = 0; j < counts[i]; j++) {
      cards[cards.length] = 0;
    }
  }

  // shuffles 'cards'

  var shuffled = [];
  var shuffle = randomelements(cards.length);
  for (var i = 0; i < cards.length; i++) {
    shuffled[i] = cards[shuffle[i]];
  }
  cards = shuffled;

  return whowinsverbose(cards[0], cards[1], cards[2], cards[3], cards[4], cards[5]);

}

function launch() {
  var wins = [];
  for (var i=0; i<3; i++){
    wins[i]=0;
  }
  document.getElementById("bongo").innerHTML = '';
  document.getElementById("drum").innerHTML = '';
  for(i=0; i<sims/2; i++){
    wins[simgame()]++;
  }
  wins[simgameverbose()]++;
  for(i=0; i<sims/2; i++){
    wins[simgame()]++;
  }
  document.getElementById("bongo").innerHTML = "Tie: "+Math.round(100000*wins[0]/(sims+1))/1000+"% Punto: "+Math.round(100000*wins[1]/(sims+1))/1000+"% Banco: "+Math.round(100000*wins[2]/(sims+1))/1000+"%";
}

updateui();
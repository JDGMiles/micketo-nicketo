const startdecks = 8; // starting decks in shoe

const sims = 100000;

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

function randomelements(m, n) { // returns an array of m randomly-chosen values from 0 to n-1
  var startlist = [];
  for (var i = 0; i < n; i++) {
    startlist[i] = i;
  }
  var endlist = [];
  for (var i = 0; i < m; i++) {
    var roll = Math.floor(Math.random() * startlist.length);
    endlist[i] = startlist[roll];
    startlist.splice(roll, 1);
  }
  return endlist;
}

function playgame(a, b, c, d, e, f, v) { // returns game result (0 to 9 = tie 0 to 9, 10 = punto 11 = banco) and how (when v=1)
  var pun = (a + c) % 10;
  var ban = (b + d) % 10;
  if (v) { document.getElementById('drum').innerHTML += "Top of deck is: " + a + ", " + b + ", " + c + ", " + d + ", " + e + ", " + f + "<br>Punto: " + pun + " Banco: " + ban + "<br>" }
  if (pun == 9 || pun == 8 || ban == 9 || ban == 8) {
    if (pun == ban) {
      if (v) { document.getElementById('drum').innerHTML += "TIE<br>" }
      return pun;
    }
    else if (pun > ban) {
      if (v) { document.getElementById('drum').innerHTML += "PUNTO WINS<br>" }
      return 10;
    }
    else {
      if (v) { document.getElementById('drum').innerHTML += "BANCO WINS<br>" }
      return 11;
    }
  }
  else if (pun == 7 || pun == 6) {
    if (ban == 7 || ban == 6) {
      if (pun == ban) {
        if (v) { document.getElementById('drum').innerHTML += "TIE<br>" }
        return pun;
      }
      else if (pun > ban) {
        if (v) { document.getElementById('drum').innerHTML += "PUNTO WINS<br>" }
        return 10;
      }
      else {
        if (v) { document.getElementById('drum').innerHTML += "BANCO WINS<br>" }
        return 11;
      }
    }
    else {
      ban = (ban + e) % 10;
      if (v) { document.getElementById('drum').innerHTML += "Banco draws extra card: " + e + "<br>Punto: " + pun + " Banco: " + ban + "<br>" }
      if (pun == ban) {
        if (v) { document.getElementById('drum').innerHTML += "TIE<br>" }
        return pun;
      }
      else if (pun > ban) {
        if (v) { document.getElementById('drum').innerHTML += "PUNTO WINS<br>" }
        return 10;
      }
      else {
        if (v) { document.getElementById('drum').innerHTML += "BANCO WINS<br>" }
        return 11;
      }
    }
  }
  else {
    pun = (pun + e) % 10;
    if (v) { document.getElementById('drum').innerHTML += "Punto draws extra card: " + e + "<br>Punto: " + pun + " Banco: " + ban + "<br>" }
    if (ban < 3) {
      ban = (ban + f) % 10;
      if (v) { document.getElementById('drum').innerHTML += "Banco draws extra card: " + f + "<br>Punto: " + pun + " Banco: " + ban + "<br>" }
    }
    else if (ban == 3 && e != 8) {
      ban = (ban + f) % 10;
      if (v) { document.getElementById('drum').innerHTML += "Banco draws extra card: " + f + "<br>Punto: " + pun + " Banco: " + ban + "<br>" }
    }
    else if (ban == 4 && e != 1 && e != 8 && e != 9 && e != 0) {
      ban = (ban + f) % 10;
      if (v) { document.getElementById('drum').innerHTML += "Banco draws extra card: " + f + "<br>Punto: " + pun + " Banco: " + ban + "<br>" }
    }
    else if (ban == 5 && e != 1 && e != 2 && e != 3 && e != 8 && e != 9 && e != 0) {
      ban = (ban + f) % 10;
      if (v) { document.getElementById('drum').innerHTML += "Banco draws extra card: " + f + "<br>Punto: " + pun + " Banco: " + ban + "<br>" }
    }
    else if (ban == 6 && e != 1 && e != 2 && e != 3 && e != 4 && e != 5 && e != 8 && e != 9 && e != 0) {
      ban = (ban + f) % 10;
      if (v) { document.getElementById('drum').innerHTML += "Banco draws extra card: " + f + "<br>Punto: " + pun + " Banco: " + ban + "<br>" }
    }
    if (pun == ban) {
      if (v) { document.getElementById('drum').innerHTML += "TIE<br>" }
      return pun;
    }
    else if (pun > ban) {
      if (v) { document.getElementById('drum').innerHTML += "PUNTO WINS<br>" }
      return 10;
    }
    else {
      if (v) { document.getElementById('drum').innerHTML += "BANCO WINS<br>" }
      return 11;
    }
  }
}

function simgame(v) { // simulates a game from the submitted deck information (v=1 gives explanation)
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

  // picks 6 random cards

  var picked = [];
  var pick = randomelements(6, cards.length);
  for (var i = 0; i < 6; i++) {
    picked[i] = cards[pick[i]];
  }

  if (v == 1) {
    return playgame(picked[0], picked[1], picked[2], picked[3], picked[4], picked[5], 1);
  }
  else {
    return playgame(picked[0], picked[1], picked[2], picked[3], picked[4], picked[5]);
  }

}

function launch() {
  var result = [];
  for (var i = 0; i < 12; i++) {
    result[i] = 0;
  }
  document.getElementById("bongo").innerHTML = '';
  document.getElementById("drum").innerHTML = '';
  for (i = 0; i < sims / 2; i++) {
    result[simgame()]++;
  }
  result[simgame(1)]++;
  for (i = 0; i < sims / 2; i++) {
    result[simgame()]++;
  }
  for (var i = 0; i < 10; i++) {
    document.getElementById("bongo").innerHTML += "Tie-" + i + ": " + Math.round(100000 * result[i] / (sims + 1)) / 1000 + "%<br>";
  }
  document.getElementById("bongo").innerHTML += "Punto: " + Math.round(100000 * result[10] / (sims + 1)) / 1000 + "%<br>";
  document.getElementById("bongo").innerHTML += "Banco: " + Math.round(100000 * result[11] / (sims + 1)) / 1000 + "%<br>";
}

updateui();
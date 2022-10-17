const startdecks = 8; // starting decks in shoe

const sims = 500000;

var counts = []; // frequency of cards remaining by type (index 0 = Aces, 1 = 2s, ... 12 = Kings)

for (var i = 0; i < 9; i++) { // generates initial counts from 'shoes'
  counts[i] = 4 * startdecks;
}
counts[9] = 16 * startdecks;

var odds = [];
odds[odds.length] = 150;
odds[odds.length] = 215;
odds[odds.length] = 225;
odds[odds.length] = 200;
odds[odds.length] = 120;
odds[odds.length] = 110;
odds[odds.length] = 45;
odds[odds.length] = 45;
odds[odds.length] = 80;
odds[odds.length] = 80;

function alter(m, n) { // alters frequency of an individual card type
  counts[m] += -n;
  updateui();
}

function deck(n) { // adds or subtracts decks (= 4 of each card type)
  for (var i = 0; i < 9; i++) {
    counts[i] += 4 * -n;
  }
  counts[9] += 16 * -n;
  updateui();
}

function updateui() { // updates displayed card frequencies
  var cardsgone = [];
  cardsgone[0] = 16 * startdecks - counts[9];
  for (var i = 1; i < 10; i++) {
    cardsgone[i] = 4 * startdecks - counts[i - 1];
  }
  document.getElementById('1-count').innerHTML = cardsgone[1];
  document.getElementById('2-count').innerHTML = cardsgone[2];
  document.getElementById('3-count').innerHTML = cardsgone[3];
  document.getElementById('4-count').innerHTML = cardsgone[4];
  document.getElementById('5-count').innerHTML = cardsgone[5];
  document.getElementById('6-count').innerHTML = cardsgone[6];
  document.getElementById('7-count').innerHTML = cardsgone[7];
  document.getElementById('8-count').innerHTML = cardsgone[8];
  document.getElementById('9-count').innerHTML = cardsgone[9];
  document.getElementById('0-count').innerHTML = cardsgone[0];
  var total = 0;
  for (var i = 0; i < 10; i++) {
    total += counts[i];
  }
  document.getElementById('total').innerHTML = total;

  var systemcount = [];
  systemcount[systemcount.length] = [-3, 2, 2, 2, 2, 1, 1, 0, 1, 1];
  systemcount[systemcount.length] = [-1, -6, 2, 2, 2, 2, 1, 1, 0, 0];
  systemcount[systemcount.length] = [-1, -1, -6, 2, 2, 2, 2, 1, 2, 0];
  systemcount[systemcount.length] = [-1, -1, -1, -6, 2, 2, 3, 3, 0, 2];
  systemcount[systemcount.length] = [0, -1, 0, 0, -6, 1, 2, 2, 2, 0];
  systemcount[systemcount.length] = [0, 0, -1, -1, 0, -6, 2, 2, 2, 2];
  systemcount[systemcount.length] = [1, 0, 0, 0, 0, 0, -7, 1, 1, 1];
  systemcount[systemcount.length] = [1, 1, 0, 0, 0, 0, 0, -8, 2, 1];
  systemcount[systemcount.length] = [1, 1, 1, 0, 0, 0, 0, 0, -7, 1];
  systemcount[systemcount.length] = [1, 1, 1, 1, 0, 0, 0, 0, 1, -8];
  triggers = [7,7,6,7,7,7,7,4,6,6];

  for (var i = 0; i < 10; i++) {
    var countnumber = Math.round(100 * (systemcount[i][1] * cardsgone[1] + systemcount[i][2] * cardsgone[2] + systemcount[i][3] * cardsgone[3] + systemcount[i][4] * cardsgone[4] + systemcount[i][5] * cardsgone[5] + systemcount[i][6] * cardsgone[6] + systemcount[i][7] * cardsgone[7] + systemcount[i][8] * cardsgone[8] + systemcount[i][9] * cardsgone[9] + systemcount[i][0] * cardsgone[0]) / (total / 52)) / 100;
    document.getElementById('' + i + '-tcount').innerHTML = countnumber + " (" + triggers[i] + ")";
    if(countnumber>triggers[i]){
      document.getElementById('' + i + '-tcount').style.color = "yellow";
    }
    else{
      document.getElementById('' + i + '-tcount').style.color = "rgb(130, 130, 0)";
    }
  }

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
  var cards = []; // cards remaining recorded individually

  // builds 'cards' from frequency counts

  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < counts[i]; j++) {
      cards[cards.length] = i + 1;
    }
  }
  for (var j = 0; j < counts[9]; j++) {
    cards[cards.length] = 0;
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
  var edge = [];
  for (var i = 0; i < 10; i++) {
    edge[i] = 0;
  }
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

  var ev = 0;

  for (i = 0; i < 10; i++) {

    ev = Math.floor(10000 * ((odds[i] + 1) * result[i] / (sims + 1) - 1)) / 100;

    if (ev < 0) {
      document.getElementById("" + i + "-edge").innerHTML = "<span style='color:red'>" + ev + "%</span>";
    }
    else {
      document.getElementById("" + i + "-edge").innerHTML = "<span style='color:green'>" + ev + "%</span>";
    }
  }
}

updateui();
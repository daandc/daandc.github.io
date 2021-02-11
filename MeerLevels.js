let ledNummer
let games = []
function levels() {
  for (let a = 0; a <= 4; a++) {
    for (let i = 0; i <= 63; i++){
      numbers[i] = (i)
      streak++
    }

    for (let i = 0; i <= a; i++) 
    {
        games[a][i] = random(numbers)
    }
  }
 //aantalLeds = length(games[0])
  let ledNummer = 0
  nrG1[ledNummer] = random(numbers)
  setLedNr(nrG1[ledNummer])    
  matrix.show()
}
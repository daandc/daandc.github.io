/** 
 * Memory Game
 * Een Led Game waarin er een aantal witte ledjes op het scherm komen, na een paar seconden verdwijnen die en moet je met de gele led naar de 
 * plaats van de witte ledjes gaan in volgorde.
 * je kunt de gele led bewegen met de joystick en als je denkt dat je op de juiste plaats bent moet je op de spacebar drukken.
 * @authors Yorrit Simons , Daan De Corte
 * @version v1.0 - Februari 2021
 */
let matrix = new Matrix(WIDTH, HEIGHT);
let r = 3
let c = 2
let numbers = []
let nrG1 = []
let ledNummer
let nummer
let checkLedNr = 0;
let streak = 0
let drawAan = 2;
let highScore = 0

async function setup() {
    matrix.init()
    frameRate(5)
    document.getElementById("streak").innerHTML = streak;
    document.getElementById("highscore").innerHTML = highScore;
    startLevel()
    await sleep(5000)
    drawAan = 1
}
function draw() {
    if(drawAan == 1)
    {
        joyStick()
    }
}
/**
 * Bepaalt op welke plaats het ledje moet staan volgens de joystick
 */
 function joyStick() {
        matrix.clear()
        checkSpacebar()
        showLed(r, c)
        let x = readJoystickX()
        let y = readJoystickY()
        if (x > 900 && c < WIDTH - 1){
            c++   
            ledNrCursor()
        }
        else if (x < 100 && c > 0){
            c--
            ledNrCursor()
        }
        else if (y > 900 && r > 0){
            r--
            ledNrCursor()
        }
        else if (y < 100 && r < HEIGHT - 1){
            r++ 
            ledNrCursor()
        }
        matrix.show()   
}
/**
 * Dient om de gele led zijn plaats te geven
 * @param row De rij van de gele led in de matrix
 * @param col De kolom van de gele led in de matrix
 */
function showLed(row, col) {
    matrix.setLed(row, col, true, color('yellow'))
}
/**
 * maakt 3 random nummers aan voor de ledjes van level 1
 * @return {let} 3 random gegenereerde nummers van 0 tot 63
 */
function level1() {
    for (let i = 0; i <= 63; i++){
      numbers[i] = (i)
    }
    for (let i = 0; i < 3; i++) 
    {
        nrG1[i] = random(numbers)
    }
    if(nrG1[0] == nrG1[1] || nrG1[2] == nrG1[1] || nrG1[0] == nrG1[2]) {
        level1()
    }
}

/**
 * Deze functie bepaalt de nummer van de gele led om deze later te kunnen gebruiken
 * @return {let} De nummer van de led
 */
function ledNrCursor()
{
    nummer = r * WIDTH + c
}

/**
 * bepaalt de nummer van de witte ledjes
 * @param nr Het opgegeven nummer van de witte led
 */
function setLedNr(nr,state) {
    let row = Math.floor(nr / WIDTH)
    let col = nr%WIDTH
    matrix.setLed(row, col, state, color('white'))
}
/**
 * bepaalt de nummer van de rode ledjes voor het kruisje als je een foute led aanduidt
 * @param nr Het opgegeven nummer van de rode ledjes
 */
function setLedNrFout(nr,state) {
    let row = Math.floor(nr / WIDTH)
    let col = nr%WIDTH
    matrix.setLed(row, col, state, color('red'))
}
/**
 * bepaalt de nummer van de groene ledjes voor het vinkje als je een correcte led aanduidt
 * @param nr Het opgegeven nummer van de groene ledjes
 */
function setLedNrJuist(nr,state) {
    let row = Math.floor(nr / WIDTH)
    let col = nr%WIDTH
    matrix.setLed(row, col, state, color('green'))
}

/**
 * bepaalt deze functie start een nieuw level
 */
  async function startLevel() {
      level1();
    await sleep(1000)
      matrix.clear()
      setLedNr(nrG1[0])
      matrix.show();
    await sleep(1000);
      setLedNr(nrG1[1])
      matrix.show();
    await sleep(1000);
      setLedNr(nrG1[2])
      matrix.show();
    await sleep(1000)
      drawAan = 1;
      checkLedNr = 0;
}
/**
 * deze functie checkt of de spacebar is ingedrukt 
 */
async function checkSpacebar() {
    if (keyIsPressed === true) {
        if (keyIsDown(32)) {
            console.log("space is ingedrukt");
            checkJuist()
            await sleep(800)
        }
    }
}
/**
 * als de space bar is ingedrukt gaat deze functie na of je het juiste ledje hebt gekose
 */
async function checkJuist(){
    if(nummer==nrG1[checkLedNr]){
        alsJuist()
    }
    else{  
        alsFout()
    }
}
/**
 * als je het juiste ledje hebt aangeduid verschijnt er een vinkje op het scherm
 * als je 3 keer na elkaar het juiste ledje hebt aangeduid gaat de score naar boven en start het volgende level
 */
    async function alsJuist()
    {
        checkLedNr++
        juist()
        if(checkLedNr >= 3)
        {
            streak++
            document.getElementById("streak").innerHTML = streak;
            console.log("streak" , streak);
            juist()
            drawAan = 2
            startLevel()
        }
} 
/**
 * als je het foute ledje hebt aangeduid verschijnt er een kruisje op het scherm
 * de score reset naar nul en de highscore krijgt de waarde van je score (behalve als die score lager is dan je highscore)
 * er word ook een nieuw level gestart
 */
    async function alsFout()
    {
        if(highScore < streak){
            highScore = streak
        }
        document.getElementById("highscore").innerHTML = highScore;
        streak = 0
        document.getElementById("streak").innerHTML = streak;
        fout()
        drawAan = 2
        await sleep(100)
        startLevel() 
        redraw();
    }
/**
 * Maakt de nodige ledjes rood zodat het op een kruis lijkt
 */
function fout(){
    for (let j = 0; j <= 63; j=j+9) {
        setLedNrFout(j)
    }
    for (let j = 7; j <= 56; j=j+7) {
        setLedNrFout(j)
    } 
     matrix.show()
}
/**
 * Maakt de nodige ledjes groen zodat het op een vinkje lijkt
 */
function juist(){
    setLedNrJuist(33)
    setLedNrJuist(24)
    setLedNrJuist(42)
    setLedNrJuist(51)
    setLedNrJuist(44)
    setLedNrJuist(37)
    setLedNrJuist(30)
    setLedNrJuist(23)
    matrix.show()
}
/**
 * Deze functie werkt als een delay
 * @param ms Het aantal milliseconden dat je je functie wilt pauzeren
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

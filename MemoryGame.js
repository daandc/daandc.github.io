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
async function setup() {
    matrix.init()
    frameRate(5)
    document.getElementById("streak").innerHTML = streak;
    startLevel()
    await sleep(5000)
    drawAan = 1
}
function draw() {
    if(drawAan == 1)
    {
        setTimeout(() => { joyStick() }, 100);
    }
}
/**
 * Bepaald op welke plaats het ledje moet staan volgens de joystick
 */
 function joyStick() {
        matrix.clear()
        checkSpacebar()
        showLed(r, c)
        let x = readJoystickX()
        let y = readJoystickY()
    
        if (x > 900 && c < WIDTH - 1)
        {
            c++   
            ledNrCursor()
        }
        else if (x < 100 && c > 0)
        {
            c--
            ledNrCursor()
        }
        else if (y > 900 && r > 0)
        {
            r--
            ledNrCursor()
        }
        else if (y < 100 && r < HEIGHT - 1)
        {
            r++ 
            ledNrCursor()
        }
        matrix.show()
}
/**
 * dient om de gele led zijn plaats te geven
 */
function showLed(row, col) {
    matrix.setLed(row, col, true, color('yellow'))
}
/**
 * maakt 3 random nummers aan voor de ledjes van level 1
 */
function level1() {
    for (let i = 0; i <= 63; i++){
      numbers[i] = (i)
    }

    for (let i = 0; i < 3; i++) 
    {
        nrG1[i] = random(numbers)
        //nrG1[i] = i
    }
}
/**
 * hier mee kun je bepalen de hoeveelste led de gele led is
 */
function ledNrCursor()
{
    nummer = r * WIDTH + c
    console.log("gele led is : ", nummer);
}
/**
 * bepaald de nummer van de witte ledjes
 */
function setLedNr(nr,state) {
    let row = Math.floor(nr / WIDTH)
    let col = nr%WIDTH
    matrix.setLed(row, col, state, color('white'))
}

/**
 * bepaald de nummer van de rode ledjes
 */
function setLedNrFout(nr,state) {
    let row = Math.floor(nr / WIDTH)
    let col = nr%WIDTH
    matrix.setLed(row, col, state, color('red'))
}
/**
 * bepaald de nummer van de groene ledjes
 */
function setLedNrJuist(nr,state) {
    let row = Math.floor(nr / WIDTH)
    let col = nr%WIDTH
    matrix.setLed(row, col, state, color('green'))
}
/**
 * deze functie start een nieuw level
 */

  async function startLevel() {
      level1();
    await sleep(1000)
      matrix.clear()
      setLedNr(nrG1[0])
      //console.log(nrG1[0]);
      matrix.show();
    await sleep(1000);
      setLedNr(nrG1[1])
      //console.log(nrG1[1]);
      matrix.show();
    await sleep(1000);
      setLedNr(nrG1[2])
      //console.log(nrG1[2]);
      matrix.show();
    await sleep(1000)
      drawAan = 1;
      checkLedNr = 0;
}
/**
 * deze functie checkt of de spacebar is ingedrukt e
 * laat je naar het volgende level gaan als het juist is 
 * laat je opnieuw beginnen als het fout is
 * laat de streak naar boven gaan
 */
async function checkSpacebar() {
    if (keyIsDown(32)) {
        console.log("space is ingedrukt");
        checkJuist()
      }
    }

async function checkJuist(){
    if(nummer==nrG1[checkLedNr]){
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
    else
    {  
        fout()
        await sleep(1000)
        location.reload();
    }
}

async function fout()
{
     setLedNrFout(0)
     setLedNrFout(9)
     setLedNrFout(18)
     setLedNrFout(27)
     setLedNrFout(36)
     setLedNrFout(45)
     setLedNrFout(54)
     setLedNrFout(63)
     setLedNrFout(7)
     setLedNrFout(14)
     setLedNrFout(21)
     setLedNrFout(28)
     setLedNrFout(35)
     setLedNrFout(42)
     setLedNrFout(49)
     setLedNrFout(56)
     matrix.show()
     await sleep(1000)
     console.log("fout ! restarten ...");
}
async function juist(){
    
    setLedNrJuist(33)
    setLedNrJuist(24)
    setLedNrJuist(42)
    setLedNrJuist(51)
    setLedNrJuist(44)
    setLedNrJuist(37)
    setLedNrJuist(30)
    setLedNrJuist(23)
    matrix.show()
    console.log('juist')
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}




  
 
  
  
  
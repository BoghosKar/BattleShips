import {oppShipsGenerator, opponentReset} from "./oppShipSetup.js"
let OpponentShipTiles
//LETTER & NUMBER COORDS
export let NumberCoordinates = ['blank', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
export let LetterCoordinates = ['blank', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'] 
//CONTAINERS
let setupContainer = document.querySelector('#setup-container')
let battleContainer = document.querySelector('#container')
let middle = document.querySelector('#middle')
let messageBox = document.querySelector('#message')
let popup = document.querySelector('#popup')
let waitingScreen = document.querySelector('#waiting')
//TILES OF EACH GRID
export let LeftTiles = document.querySelectorAll('[data-tile-left]')
export let RightTiles = document.querySelectorAll('[data-tile-right]')
let SetupTiles = document.querySelectorAll('[data-tile]')
//GRIDS
let SetupGrid = document.querySelector('#setup-grid')
//BTNS FOR SETUP
let RotateBtn = document.querySelector('[data-rotate-btn]')
let ClearBtn = document.querySelector('[data-clear-btn]')
let RemoveBtn = document.querySelector('[data-remove-btn]')
let StartGameBtn = document.querySelector('[data-start-game-btn]')
let shipBtns = document.querySelectorAll('[data-ship-btn]')

//SETUP VARIABLES
let PlayerShipTiles = ['blank']
let LatestShipTiles = []
let PreviewTiles = []
let latestShipBtn = undefined
let overlapCount
let placedCount = 0
let shipLength
let shipName
let isClicked = false
let isVertical = false
let isShipBtn = false
let isValid = true
let isOverlapping = false

//SHIP TILE ARRAYS
let DestroyerOppTiles
let SubmarineOppTiles 
let CruiserOppTiles 
let BattleshipOppTiles 
let CarrierOppTiles 
let DestroyerPlayerTiles
let SubmarinePlayerTiles
let CruiserPlayerTiles
let BattleshipPlayerTiles
let CarrierPlayerTiles

//Variables for Game Logic
let PlayerPrevClicked = ['blank']
let OppPrevClicked = ['blank']
let PlayerClickedTile
let isPlayerTurn
let isWaste
let OppClickedTile
let direction
let workingOnShip = false
let LetterCoordIndex
let NumberCoordIndex
let startNumCoordIndex
let startLetCoordIndex
let validOpp
let reverse
let sinkOppShip
let sinkPlayerShip
let playerShipSinkCount
let oppShipSinkCount
let waiting
let win
let newGameBtn = document.querySelector('[data-new-game]')
let winText = document.querySelector('[data-win-text]')
//Statistics
let playerBombCount = 0
let playerHitCount = 0
let gameCount = 0
let winCount = 0
let leastBombCount = null
let currentBombCount = 0
let accuracy
let winPercent
let accuracyHTML = document.querySelector('[data-accuracy]')
let winPercentHTML = document.querySelector('[data-win-percentage]')
let gamesPlayedHTML = document.querySelector('[data-games-played]')
let bestGameHTML = document.querySelector('[data-best-game]')
let clearStats = document.querySelector('[data-clear]')


//EVENTLISTENER MOUSELEAVE ON GRID
SetupGrid.addEventListener('mouseleave', () =>{
    clearPreviews()
})
function clearPreviews(){
    SetupTiles.forEach(tile =>{
        tile.classList.remove('ship')
    })
}

//EVENTLISTENER ON REMOVE BTN
RemoveBtn.addEventListener('click', () =>{
    PlayerShipTiles.forEach(playerShipTile =>{
        LatestShipTiles.forEach(latestShipTile =>{
            if(playerShipTile.innerHTML == latestShipTile){
                PlayerShipTiles[PlayerShipTiles.indexOf(playerShipTile)] = 'removed'
            }
        })
    })
    if(placedCount > 0){
        placedCount--
    }
    SetupTiles.forEach(setupTile =>{
        LatestShipTiles.forEach(latestShipTile =>{
            if(latestShipTile == setupTile.innerHTML){
                setupTile.className = ''
                setupTile.classList.add('tile')
            }
        })
    })
    //get latestshipbtn to work and restart after removed
    shipBtns.forEach(shipBtn =>{
        shipBtn.classList.remove('clicked')
        if(shipBtn.className == ''){
            shipBtn.classList.add('default-ship-btn')
        }
        if(shipBtn.innerHTML == latestShipBtn){
            shipBtn.classList.remove('placed')
            shipBtn.classList.add('default-ship-btn')
        }
        resetAfterPlaced()
        StartGameBtn.classList.remove('ready')
        StartGameBtn.classList.add('default-start-btn')
    }) 
})

//EVENTLISTENER ON CLEAR BTN
ClearBtn.addEventListener('click', () =>{
    PlayerShipTiles = ['blank']
    LatestShipTiles = []
    PreviewTiles = []
    latestShipBtn = undefined
    overlapCount
    placedCount = 0
    shipLength
    shipName
    isClicked = false
    isVertical = false
    isShipBtn = false
    isValid = true
    isOverlapping = false

    //SHIPBTNS CLASSES
    shipBtns.forEach(shipBtn =>{
        shipBtn.className = 'default-ship-btn'
    })

    //Setup Tile Classes
    SetupTiles.forEach(setupTile =>{
        setupTile.className = ''
        setupTile.classList.add('tile')
    })

    //Startgame btn class
    StartGameBtn.className = 'default-start-btn'
})

//EVENTLISTENER ON ROTATEBTN
RotateBtn.addEventListener('click', () =>{
    isVertical = isVertical !== true
})

//EVENTLISTENER ON STARTBTN
StartGameBtn.addEventListener('click', () =>{
    if(StartGameBtn.classList.contains('ready')){
        setupContainer.classList.add('invisible')
        battleContainer.classList.remove('invisible')
        startGame()
    }
})

//EVENTLISTENER ON SHIP BTN
document.addEventListener('click', (e) =>{
    isShipBtn = e.target.matches('[data-ship-btn]')
    if(isShipBtn && !e.target.classList.contains('placed')){
        document.querySelectorAll('[data-ship-btn]').forEach(shipBtn =>{
            shipBtn.classList.remove('clicked')
            if(shipBtn.className == ''){
                shipBtn.classList.add('default-ship-btn')
            }
        })
        e.target.classList.remove('default-ship-btn')
        e.target.classList.add('clicked')
        shipName = e.target.innerHTML
        isClicked = true
        getShipLength()
    }
})
//GET SHIP LENGTH
function getShipLength(){
    switch (shipName) {
        case "Destroyer":
            shipLength = 2
            break;
        case "Submarine":
            shipLength = 3
            break;
        case "Cruiser":
            shipLength = 3
            break;
        case "Battleship":
            shipLength = 4
            break;
        case "Carrier":
            shipLength = 5
            break;
        default:
            break;
    }
}


//EVENTLISTENER ON TILE MOUSEOVER
SetupTiles.forEach(tile =>{
    tile.addEventListener('mouseover', (TileIndex, LetterCoordIndex, NumberCoordIndex) => {
        //REMOVE CLASS FROM EACH TILE
        SetupTiles.forEach(tile => {
            tile.classList.remove('ship')
        })
        overlapCount = 0

        //GET TILE INDEX IN ARRAY
        for(let i = 0; i <= SetupTiles.length; i++){
            if(tile == SetupTiles[i]){
                TileIndex = i    
                PreviewTiles = []
            }
        }
        //GET PREVIEW TILES --- Horizontal
        if(!isVertical){
            for(let i=0; i<shipLength;i++){
                PreviewTiles.push(SetupTiles[TileIndex+i].innerHTML)
            }
        }
        
        //GET PREVIEW TILES --- Vertical
        if(isVertical){
            for(let i=0; i<shipLength*10;i =i+10){
                PreviewTiles.push(SetupTiles[TileIndex+i].innerHTML)
            }
        }

        //GET LETTERCOORD in Array (index)
        for(let i = 0; i <LetterCoordinates.length; i++){
            if(LetterCoordinates[i] == tile.innerHTML.slice(0,1)){
                LetterCoordIndex = i
            }
        }

        //GET NUMCOORD in ARRAY (index)
        for(let i = 0; i <NumberCoordinates.length; i++){
            if(NumberCoordinates[i] == tile.innerHTML.slice(1,3)){
                NumberCoordIndex = i
            }
        }

        //CHECK IF VALID --- Horizontal
        if(!isVertical){
        if(isClicked && LetterCoordIndex + shipLength <=11){
            isValid=true
        }else{
            isValid = false
        }
        }

        //CHECK IF VALID --- Vertical
        if(isVertical){
        if(isClicked && NumberCoordIndex + shipLength <=11){
            isValid = true
        }else{
            isValid = false
        }
        }

        //CHECK OVERLAP -- Horizontal
        if(!isVertical){
        PlayerShipTiles.forEach(playerTile =>{
            PreviewTiles.forEach(previewTile =>{
                if(previewTile == playerTile.innerHTML){
                    isOverlapping = true
                    overlapCount++
                    console.log('overlap')
                }
            })
            if(overlapCount<=0){
                isOverlapping = false
            }
        })
        }
        
        //CHECK OVERLAP -- Vertical
        if(isVertical){
        PlayerShipTiles.forEach(playerTile =>{
            PreviewTiles.forEach(previewTile =>{
                if(previewTile == playerTile.innerHTML){
                    isOverlapping = true
                    overlapCount++
                    console.log('overlap')
                }
            })
            if(overlapCount<=0){
                isOverlapping = false
            }
        })
        }
        
        //ADD CLASS TO EACH SHIP TILE --- Horizontal
        if(isClicked && !isVertical && isValid){
            if(!isOverlapping){
            for(let i = 0; i < shipLength; i++){
                SetupTiles[TileIndex + i].classList.add('ship')
            }
            }
        }

        //ADD CLASS TO EACH SHIP TILE --- Vertical
        if(isClicked && isVertical && isValid){
            if(!isOverlapping){
            for(let i = 0; i < shipLength * 10; i = i + 10){
                SetupTiles[TileIndex + i].classList.add('ship')
            }
            }
        }

    })
})

//EVENTLISTENER ON TILE CLICK
SetupTiles.forEach(tile =>{
    tile.addEventListener('click', () =>{
        LatestShipTiles = []
        if(isValid && !isOverlapping){
            playClick()
            latestShipBtn = shipName
            document.querySelectorAll('.ship').forEach(shipTile =>{
                PlayerShipTiles.push(shipTile)
                LatestShipTiles.push(shipTile.innerHTML)
                shipTile.classList.add('shipClicked')
                switch (shipName) {
                    case "Destroyer":
                        for(let i = 0; i<shipLength; i++){
                            document.querySelectorAll('.ship').forEach(shipTile =>{
                                shipTile.classList.add('destroyer')
                            })
                        }
                        break;
                    case "Submarine":
                        for(let i = 0; i<shipLength; i++){
                            document.querySelectorAll('.ship').forEach(shipTile =>{
                                shipTile.classList.add('submarine')
                            })
                        }
                        break;
                    case "Cruiser":
                        for(let i = 0; i<shipLength; i++){
                            document.querySelectorAll('.ship').forEach(shipTile =>{
                                shipTile.classList.add('cruiser')
                            })
                        }
                        break;
                    case "Battleship":
                        for(let i = 0; i<shipLength; i++){
                            document.querySelectorAll('.ship').forEach(shipTile =>{
                                shipTile.classList.add('battleship')
                            })
                        }
                        break;
                    case "Carrier":
                        for(let i = 0; i<shipLength; i++){
                            document.querySelectorAll('.ship').forEach(shipTile =>{
                                shipTile.classList.add('carrier')
                            })
                        }
                        break;
                    default:
                        break;
                }
                resetAfterPlaced()
            })
            placedCount++
            if(placedCount >= 5){
                StartGameBtn.classList.add('ready')
                StartGameBtn.classList.remove('default-start-btn')
            }
            document.querySelector('.clicked').classList.add('placed')
            document.querySelector('.clicked').classList.remove('clicked')
        }

    })
})

function resetAfterPlaced(){
    isClicked = false
    isValid = true
    isShipBtn = false
    isVertical = false
    shipLength = undefined
    shipName = undefined
    isOverlapping = false
}


//START GAME
function startGame(){
    oppShipsGenerator()
    assignValues()
    addPlayerShipClasses()
    isPlayerTurn = true
    workingOnShip = false
    isOpposite = false
    reverse = false
}
function assignValues(){
    DestroyerOppTiles = document.querySelectorAll('.destroyerOpp')
    SubmarineOppTiles = document.querySelectorAll('.submarineOpp')
    CruiserOppTiles = document.querySelectorAll('.cruiserOpp')
    BattleshipOppTiles = document.querySelectorAll('.battleshipOpp')
    CarrierOppTiles = document.querySelectorAll('.carrierOpp')
    OpponentShipTiles = document.querySelectorAll('.shipOpp')
    DestroyerPlayerTiles = document.querySelectorAll('.destroyer')
    SubmarinePlayerTiles = document.querySelectorAll('.submarine')
    CruiserPlayerTiles = document.querySelectorAll('.cruiser')
    BattleshipPlayerTiles = document.querySelectorAll('.battleship')
    CarrierPlayerTiles = document.querySelectorAll('.carrier')
    direction = undefined
    waiting = false
    win = false
    playerShipSinkCount = 0
    oppShipSinkCount = 0
    LeftTiles.forEach(LeftTile =>{
        PlayerShipTiles.forEach(PlayerShipTile =>{
            if(PlayerShipTile.innerHTML == LeftTile.innerHTML){
                LeftTile.classList.add('playerShip')
            }
        })
    })
    PlayerShipTiles = []
    document.querySelectorAll('.playerShip').forEach(playerShip =>{
        PlayerShipTiles.push(playerShip)
    })
}

function addPlayerShipClasses(){
    LeftTiles.forEach(leftTile =>{
        DestroyerPlayerTiles.forEach(shipTile =>{
            if(shipTile.innerHTML == leftTile.innerHTML){
                leftTile.classList.add('playerDestroyer')
            }
        })
    })
    LeftTiles.forEach(leftTile =>{
        SubmarinePlayerTiles.forEach(shipTile =>{
            if(shipTile.innerHTML == leftTile.innerHTML){
                leftTile.classList.add('playerSubmarine')
            }
        })
    })
    LeftTiles.forEach(leftTile =>{
        CruiserPlayerTiles.forEach(shipTile =>{
            if(shipTile.innerHTML == leftTile.innerHTML){
                leftTile.classList.add('playerCruiser')
            }
        })
    })
    LeftTiles.forEach(leftTile =>{
        BattleshipPlayerTiles.forEach(shipTile =>{
            if(shipTile.innerHTML == leftTile.innerHTML){
                leftTile.classList.add('playerBattleship')
            }
        })
    })
    LeftTiles.forEach(leftTile =>{
        CarrierPlayerTiles.forEach(shipTile =>{
            if(shipTile.innerHTML == leftTile.innerHTML){
                leftTile.classList.add('playerCarrier')
            }
        })
    })
    DestroyerPlayerTiles = document.querySelectorAll('.playerDestroyer')
    SubmarinePlayerTiles = document.querySelectorAll('.playerSubmarine')
    CruiserPlayerTiles = document.querySelectorAll('.playerCruiser')
    BattleshipPlayerTiles = document.querySelectorAll('.playerBattleship')
    CarrierPlayerTiles = document.querySelectorAll('.playerCarrier')
}

//////GAME LOGIC
RightTiles.forEach(rightTile =>{
    rightTile.addEventListener('click', (e) =>{
        console.log(playerShipSinkCount, oppShipSinkCount)
        if(!waiting){
        PlayerClickedTile = e.target.innerHTML
        if(isPlayerTurn){
           PlayerPrevClicked.forEach(playerprevclickedtile =>{
                if(PlayerClickedTile == playerprevclickedtile){
                    isWaste = true
                    //alert
                }
            })
        }
        if(isPlayerTurn && !isWaste){
            PlayerPrevClicked.push(PlayerClickedTile)
            rightTile.classList.add('bomb')
            checkHit()
        }
        if(!isWaste && isPlayerTurn){
            isPlayerTurn = false
                oppTurn()
            ;
        }
        isWaste = false
    }
    })
})

function checkHit(currentHitOpp){
    if(isPlayerTurn){
        playerBombCount++
        currentBombCount++
        OpponentShipTiles.forEach(OpponentShipTile =>{
            if(PlayerClickedTile == OpponentShipTile.innerHTML){
                playerHitCount++
                OpponentShipTile.classList.add('tileSink')
                OpponentShipTile.classList.remove('bomb')
                checkSink()
            }
        })
    }
    if(!isPlayerTurn){
        currentHitOpp = false
        PlayerShipTiles.forEach(playerShipTile =>{
            if(playerShipTile.innerHTML == OppClickedTile){
                playerShipTile.classList.add('tileSink')
                playerShipTile.classList.remove('bomb')
                if(!workingOnShip){
                    startLetCoordIndex = LetterCoordIndex
                    startNumCoordIndex = NumberCoordIndex
                }
                currentHitOpp = true
                workingOnShip = true
                checkSink()
            }
        })
        if(!currentHitOpp && workingOnShip){
            reverse = true
        }
    }
}

function checkSink(){
    if(isPlayerTurn){
        sinkOppShip = false
        destroyerOppSink()
        submarineOppSink()
        cruiserOppSink()
        battleshipOppSink()
        carrierOppSink()
        //ALERT PLAYER SUNK OPP SHIP
        if(sinkOppShip){
            middle.classList.remove('invisible')
            playBomb()
            checkWin()
            isPlayerTurn = false
            setTimeout(() => {
                if(!win){
                    middle.classList.add('invisible')
                    oppTurn()
                }
                messageBox.innerHTML = ''
            }, 1000);
        }
    }
    if(!isPlayerTurn){
        sinkPlayerShip = false
        destroyerPlayerSink()
        submarinePlayerSink()
        cruiserPlayerSink()
        battleshipPlayerSink()
        carrierPlayerSink()
        if(sinkPlayerShip){
            middle.classList.remove('invisible')
            workingOnShip = false
            reverse = false
            direction = undefined
            playBomb()
            checkWin()
            isPlayerTurn = false
            waiting = true
            setTimeout(() => {
                if(!win){
                    middle.classList.add('invisible')
                }
                    isPlayerTurn = true
                    waiting = false
                    messageBox.innerHTML = ''
            }, 1000);
        }
    }
}


function checkWin(){
        if(oppShipSinkCount == 5){
            gameCount++
            winCount++
            popupFunction()
            statistics()
            isPlayerTurn = false
            winText.innerHTML = 'You won'
            console.log('playerWin')
        }
        if(playerShipSinkCount == 5){
            gameCount++
            popupFunction()
            statistics()
            isPlayerTurn = false
            winText.innerHTML = 'You lost'
            console.log('oppWin')
        }
}

function popupFunction(){
    middle.classList.add('background')
    middle.classList.remove('invisible')
    popup.classList.remove('invisible')
    win = true
}
function statistics(){
    console.log(playerHitCount, playerBombCount, gameCount, winCount)
    accuracy = Math.round(playerHitCount/playerBombCount * 100) + '%'
    winPercent = Math.round(winCount/gameCount * 100) + '%'
    if(leastBombCount < currentBombCount || leastBombCount == null){
        leastBombCount = currentBombCount
    }
    localStorage.setItem('leastBombCount', leastBombCount)
    localStorage.setItem('accuracy', accuracy)
    localStorage.setItem('winPercent', winPercent)
    localStorage.setItem('gameCount', gameCount)
    localStorage.setItem('playerHitCount', playerHitCount)
    localStorage.setItem('playerBombCount', playerBombCount)
    localStorage.setItem('winCount', winCount)

}
function oppTurn(){
    if(reverse){
        reverseDir()
    }
    if(!isPlayerTurn && !workingOnShip){
        if(!reverse){
            getRandTile()
        }
    }
    if(workingOnShip && direction != undefined){
        if(!reverse){
            addDirection()
        }
    }
    if(workingOnShip && direction == undefined){
        if(!reverse){
            getRandDir()
            addDirection()
        }
    }
    checkValid()
    if(!validOpp){
        workingOnShip = false
        direction = undefined
        getRandTile()
    }

    for(let i = 0; i<=LetterCoordinates.length; i++){
        if(OppClickedTile.slice(0,1) == LetterCoordinates[i]){
            LetterCoordIndex = i
        }
    }
    for(let i = 0; i<=NumberCoordinates.length; i++){
        if(OppClickedTile.slice(1,3) == NumberCoordinates[i]){
            NumberCoordIndex = i
        }
    }

    reverse = false
    //add bomb class
    LeftTiles.forEach(LeftTile =>{
        if(LeftTile.innerHTML == OppClickedTile){
            LeftTile.classList.add('bomb')
        }
    })
    //add tile to prev clicked
    OppPrevClicked.push(OppClickedTile)
    checkHit()

    waitingScreen.classList.remove('invisible')
        isPlayerTurn = true
        waitingScreen.classList.add('invisible')
}

function addDirection(){
    switch (direction) {
        case 1:
            OppClickedTile = LetterCoordinates[LetterCoordIndex]+NumberCoordinates[NumberCoordIndex-1]
        case 2:
            OppClickedTile = LetterCoordinates[LetterCoordIndex+1]+NumberCoordinates[NumberCoordIndex]
            break;
        case 3:
            OppClickedTile = LetterCoordinates[LetterCoordIndex]+NumberCoordinates[NumberCoordIndex+1]
            break;
        case 4:
            OppClickedTile = LetterCoordinates[LetterCoordIndex-1]+NumberCoordinates[NumberCoordIndex]
            break;
        default:
            break;
    }
}

function getRandDir(){
    direction = Math.floor(Math.random()*4+1)
}

function getRandTile(repeat){
    repeat = false
    OppClickedTile = LetterCoordinates[Math.floor(Math.random()*10+1)] + NumberCoordinates[Math.floor(Math.random()*10+1)]
    OppPrevClicked.forEach(prevClicked =>{
        if(OppClickedTile == prevClicked){
            repeat = true
        }
    })
    if(repeat){
        getRandTile()
    }
}

function checkValid(boardTile, prevClickedTileOpp){
    validOpp = false
    boardTile = false
    prevClickedTileOpp = false
    LeftTiles.forEach(leftTile =>{
        if(leftTile.innerHTML == OppClickedTile){
            boardTile = true
        }
    })
    OppPrevClicked.forEach(prevClicked =>{
        if(prevClicked == OppClickedTile){
            prevClickedTileOpp = true
        }
    })
    if(boardTile && !prevClickedTileOpp){
        validOpp = true
    }
}

function reverseDir(){
    switch (direction) {
        case 1:
            direction = 3
            OppClickedTile = LetterCoordinates[startLetCoordIndex]+NumberCoordinates[startNumCoordIndex+1]
        case 2:
            direction = 4
            OppClickedTile = LetterCoordinates[startLetCoordIndex-1]+NumberCoordinates[startNumCoordIndex]
            break;
        case 3:
            direction = 1
            OppClickedTile = LetterCoordinates[startLetCoordIndex]+NumberCoordinates[startNumCoordIndex-1]
            break;
        case 4:
            direction = 2
            OppClickedTile = LetterCoordinates[startLetCoordIndex+1]+NumberCoordinates[startNumCoordIndex]
            break;
        default:
            break;
    }
}

//SINK FUNCTIONS
function destroyerOppSink(belongsToShip, count, currentShipSink){
    count = 0
    belongsToShip = false
    currentShipSink = false
    DestroyerOppTiles.forEach(destroyerOppTile =>{
        if(destroyerOppTile.classList.contains('tileSink')){
            count++
        }
        if(destroyerOppTile.innerHTML == PlayerClickedTile){
            belongsToShip = true
        }
    })
    if(belongsToShip && count == DestroyerOppTiles.length){
        sinkOppShip = true
        currentShipSink = true

    }
    if(currentShipSink){
        DestroyerOppTiles.forEach(oppTile =>{
            oppTile.classList.add('shipSink')
            oppTile.classList.remove('tileSink')
        })
        oppShipSinkCount++
        messageBox.innerHTML = "You sank the opponent's Destroyer"
    }
}
function submarineOppSink(belongsToShip, count, currentShipSink){
    count = 0
    belongsToShip = false
    currentShipSink = false
    SubmarineOppTiles.forEach(submarineOppTile =>{
        if(submarineOppTile.classList.contains('tileSink')){
            count++
        }
        if(submarineOppTile.innerHTML == PlayerClickedTile){
            belongsToShip = true
        }
    })
    if(belongsToShip && count == SubmarineOppTiles.length){
        sinkOppShip = true
        currentShipSink = true

    }
    if(currentShipSink){
        SubmarineOppTiles.forEach(oppTile =>{
            oppTile.classList.add('shipSink')
            oppTile.classList.remove('tileSink')
        })
        oppShipSinkCount++
        messageBox.innerHTML = "You sank the opponent's Submarine"
    }
}
function cruiserOppSink(belongsToShip, count, currentShipSink){
    count = 0
    belongsToShip = false
    currentShipSink = false
    CruiserOppTiles.forEach(cruiserOppTile =>{
        if(cruiserOppTile.classList.contains('tileSink')){
            count++
        }
        if(cruiserOppTile.innerHTML == PlayerClickedTile){
            belongsToShip = true
        }
    })
    if(belongsToShip && count == CruiserOppTiles.length){
        sinkOppShip = true
        currentShipSink = true
    }
    if(currentShipSink){
        CruiserOppTiles.forEach(oppTile =>{
            oppTile.classList.add('shipSink')
            oppTile.classList.remove('tileSink')
        })
        oppShipSinkCount++
        messageBox.innerHTML = "You sank the opponent's Cruiser"
    }
}
function battleshipOppSink(belongsToShip, count, currentShipSink){
    count = 0
    belongsToShip = false
    currentShipSink = false
    BattleshipOppTiles.forEach(battleshipOppTile =>{
        if(battleshipOppTile.classList.contains('tileSink')){
            count++
        }
        if(battleshipOppTile.innerHTML == PlayerClickedTile){
            belongsToShip = true
        }
    })
    if(belongsToShip && count == BattleshipOppTiles.length){
        sinkOppShip = true
        currentShipSink = true
    }
    if(currentShipSink){
        BattleshipOppTiles.forEach(oppTile =>{
            oppTile.classList.add('shipSink')
            oppTile.classList.remove('tileSink')
        })
        oppShipSinkCount++
        messageBox.innerHTML = "You sank the opponent's Battleship"
    }
}
function carrierOppSink(belongsToShip, count, currentShipSink){
    count = 0
    belongsToShip = false
    currentShipSink = false
    CarrierOppTiles.forEach(battleshipOppTile =>{
        if(battleshipOppTile.classList.contains('tileSink')){
            count++
        }
        if(battleshipOppTile.innerHTML == PlayerClickedTile){
            belongsToShip = true
        }
    })
    if(belongsToShip && count == CarrierOppTiles.length){
        sinkOppShip = true
        currentShipSink = true
    }
    if(currentShipSink){
        CarrierOppTiles.forEach(oppTile =>{
            oppTile.classList.add('shipSink')
            oppTile.classList.remove('tileSink')
        })
        oppShipSinkCount++
        messageBox.innerHTML = "You sank the opponent's Carrier"
    }
}

function destroyerPlayerSink(belongsToShip, count, currentShipSink){
    count = 0
    belongsToShip = false
    currentShipSink = false
    DestroyerPlayerTiles.forEach(destroyerPlayerTile =>{
        if(destroyerPlayerTile.classList.contains('tileSink')){
            count++
        }
        if(destroyerPlayerTile.innerHTML == OppClickedTile){
            belongsToShip = true
        }
    })
    if(belongsToShip && count == DestroyerPlayerTiles.length){
        sinkPlayerShip = true
        currentShipSink = true
    }
    if(currentShipSink){
        DestroyerPlayerTiles.forEach(oppTile =>{
            oppTile.classList.add('shipSink')
            oppTile.classList.remove('tileSink')
        })
        playerShipSinkCount++
        messageBox.innerHTML = "The opponent sank your Destroyer"
    }
}
function submarinePlayerSink(belongsToShip, count, currentShipSink){
    count = 0
    belongsToShip = false
    currentShipSink = false
    SubmarinePlayerTiles.forEach(submarinePlayerTile =>{
        if(submarinePlayerTile.classList.contains('tileSink')){
            count++
        }
        if(submarinePlayerTile.innerHTML == OppClickedTile){
            belongsToShip = true
        }
    })
    if(belongsToShip && count == SubmarinePlayerTiles.length){
        sinkPlayerShip = true
        currentShipSink = true
    }
    if(currentShipSink){
        SubmarinePlayerTiles.forEach(oppTile =>{
            oppTile.classList.add('shipSink')
            oppTile.classList.remove('tileSink')
        })
        playerShipSinkCount++
        messageBox.innerHTML = "The opponent sank your Submarine"
    }
}
function cruiserPlayerSink(belongsToShip, count, currentShipSink){
    count = 0
    belongsToShip = false
    currentShipSink = false
    CruiserPlayerTiles.forEach(cruiserPlayerTile =>{
        if(cruiserPlayerTile.classList.contains('tileSink')){
            count++
        }
        if(cruiserPlayerTile.innerHTML == OppClickedTile){
            belongsToShip = true
        }
    })
    if(belongsToShip && count == CruiserPlayerTiles.length){
        sinkPlayerShip = true
        currentShipSink = true
    }
    if(currentShipSink){
        CruiserPlayerTiles.forEach(oppTile =>{
            oppTile.classList.add('shipSink')
            oppTile.classList.remove('tileSink')
        })
        playerShipSinkCount++
        messageBox.innerHTML = "The opponent sank your Cruiser"
    }
}
function battleshipPlayerSink(belongsToShip, count, currentShipSink){
    count = 0
    belongsToShip = false
    currentShipSink = false
    BattleshipPlayerTiles.forEach(battleshipPlayerTile =>{
        if(battleshipPlayerTile.classList.contains('tileSink')){
            count++
        }
        if(battleshipPlayerTile.innerHTML == OppClickedTile){
            belongsToShip = true
        }
    })
    if(belongsToShip && count == BattleshipPlayerTiles.length){
        sinkPlayerShip = true
        currentShipSink = true
    }
    if(currentShipSink){
        BattleshipPlayerTiles.forEach(oppTile =>{
            oppTile.classList.add('shipSink')
            oppTile.classList.remove('tileSink')
        })
        playerShipSinkCount++
        messageBox.innerHTML = "The opponent sank your Battleship"
    }
}
function carrierPlayerSink(belongsToShip, count, currentShipSink){
    count = 0
    belongsToShip = false
    currentShipSink = false
    CarrierPlayerTiles.forEach(carrierPlayerTile =>{
        if(carrierPlayerTile.classList.contains('tileSink')){
            count++
        }
        if(carrierPlayerTile.innerHTML == OppClickedTile){
            belongsToShip = true
        }
    })
    if(belongsToShip && count == CarrierPlayerTiles.length){
        sinkPlayerShip = true
        currentShipSink = true
    }
    if(currentShipSink){
        CarrierPlayerTiles.forEach(oppTile =>{
            oppTile.classList.add('shipSink')
            oppTile.classList.remove('tileSink')
        })
        playerShipSinkCount++
        messageBox.innerHTML = "The opponent sank your Carrier"
    }
}

function playBomb(){
    var audio = new Audio('./stuff/audio.wav')
    audio.play()
}
function playClick(){
    var audio = new Audio('./stuff/click.wav')
    audio.play()
}

window.addEventListener('load', () =>{
    accuracyHTML.innerHTML = 'Hit Accuracy: ' + localStorage.getItem('accuracy')
    winPercentHTML.innerHTML = 'Win Percentage: ' + localStorage.getItem('winPercent')
    gamesPlayedHTML.innerHTML = 'Games Played: ' + localStorage.getItem('gameCount')
    bestGameHTML.innerHTML = 'Best Game:' + localStorage.getItem('leastBombCount') + ' Hits'
    playerBombCount = localStorage.getItem('playerBombCount')
    playerHitCount = localStorage.getItem('playerHitCount')
    gameCount = localStorage.getItem('gameCount') 
    winCount = localStorage.getItem('winCount')
})

clearStats.addEventListener('click', () =>{
    window.localStorage.clear()
})
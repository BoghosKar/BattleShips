const NumberCoordinates = ['blank', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
const LetterCoordinates = ['blank', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'] 

let player1SetupTiles = document.querySelectorAll('[data-tile-player-1]')
let player2SetupTiles = document.querySelectorAll('[data-tile-player-2]')
const setupGrids = document.querySelectorAll('#setup-grid')
const setupContainer1 = document.querySelector('#setup-container-player-1')
const setupContainer2 = document.querySelector('#setup-container-player-2')

const battleContainer = document.querySelector('#container')
const leftTiles = document.querySelectorAll('[data-tile-left]')
const rightTiles = document.querySelectorAll('[data-tile-right]')

let middle = document.querySelector('#middle')
let messageBox = document.querySelector('[data-win-text]')


const waitingConf1 = document.querySelector('#waiting-screen-confirm-1')
const waitingConf2 = document.querySelector('#waiting-screen-confirm-2')
const waitingBattle = document.querySelector('#waiting-screen')
const continue1 = document.querySelector('#continue-1')
const continue2 = document.querySelector('#continue-2')
const continueBattle = document.querySelector('#continue-battle')

const removeBtn1 = document.querySelector('[data-remove-btn-player-1]')
const removeBtn2 = document.querySelector('[data-remove-btn-player-2]')
const rotateBtn1 = document.querySelector('[data-rotate-btn-player-1]')
const rotateBtn2 = document.querySelector('[data-rotate-btn-player-2]')
const clearBtn1 = document.querySelector('[data-clear-btn-player-1]')
const clearBtn2 = document.querySelector('[data-clear-btn-player-2]')
const confirm1 = document.querySelector('[data-confirm-player-1]')
const confirm2 = document.querySelector('[data-confirm-player-2]')
const shipBtns1 = document.querySelectorAll('[data-ship-btn-player-1]')
const shipBtns2 = document.querySelectorAll('[data-ship-btn-player-2]')

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

let player1ShipTiles = ['blank']
let player2ShipTiles = ['blank']
let latestShipTiles = []
let previewTiles = []

let destroyerPlayer1 = []
let submarinePlayer1 = []
let cruiserPlayer1 = []
let battleshipPlayer1 = []
let carrierPlayer1 = []
let destroyerPlayer2 = []
let submarinePlayer2 = []
let cruiserPlayer2 = []
let battleshipPlayer2 = []
let carrierPlayer2 = []

let player1PrevClicked = []
let player2PrevClicked = []
let player1Turn
let isWaste
let player1ShipSinkCount
let player2ShipSinkCount
let player1Current
let player2Current
let waiting
let win

let sinkPlayer1Ship
let sinkPlayer2Ship


//Event listener mouseleave
setupGrids.forEach(setupGrid =>{
    setupGrid.addEventListener('mouseleave', () =>{
        clearPreviews()
    })
})
function clearPreviews(){
    player1SetupTiles.forEach(tile =>{
        tile.classList.remove('ship')
    })
    player2SetupTiles.forEach(tile =>{
        tile.classList.remove('ship')
    })
}

//Eventlistener remove 1
removeBtn1.addEventListener('click', () =>{
    player1ShipTiles.forEach(player1ShipTile =>{
        latestShipTiles.forEach(latestShipTile =>{
            if(player1ShipTile.innerHTML == latestShipTile){
                player1ShipTiles[player1ShipTiles.indexOf(player1ShipTile)] = 'removed'
            }
        })
    })
    if(placedCount > 0){
        placedCount--
    }
    player1SetupTiles.forEach(setupTile =>{
        latestShipTiles.forEach(latestShipTile =>{
            if(latestShipTile == setupTile.innerHTML){
                setupTile.className = ''
                setupTile.classList.add('tile')
            }
        })
    })
    shipBtns1.forEach(shipBtn =>{
        shipBtn.classList.remove('clicked')
        if(shipBtn.className == ''){
            shipBtn.classList.add('default-ship-btn')
        }
        if(shipBtn.innerHTML == latestShipBtn){
            shipBtn.classList.remove('placed')
            shipBtn.classList.add('default-ship-btn')
        }
        resetAfterPlaced()
        confirm1.classList.remove('ready')
        confirm1.classList.add('default-start-btn')
    }) 
})

//Event listener remove 2
removeBtn2.addEventListener('click', () =>{
    player2ShipTiles.forEach(player1ShipTile =>{
        latestShipTiles.forEach(latestShipTile =>{
            if(player1ShipTile.innerHTML == latestShipTile){
                player2ShipTiles[player2ShipTiles.indexOf(player1ShipTile)] = 'removed'
            }
        })
    })
    if(placedCount > 0){
        placedCount--
    }
    player2SetupTiles.forEach(setupTile =>{
        latestShipTiles.forEach(latestShipTile =>{
            if(latestShipTile == setupTile.innerHTML){
                setupTile.className = ''
                setupTile.classList.add('tile')
            }
        })
    })
    shipBtns2.forEach(shipBtn =>{
        shipBtn.classList.remove('clicked')
        if(shipBtn.className == ''){
            shipBtn.classList.add('default-ship-btn')
        }
        if(shipBtn.innerHTML == latestShipBtn){
            shipBtn.classList.remove('placed')
            shipBtn.classList.add('default-ship-btn')
        }
        resetAfterPlaced()
        confirm2.classList.remove('ready')
        confirm2.classList.add('default-start-btn')
    }) 
})

//Event listener Clear 1
clearBtn1.addEventListener('click', () =>{
    player1ShipTiles = ['blank']
    latestShipTiles = []
    previewTiles = []
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
    shipBtns1.forEach(shipBtn =>{
        shipBtn.className = 'default-ship-btn'
    })

    //Setup Tile Classes
    player1SetupTiles.forEach(setupTile =>{
        setupTile.className = ''
        setupTile.classList.add('tile')
    })

    //Startgame btn class
    confirm1.className = 'default-start-btn'
})

//Event listener Clear 2
clearBtn2.addEventListener('click', () =>{
    player2ShipTiles = ['blank']
    latestShipTiles = []
    previewTiles = []
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
    shipBtns2.forEach(shipBtn =>{
        shipBtn.className = 'default-ship-btn'
    })

    //Setup Tile Classes
    player2SetupTiles.forEach(setupTile =>{
        setupTile.className = ''
        setupTile.classList.add('tile')
    })

    //Startgame btn class
    confirm2.className = 'default-start-btn'
})

//Event listener Rotate 1
rotateBtn1.addEventListener('click', () =>{
    isVertical = isVertical !== true
})

//Event listener Rotate 2
rotateBtn2.addEventListener('click', () =>{
    isVertical = isVertical !== true
})

//Event listener Confirm 1
confirm1.addEventListener('click', () =>{
    if(confirm1.classList.contains('ready')){
        setupContainer1.classList.add('invisible')
        waitingConf1.classList.remove('invisible')
        destroyerPlayer1 = document.querySelectorAll('.destroyer-1')
        submarinePlayer1 = document.querySelectorAll('.submarine-1')
        cruiserPlayer1 = document.querySelectorAll('.cruiser-1')
        battleshipPlayer1 = document.querySelectorAll('.battleship-1')
        carrierPlayer1 = document.querySelectorAll('.carrier-1')
        placedCount = 0
    }
})
continue1.addEventListener('click', () =>{
    continue1.classList.add('hover')
    setTimeout(() => {
        continue1.classList.add('animate__animated', 'animate__bounceOutUp')
    }, 900);
    setTimeout(() => {
        setupContainer2.classList.remove('invisible')
        waitingConf1.classList.add('invisible')
    }, 1600);
})

//Event listener Confirm 2
confirm2.addEventListener('click', () =>{
    if(confirm2.classList.contains('ready')){
        waitingConf2.classList.remove('invisible')
        setupContainer2.classList.add('invisible')
        destroyerPlayer2 = document.querySelectorAll('.destroyer-2')
        submarinePlayer2 = document.querySelectorAll('.submarine-2')
        cruiserPlayer2 = document.querySelectorAll('.cruiser-2')
        battleshipPlayer2 = document.querySelectorAll('.battleship-2')
        carrierPlayer2 = document.querySelectorAll('.carrier-2')
        startGame()
    }
})
continue2.addEventListener('click', () =>{
    continue2.classList.add('hover')
    setTimeout(() => {
        continue2.classList.add('animate__animated', 'animate__bounceOutUp')
    }, 900);
    setTimeout(() => {
        battleContainer.classList.remove('invisible')
        waitingConf2.classList.add('invisible')
    }, 1600);
})
//EVENTLISTENER ON SHIP BTN
document.addEventListener('click', (e) =>{
    isShipBtn = e.target.matches('[data-ship-btn]')
    console.log(isShipBtn)
    if(isShipBtn && !e.target.classList.contains('placed')){
        shipBtns1.forEach(shipBtn =>{
            shipBtn.classList.remove('clicked')
            if(shipBtn.className == ''){
                shipBtn.classList.add('default-ship-btn')
            }
        })
        shipBtns2.forEach(shipBtn =>{
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

//EVENTLISTENER ON TILE MOUSEOVER Player 1
player1SetupTiles.forEach(tile =>{
    tile.addEventListener('mouseover', (TileIndex, LetterCoordIndex, NumberCoordIndex) => {
        //REMOVE CLASS FROM EACH TILE
        player1SetupTiles.forEach(tile => {
            tile.classList.remove('ship')
        })
        overlapCount = 0

        //GET TILE INDEX IN ARRAY
        for(let i = 0; i <= player1SetupTiles.length; i++){
            if(tile == player1SetupTiles[i]){
                TileIndex = i    
                previewTiles = []
            }
        }
        //GET PREVIEW TILES --- Horizontal
        if(!isVertical){
            for(let i=0; i<shipLength;i++){
                previewTiles.push(player1SetupTiles[TileIndex+i].innerHTML)
            }
        }
        
        //GET PREVIEW TILES --- Vertical
        if(isVertical){
            for(let i=0; i<shipLength*10;i =i+10){
                previewTiles.push(player1SetupTiles[TileIndex+i].innerHTML)
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
        player1ShipTiles.forEach(playerTile =>{
            previewTiles.forEach(previewTile =>{
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
        player1ShipTiles.forEach(playerTile =>{
            previewTiles.forEach(previewTile =>{
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
                player1SetupTiles[TileIndex + i].classList.add('ship')
            }
            }
        }

        //ADD CLASS TO EACH SHIP TILE --- Vertical
        if(isClicked && isVertical && isValid){
            if(!isOverlapping){
            for(let i = 0; i < shipLength * 10; i = i + 10){
                player1SetupTiles[TileIndex + i].classList.add('ship')
            }
            }
        }

    })
})

//EVENTLISTENER ON TILE MOUSEOVER Player 2
player2SetupTiles.forEach(tile =>{
    tile.addEventListener('mouseover', (TileIndex, LetterCoordIndex, NumberCoordIndex) => {
        //REMOVE CLASS FROM EACH TILE
        player2SetupTiles.forEach(tile => {
            tile.classList.remove('ship')
        })
        overlapCount = 0

        //GET TILE INDEX IN ARRAY
        for(let i = 0; i <= player2SetupTiles.length; i++){
            if(tile == player2SetupTiles[i]){
                TileIndex = i    
                previewTiles = []
            }
        }
        //GET PREVIEW TILES --- Horizontal
        if(!isVertical){
            for(let i=0; i<shipLength;i++){
                previewTiles.push(player2SetupTiles[TileIndex+i].innerHTML)
            }
        }
        
        //GET PREVIEW TILES --- Vertical
        if(isVertical){
            for(let i=0; i<shipLength*10;i =i+10){
                previewTiles.push(player2SetupTiles[TileIndex+i].innerHTML)
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
        player2ShipTiles.forEach(playerTile =>{
            previewTiles.forEach(previewTile =>{
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
        player2ShipTiles.forEach(playerTile =>{
            previewTiles.forEach(previewTile =>{
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
                player2SetupTiles[TileIndex + i].classList.add('ship')
            }
            }
        }

        //ADD CLASS TO EACH SHIP TILE --- Vertical
        if(isClicked && isVertical && isValid){
            if(!isOverlapping){
            for(let i = 0; i < shipLength * 10; i = i + 10){
                player2SetupTiles[TileIndex + i].classList.add('ship')
            }
            }
        }

    })
})

//EVENTLISTENER ON TILE CLICK
player1SetupTiles.forEach(tile =>{
    tile.addEventListener('click', () =>{
        latestShipTiles = []
        if(isValid && !isOverlapping){
            playClick()
            latestShipBtn = shipName
            document.querySelectorAll('.ship').forEach(shipTile =>{
                player1ShipTiles.push(shipTile)
                latestShipTiles.push(shipTile.innerHTML)
                shipTile.classList.add('shipClicked')
                switch (shipName) {
                    case "Destroyer":
                        for(let i = 0; i<shipLength; i++){
                            document.querySelectorAll('.ship').forEach(shipTile =>{
                                shipTile.classList.add('destroyer-1')
                            })
                        }
                        break;
                    case "Submarine":
                        for(let i = 0; i<shipLength; i++){
                            document.querySelectorAll('.ship').forEach(shipTile =>{
                                shipTile.classList.add('submarine-1')
                            })
                        }
                        break;
                    case "Cruiser":
                        for(let i = 0; i<shipLength; i++){
                            document.querySelectorAll('.ship').forEach(shipTile =>{
                                shipTile.classList.add('cruiser-1')
                            })
                        }
                        break;
                    case "Battleship":
                        for(let i = 0; i<shipLength; i++){
                            document.querySelectorAll('.ship').forEach(shipTile =>{
                                shipTile.classList.add('battleship-1')
                            })
                        }
                        break;
                    case "Carrier":
                        for(let i = 0; i<shipLength; i++){
                            document.querySelectorAll('.ship').forEach(shipTile =>{
                                shipTile.classList.add('carrier-1')
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
                confirm1.classList.add('ready')
                confirm1.classList.remove('default-start-btn')
            }
            document.querySelector('.clicked').classList.add('placed')
            document.querySelector('.clicked').classList.remove('clicked')
        }

    })
})

//EVENTLISTENER ON TILE CLICK
player2SetupTiles.forEach(tile =>{
    tile.addEventListener('click', () =>{
        playClick()
        latestShipTiles = []
        if(isValid && !isOverlapping){
            latestShipBtn = shipName
            document.querySelectorAll('.ship').forEach(shipTile =>{
                player2ShipTiles.push(shipTile)
                latestShipTiles.push(shipTile.innerHTML)
                shipTile.classList.add('shipClicked')
                switch (shipName) {
                    case "Destroyer":
                        for(let i = 0; i<shipLength; i++){
                            document.querySelectorAll('.ship').forEach(shipTile =>{
                                shipTile.classList.add('destroyer-2')
                            })
                        }
                        break;
                    case "Submarine":
                        for(let i = 0; i<shipLength; i++){
                            document.querySelectorAll('.ship').forEach(shipTile =>{
                                shipTile.classList.add('submarine-2')
                            })
                        }
                        break;
                    case "Cruiser":
                        for(let i = 0; i<shipLength; i++){
                            document.querySelectorAll('.ship').forEach(shipTile =>{
                                shipTile.classList.add('cruiser-2')
                            })
                        }
                        break;
                    case "Battleship":
                        for(let i = 0; i<shipLength; i++){
                            document.querySelectorAll('.ship').forEach(shipTile =>{
                                shipTile.classList.add('battleship-2')
                            })
                        }
                        break;
                    case "Carrier":
                        for(let i = 0; i<shipLength; i++){
                            document.querySelectorAll('.ship').forEach(shipTile =>{
                                shipTile.classList.add('carrier-2')
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
                confirm2.classList.add('ready')
                confirm2.classList.remove('default-start-btn')
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
    leftTiles.forEach(leftTile =>{
        destroyerPlayer1.forEach(shipTile =>{
            if(shipTile.innerHTML == leftTile.innerHTML){
                leftTile.classList.add('player1Destroyer')
                leftTile.classList.add('ship1')
            }
        })
    })
    leftTiles.forEach(leftTile =>{
        submarinePlayer1.forEach(shipTile =>{
            if(shipTile.innerHTML == leftTile.innerHTML){
                leftTile.classList.add('ship1')
                leftTile.classList.add('player1Submarine')
            }
        })
    })
    leftTiles.forEach(leftTile =>{
        cruiserPlayer1.forEach(shipTile =>{
            if(shipTile.innerHTML == leftTile.innerHTML){
                leftTile.classList.add('ship1')
                leftTile.classList.add('player1Cruiser')
            }
        })
    })
    leftTiles.forEach(leftTile =>{
        battleshipPlayer1.forEach(shipTile =>{
            if(shipTile.innerHTML == leftTile.innerHTML){
                leftTile.classList.add('ship1')
                leftTile.classList.add('player1Battleship')
            }
        })
    })
    leftTiles.forEach(leftTile =>{
        carrierPlayer1.forEach(shipTile =>{
            if(shipTile.innerHTML == leftTile.innerHTML){
                leftTile.classList.add('ship1')
                leftTile.classList.add('player1Carrier')
            }
        })
    })
    destroyerPlayer1 = document.querySelectorAll('.player1Destroyer')
    submarinePlayer1 = document.querySelectorAll('.player1Submarine')
    cruiserPlayer1 = document.querySelectorAll('.player1Cruiser')
    battleshipPlayer1 = document.querySelectorAll('.player1Battleship')
    carrierPlayer1 = document.querySelectorAll('.player1Carrier')
    player1ShipTiles = document.querySelectorAll('.ship1')

    rightTiles.forEach(leftTile =>{
        destroyerPlayer2.forEach(shipTile =>{
            if(shipTile.innerHTML == leftTile.innerHTML){
                leftTile.classList.add('player2Destroyer')
                leftTile.classList.add('ship2')
            }
        })
    })
    rightTiles.forEach(leftTile =>{
        submarinePlayer2.forEach(shipTile =>{
            if(shipTile.innerHTML == leftTile.innerHTML){
                leftTile.classList.add('player2Submarine')
                leftTile.classList.add('ship2')
            }
        })
    })
    rightTiles.forEach(leftTile =>{
        cruiserPlayer2.forEach(shipTile =>{
            if(shipTile.innerHTML == leftTile.innerHTML){
                leftTile.classList.add('player2Cruiser')
                leftTile.classList.add('ship2')
            }
        })
    })
    rightTiles.forEach(leftTile =>{
        battleshipPlayer2.forEach(shipTile =>{
            if(shipTile.innerHTML == leftTile.innerHTML){
                leftTile.classList.add('player2Battleship')
                leftTile.classList.add('ship2')
            }
        })
    })
    rightTiles.forEach(leftTile =>{
        carrierPlayer2.forEach(shipTile =>{
            if(shipTile.innerHTML == leftTile.innerHTML){
                leftTile.classList.add('player2Carrier')
                leftTile.classList.add('ship2')
            }
        })
    })
    destroyerPlayer2 = document.querySelectorAll('.player2Destroyer')
    submarinePlayer2 = document.querySelectorAll('.player2Submarine')
    cruiserPlayer2 = document.querySelectorAll('.player2Cruiser')
    battleshipPlayer2 = document.querySelectorAll('.player2Battleship')
    carrierPlayer2 = document.querySelectorAll('.player2Carrier')
    player2ShipTiles = document.querySelectorAll('.ship2')

    player1PrevClicked = ['blank']
    player2PrevClicked = ['blank']
    player1ShipSinkCount = 0
    player2ShipSinkCount = 0
    player1Turn = true
    waiting = false
    win = false
    document.body.classList.add('player1')
}


//BATTLE
rightTiles.forEach(rightTile =>{
    rightTile.addEventListener('click', (e) =>{
        if(!waiting && player1Turn){
            isWaste = false
            waiting = true
        if(player1Turn){
            player1PrevClicked.forEach(player1PrevClickedTile =>{
                if(e.target.innerHTML == player1PrevClickedTile){
                    //alert not valid
                    isWaste = true
                    waiting = false
                }
            })
        }
        if(player1Turn && !isWaste){
            player1Current = e.target.innerHTML
            player1PrevClicked.push(player1Current)
            e.target.classList.add('bomb')
            checkHit()
        }
    }
    })
})

leftTiles.forEach(leftTile =>{
    leftTile.addEventListener('click', (e) =>{
        if(!waiting && !player1Turn){
            isWaste = false
            waiting = true
        if(!player1Turn){
            player2PrevClicked.forEach(player2PrevClickedTile =>{
                if(e.target.innerHTML == player2PrevClickedTile){
                    //alert not valid
                    isWaste = true
                    waiting = false
                }
            })
        }
        if(!player1Turn && !isWaste){
            player2Current = e.target.innerHTML
            player2PrevClicked.push(player2Current)
            e.target.classList.add('bomb')
            checkHit()
        }
    }
    })
})

function checkHit(){
    if(player1Turn){
        player2ShipTiles.forEach(player2ShipTile =>{
            if(player1Current == player2ShipTile.innerHTML){
                player2ShipTile.classList.add('tileSink')
                player2ShipTile.classList.remove('bomb')
                checkSink()
            }
        })
        setTimeout(() => {
            if(!win){
                switchTurn()
            }
        }, 1000);
    }
    if(!player1Turn){
        player1ShipTiles.forEach(player1ShipTile =>{
            if(player2Current == player1ShipTile.innerHTML){
                player1ShipTile.classList.add('tileSink')
                player1ShipTile.classList.remove('bomb')
                checkSink()
            }
        })
        setTimeout(() => {
            if(!win){
                switchTurn()
            }
        }, 1000);
    }
}

function checkSink(){
    if(player1Turn){
        sinkPlayer2Ship = false
        destroyerPlayer2Sink()
        submarinePlayer2Sink()
        cruiserPlayer2Sink()
        battleshipPlayer2Sink()
        carrierPlayer2Sink()
        if(sinkPlayer2Ship){
            playMusic()
            checkWin()
        }
    }
    if(!player1Turn){
        sinkPlayer1Ship = false
        destroyerPlayer1Sink()
        submarinePlayer1Sink()
        cruiserPlayer1Sink()
        battleshipPlayer1Sink()
        carrierPlayer1Sink()
        if(sinkPlayer1Ship){
            playMusic()
            checkWin()
        }
    }
}

function checkWin(){
    if(player1ShipSinkCount == 5){
        messageBox.innerHTML = 'Player-2 Wins'
        popupFunction()
    }
    if(player2ShipSinkCount == 5){
        messageBox.innerHTML = 'Player-1 Wins'
        popupFunction()
    }
}
function popupFunction(){
    middle.classList.add('background')
    middle.classList.remove('invisible')
    win = true
}
//Switch turns
function switchTurn(){
    if(document.body.className.includes('player1')){
        document.body.className = 'player2'
    }else{
        document.body.className = 'player1'
    }
    if(player1Turn){
        player1Turn = false
    }else{
        player1Turn = true
    }
    waitingBattle.classList.remove('invisible')
    battleContainer.classList.add('invisible')
    isWaste = false
    waiting = false
}

continueBattle.addEventListener('click', () =>{
    continueBattle.classList.add('hover')
    setTimeout(() => {
        continueBattle.classList.add('animate__animated','animate__bounceOutUp')
    }, 900);
    setTimeout(() => {
        battleContainer.classList.remove('invisible')
        waitingBattle.classList.add('invisible')
        continueBattle.classList.remove('animate__animated','animate__bounceOutUp')
        continueBattle.classList.remove('hover')
    }, 1600);
})






function destroyerPlayer1Sink(belongsToShip, count, currentShipSink){
    count = 0
    belongsToShip = false
    currentShipSink = false
    destroyerPlayer1.forEach(destroyerTile =>{
        if(destroyerTile.classList.contains('tileSink')){
            count++
        }
        if(destroyerTile.innerHTML == player2Current){
            belongsToShip = true
        }
    })
    if(belongsToShip && count == destroyerPlayer1.length){
        sinkPlayer1Ship = true
        currentShipSink = true
    }
    if(currentShipSink){
        destroyerPlayer1.forEach(destroyerTile =>{
            destroyerTile.classList.add('shipSink')
            destroyerTile.classList.remove('tileSink')
        })
        player1ShipSinkCount++
    }
}
function submarinePlayer1Sink(belongsToShip, count, currentShipSink){
    count = 0
    belongsToShip = false
    currentShipSink = false
    submarinePlayer1.forEach(submarineTile =>{
        if(submarineTile.classList.contains('tileSink')){
            count++
        }
        if(submarineTile.innerHTML == player2Current){
            belongsToShip = true
        }
    })
    if(belongsToShip && count == submarinePlayer1.length){
        sinkPlayer1Ship = true
        currentShipSink = true
    }
    if(currentShipSink){
        submarinePlayer1.forEach(submarineTile =>{
            submarineTile.classList.add('shipSink')
            submarineTile.classList.remove('tileSink')
        })
        player1ShipSinkCount++
    }
}
function cruiserPlayer1Sink(belongsToShip, count, currentShipSink){
    count = 0
    belongsToShip = false
    currentShipSink = false
    cruiserPlayer1.forEach(cruiserTile =>{
        if(cruiserTile.classList.contains('tileSink')){
            count++
        }
        if(cruiserTile.innerHTML == player2Current){
            belongsToShip = true
        }
    })
    if(belongsToShip && count == cruiserPlayer1.length){
        sinkPlayer1Ship = true
        currentShipSink = true
    }
    if(currentShipSink){
        cruiserPlayer1.forEach(cruiserTile =>{
            cruiserTile.classList.add('shipSink')
            cruiserTile.classList.remove('tileSink')
        })
        player1ShipSinkCount++
    }
}
function battleshipPlayer1Sink(belongsToShip, count, currentShipSink){
    count = 0
    belongsToShip = false
    currentShipSink = false
    battleshipPlayer1.forEach(battleshipTile =>{
        if(battleshipTile.classList.contains('tileSink')){
            count++
        }
        if(battleshipTile.innerHTML == player2Current){
            belongsToShip = true
        }
    })
    if(belongsToShip && count == battleshipPlayer1.length){
        sinkPlayer1Ship = true
        currentShipSink = true
    }
    if(currentShipSink){
        battleshipPlayer1.forEach(battleshipTile =>{
            battleshipTile.classList.add('shipSink')
            battleshipTile.classList.remove('tileSink')
        })
        player1ShipSinkCount++
    }
}
function carrierPlayer1Sink(belongsToShip, count, currentShipSink){
    count = 0
    belongsToShip = false
    currentShipSink = false
    carrierPlayer1.forEach(carrierTile =>{
        if(carrierTile.classList.contains('tileSink')){
            count++
        }
        if(carrierTile.innerHTML == player2Current){
            belongsToShip = true
        }
    })
    if(belongsToShip && count == carrierPlayer1.length){
        sinkPlayer1Ship = true
        currentShipSink = true
    }
    if(currentShipSink){
        carrierPlayer1.forEach(carrierTile =>{
            carrierTile.classList.add('shipSink')
            carrierTile.classList.remove('tileSink')
        })
        player1ShipSinkCount++
    }
}

function destroyerPlayer2Sink(belongsToShip, count, currentShipSink){
    count = 0
    belongsToShip = false
    currentShipSink = false
    console.log(destroyerPlayer2)
    destroyerPlayer2.forEach(destroyerTile =>{
        if(destroyerTile.classList.contains('tileSink')){
            count++
        }
        if(destroyerTile.innerHTML == player1Current){
            belongsToShip = true
        }
    })
    if(belongsToShip && count == destroyerPlayer2.length){
        sinkPlayer2Ship = true
        currentShipSink = true
    }
    if(currentShipSink){
        destroyerPlayer2.forEach(destroyerTile =>{
            destroyerTile.classList.add('shipSink')
            destroyerTile.classList.remove('tileSink')
        })
        player2ShipSinkCount++
    }
}
function submarinePlayer2Sink(belongsToShip, count, currentShipSink){
    count = 0
    belongsToShip = false
    currentShipSink = false
    submarinePlayer2.forEach(submarineTile =>{
        if(submarineTile.classList.contains('tileSink')){
            count++
        }
        if(submarineTile.innerHTML == player1Current){
            belongsToShip = true
        }
    })
    if(belongsToShip && count == submarinePlayer2.length){
        sinkPlayer2Ship = true
        currentShipSink = true
    }
    if(currentShipSink){
        submarinePlayer2.forEach(submarineTile =>{
            submarineTile.classList.add('shipSink')
            submarineTile.classList.remove('tileSink')
        })
        player2ShipSinkCount++
    }
}
function cruiserPlayer2Sink(belongsToShip, count, currentShipSink){
    count = 0
    belongsToShip = false
    currentShipSink = false
    cruiserPlayer2.forEach(cruiserTile =>{
        if(cruiserTile.classList.contains('tileSink')){
            count++
        }
        if(cruiserTile.innerHTML == player1Current){
            belongsToShip = true
        }
    })
    if(belongsToShip && count == cruiserPlayer2.length){
        sinkPlayer2Ship = true
        currentShipSink = true
    }
    if(currentShipSink){
        cruiserPlayer2.forEach(cruiserTile =>{
            cruiserTile.classList.add('shipSink')
            cruiserTile.classList.remove('tileSink')
        })
        player2ShipSinkCount++
    }
}
function battleshipPlayer2Sink(belongsToShip, count, currentShipSink){
    count = 0
    belongsToShip = false
    currentShipSink = false
    battleshipPlayer2.forEach(battleshipTile =>{
        if(battleshipTile.classList.contains('tileSink')){
            count++
        }
        if(battleshipTile.innerHTML == player1Current){
            belongsToShip = true
        }
    })
    if(belongsToShip && count == battleshipPlayer2.length){
        sinkPlayer2Ship = true
        currentShipSink = true
    }
    if(currentShipSink){
        battleshipPlayer2.forEach(battleshipTile =>{
            battleshipTile.classList.add('shipSink')
            battleshipTile.classList.remove('tileSink')
        })
        player2ShipSinkCount++
    }
}
function carrierPlayer2Sink(belongsToShip, count, currentShipSink){
    count = 0
    belongsToShip = false
    currentShipSink = false
    carrierPlayer2.forEach(carrierTile =>{
        if(carrierTile.classList.contains('tileSink')){
            count++
        }
        if(carrierTile.innerHTML == player1Current){
            belongsToShip = true
        }
    })
    if(belongsToShip && count == carrierPlayer2.length){
        sinkPlayer2Ship = true
        currentShipSink = true
    }
    if(currentShipSink){
        carrierPlayer2.forEach(carrierTile =>{
            carrierTile.classList.add('shipSink')
            carrierTile.classList.remove('tileSink')
        })
        player2ShipSinkCount++
    }
}

function playMusic(){
    var audio = new Audio('./stuff/audio.wav')
    audio.play()
}
function playClick(){
    var audio = new Audio('./stuff/click.wav')
    audio.play()
}
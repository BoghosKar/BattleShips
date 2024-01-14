import {RightTiles, LetterCoordinates, NumberCoordinates} from "./main.js"
let OpponentShipTiles = []
let OpponentDestroyerTiles = []
let DestroyerPossibleMoves = []
let OpponentSubmarineTiles = []
let SubmarinePossibleMoves = []
let OpponentCruiserTiles = []
let CruiserPossibleMoves = []
let OpponentBattleshipTiles = []
let BattleshipPossibleMoves = []
let OpponentCarrierTiles = []
let CarrierPossibleMoves = []

///////////////
///DESTROYER///
///////////////
 function destroyerGenerator(destroyerLetter, destroyerNumber, destroyerTile, nextMove){

    //GENERATE RANDOM STARTING TILE
    destroyerLetter = Math.floor(Math.random()*10+1)
    destroyerNumber = Math.floor(Math.random()*10+1)
    destroyerTile = LetterCoordinates[destroyerLetter] + NumberCoordinates[destroyerNumber]
    OpponentDestroyerTiles.push(destroyerTile)
    
    //check next possible tiles
    
    //NORTH
    if(destroyerNumber - 1 > 0){
        DestroyerPossibleMoves.push('north')
    }
    //EAST
    if(destroyerLetter + 1 <= 10){
        DestroyerPossibleMoves.push('east')
    }
    //SOUTH
    if(destroyerNumber + 1 <= 10){
        DestroyerPossibleMoves.push('south')
    }
    //WEST
    if(destroyerLetter - 1 > 0){
        DestroyerPossibleMoves.push('west')
    }

    //GENERATE NEXT MOVE DIRECTION
    nextMove = Math.floor(Math.random()*DestroyerPossibleMoves.length)

    //GO TO GENERATED DIRECTION
    switch (DestroyerPossibleMoves[nextMove]) {
        case 'north':
            //north
            OpponentDestroyerTiles.push(LetterCoordinates[destroyerLetter] + NumberCoordinates[destroyerNumber-1])
            break;
        case 'east':
            //east
            OpponentDestroyerTiles.push(LetterCoordinates[destroyerLetter+1] + NumberCoordinates[destroyerNumber])
            break;
        case 'south':
            //south
            OpponentDestroyerTiles.push(LetterCoordinates[destroyerLetter] + NumberCoordinates[destroyerNumber+1])
            break;
        case 'west':
            //west
            OpponentDestroyerTiles.push(LetterCoordinates[destroyerLetter-1] + NumberCoordinates[destroyerNumber])
        default:
            break;
    }

    //ADD CLASSLIST
    RightTiles.forEach(e =>{
        for(let i=0; i < OpponentDestroyerTiles.length; i++){
            if(e.innerHTML == OpponentDestroyerTiles[i]){
                e.classList.add('destroyerOpp', 'shipOpp')
                OpponentShipTiles.push(e.innerHTML)
            }    
        }
    })
}

///////////////
///SUBMARINE///
///////////////
 function submarineGenerator(submarineLetter, submarineNumber, submarineTile, nextMove){
    OpponentSubmarineTiles = []
    SubmarinePossibleMoves = []
    //GENERATE RANDOM STARTING TILE
    submarineLetter = Math.floor(Math.random()*10+1)
    submarineNumber = Math.floor(Math.random()*10+1)
    submarineTile = LetterCoordinates[submarineLetter] + NumberCoordinates[submarineNumber]
    OpponentSubmarineTiles.push(submarineTile)
    
    //check next possible tiles
    
    //NORTH
    if(submarineNumber - 2 > 0){
        SubmarinePossibleMoves.push('north')
    }
    //EAST
    if(submarineLetter + 2 <= 10){
        SubmarinePossibleMoves.push('east')
    }
    //SOUTH
    if(submarineNumber + 2 <= 10){
        SubmarinePossibleMoves.push('south')
    }
    //WEST
    if(submarineLetter - 2 > 0){
        SubmarinePossibleMoves.push('west')
    }

    //GENERATE NEXT MOVE DIRECTION
    nextMove = Math.floor(Math.random()*SubmarinePossibleMoves.length)

    //GO TO GENERATED DIRECTION
    switch (SubmarinePossibleMoves[nextMove]) {
        case 'north':
            //north
            for(let i=1; i<3; i++){
                OpponentSubmarineTiles.push(LetterCoordinates[submarineLetter] + NumberCoordinates[submarineNumber-i])
            }
            break;
        case 'east':
            //east
            for(let i=1; i<3; i++){
                OpponentSubmarineTiles.push(LetterCoordinates[submarineLetter+i] + NumberCoordinates[submarineNumber])
            }
            break;
        case 'south':
            //south
            for(let i=1; i<3; i++){
                OpponentSubmarineTiles.push(LetterCoordinates[submarineLetter] + NumberCoordinates[submarineNumber+i])
            }
            break;
        case 'west':
            //west
            for(let i=1; i<3; i++){
                OpponentSubmarineTiles.push(LetterCoordinates[submarineLetter-i] + NumberCoordinates[submarineNumber])
            }
        default:
            break;
    }

    //CHECK IF OVERLAP WITH DESTROYER
    OpponentDestroyerTiles.forEach(e =>{
        for( let i=0; i<OpponentSubmarineTiles.length; i++){
            if(e === OpponentSubmarineTiles[i]){
                submarineGenerator()
                return
            }
        }
    })
    //ADD CLASSLIST
    RightTiles.forEach(e =>{
        for(let i=0; i<OpponentSubmarineTiles.length; i++){
            if(e.innerHTML === OpponentSubmarineTiles[i]){
                e.classList.add('submarineOpp', 'shipOpp')
                OpponentShipTiles.push(e.innerHTML)
            }            
        }
    })
}

/////////////
///CRUISER///
/////////////
 function cruiserGenerator(cruiserLetter, cruiserNumber, cruiserTile, nextMove){
    OpponentCruiserTiles = []
    CruiserPossibleMoves = []
    //GENERATE RANDOM STARTING TILE
    cruiserLetter = Math.floor(Math.random()*10+1)
    cruiserNumber = Math.floor(Math.random()*10+1)
    cruiserTile = LetterCoordinates[cruiserLetter] + NumberCoordinates[cruiserNumber]
    OpponentCruiserTiles.push(cruiserTile)

    //check next possible tiles

    //NORTH
    if(cruiserNumber - 2 > 0){
        CruiserPossibleMoves.push('north')
    }
    //EAST
    if(cruiserLetter + 2 <= 10){
        CruiserPossibleMoves.push('east')
    }
    //SOUTH
    if(cruiserNumber + 2 <= 10){
        CruiserPossibleMoves.push('south')
    }
    //WEST
    if(cruiserLetter - 2 > 0){
        CruiserPossibleMoves.push('west')
    }

    //GENERATE NEXT MOVE DIRECTION
    nextMove = Math.floor(Math.random()*CruiserPossibleMoves.length)

    //GO TO GENERATED DIRECTION
    switch (CruiserPossibleMoves[nextMove]) {
        case 'north':
            //north
            for(let i=1; i<3; i++){
                OpponentCruiserTiles.push(LetterCoordinates[cruiserLetter] + NumberCoordinates[cruiserNumber-i])
            }
            break;
        case 'east':
            //east
            for(let i=1; i<3; i++){
                OpponentCruiserTiles.push(LetterCoordinates[cruiserLetter+i] + NumberCoordinates[cruiserNumber])
            }
            break;
        case 'south':
            //south
            for(let i=1; i<3; i++){
                OpponentCruiserTiles.push(LetterCoordinates[cruiserLetter] + NumberCoordinates[cruiserNumber+i])
            }
            break;
        case 'west':
            //west
            for(let i=1; i<3; i++){
                OpponentCruiserTiles.push(LetterCoordinates[cruiserLetter-i] + NumberCoordinates[cruiserNumber])
            }
        default:
            break;
    }
    //CHECK IF OVERLAP WITH DESTROYER
    OpponentDestroyerTiles.forEach(e =>{
        for(let i=0; i<OpponentCruiserTiles.length; i++){
            if(e === OpponentCruiserTiles[i]){
                cruiserGenerator()
                return
            }
        }
    })
    //CHECK IF OVERLAP WITH SUBMARINE
    OpponentSubmarineTiles.forEach(e =>{
        for(let i=0; i<OpponentCruiserTiles.length; i++){
            if(e === OpponentCruiserTiles[i]){
                cruiserGenerator()
                return
            }
        }
    })
    //ADD CLASSLIST
    RightTiles.forEach(e =>{
        for(let i=0; i<OpponentCruiserTiles.length; i++){
            if(e.innerHTML === OpponentCruiserTiles[i]){
                e.classList.add('cruiserOpp', 'shipOpp')
                OpponentShipTiles.push(e.innerHTML)
            }            
        }
    })
}

////////////////
///BATTLESHIP///
////////////////
 function battleshipGenerator(battleshipLetter, battleshipNumber, battleshipTile, nextMove){
    OpponentBattleshipTiles = []
    BattleshipPossibleMoves = []
    //GENERATE RANDOM STARTING TILE
    battleshipLetter = Math.floor(Math.random()*10+1)
    battleshipNumber = Math.floor(Math.random()*10+1)
    battleshipTile = LetterCoordinates[battleshipLetter] + NumberCoordinates[battleshipNumber]
    OpponentBattleshipTiles.push(battleshipTile)

    //check next possible tiles

    //NORTH
    if(battleshipNumber - 3 > 0){
        BattleshipPossibleMoves.push('north')
    }
    //EAST
    if(battleshipLetter + 3 <= 10){
        BattleshipPossibleMoves.push('east')
    }
    //SOUTH
    if(battleshipNumber + 3 <= 10){
        BattleshipPossibleMoves.push('south')
    }
    //WEST
    if(battleshipLetter - 3 > 0){
        BattleshipPossibleMoves.push('west')
    }

    //GENERATE NEXT MOVE DIRECTION
    nextMove = Math.floor(Math.random()*BattleshipPossibleMoves.length)
    
    //GO TO GENERATED DIRECTION
    switch (BattleshipPossibleMoves[nextMove]) {
        case 'north':
            //north
            for(let i=1; i<4; i++){
                OpponentBattleshipTiles.push(LetterCoordinates[battleshipLetter] + NumberCoordinates[battleshipNumber-i])
            }
            break;
        case 'east':
            //east
            for(let i=1; i<4; i++){
                OpponentBattleshipTiles.push(LetterCoordinates[battleshipLetter+i] + NumberCoordinates[battleshipNumber])
            }
            break;
        case 'south':
            //south
            for(let i=1; i<4; i++){
                OpponentBattleshipTiles.push(LetterCoordinates[battleshipLetter] + NumberCoordinates[battleshipNumber+i])
            }
            break;
        case 'west':
            //west
            for(let i=1; i<4; i++){
                OpponentBattleshipTiles.push(LetterCoordinates[battleshipLetter-i] + NumberCoordinates[battleshipNumber])
            }
        default:
            break;
    }
    
    //CHECK IF OVERLAP WITH DESTROYER
    OpponentDestroyerTiles.forEach(e =>{
        for(let i=0; i<OpponentBattleshipTiles.length; i++){
            if(e === OpponentBattleshipTiles[i]){
                battleshipGenerator()
                return
            }
        }
    })
    //CHECK IF OVERLAP WITH SUBMARINE
    OpponentSubmarineTiles.forEach(e =>{
        for(let i=0; i<OpponentBattleshipTiles.length; i++){
            if(e === OpponentBattleshipTiles[i]){
                battleshipGenerator()
                return
            }
        }
    })
    //CHECK IF OVERLAP WITH CRUISER
    OpponentCruiserTiles.forEach(e =>{
        for(let i=0; i<OpponentBattleshipTiles.length; i++){
            if(e === OpponentBattleshipTiles[i]){
                battleshipGenerator()
                return
            }
        }
    })
    //ADD CLASSLIST
    RightTiles.forEach(e =>{
        for(let i=0; i<OpponentBattleshipTiles.length; i++){
            if(e.innerHTML === OpponentBattleshipTiles[i]){
                e.classList.add('battleshipOpp', 'shipOpp')
                OpponentShipTiles.push(e.innerHTML)
            }            
        }
    })
}

/////////////
///CARRIER///
/////////////
 function carrierGenerator(carrierLetter, carrierNumber, carrierTile, nextMove){
    OpponentCarrierTiles = []
    CarrierPossibleMoves = []
    //GENERATE RANDOM STARTING TILE
    carrierLetter = Math.floor(Math.random()*10+1)
    carrierNumber = Math.floor(Math.random()*10+1)
    carrierTile = LetterCoordinates[carrierLetter] + NumberCoordinates[carrierNumber]
    OpponentCarrierTiles.push(carrierTile)

    //check next possible tiles

    //NORTH
    if(carrierNumber - 4 > 0){
        CarrierPossibleMoves.push('north')
    }
    //EAST
    if(carrierLetter + 4 <= 10){
        CarrierPossibleMoves.push('east')
    }
    //SOUTH
    if(carrierNumber + 4 <= 10){
        CarrierPossibleMoves.push('south')
    }
    //WEST
    if(carrierLetter - 4 > 0){
        CarrierPossibleMoves.push('west')
    }

    //GENERATE NEXT MOVE DIRECTION
    nextMove = Math.floor(Math.random()*CarrierPossibleMoves.length)
    
    //GO TO GENERATED DIRECTION
    switch (CarrierPossibleMoves[nextMove]) {
        case 'north':
            //north
            for(let i=1; i<5; i++){
                OpponentCarrierTiles.push(LetterCoordinates[carrierLetter] + NumberCoordinates[carrierNumber-i])
            }
            break;
        case 'east':
            //east
            for(let i=1; i<5; i++){
                OpponentCarrierTiles.push(LetterCoordinates[carrierLetter+i] + NumberCoordinates[carrierNumber])
            }
            break;
        case 'south':
            //south
            for(let i=1; i<5; i++){
                OpponentCarrierTiles.push(LetterCoordinates[carrierLetter] + NumberCoordinates[carrierNumber+i])
            }
            break;
        case 'west':
            //west
            for(let i=1; i<5; i++){
                OpponentCarrierTiles.push(LetterCoordinates[carrierLetter-i] + NumberCoordinates[carrierNumber])
            }
        default:
            break;
    }
    
    //CHECK IF OVERLAP WITH DESTROYER
    OpponentDestroyerTiles.forEach(e =>{
        for(let i=0; i<OpponentCarrierTiles.length; i++){
            if(e === OpponentCarrierTiles[i]){
                carrierGenerator()
                return
            }
        }
    })
    //CHECK IF OVERLAP WITH SUBMARINE
    OpponentSubmarineTiles.forEach(e =>{
        for(let i=0; i<OpponentCarrierTiles.length; i++){
            if(e === OpponentCarrierTiles[i]){
                carrierGenerator()
                return
            }
        }
    })
    //CHECK IF OVERLAP WITH CRUISER
    OpponentCruiserTiles.forEach(e =>{
        for(let i=0; i<OpponentCarrierTiles.length; i++){
            if(e === OpponentCarrierTiles[i]){
                carrierGenerator()
                return
            }
        }
    })
    //CHECK IF OVERLAP WITH BATTLESHIP
    OpponentBattleshipTiles.forEach(e =>{
        for(let i=0; i<OpponentCarrierTiles.length; i++){
            if(e === OpponentCarrierTiles[i]){
                carrierGenerator()
                return
            }
        }
    })
    //ADD CLASSLIST
    RightTiles.forEach(e =>{
        for(let i=0; i<OpponentCarrierTiles.length; i++){
            if(e.innerHTML === OpponentCarrierTiles[i]){
                e.classList.add('carrierOpp', 'shipOpp')
                OpponentShipTiles.push(e.innerHTML)
            }            
        }
    })
}

//RESET OPPONENT BOARD
 export function opponentReset(){
    RightTiles.forEach(e =>{
        e.classList.remove('shipOpp', 'hit', 'miss')
    })
    OpponentShipTiles = []
    OpponentDestroyerTiles = []
    DestroyerPossibleMoves = []
    OpponentSubmarineTiles = []
    SubmarinePossibleMoves = []
    OpponentCruiserTiles = []
    CruiserPossibleMoves = []
    OpponentBattleshipTiles = []
    BattleshipPossibleMoves = []
    OpponentCarrierTiles = []
    CarrierPossibleMoves = []
}
export function oppShipsGenerator(){

    destroyerGenerator()
    submarineGenerator()
    cruiserGenerator()
    battleshipGenerator()
    carrierGenerator()
}
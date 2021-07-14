
var gameCard = document.querySelector(".gamecard")
var scoreDOM = document.querySelector(".score")
var movesDOM = document.querySelector(".moves")
var messagesDOM = document.querySelector(".message")
var score = 0;
var moves = 0;

scoreDOM.innerHTML = 0
movesDOM.innerHTML = 0

var gameArr = [                   [1],
                                 [1,1],
                                [1,1,1],
                               [1,1,1,1],
                              [1,1,1,1,1]
]

var gameCounter = 0;
var hasEmpty = false;
var random = Math.random() * 10 | 0
gameArr.forEach(row=>{
    let divFlex = document.createElement("div")
        divFlex.className = "flex"
    row.forEach(cel=>{
            let div = document.createElement("div");
                div.className="game-tile"
                div.setAttribute('data-id',gameCounter)
                // div.innerText = gameCounter
                div.draggable = true
                if(gameCounter === random){
                    div.classList.add('empty')
                }
                else{
                    div.classList.add('filled')
                }
                divFlex.appendChild(div)
                gameCounter++
    })
    gameCard.appendChild(divFlex)
    
})


var gameTiles = document.querySelectorAll(".game-tile")


gameTiles.forEach(tile=>{
    tile.onclick=(e)=>playTile(e);
   
})


var hasChoosen = false;
let effectedIdx = []





function playTile(e){
    let startIdx = parseInt(e.target.getAttribute('data-id'));
    console.log(startIdx)
    if(!hasChoosen){

    if(startIdx === 0){
        effectedIdx=[{startIdx, dest:3,effected:1},{startIdx,dest:5,effected:2}]
    }
    if(startIdx === 1){
        effectedIdx=[{startIdx,dest:6,effected:3},{startIdx,dest:8,effected:4}]
    }
    if(startIdx === 2){
        effectedIdx=[{startIdx, dest:7,effected:4},{startIdx, dest:9,effected:5}]
    }

    if(startIdx === 3){
        effectedIdx=[{startIdx, dest:0,effected:1},{startIdx, dest:5,effected:4},{startIdx, dest:10,effected:6},{startIdx, dest:12,effected:7}]
    }
    if(startIdx === 4){
        effectedIdx=[{startIdx, dest:11,effected:7},{startIdx, dest:13,effected:8}]
    }
    if(startIdx === 5){
        effectedIdx=[{startIdx, dest:0,effected:2},{startIdx, dest:3,effected:4},{startIdx, dest:12,effected:8},{startIdx, dest:14,effected:9}]
    }
    if(startIdx === 6){
        effectedIdx=[{startIdx, dest:1,effected:3},{startIdx, dest:8,effected:7}]
    }
    if(startIdx === 7){
        effectedIdx=[{startIdx, dest:2,effected:4},{startIdx, dest:9,effected:8}]
    }
    if(startIdx === 8){
        effectedIdx=[{startIdx, dest:1,effected:7},{startIdx, dest:6,effected:7}]
    }

    if(startIdx === 9){
        effectedIdx=[{startIdx, dest:2,effected:5},{startIdx, dest:7,effected:8}]
    }
    if(startIdx === 10){
        effectedIdx=[{startIdx, dest:3,effected:6},{startIdx, dest:12,effected:11}]
    }
    if(startIdx === 11){
        effectedIdx=[{startIdx, dest:4,effected:7},{startIdx, dest:13,effected:12}]
    }
    if(startIdx === 12){
        effectedIdx=[{startIdx, dest:10,effected:11},{startIdx, dest:14,effected:13},{startIdx, dest:3,effected:7},{startIdx, dest:5,effected:18}]
    }
    if(startIdx === 13){
        effectedIdx=[{startIdx, dest:4,effected:8},{startIdx, dest:11,effected:12}]
    }
    if(startIdx === 14){
        effectedIdx=[{startIdx, dest:5,effected:9},{startIdx, dest:12,effected:13}]
    }

var isAMove = false
    effectedIdx.forEach(cel=>{
        if(gameTiles[cel.dest].classList.contains("empty")){
            isAMove = true;
            gameTiles[cel.dest].classList.add('eligible')
        }
    })

if(isAMove){
    hasChoosen = true;
}
else{
    console.log("no valid moves on that pick")
}

}



else {
    console.log('second part')
    console.log(effectedIdx)
    if(gameTiles[startIdx].classList.contains("empty")){
        effectedIdx.forEach(c=>{
            if(c.dest == startIdx){
                if(gameTiles[c.effected].classList.contains("empty")){
                    console.log("no good, cant jump an empty tile");
                    flashMessage()
                    return;
                }
                console.log("turn the middle tile black!")
                gameTiles[startIdx].classList.remove('eligible')
                gameTiles[startIdx].classList.replace("empty","filled")
                // gameTiles[startIdx].style.backgroundColor='blue'
                gameTiles[c.effected].classList.replace("filled","empty")
                gameTiles[c.startIdx].classList.replace("filled","empty")
                score+=100;
                scoreDOM.innerHTML = score;
                moves++
                movesDOM.innerHTML = moves;
                hasChoosen = false;

                gameTiles.forEach(t=>{
                    if(t.classList.contains('eligible')){
                        t.classList.remove('eligible')
                    }
                })
            }
        })


    }

  
}
}



document.querySelector(".clearmove").onclick=()=>{
    hasChoosen = false;
    effectedIdx=[]
    gameTiles.forEach(t=>{
        // if(t.classList.contains('empty')){
        //     t.style.backgroundColor='black'
        // }
        if(t.classList.contains("eligible")){
            t.classList.remove('eligible')
        }
    })
}


function flashMessage(){
    var messages=["you can't make that move","does it look like theres a peg to jump there?", "No no no, invalid choice!"]

    messagesDOM.innerHTML = messages[messages.length * Math.random() | 0]

    setTimeout(()=>{
        messagesDOM.innerHTML = ""
    },2000)
}


function recursion(n){
    if(n <= 10){
        return n * 2
    }
    return recursion(recursion(n/3))
}

// console.log(recursion(27))

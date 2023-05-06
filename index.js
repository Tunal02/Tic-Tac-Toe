const cells=document.querySelectorAll(".cell")
const statusText=document.querySelector("#status")
const restartBtn=document.querySelector("#restartBtn") 
const winCondition=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]
let options=["","","","","","","","",""]
let current='X'
let running=false
function initializeGame(){
    cells.forEach(cell=>cell.addEventListener('click',updateCell))

    restartBtn.addEventListener('click',restartGame)
    running=true
}
function updateCell(){
    const index=this.getAttribute("index")
    if(options[index]=='' || running){
    options[index]=current
    this.textContent = current
    current=current=='X'?'O':'X'

    statusText.textContent=`${current}'s turn:`


    this.removeEventListener('click',updateCell)
    }

    checkwin()

    return;
}

function checkwin(){
    for(let i=0;i<winCondition.length;i++){
        const first=options[winCondition[i][0]];
        const second=options[winCondition[i][1]];
        const third=options[winCondition[i][2]];
        if((first!=='' && first===second && second===third)){
                current=current=='X'?'O':'X'

                statusText.textContent=`${current} has won`
                cells.forEach(cell=>cell.removeEventListener('click',updateCell))

                return;
            }
        
    }
    if(!options.includes("")){
        statusText.textContent=`Draw`
        return
    }
}
function restartGame(){
    current="X"
    options=["","","","","","","","",""]
    cells.forEach(cell => {
        cell.textContent = "";
        cell.addEventListener('click', updateCell); // Reattach the event listener
    });
    statusText.textContent = `${current}'s turn:`;


}

initializeGame()

let rows, cols;
let grid = [];
let agent;
let steps = 0;
let lastInferenceSteps = 0;

let KB;

function start(){
    rows = parseInt(document.getElementById("rows").value);
    cols = parseInt(document.getElementById("cols").value);

    document.getElementById("grid").style.gridTemplateColumns = `repeat(${cols},60px)`;

    grid = [];
    KB = {
        clauses: []
    };

    steps = 0;

    for(let i=0;i<rows;i++){
        grid[i]=[];
        for(let j=0;j<cols;j++){
            grid[i][j]={
                pit:false,
                wumpus:false,
                visited:false,
                safe:false
            };
        }
    }

    placeHazards();

    agent = {x:0,y:0};
    grid[0][0].visited=true;
    grid[0][0].safe=true;

    draw();
}

function placeHazards(){
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            if((i!==0 || j!==0) && Math.random()<0.2){
                grid[i][j].pit=true;
            }
        }
    }

    let wx = Math.floor(Math.random()*rows);
    let wy = Math.floor(Math.random()*cols);

    if(wx!==0 || wy!==0)
        grid[wx][wy].wumpus=true;
}

function getNeighbors(x,y){
    let dirs=[[1,0],[-1,0],[0,1],[0,-1]];
    let res=[];
    for(let d of dirs){
        let nx=x+d[0], ny=y+d[1];
        if(nx>=0 && ny>=0 && nx<rows && ny<cols)
            res.push([nx,ny]);
    }
    return res;
}

function getPercepts(x,y){
    let breeze=false, stench=false;
    let n=getNeighbors(x,y);

    for(let [nx,ny] of n){
        if(grid[nx][ny].pit) breeze=true;
        if(grid[nx][ny].wumpus) stench=true;
    }

    return {breeze, stench};
}

function addClause(c){
    KB.clauses.push(c);
}

function inference(x,y){
    let p = getPercepts(x,y);
    let n = getNeighbors(x,y);

    if(p.breeze){
        let clause=[];
        for(let [nx,ny] of n){
            clause.push("P_"+nx+"_"+ny);
        }
        addClause(clause);
    }else{
        for(let [nx,ny] of n){
            addClause(["~P_"+nx+"_"+ny]);
            grid[nx][ny].safe=true;
        }
    }

    if(p.stench){
        let clause=[];
        for(let [nx,ny] of n){
            clause.push("W_"+nx+"_"+ny);
        }
        addClause(clause);
    }else{
        for(let [nx,ny] of n){
            addClause(["~W_"+nx+"_"+ny]);
            grid[nx][ny].safe=true;
        }
    }

    return p;
}

function resolve(ci, cj){
    let res=[];

    for(let di of ci){
        for(let dj of cj){
            if(di==="~"+dj || "~"+di===dj){
                let newC = ci.filter(x=>x!==di)
                    .concat(cj.filter(x=>x!==dj));

                res.push([...new Set(newC)]);
            }
        }
    }
    return res;
}

function ask(query){
    let clauses = KB.clauses.map(c=>[...c]);
    clauses.push(["~"+query]);

    let newClauses=[];
    let steps=0;

    while(true){
        for(let i=0;i<clauses.length;i++){
            for(let j=i+1;j<clauses.length;j++){

                let r = resolve(clauses[i], clauses[j]);
                steps++;

                for(let c of r){
                    if(c.length===0){
                        lastInferenceSteps = steps;
                        return true;
                    }
                    newClauses.push(c);
                }
            }
        }

        let size = clauses.length;
        clauses = clauses.concat(newClauses);

        if(clauses.length===size){
            lastInferenceSteps = steps;
            return false;
        }
    }
}

function isSafe(x,y){
    let pit = ask("P_"+x+"_"+y);
    let wumpus = ask("W_"+x+"_"+y);

    return (!pit && !wumpus);
}

function chooseMove(x,y){
    let n = getNeighbors(x,y);

    for(let [nx,ny] of n){
        if(!grid[nx][ny].visited && isSafe(nx,ny)){
            return [nx,ny];
        }
    }

    return null;
}

function step(){
    steps++;

    let p = inference(agent.x, agent.y);

    let move = chooseMove(agent.x, agent.y);

    if(move){
        agent.x = move[0];
        agent.y = move[1];
        grid[agent.x][agent.y].visited=true;
    }

    document.getElementById("metrics").innerText =
    "Steps: "+steps+
    " | KB Clauses: "+KB.clauses.length+
    " | Inference Steps: "+lastInferenceSteps+
    " | Breeze: "+p.breeze+
    " | Stench: "+p.stench;

    draw();
}

function draw(){
    let g=document.getElementById("grid");
    g.innerHTML="";

    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            let d=document.createElement("div");
            d.className="cell unknown";

            if(grid[i][j].safe) d.className="cell safe";
            if(grid[i][j].pit || grid[i][j].wumpus) d.className="cell danger";

            if(agent.x===i && agent.y===j)
                d.className="cell agent";

            g.appendChild(d);
        }
    }
}
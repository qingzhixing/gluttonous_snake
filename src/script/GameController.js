'use strict';
import GameCanvas from "./GameCanvas";
import {GridType} from "./GameMap";
import {Coordinate, Snake, SnakeDirection} from "./Snake";
import {msFrameTime} from "./global";

class GameController{
    constructor(_canvasContainerID,_sideGridAmount) {
        this.gameCanvas=new GameCanvas(_canvasContainerID,_sideGridAmount);
        this.gameCanvas.Init();
        this.sideGridAmount=_sideGridAmount;
        this.gameMap=[];
        for(let i=0;i < this.sideGridAmount; i++){
            this.gameMap[i]=[];
            for(let j=0;j < this.sideGridAmount; j++){
                this.gameMap[i][j]=GridType.GRID_TYPE_EMPTY;
            }
        }
    }
    Run(){
        this.pause=false;
        this.Start();
    }

    Start(){
        let snake=new Snake(new Coordinate(5,9),SnakeDirection.UP,this.sideGridAmount);
        let gameLogicInterval=null;
        let food=this.GenerateFood(snake.body);
        //绘制第一帧
        this.UpdateMap(snake.body,food);
        this.gameCanvas.DrawMap(this.gameMap);

        gameLogicInterval=setInterval(()=>{
            if(this.pause) {
                return;
            }

            let success=snake.Move();
            // snake.Grow();
            if(!success){
                setTimeout(()=>{this.GameOver();},0);
                clearInterval(gameLogicInterval);
            }
            //判断是否吃到食物
            let headCoordinate=snake.body[0];
            if(headCoordinate.row===food.row && headCoordinate.column===food.column){
                // console.log(headCoordinate,food);
                snake.Grow();
                food=this.GenerateFood(snake.body);
            }

            //绘制
            this.UpdateMap(snake.body,food);
            this.gameCanvas.DrawMap(this.gameMap);

        },msFrameTime);
        //按键检测
        document.onkeyup=(e)=>{

            if(e.key===' '){
                this.pause=!this.pause;
                console.log('paused: '+this.pause);
            }
            if(!this.pause) {
                if(e.key==='ArrowUp'||e.key === 'w'||e.key === 'W'){
                    snake.ChangeDirection(SnakeDirection.UP);
                }
                if(e.key==='ArrowDown'||e.key === 's'||e.key === 'S'){
                    snake.ChangeDirection(SnakeDirection.DOWN);
                }
                if (e.key === 'ArrowLeft'||e.key === 'a'||e.key === 'A') {
                    snake.ChangeDirection(SnakeDirection.LEFT);
                }
                if (e.key === 'ArrowRight'||e.key === 'd'||e.key === 'D') {
                    snake.ChangeDirection(SnakeDirection.RIGHT);
                }
            }

        }
    }

    UpdateMap(snakeBody, foodCoordinate){
        if(snakeBody===undefined){
            throw new Error("snakeBody is undefined");
        }

        //将尾部九个格子清空以达到消除蛇尾的效果
        let tailCoordinate=snakeBody[snakeBody.length-1];
        const columnDelta=[-1,0,1,-1,0,1,-1,0,1];
        const rowDelta=[1,1,1,0,0,0,-1,-1,-1];
        for(let direction = 0; direction <9;direction++){
            let nextColumn=tailCoordinate.column+columnDelta[direction];
            let nextRow=tailCoordinate.row+rowDelta[direction];
            //越界处理
            if(nextRow<0)nextRow +=this.sideGridAmount;
            if(nextRow>=this.sideGridAmount)nextRow -=this.sideGridAmount;
            if(nextColumn<0)nextColumn +=this.sideGridAmount;
            if(nextColumn>=this.sideGridAmount)nextColumn -=this.sideGridAmount;

            this.gameMap[nextRow][nextColumn]=GridType.GRID_TYPE_EMPTY;
        }

        //同步蛇身
        this.gameMap[snakeBody[0].row][snakeBody[0].column]=GridType.GRID_TYPE_SNAKE_HEAD;
        for(let i=1;i < snakeBody.length; i++){
            try{
                this.gameMap[snakeBody[i].row][snakeBody[i].column]=GridType.GRID_TYPE_SNAKE_BODY;
            }catch (e) {
                console.log(e);
            }
        }

        //绘制食物
        this.gameMap[foodCoordinate.row][foodCoordinate.column]=GridType.GRID_TYPE_FOOD;
    }

    ClearGameMap(){
        for(let i=0;i<this.sideGridAmount;i++){
            for(let j=0;j<this.sideGridAmount;j++){
                this.gameMap[i][j]=GridType.GRID_TYPE_EMPTY;
            }
        }
    }

    GameOver(){
        alert("Game Over");
    }

    GenerateFood(snakeBody){
        let coordinate=null;
        let isCoordinateLegal=false;
        while(!isCoordinateLegal){
            coordinate=new Coordinate(
                Math.floor(Math.random()*this.sideGridAmount),
                Math.floor(Math.random()*this.sideGridAmount)
            );
            isCoordinateLegal=true;
            for(let i=0;i<snakeBody.length;i++){
                if(snakeBody[i].row===coordinate.row&&snakeBody[i].column===coordinate.column){
                    isCoordinateLegal=false;
                    break;
                }
            }
        }
        return coordinate;
    }
}

export default GameController;

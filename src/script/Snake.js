import {msFrameTime} from "./global";

const SnakeDirection={
    LEFT:0,
    UP:1,
    RIGHT:2,
    DOWN:3
};

class Coordinate {
    constructor(column,row) {
        this.row = row;
        this.column = column;
    }
}

class Snake{

    constructor(headCoordinate,snakeDirection,sideGridAmount) {
        if(!headCoordinate instanceof Coordinate){
            throw new Error("headCoordinate must be an instance of Coordinate");
        }
        this.direction=snakeDirection;
        this.body=[];
        this.body.push(headCoordinate);
        this.sideGridAmount=sideGridAmount;
    }

    Grow(){
        let growDirection=this.ReverseDirection(
            this.CalculateBodyMoveDirection(this.body.length-1)
        );
        let newCoordinate=null;
        let lastCoordinate=this.body[this.body.length-1];
        switch(growDirection){
            case SnakeDirection.LEFT:
                newCoordinate=new Coordinate(lastCoordinate.column-1,lastCoordinate.row);
                break;
            case SnakeDirection.UP:
                newCoordinate=new Coordinate(lastCoordinate.column,lastCoordinate.row-1);
                break;
            case SnakeDirection.RIGHT:
                newCoordinate=new Coordinate(lastCoordinate.column+1,lastCoordinate.row);
                break;
            case SnakeDirection.DOWN:
                newCoordinate=new Coordinate(lastCoordinate.column,lastCoordinate.row+1);
                break;
        }

        this.body.push(newCoordinate);
    }

    CalculateBodyMoveDirection(bodyIndex){
        if(bodyIndex===0){
            return this.direction;
        }
        if(bodyIndex<0||bodyIndex >= this.body.length){
            throw new Error("bodyIndex must be between [0,this.body.length)");
        }

        let currentCoordinate=this.body[bodyIndex];
        let previousCoordinate=this.body[bodyIndex-1];
        if(currentCoordinate===undefined){
            throw new Error("currentCoordinate must be defined");
        }
        if(previousCoordinate===undefined){
            throw new Error("previousCoordinate must be defined");
        }

        //calculate the direction
        if(currentCoordinate.column===previousCoordinate.column){
            if(currentCoordinate.row>previousCoordinate.row){
                return SnakeDirection.UP;
            }
            else{
                return SnakeDirection.DOWN;
            }
        }
        else if(currentCoordinate.row===previousCoordinate.row){
            if(currentCoordinate.column>previousCoordinate.column){
                return SnakeDirection.LEFT;
            }
            else{
                return SnakeDirection.RIGHT;
            }
        }
        else{
            throw new Error("currentCoordinate and previousCoordinate must be on the same line");
        }

    }

    ReverseDirection(aSnakeDirection){
        let reversedDirection=null;
        switch (aSnakeDirection) {
            case SnakeDirection.LEFT:
                reversedDirection=SnakeDirection.RIGHT;
                break;
            case SnakeDirection.UP:
                reversedDirection=SnakeDirection.DOWN;
                break;
            case SnakeDirection.RIGHT:
                reversedDirection=SnakeDirection.LEFT;
                break;
            case SnakeDirection.DOWN:
                reversedDirection=SnakeDirection.UP;
                break;

                default:
                    throw new Error("aSnakeDirection must be one of SnakeDirection");
        }
        return reversedDirection;
    }

    //控制贪吃蛇前进逻辑
    //返回值：true表示成功前进,false表示遇到障碍物
    Move(){
        let headCoordinate=this.body[0];
        let newHeadCoordinate=null;
        switch(this.direction){
            case SnakeDirection.LEFT:
                newHeadCoordinate=new Coordinate(headCoordinate.column-1,headCoordinate.row);
                break;
            case SnakeDirection.UP:
                newHeadCoordinate=new Coordinate(headCoordinate.column,headCoordinate.row-1);
                break;
            case SnakeDirection.RIGHT:
                newHeadCoordinate=new Coordinate(headCoordinate.column+1,headCoordinate.row);
                break;
            case SnakeDirection.DOWN:
                newHeadCoordinate=new Coordinate(headCoordinate.column,headCoordinate.row+1);
                break;

                default :
                    throw new Error("this.direction must be a SnakeDirection");
        }
        //越界处理
        if(newHeadCoordinate.column<0){
            newHeadCoordinate.column+=this.sideGridAmount;
        }
        if(newHeadCoordinate.column>=this.sideGridAmount){
            newHeadCoordinate.column-=this.sideGridAmount;
        }
        if(newHeadCoordinate.row<0){
            newHeadCoordinate.row+=this.sideGridAmount;
        }
        if(newHeadCoordinate.row>=this.sideGridAmount){
            newHeadCoordinate.row-=this.sideGridAmount;
        }

        for(let item of this.body){
            if(item.column===newHeadCoordinate.column&&item.row===newHeadCoordinate.row){
                //撞到自己了
                return false;
            }
        }

        this.body.pop();
        this.body.unshift(newHeadCoordinate);
        return true;
    }

    ChangeDirection(aSnakeDirection) {
        //利用timeout实现防抖
        if(this.changeDirectionTimeout!=null){
            clearTimeout(this.changeDirectionTimeout);
        }
        if(this.direction===this.ReverseDirection(aSnakeDirection)||
            this.direction===aSnakeDirection
        ){
            return;
        }
        this.changeDirectionTimeout=setTimeout(()=>{
            this.direction=aSnakeDirection;
        },msFrameTime/3);
        console.log("snake direction changed to "+this.direction);
    }
}

export {SnakeDirection,Snake,Coordinate};

'use strict';
import GameCanvas from "./GameCanvas";

class GameController{
    constructor(_canvasContainerID,_sideGridAmount) {
        this.gameCanvas=new GameCanvas(_canvasContainerID,_sideGridAmount);
    }
    Init(){
        this.gameCanvas.Init();
    }

}

export default GameController;

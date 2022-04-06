'use strict';
import Konva from "konva";
import {GridType,GridColor} from "./GameMap";

class GameCanvas{
    constructor(_containerID,_sideGridAmount){
        this.containerID= _containerID;
        this.canvasSideLength = Math.min(window.innerWidth, window.innerHeight);
        this.sideGridAmount = _sideGridAmount;
        this.gridSideLength = this.canvasSideLength/this.sideGridAmount;
        this.girdBorderClearance = this.gridSideLength/10;
    }

    Init(){
        this.stage= new Konva.Stage({
            container: this.containerID,
            width: this.canvasSideLength,
            height: this.canvasSideLength
        });
        let borderLayer = new Konva.Layer({
            id: "borderLayer",
        });
        this.stage.add(borderLayer);

        //draw grid
        let girdLineGroup = new Konva.Group({
            x: 0,
            y: 0,
            draggable: false,
            listening: false,
            id: 'gridLineGroup'
        });
        borderLayer.add(girdLineGroup);
        //row
        for(let i=0;i<this.sideGridAmount;i++){
            let line = new Konva.Line({
                points: [0, i*this.gridSideLength, this.canvasSideLength, i*this.gridSideLength],
                stroke: 'black',
                strokeWidth: 1,
                lineCap: 'round',
                lineJoin: 'round'
            });
            girdLineGroup.add(line);
        }
        //column
        for(let i=0;i<this.sideGridAmount;i++){
            let line = new Konva.Line({
                points: [i*this.gridSideLength, 0, i*this.gridSideLength, this.canvasSideLength],
                stroke: 'black',
                strokeWidth: 1,
                lineCap: 'round',
                lineJoin: 'round'
            });
            girdLineGroup.add(line);
        }
        //side-left
        girdLineGroup.add(new Konva.Line({
            points: [0, 0, 0, this.canvasSideLength],
            stroke: 'black',
            strokeWidth: 5,
            lineCap: 'round',
            lineJoin: 'round'
        }));
        //side-right
        girdLineGroup.add(new Konva.Line({
            points: [this.canvasSideLength, 0, this.canvasSideLength, this.canvasSideLength],
            stroke: 'black',
            strokeWidth: 5,
            lineCap: 'round',
            lineJoin: 'round'
        }));
        //side-top
        girdLineGroup.add(new Konva.Line({
            points: [0, 0, this.canvasSideLength, 0],
            stroke: 'black',
            strokeWidth: 5,
            lineCap: 'round',
            lineJoin: 'round'
        }));
        //side-bottom
        girdLineGroup.add(new Konva.Line({
            points: [0, this.canvasSideLength, this.canvasSideLength, this.canvasSideLength],
            stroke: 'black',
            strokeWidth: 5,
            lineCap: 'round',
            lineJoin: 'round'
        }));
    }

    DrawMap(aGameMap){

        if(this.stage.findOne('#mapLayer')!=null){
            this.stage.findOne('#mapLayer').destroy();
        }
        let mapLayer= new Konva.Layer({
            id: "mapLayer",
        });
        this.stage.add(mapLayer);

        for(let i=0;i<this.sideGridAmount;i++){
            for(let j=0;j<this.sideGridAmount;j++){
                //填充颜色判断
                let gridFillColor=GridColor.GRID_COLOR_EMPTY;
                switch( aGameMap[i][j]){
                    case GridType.GRID_TYPE_EMPTY:
                        gridFillColor=GridColor.GRID_COLOR_EMPTY;
                        break;
                    case GridType.GRID_TYPE_WALL:
                        gridFillColor=GridColor.GRID_COLOR_WALL;
                        break;
                    case GridType.GRID_TYPE_SNAKE_HEAD:
                        gridFillColor=GridColor.GRID_COLOR_SNAKE_HEAD;
                        break;
                    case GridType.GRID_TYPE_SNAKE_BODY:
                        gridFillColor=GridColor.GRID_COLOR_SNAKE_BODY;
                        break;
                    case GridType.GRID_TYPE_FOOD:
                        gridFillColor=GridColor.GRID_COLOR_FOOD;
                        break;

                        default:
                            gridFillColor=GridColor.GRID_COLOR_EMPTY;
                }
                //绘制格子
                let rect = new Konva.Rect({
                    x: j*this.gridSideLength+this.girdBorderClearance/2,
                    y: i*this.gridSideLength+this.girdBorderClearance/2,
                    width: this.gridSideLength-this.girdBorderClearance,
                    height: this.gridSideLength-this.girdBorderClearance,
                    fill: gridFillColor,
                });
                mapLayer.add(rect);
            }
        }
    }
}

export default GameCanvas;

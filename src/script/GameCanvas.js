'use strict';
import Konva from "konva";

class GameCanvas{
    constructor(_containerID,_sideGridAmount){
        this.containerID= _containerID;
        this.canvasSideLength = Math.min(window.innerWidth, window.innerHeight);
        this.sideGridAmount = _sideGridAmount;
        this.gridSideLength = this.canvasSideLength/this.sideGridAmount;
    }

    Init(){
        this.stage= new Konva.Stage({
            container: this.containerID,
            width: this.canvasSideLength,
            height: this.canvasSideLength
        });
        let layer = new Konva.Layer();
        this.stage.add(layer);

        //draw grid
        let girdLineGroup = new Konva.Group({
            x: 0,
            y: 0,
            draggable: false,
            listening: false
        });
        layer.add(girdLineGroup);
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
}

export default GameCanvas;

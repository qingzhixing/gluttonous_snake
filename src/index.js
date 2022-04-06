'use strict';
import "./style/global.scss";
import GameController from "./script/GameController";
let gameController=new GameController("container",10);
gameController.Run();

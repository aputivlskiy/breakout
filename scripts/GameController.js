/*global define */
define([ 'app/model/Game', 'app/view/GameView'], function (Game, GameView) {

    'use strict';

    var proto = GameController.prototype;

    /**
     *
     *
     * @constructor
     */
    function GameController(stage, renderer) {
        this.stage = stage;
        this.renderer = renderer;

        this.game = new Game();
        this.gameView = new GameView(this.game, stage, renderer);

        this.gameScreen = renderer.createGameScreen(this.game);
        this.menuScreen = renderer.createMenuScreen();
        this.resultScreen = renderer.createResultScreen();

        //event listeners
        renderer.onUpdate =     this.onTick_handler.bind(this);
        renderer.onMouseUp =    this.onMouseUp_handler.bind(this);
        renderer.onMouseMove =  this.onMouseMove_handler.bind(this);

        this.game.onGameEnded =         this.onGameEnded_handler.bind(this);
        this.menuScreen.onMenuClick =   this.onGameStartClick_handler.bind(this);
        this.resultScreen.onMenuClick = this.onGameStartClick_handler.bind(this);

    };

    proto.start = function () {
        this.stage.addChild(this.menuScreen);
    };

    proto.onMouseUp_handler = function () {
        this.game.getBall().launch();
    };

    proto.onMouseMove_handler = function (x,y) {
        this.game.getPad().mouseMove(x,y);
    };

    proto.onTick_handler = function (delta) {
        this.game.update(delta);
    };


    proto.onGameStartClick_handler = function () {
        this.stage.removeChild(this.menuScreen);
        this.stage.removeChild(this.resultScreen);

        this.stage.addChild(this.gameScreen);
        this.game.startLevel(1);
    }

    proto.onGameEnded_handler = function (result) {
        this.stage.removeChild(this.gameScreen);
        this.resultScreen.setResult(result);
        this.stage.addChild(this.resultScreen);
    }


    return GameController;
});
define(['app/Config', 'easel'], function (Config) {
    'use strict';

    var proto = GameScreen.prototype = new createjs.Container();
    proto.constructor = GameScreen;


    function GameScreen(game) {
        this.initialize();
        this.game = game;


        this.lblLives = new createjs.Text("", "bold 14px Arial", "#fff");
        this.lblLives.x = Config.GAME_WIDTH / 2 - 150;
        this.addChild(this.lblLives);

        this.lblLevel = new createjs.Text("", "bold 14px Arial", "#fff");
        this.lblLevel.x = Config.GAME_WIDTH / 2 + 150;
        this.addChild(this.lblLevel);

        this.btnLeft = createButton();
        this.btnLeft.x = BTN_RADIUS;
        this.btnLeft.y = Config.GAME_HEIGHT - BTN_RADIUS;
//        this.addChild(this.btnLeft);

        this.btnRight = createButton();
        this.btnRight.setTransform(0, 0, -1);
        this.btnRight.x = Config.GAME_WIDTH - BTN_RADIUS;
        this.btnRight.y = Config.GAME_HEIGHT - BTN_RADIUS;
//        this.addChild(this.btnRight);

        game.onLivesChange = livesChange_handler.bind(this);
        game.onLevelChange = levelChange_handler.bind(this);

        this.btnLeft.addEventListener("mousedown touchstart", btnLeftPressDown_handler.bind(this));
        this.btnLeft.addEventListener("pressup touchend", btnLeftPressUp_handler.bind(this));

        this.btnRight.addEventListener("mousedown touchstart", btnRightPressDown_handler.bind(this));
        this.btnRight.addEventListener("pressup touchend", btnRightPressUp_handler.bind(this));


        update.call(this);
    };

    function livesChange_handler() {
        update.call(this);
    };

    function levelChange_handler() {
        update.call(this);
    };

    function update() {
        this.lblLives.text = "LIVES: " + this.game.getLives();
        this.lblLevel.text = "LEVEL: " + this.game.getLevel();
    }


    function btnLeftPressDown_handler() {
        this.game.leftInput(true);
    }

    function btnLeftPressUp_handler() {
        this.game.leftInput(false);
    }

    function btnRightPressDown_handler() {
        this.game.rightInput(true);
    }

    function btnRightPressUp_handler() {
        this.game.rightInput(false);
    }


    var BTN_RADIUS = 50;


    function createButton() {
        var AS = 20;

        var btn = new createjs.Shape();
        btn.graphics.beginFill("rgba(50,50,50,0.5)").beginStroke("rgba(127,127,127,0.5)").setStrokeStyle(2);
        btn.graphics.drawCircle(0, 0, BTN_RADIUS);

        btn.graphics.beginFill("rgba(127,127,127,0.5)").beginStroke(null).setStrokeStyle(4);
        btn.graphics.moveTo(AS - AS / 3, AS, BTN_RADIUS);
        btn.graphics.lineTo(AS - AS / 3, -AS, BTN_RADIUS);
        btn.graphics.lineTo(-AS, 0, BTN_RADIUS);
        btn.graphics.lineTo(AS - AS / 3, AS, BTN_RADIUS);

        return btn;
    }


    return GameScreen;

});

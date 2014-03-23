define(['app/Config', 'easel'], function (Config) {
    'use strict';

    var proto = GameScreen.prototype;


    function GameScreen(game) {
        this.game = game;

        this.el = $("#domGame");

        this.livesEl = this.el.find(".lives");
        this.levelEl = this.el.find(".level");


        this.btnLeft = this.el.find(".left").hide();
        this.btnRight = this.el.find(".right").hide();


        game.onLivesChange = livesChange_handler.bind(this);
        game.onLevelChange = levelChange_handler.bind(this);

        this.btnLeft.on("mousedown", btnLeftPressDown_handler.bind(this));
        this.btnLeft.on("mouseup", btnLeftPressUp_handler.bind(this));

        this.btnRight.on("mousedown", btnRightPressDown_handler.bind(this));
        this.btnRight.on("mouseup", btnRightPressUp_handler.bind(this));


        update.call(this);
    };

    function livesChange_handler() {
        update.call(this);
    };

    function levelChange_handler() {
        update.call(this);
    };

    function update() {
        this.livesEl.text("LIVES: " + this.game.getLives());
        this.levelEl.text("LEVEL: " + this.game.getLevel());
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


    return GameScreen;

});

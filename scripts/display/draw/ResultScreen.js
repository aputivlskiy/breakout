define(['app/Config','easel'], function (Config) {
    'use strict';

    var proto = ResultScreen.prototype = new createjs.Container();
    proto.constructor = ResultScreen;


    function ResultScreen() {
        this.initialize();

        this.lblResult = new createjs.Text("A", "bold 48px Arial", "#FF9900");
        this.addChild(this.lblResult);


        this.lblStart = new createjs.Text("Press to play again", "bold 24px Arial", "#00CC00");
        this.lblStart.y = 150;
        this.addChild(this.lblStart);

        this.x = ( Config.GAME_WIDTH - this.getBounds().width ) / 2;
        this.y = ( Config.GAME_HEIGHT - this.getBounds().height ) / 2;

        this.onMenuClick = function () {
        };
        this.addEventListener("click", menuClick_handler.bind(this));
    };

    proto.setResult = function (result) {
        if (result) {
            this.lblResult.color = "#00FF00";
            this.lblResult.text = "Congratulations! You win!";
        }
        else {
            this.lblResult.color = "#CC0000";
            this.lblResult.text = "You lost! :(";
        }
        this.lblResult.x = ( this.lblStart.getMeasuredWidth() - this.lblResult.getMeasuredWidth() ) / 2;
    }

    function menuClick_handler() {
        this.onMenuClick();
    };

    return ResultScreen;
});

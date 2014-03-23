define(['app/Config','easel'], function (Config) {
    'use strict';


    var proto = MenuScreen.prototype = new createjs.Container();
    proto.constructor = MenuScreen;


    function MenuScreen(stage) {
        this.initialize();

        var lblTitle = new createjs.Text("The Breakout Game", "bold 56px Arial", "#FF9900");
        this.addChild(lblTitle);

        var lblStart = new createjs.Text("Press to start", "bold 28px Arial", "#00CC00");
        lblStart.x = ( lblTitle.getMeasuredWidth() - lblStart.getMeasuredWidth() ) / 2;
        lblStart.y = 150;
        this.addChild(lblStart);


        this.x = ( Config.GAME_WIDTH - this.getBounds().width ) / 2;
        this.y = ( Config.GAME_HEIGHT - this.getBounds().height ) / 2;

        this.onMenuClick = function () {
        };
        this.addEventListener("click", menuClick_handler.bind(this));
    };

    function menuClick_handler() {
        this.onMenuClick();
    };


    return MenuScreen;
});

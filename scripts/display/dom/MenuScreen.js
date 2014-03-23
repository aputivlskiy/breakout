define(['app/Config','jquery'], function (Config, $) {
    'use strict';


    var proto = MenuScreen.prototype;

    function MenuScreen(stage) {

        this.el = $("#domMenu");

        this.onMenuClick = function () {};

        this.el.on("click", menuClick_handler.bind(this));
    };

    function menuClick_handler() {
        this.onMenuClick();
    };


    return MenuScreen;
});

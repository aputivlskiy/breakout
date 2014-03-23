define(['jquery'], function ($) {
    'use strict';

    var proto = ResultScreen.prototype;


    function ResultScreen() {

        this.el = $("#domResult");

        this.onMenuClick = function () {
        };
        this.el.on("click", menuClick_handler.bind(this));
    };

    proto.setResult = function (result) {
        if (result) {
            this.el.find("h1").addClass("win").text("Congratulations! You win!");
        }
        else {
            this.el.find("h1").addClass("lost").text("You lost! :(");
        }
    }

    function menuClick_handler() {
        this.onMenuClick();
    };

    return ResultScreen;
});

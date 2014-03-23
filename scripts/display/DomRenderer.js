define([
    'jquery',
    'app/Config',
    'app/Utils',
    './dom/view/PadView',
    './dom/view/BallView',
    './dom/view/BrickView',

    './dom/GameScreen',
    './dom/MenuScreen',
    './dom/ResultScreen',
    ],
    function ($, Config, Utils, PadView, BallView, BrickView, GameScreen, MenuScreen, ResultScreen) {

        'use strict';

        var proto = DomStage.prototype;

        function DomStage(div){
            this.el = div;
        }

        proto.addChild = function(child){
            this.el.append(child.el)
        };

        proto.removeChild = function(child){
            if (child.el.hasClass("brick")){
                child.el.remove();
            }
            else{
                child.el.detach();
            }
        };


        var
            stage,
            touchdiv,
            renderer = {

                //
                // Canvas
                //
                createStage: function (container) {

                    var div = $("<div/>");
                    div.css({
                        width:Config.GAME_WIDTH,
                        height:Config.GAME_HEIGHT
                    });
                    div.attr("id", "domStage");

                    container.append(div);

                    div.focus();

                    stage = new DomStage(div);


                    window.requestAnimationFrame(tick_handler);

                    touchdiv = $("<div/>").attr("id", "domTouch");

                    //event listeners
                    if ($.isMobile){
                        touchdiv.on("touchend", stageMouseUp_handler);
                        touchdiv.on("touchmove", stageMouseMove_handler);
                    }
                    else{
                        touchdiv.on("mouseup", stageMouseUp_handler);
                        touchdiv.on("mousemove", stageMouseMove_handler);

                    }

                    return stage;
                },

                //
                // Screens
                //
                createGameScreen: function (game) {
                    var scr = new GameScreen(game);
                    scr.el.append(touchdiv);
                    return scr;
                },

                createMenuScreen: function () {
                    return new MenuScreen();
                },

                createResultScreen: function () {
                    return new ResultScreen();
                },


                //
                // Game elements
                //
                createPadView: function (model) {
                    return new PadView(model);
                },

                createBallView: function (model) {
                    return new BallView(model);
                },

                createBrickView: function (model) {
                    return new BrickView(model);
                },


                //
                // Events
                //
                onUpdate: Utils.emptyFn()
            };


        function stageMouseUp_handler(event) {
            renderer.onMouseUp(event);
        };

        function stageMouseMove_handler(event) {
            event.preventDefault();
            if (event.type === "touchmove"){
                event = event.originalEvent;
                renderer.onMouseMove(event.layerX, event.layerY);

                if (event.target.id !== "domStage") return;
            }
            else{
                renderer.onMouseMove(event.clientX, event.clientY);
            }
        };


        var lastTicktime = 0;
        function tick_handler(time) {
            renderer.onUpdate(time-lastTicktime);
            lastTicktime = time;
            window.requestAnimationFrame(tick_handler);
        }


        //requestAnimationFrame polyfill
        (function() {
            var lastTime = 0;
            var vendors = ['webkit', 'moz', 'o', 'ms'];
            for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
                window.cancelAnimationFrame =
                    window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
            }

            if (!window.requestAnimationFrame)
                window.requestAnimationFrame = function(callback, element) {
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                        timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };

            if (!window.cancelAnimationFrame)
                window.cancelAnimationFrame = function(id) {
                    clearTimeout(id);
                };
        }());


        return renderer;
    });

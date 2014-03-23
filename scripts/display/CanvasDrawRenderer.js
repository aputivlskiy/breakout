define([
    'jquery',
    'app/Config',
    'app/Utils',
    './draw/view/PadView',
    './draw/view/BallView',
    './draw/view/BrickView',

    './draw/GameScreen',
    './draw/MenuScreen',
    './draw/ResultScreen',

    'easel'],
    function ($, Config, Utils, PadView, BallView, BrickView, GameScreen, MenuScreen, ResultScreen) {

        'use strict';


        var
            stage,
            fpsMeter;


        var
            renderer = {

                //
                // Canvas
                //
                createStage: function (container) {

                    var canvas = $("<canvas/>");
                    canvas.attr("width", Config.GAME_WIDTH);
                    canvas.attr("height", Config.GAME_HEIGHT);
                    canvas.attr("id", "stage");

                    container.append(canvas);

                    resizeCanvas(canvas);

                    canvas.focus();

                    stage = new createjs.Stage("stage");

                    createjs.Touch.enable(stage);
                    createjs.Ticker.useRAF = true;
                    createjs.Ticker.setFPS(Config.FPS);

                    //FPS meter
                    fpsMeter = new createjs.Text("-- fps", "bold 14px Arial", "#fff");
//                    stage.addChild(fpsMeter);
                    fpsMeter.x = 3;
                    fpsMeter.y = 3;

                    //event listeners
                    createjs.Ticker.addEventListener("tick", tick_handler);
                    stage.addEventListener("stagemouseup", stageMouseUp_handler);
                    stage.addEventListener("stagemousemove", stageMouseMove_handler);

                    return stage;
                },

                //
                // Screens
                //
                createGameScreen: function (game) {
                    return new GameScreen(game);
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
            renderer.onMouseMove(event.stageX, event.stageY);
        };


        function tick_handler(event) {

            if (event.paused) {
                return;
            }

            renderer.onUpdate(event.delta);

            fpsMeter.text = Math.round(createjs.Ticker.getMeasuredFPS()) + " fps";
            stage.update();
        }


        function resizeCanvas(canvas) {

            /*
             // resize canvas to fit window size, not tested on HD
             var scaleX = window.innerWidth / canvas[0].width;
             var scaleY = window.innerHeight / canvas[0].height;
             var scaleToFit = Math.min(scaleX, scaleY);

             var scale = "scale(" + scaleToFit + ")"

             canvas.css({
             "transform": scale,
             "-moz-transform": scale,
             "-ms-transform": scale,
             "-webkit-transform": scale,
             "-o-transform": scale
             });
             console.log(scale, canvas);
             */
        }


        return renderer;
    });

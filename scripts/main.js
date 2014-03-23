require.config({
    shim: {
        easel: {
            exports: 'createjs'
        }
    },
    paths: {
        domReady: '../libs/domReady',
        jquery: '../libs/jquery.min',
        easel: '../libs/easeljs-0.7.0.min',
        preload: '../libs/preloadjs-0.4.0.min',
        app: './'
    }
});

require([
    'app/display/CanvasDrawRenderer',
    'app/display/DomRenderer',

    'app/GameController',

    'jquery', 'domReady!'
],
    function (
        CanvasDrawRenderer,
        DomRenderer,

        GameController,
        $) {

        'use strict';

        var stage,
            controller,
            renderer;


        //
        // Application entry point
        //

        //set one of the renderers
        //renderer = CanvasDrawRenderer;
        renderer = DomRenderer;


        setupPage();

        setupGame();


        function setupGame() {
            var containerEl = $("#gameContainer");

            stage = renderer.createStage(containerEl);

            controller = new GameController(stage, renderer);
            controller.start();
        }


        function setupPage() {
            //simple mobile detect
            $.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

            //disable rubber
            $(document).bind('touchmove', false);
        }

    }
)
;

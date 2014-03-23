define([], function (
    CanvasDrawRenderer

    ) {
    'use strict';

    var config = {

        //game settings
        FPS : 60,
        LIVES : 3,
        LEVELS : 3,
        BONUS_LIFETIME : 10, //sec

        BRICKS_MIN:50,
        BRICKS_MAX:100,
        BRICKS_TOP_OFFSET:50,

        //brick types distribution
        BRICK_UNBREAKABLE : 0.1,//10%
        BRICK_TWOHITS : 0.3,//30%
        BRICK_WITHBONUS : 0.05,//5%


        //dimensions
		GAME_WIDTH:800,
		GAME_HEIGHT:600,
		
        BALL_RADIUS : 7,
        BALL_SPEED : 0.35,
        BALL_ANGLE_DEV : 0.3,

        PAD_SPEED : 0.7,
        PAD_WIDTH : 80,
        PAD_HEIGHT : 10,

        BRICK_WIDTH : 50,
        BRICK_HEIGHT : 20,
        BRICK_PADDING : 5

    };


    return config;
});

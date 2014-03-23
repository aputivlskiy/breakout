/*global define */
define([
    'app/Config',

    'jquery',
    ], function (Config, $) {

    'use strict';
    var proto = GameView.prototype;

    /**
     * @constructor
     */
    function GameView(game, stage, renderer) {
		this.game = game;
		this.stage = stage;
		this.renderer = renderer;
		this.brickViews = [];
		
		game.onNewLevel = this._newLevel_handler.bind(this);
		game.onEndLevel = this._endLevel_handler.bind(this);
		
		this.padView = this.renderer.createPadView(game.getPad());
		this.ballView = this.renderer.createBallView(game.getBall());
    };
	
	proto._newLevel_handler = function(){
		this.stage.addChild(this.padView);
		this.stage.addChild(this.ballView);
		
		//add all new bricks
		this.game.getBricks().forEach(function(brick){
			var brickView = this.renderer.createBrickView(brick);
			brickView.onRemove = this._removeBrick_handler.bind(this);
			this.brickViews.push( brickView );
			this.stage.addChild(brickView);
		}, this);
	};
	
	proto._endLevel_handler = function(){

		this.stage.removeChild(this.padView);
		this.stage.removeChild(this.ballView);
		
		//remove all bricks
		this.brickViews.forEach(function(brickView){
			this.stage.removeChild(brickView);
			brickView.destroy();
		}, this);
		this.brickViews = [];
	};
	
	
	proto._removeBrick_handler = function(brickView) {
        var idx = this.brickViews.indexOf(brickView);
		this.brickViews.splice(idx, 1);
		this.stage.removeChild(brickView);
		brickView.destroy();
    };

    return GameView;
});
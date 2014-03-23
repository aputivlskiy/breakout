define(['easel'], function () {
    'use strict';

    var proto = PadView.prototype = new createjs.Shape();
    proto.constructor = PadView;

    function PadView(model) {
		this.initialize();
        this.model = model;
		model.onMove = this._move_handler.bind(this);
		model.onResize = this._resize_handler.bind(this);
		
		this.y = ~~this.model.y;
		this._draw();
    }

    proto._move_handler = function(x){
		this.x = ~~this.model.x;
	};

	proto._resize_handler = function(width){
        this._draw();
	};
	
	proto._draw = function(){
		this.graphics.clear();
        this.graphics.beginFill("#009900").beginStroke("#00FF00").setStrokeStyle(3);
        this.graphics.drawRoundRect(0, 0, this.model.width, this.model.height, 5);
	};

    return PadView;
});

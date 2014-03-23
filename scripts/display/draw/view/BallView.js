define(['easel'], function () {
    'use strict';

    var proto = BallView.prototype = new createjs.Shape();
    proto.constructor = BallView;

    function BallView(model) {
		this.initialize();
        this.model = model;
		model.onMove = this._move_handler.bind(this);
		
		this._draw();
    }

    proto._move_handler = function(x,y){
		this.x = ~~this.model.x;
		this.y = ~~this.model.y;
	};
	proto._draw = function(){
		this.graphics.clear();
        this.graphics.beginFill("#cccccc").beginStroke("#ffffff").setStrokeStyle(2);
        this.graphics.drawCircle(0, 0, this.model.radius);
	};

    return BallView;
});

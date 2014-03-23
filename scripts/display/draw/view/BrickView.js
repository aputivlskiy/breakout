define(['Config', 'Utils','easel'], function (Config, Utils) {
    'use strict';

    var proto = BrickView.prototype = new createjs.Shape();

	//
    // Const
    //
    var
        COLORS_UNBREAK = ["#666666","#999999"],
        COLORS_TWOHITS = ["#990000","#CC0000"],
        COLORS_ONEHIT = ["#cc6600","#ff9900"];
	
    function BrickView(model) {
		this.initialize();
        this.model = model;
		
		model.onHit = this._hit_handler.bind(this);

		this.onRemove = Utils.emptyFn;
		
		this.x = ~~model.x;
		this.y = ~~model.y;
		
		var colors = COLORS_ONEHIT;
        if ( model.unbreakable ){
            colors = COLORS_UNBREAK;
        }
        else if (model.lives == 2){
            colors = COLORS_TWOHITS;
        }
		
		this._draw(colors);
    }

	proto.destroy = function(){
		this.model.onHit = null;
	};
	
    proto._hit_handler = function(){
        if ( this.model.lives===0 ){
			this.onRemove(this);
		}
		else if (this.model.lives===1){
            this._draw(COLORS_ONEHIT);
        }
	};
	
	proto._draw = function(colors){
		this.graphics.clear();
        this.graphics.beginFill(colors[0]).beginStroke(colors[1]).setStrokeStyle(2);
        this.graphics.drawRoundRect(0, 0, Config.BRICK_WIDTH, Config.BRICK_HEIGHT, 5);

        if ( this.model.bonus ){
            this.graphics.beginFill("#cc00cc").beginStroke("#cccccc").drawCircle(Config.BRICK_WIDTH*0.5, Config.BRICK_HEIGHT*0.5, 7);
        }
	};

    return BrickView;
});

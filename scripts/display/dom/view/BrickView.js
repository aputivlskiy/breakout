define(['Config', 'Utils','jquery'], function (Config, Utils, $) {
    'use strict';

    var proto = BrickView.prototype;


    function BrickView(model) {
        this.model = model;
		
		model.onHit = this._hit_handler.bind(this);

		this.onRemove = Utils.emptyFn;

        this.el = $("<div/>").addClass("brick");

        this.el.css({
            left:~~this.model.x,
            top: ~~this.model.y,
            width:Config.BRICK_WIDTH,
            height:Config.BRICK_HEIGHT
        });
		
        if ( model.unbreakable ){
            this.el.addClass("unbreak");
        }
        else if (model.lives == 2){
            this.el.addClass("twohits");
        }
    }

	proto.destroy = function(){
		this.model.onHit = null;
	};
	
    proto._hit_handler = function(){
        if ( this.model.lives===0 ){
			this.onRemove(this);
		}
		else if (this.model.lives===1){
            this.el.removeClass("twohits");
        }
	};

    return BrickView;
});

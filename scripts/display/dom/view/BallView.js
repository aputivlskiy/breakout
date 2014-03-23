define(['jquery'], function ($) {
    'use strict';

    var proto = BallView.prototype;;
    proto.constructor = BallView;

    function BallView(model) {
        this.model = model;
		model.onMove = this._move_handler.bind(this);
		
		this.el = $("<div/>").addClass("ball");
        this.el.css({
            width:this.model.radius*2,
            height:this.model.radius*2,
            marginLeft:-this.model.radius,
            marginTop:-this.model.radius
        });
    }

    proto._move_handler = function(){
        this.el.css({
            left:~~this.model.x,
            top:~~this.model.y
        });

	};

    return BallView;
});

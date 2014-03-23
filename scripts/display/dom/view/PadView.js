define(['jquery'], function ($) {
    'use strict';

    var proto = PadView.prototype;
    proto.constructor = PadView;

    function PadView(model) {
        this.model = model;
		model.onMove = this._move_handler.bind(this);
		model.onResize = this._resize_handler.bind(this);

        this.el = $("<div/>").addClass("pad");
        this.el.css({
            top:~~this.model.y,
            width:this.model.width,
            height:this.model.height
        });
    }

    proto._move_handler = function(){
        this.el.css({left:~~this.model.x});
	};

	proto._resize_handler = function(){
        this.el.css({width:this.model.width});
	};

    return PadView;
});

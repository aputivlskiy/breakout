define(['app/Config','app/Utils'], function (Config, Utils) {
    'use strict';

    var proto = Pad.prototype;

    function Pad(stageWidth, stageHeight) {
        this.leftLimit = 0;
        this.rightLimit = stageWidth;

        this.width = Config.PAD_WIDTH;
        this.height = Config.PAD_HEIGHT;
        this.leftInput = false;
        this.rightInput = false;
		
		this.onMove = Utils.emptyFn;
		this.onResize = Utils.emptyFn;

        this.center();
        this.y = stageHeight - this.height * 2;
    }

    /**
     * Center pad within stage
     */
    proto.center = function () {
        this.x = (this.rightLimit - this.width) * 0.5;
		this.onMove(this.x);
    };

    /**
     * Move the pad
     *
     * @param delta time passed since the last frame
     */
    proto.update = function (delta) {
        var x = this.x;

        if (this.leftInput) {
            x -= Config.PAD_SPEED * delta;
        }
        else if (this.rightInput) {
            x += Config.PAD_SPEED * delta;
        }
		else if (this.mouseMoved){
            x = this.mouse_x - this.width/2;
        }
        else {
			//no changes
			return;
		}

        if (x < this.leftLimit) {
            x = this.leftLimit;
        }
        else if (x + this.width > this.rightLimit) {
            x = this.rightLimit - this.width;
        }

        this.x = x;
		
		this.onMove(x);
    };


    proto.mouseMove = function(x){
        this.mouseMoved = true;
        this.mouse_x = x;
    };

    /**
     * Resize the pad (via applied bonus)
     *
     * @param width
     */
    proto.setWidth = function (width) {
        var shift = Math.floor((this.width - width) * 0.5);
        this.width = width;
        this.x += shift;
        this.onResize(width);
    };

    return Pad;
});

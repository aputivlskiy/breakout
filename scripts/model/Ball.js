define(['app/Config','app/Utils'], function (Config, Utils) {
    'use strict';

    var proto = Ball.prototype;

    function Ball(pad, stageWidth, stageHeight){

        this.pad = pad;
        this.leftLimit = 0;
        this.rightLimit = stageWidth;
        this.topLimit = 0;
        this.bottomLimit = stageHeight;

        this.radius = Config.BALL_RADIUS;
        this.speedMod = 1;
        this.isLost = false;

        this.onMove = Utils.emptyFn();
    }

    proto.update = function(delta){
        if (this.isLost) return;

        if (this.isStick ){
            this.x = this.prev_x = this.pad.x + this.pad.width * 0.5;
			this.onMove(this.x, this.y);
            return;
        }

        var x = this.x + this.speedX * this.speedMod * delta;
        var y = this.y + this.speedY * this.speedMod * delta;

        if ( x - this.radius < this.leftLimit){
            x = this.leftLimit + this.radius;
            this.speedX *= -1;
        }
        else if ( x + this.radius > this.rightLimit ){
            x = this.rightLimit - this.radius;
            this.speedX *= -1;
        }

        if ( y - this.radius < this.topLimit){
            y = this.topLimit + this.radius;
            this.speedY *= -1;
        }
        else if ( y + this.radius > this.bottomLimit ){
            y = this.bottomLimit + this.radius*2;
            this.isLost = true;
        }

        this.prev_x = this.x;
        this.prev_y = this.y;

        this.x = x;
        this.y = y;
		
		this.onMove(this.x, this.y);
    };

    /**
     * Check for collision with pad.
     * @param pad
     * @returns {boolean}
     */
    proto.collideWithPad = function(pad){

        if ( this.y + this.radius >= pad.y ) {
            var hitR = (this.x - pad.x-pad.width * 0.5) / pad.width;// -r to +r
            if ( Math.abs(hitR) < 1 ){
                //revert y direction
                this.speedY *= -1;
                //depending of how far from the pad center hit occured, affect horizontal speed
                //plus some deviation
                var dev = Math.random()*Config.BALL_ANGLE_DEV;
                this.speedX = Math.min(Config.BALL_SPEED * hitR + Config.BALL_SPEED*dev, Config.BALL_SPEED);
                this.y =  pad.y - this.radius;
				this.onMove(this.x, this.y);
                return true;
            }
        }
        return false;
    };

    proto.collideWithBrick = function(brick){

        if (this.x + this.radius > brick.x && this.x - this.radius < brick.x + brick.width){

            if ( this.y + this.radius > brick.y && this.y - this.radius < brick.y + brick.height ){

                if (this.prev_x + this.radius < brick.x && this.x + this.radius > brick.x) {
                    this.x = brick.x - this.radius;
                    this.speedX *= -1;
                }
                else if (this.prev_x - this.radius > brick.x + brick.width && this.x - this.radius < brick.x + brick.width){
                    this.x = brick.x + brick.width + this.radius;
                    this.speedX *= -1;
                }
                else if (this.prev_y + this.radius < brick.y && this.y + this.radius > brick.y) {
                    this.y = brick.y - this.radius;
                    this.speedY *= -1;
                }
                else if (this.prev_y - this.radius > brick.y + brick.height && this.y - this.radius < brick.y + brick.height){
                    this.y = brick.y + brick.height + this.radius;
                    this.speedY *= -1;
                }
				this.onMove(this.x, this.y);
                brick.hit();
                return true;
            }
        }
        return false;
    };

    proto.stickToPad = function(){
        this.isLost = false;
        this.isStick = true;
		this.speedX = 0;
        this.speedY = Config.BALL_SPEED;
        this.y = this.prev_y = this.pad.y - this.radius * 2;
		this.onMove(this.x, this.y);
    };

    proto.launch = function(){
        this.isStick = false;
    };

    proto.setSpeedMod = function(speedMod){
        this.speedMod = speedMod;
    };

    return Ball;
});

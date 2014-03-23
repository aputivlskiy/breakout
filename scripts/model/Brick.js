define(['app/Config', 'app/Utils', './bonuses/Bonus'], function (Config, Utils, Bonus) {
    'use strict';

    var proto = Brick.prototype;
	proto.constructor = Brick;

    //
    // Constructor
    //
    function Brick(unbreakable, breakHits, bonus){

        this.unbreakable = unbreakable;
        this.lives = breakHits;
        this.bonus = bonus;
        this.width = Config.BRICK_WIDTH;
        this.height = Config.BRICK_HEIGHT;

        this.onHit = Utils.emptyFn;
    }

    /**
     * Brick has been hit by a ball
     */
    proto.hit = function(){
        if ( this.unbreakable ) return;
        this.lives--;
		this.onHit();
    };

    //
    // Statics
    //

    /**
     * Generates random brick for a new level.
     *
     * @param topOffset
     * @param stageWidth
     * @returns {Array of Brick}
     */
    Brick.createBricks = function(topOffset, stageWidth){
        var i, brickConf, brick;

        var total = Config.BRICKS_MIN + Math.floor( Math.random()*(Config.BRICKS_MAX - Config.BRICKS_MIN) );

        //create all normal brick config
        var bricksConf = [];
        for (i=0;i<total;i++){
            bricksConf.push({
                breakHits:1,
                unbreakable:false,
                bonus:null
            });
        }

        //unbreakable
        var unbreakableAmount = Math.floor( total * Config.BRICK_UNBREAKABLE );
        for (i=0;i<unbreakableAmount;i++){
            brickConf = bricksConf[ Math.floor(total*Math.random()) ];
            brickConf.unbreakable = true;
        }

        //survive 2 hits
        var twoHitsAmount = Math.ceil( total * Config.BRICK_TWOHITS );
        for (i=0;i<twoHitsAmount;i++){
            brickConf = bricksConf[ Math.floor(total*Math.random()) ];
            if (brickConf.unbreakable){ //but not unbreakable
                i--;
                continue;
            }
            brickConf.breakHits = 2;
        }

        // have bonus
        var hasBonusAmount = Math.ceil( total* Config.BRICK_WITHBONUS );
        console.log("hasBonusAmount", hasBonusAmount);
        for (i=0;i<hasBonusAmount;i++){
            brickConf = bricksConf[ Math.floor(total*Math.random()) ];
            if (brickConf.unbreakable){ //but not unbreakable
                i--;
                continue;
            }
            brickConf.bonus = Bonus.createRandom();
        }

        //create actual bricks and position them
        var bricksPerRow = Math.floor( (stageWidth + Config.BRICK_PADDING ) / (Config.BRICK_WIDTH + Config.BRICK_PADDING));

        var bricks = [],
            row = 0,
            col = 0,
            leftOffset,
            bricksAreaY = 0;


        for (i=0;i<total;i++){
            brickConf = bricksConf[i];
            brick = new Brick(brickConf.unbreakable, brickConf.breakHits, brickConf.bonus);
            bricks.push( brick );

            //position brick
            if (col === 0 ){//new row started
                leftOffset =  Math.floor( ((stageWidth + Config.BRICK_PADDING ) - (Config.BRICK_WIDTH + Config.BRICK_PADDING) * Math.min(bricksPerRow, total-i)) * 0.5 );
            }

            brick.x = Math.floor(leftOffset + (Config.BRICK_WIDTH + Config.BRICK_PADDING) * col++);
            brick.y = Math.floor(topOffset + (Config.BRICK_HEIGHT + Config.BRICK_PADDING) * row);
            bricksAreaY = Math.max(bricksAreaY, brick.y + Config.BRICK_HEIGHT);

            if ( col === bricksPerRow ){
                col = 0;
                row++;
            }
        }

        bricks.areaY = bricksAreaY;
        return bricks;
    };

    return Brick;
});

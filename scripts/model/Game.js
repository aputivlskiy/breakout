/*global define */
define([
    'app/Config',
    'app/Utils',

    'app/model/Pad',
    'app/model/Ball',
    'app/model/Brick',
    'app/model/bonuses/Bonus',

    'app/model/bonuses/BigPadBonus',
    'app/model/bonuses/SmallPadBonus',
    'app/model/bonuses/SlowBallBonus',
    'app/model/bonuses/FastBallBonus',
], function (Config, Utils, Pad, Ball, Brick, Bonus) {

    'use strict';

    /**
     *
     *
     *
     */
    var proto = Game.prototype,
        pad,
        ball,
        bricks = [], /*array of Brick*/
        bonuses = [], /* array of Bonus */ //active bonuses
        lives,
        level;

    /**
     *
     *
     * @constructor
     */
    function Game() {
        this.width = Config.GAME_WIDTH;
        this.height = Config.GAME_HEIGHT;

        this.onLivesChange = Utils.emptyFn;
        this.onLevelChange = Utils.emptyFn;
        this.onNewLevel = Utils.emptyFn;
        this.onEndLevel = Utils.emptyFn;
        this.onGameEnded = Utils.emptyFn;
        this.stopped = true;

        //game elements
        pad = new Pad(this.width, this.height);
        ball = new Ball(pad, this.width, this.height);
    };


    /**
     * Main game loop
     * @param delta
     */
    proto.update = function (delta) {
        if (this.stopped) return;

        var brick,
            bonus,
            i, l;

        ball.update(delta);

        //check ball state
        if (ball.isLost) {
            this.setLives(--lives);

            //check user lost condition
            if (lives === 0) {
                this.endLevel();
                this.onGameEnded(false);
                return;
            }
            else {
                ball.stickToPad();
            }
        }

        pad.update(delta);

        //collisions
        ball.collideWithPad(pad);

        //collision with bricks
        //optimization: if ball is within bricks area
        if (ball.y - ball.radius < bricks.areaY) {

            for (i = 0, l = bricks.length; i < l; i++) {
                brick = bricks[i];
                if (ball.collideWithBrick(brick)) {
                    if (brick.lives == 0) {
                        //dead
                        bricks.splice(i, 1);
                        i--;
                        l--;
                        if (brick.bonus) {
                            applyBonus(brick.bonus);
                        }
                    }
                }
            }
        }

        //update active bonuses
        for (i = 0, l = bonuses.length; i < l; i++) {
            bonus = bonuses[i];
            if (bonus.isDead) {
                bonuses.splice(i, 1);
                i--;
                l--;
            }
            else {
                bonus.update(delta);
            }
        }

        //check level end condition (only unbreakable should left)
        var won = bricks.every(winBrickFilter);
        if (won) {
            this.endLevel();

            if (level === Config.LEVELS) {
                this.onGameEnded(true);
            }
            else {
                this.startLevel(++level);
            }
        }

    }

    proto.startLevel = function (level) {
        this.setLives(Config.LIVES);
        this.setLevel(level);

        //create bricks
        bricks = Brick.createBricks(Config.BRICKS_TOP_OFFSET, this.width);

        pad.center();
        //place ball on pad
        ball.stickToPad();

        this.stopped = false;
        this.onNewLevel();
    }

    proto.endLevel = function () {
        this.stopped = true;

        //remove bricks
        bricks.forEach(function (brick) {
            brick.bonus = null;
        });
        bricks = [];

        //clear bonuses
        bonuses.forEach(function (bonus) {
            bonus.reset();
        });
        bonuses = [];

        this.onEndLevel();
    }

    //
    // Getters & setters
    //
    proto.getPad = function () {
        return pad;
    }

    proto.getBall = function () {
        return ball;
    }

    proto.getBricks = function () {
        return bricks;
    }

    proto.getLives = function () {
        return lives;
    }

    proto.setLives = function (value) {
        lives = value;
        this.onLivesChange();
    }

    proto.getLevel = function () {
        return level;
    }

    proto.setLevel = function (value) {
        level = value;
        this.onLevelChange();
    }


    // input handlers
    proto.leftInput = function (value) {
        pad.leftInput = value;
    }

    proto.rightInput = function (value) {
        pad.rightInput = value;
    }


    //
    // Private methods
    //

    function winBrickFilter(brick) {
        return brick.unbreakable;
    }

    function applyBonus(bonus) {
        console.log("Bonus", bonus.constructor.name);
        if (bonus.applyTo === Bonus.APPLY_TO.PAD) {
            bonus.apply(pad);
        }
        else if (bonus.applyTo === Bonus.APPLY_TO.BALL) {
            bonus.apply(ball);
        }
        bonuses.push(bonus);
    }

    return Game;
});
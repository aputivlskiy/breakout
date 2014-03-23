define(['./Bonus', '../Ball'], function (Bonus, Ball) {
    'use strict';


    var proto = FastBallBonus.prototype = Object.create(Bonus.prototype);
    proto.constructor = FastBallBonus;

    /**
     *
     * @constructor
     */
    function FastBallBonus(){
        Bonus.call(this, Bonus.APPLY_TO.BALL);//super
    }

    /**
     *
     * @param ball
     * @override
     */
    proto._apply = function(){
        if (!(this.subject instanceof Ball)){
            throw new Error("Specified subject is not instance of Ball");
        }
        this.subject.setSpeedMod( 2 );
    };

    /**
     *
     * @param ball
     * @override
     */
    proto._reset = function(){
        this.subject.setSpeedMod( 1 );
    };

    //register itself at a bonus factory
    Bonus.registerClass(FastBallBonus);

    return FastBallBonus;
});

define(['./Bonus', 'app/model/Pad'], function (Bonus, Pad) {
    'use strict';


    var proto = BigPadBonus.prototype = Object.create(Bonus.prototype);
    proto.constructor = BigPadBonus;

    /**
     *
     * @constructor
     */
    function BigPadBonus(){
        Bonus.call(this, Bonus.APPLY_TO.PAD);//super
    }


    /**
     *
     * @param pad
     * @private
     */
    proto._apply = function(){
        if (!(this.subject instanceof Pad)){
            throw new Error("Specified subject is not instance of Pad");
        }
        this.subject.setWidth( this.subject.width*2);
    };


    /**
     *
     * @param pad
     * @private
     */
    proto._reset = function(){
        this.subject.setWidth( this.subject.width*0.5 );
    };

    //register itself at a bonus factory
    Bonus.registerClass(BigPadBonus);

    return BigPadBonus;

});

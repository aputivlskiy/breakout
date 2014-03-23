define(['./Bonus', '../Pad'], function (Bonus, Pad) {
    'use strict';


    var proto = SmallPadBonus.prototype = Object.create(Bonus.prototype);
    proto.constructor = SmallPadBonus;

    /**
     *
     * @constructor
     */
    function SmallPadBonus(){
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
        this.subject.setWidth( this.subject.width*0.5 );
    };

    /**
     *
     * @param pad
     * @private
     */
    proto._reset = function(){
        if (!(this.subject instanceof Pad)){
            throw new Error("Specified subject is not instance of Pad");
        }
        this.subject.setWidth( this.subject.width*2 );
    };

    //register itself at a bonus factory
    Bonus.registerClass(SmallPadBonus);

    return SmallPadBonus;
});

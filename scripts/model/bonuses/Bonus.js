define(['app/Config'], function (Config) {
    'use strict';

    /**
     * Abstract class to serve as a base for all bonuses implementations.
     *
     */

    var proto = Bonus.prototype,
        classes = [];

    /**
     * Creates new Bonus instance. Should only be called inside a constructor of the inherited class.
     *
     * @param applyTo
     * @constructor
     * @protected
     */
    function Bonus(applyTo) {
        this.applyTo = applyTo;
        this.subject = null;
    }


    /**
     * Applies bonus to the specified subject.
     *
     * @param subject
     */
    proto.apply = function (subject) {
        if (subject.bonus) { //only one bonus at a time
            subject.bonus.reset(subject);
        }
        subject.bonus = this;
        this.subject = subject;
        this._apply();
        this.lifetime = 0;
        this.isDead = false;
    };

    /**
     * Template method to implement in inherited classes.
     *
     * @param subject
     * @protected
     */
    proto._apply = function () {
        throw new Error("Must be implemented");
    };


    /**
     * Removes bonus from the specified subject.
     *
     * @param subject
     */
    proto.reset = function () {
        if (this.isDead) return;
        this._reset();
        this.subject.bonus = null;
        this.subject = null;
        this.isDead = true;
    };

    /**
     * Template method to implement in inherited classes.
     *
     * @param subject
     * @protected
     */
    proto._reset = function () {
        throw new Error("Must be implemented");
    };

    proto.update = function(delta){
        this.lifetime += delta;
        if ( this.lifetime/1000 > Config.BONUS_LIFETIME ){
            this.reset();
        }
    };



    //
    // Statics
    //

    Bonus.APPLY_TO = {
        PAD: 1,
        BALL: 2
    };


    /**
     * Register bonus implementation class.
     * @param clazz
     */
    Bonus.registerClass = function (clazz) {
        classes.push(clazz);
    };

    /**
     * Factory method to create random bonus.
     *
     */
    Bonus.createRandom = function () {
        var clazz = classes[ Math.floor(Math.random() * classes.length) ];
        return new clazz();
    };


    return Bonus;
});

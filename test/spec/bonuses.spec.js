define([
	'app/model/Pad', 
	'app/model/Ball',
	'app/model/bonuses/Bonus',
	'app/model/bonuses/BigPadBonus'
],function(
	Pad, Ball,
	Bonus, BigPadBonus
) {

  describe('BigPadBonus', function() {

   describe('BigPadBonus instantiation', function() {
		it('should instantiate', function() {
			var bonus = new BigPadBonus();
			expect(bonus).toNotBe(undefined);
		});
		
		it('should be instance of Bonus', function() {
			var bonus = new BigPadBonus();
			expect(bonus instanceof Bonus).toBeTruthy();
		});
	});

	describe('BigPadBonus application and reset', function() {
		var pad;
		var bonus;
		
		beforeEach(function() {
			pad = new Pad();
			bonus = new BigPadBonus();
		});

		it('should increase pad by 2 times', function() {
			var width = pad.width;
			bonus.apply(pad);
			//uncomment line below to fail test
			//expect(pad.width).toBe( width * 3 );
			expect(pad.width).toBe( width * 2 );
		});
		
		it('should return size to normal after reset', function() {
			var width = pad.width;
			bonus.apply(pad);
			bonus.reset();
			expect(pad.width).toBe( width );
		});
		
		it('should apply only once to the same object', function() {
			var width = pad.width;
			bonus.apply(pad);
			bonus.apply(pad);
			expect(pad.width).toBe( width * 2 );
		});
	});
	
  });

});
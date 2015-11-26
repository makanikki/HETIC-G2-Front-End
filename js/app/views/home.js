var Home = function(){

	this.id = 'home';

	View.apply(this, arguments);
};

Home.prototype = Object.create(View.prototype);

Home.prototype.getSelectors = function() {
	this.button = this.domElem.find('#start-button');
	this.svg = $('svg.loading');
	this.svg.hide();
	this.waterFill = document.querySelector('.water-fill');

}

Home.prototype.bind = function() {
	this.getSelectors();

	View.prototype.bind.call(this);

	this.button.on('click', $.proxy(this.onButtonClick, this));
};

Home.prototype.onButtonClick = function(e) {
	var cutWheat = app.viewController.views.cutWheat;

	e.preventDefault();

	this.startWaveEffect();

	$('#main').append(cutWheat.dom);

	setTimeout(
		$.proxy(function(){
			app.router.navigate(cutWheat.slug);
		}, this),
		3000);

	setTimeout(
		$.proxy(function() {
			this.svg.remove();
		},this),
		6000);

};

Home.prototype.animateIn = function() {

	View.prototype.animateIn.call(this);

	var self = this;

	if ( !this.loaded ) return;

	this.domElem.fadeIn(function(){
		self.onAnimateIn();
	});

};

Home.prototype.animateOut = function() {
	View.prototype.animateOut.call(this);

	var self = this;

	this.domElem.fadeOut(function(){
		self.onAnimateOut();
	});

};

Home.prototype.resize = function() {
	View.prototype.resize.call(this);

	this.setViewportInfos();

	if (typeof this.svg != 'undefined') {
		this.reloadSvgSize();
	}

}

Home.prototype.startWaveEffect = function() {
	this.svg.hide();
	this.svg.fadeIn();

	TweenMax.fromTo(this.waterFill,0.8,
		{
			attr:{
				x:-400
			}
		},
		{
			attr:{
				x:0,
			},
			repeat:-1,
			ease:Linear.easeNone
		});
	//
	TweenMax.fromTo(this.waterFill,3,
		{
			attr:{
				y:260,
				height:0
			},
		},
		{
			attr:{
				y:-350,
				height:this.vh
			},
			repeat:1,
			yoyo:true,
			ease:Linear.easeNone
		});
};

Home.prototype.reloadSvgSize = function() {
	this.svg.css('width', this.vw).css('height', this.vh);
}

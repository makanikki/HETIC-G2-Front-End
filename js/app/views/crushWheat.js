var crushWheat = function() {

    this.id = 'crushWheat';
    this.slug = 'crush-wheat';
    View.apply(this, arguments);

    this.startAnimation = false;

    this.imgBase = 'assets/images/crush-wheat/crush-wheat-00';

    for( var i = 0; i <= 380; i+=3 ){
        this.imagesToLoad[ 'frame-' + i] = this.getImgPath( i );
    }
};

crushWheat.prototype = Object.create(View.prototype);

crushWheat.prototype.animateIn = function() {

    View.prototype.animateIn.call(this);

    var self = this;

    if ( !this.loaded ) return;

    this.domElem.fadeIn(function(){
        self.onAnimateIn();
    });

};

crushWheat.prototype.animateOut = function() {

    View.prototype.animateOut.call(this);

    var self = this;

    this.domElem.fadeOut(function(){
        self.onAnimateOut();
    });

};

crushWheat.prototype.getSelectors = function() {
    this.canvas = this.domElem.find('#animation-crush-wheat');
    this.context = this.canvas[0].getContext('2d');
    this.btnNextStep = this.domElem.find('#next-button');
    this.reloadLink = this.domElem.find('#reload-crush-wheat');
    this.startButton = this.domElem.find('.start-crush-wheat');
};

crushWheat.prototype.bind = function() {
    this.getSelectors();
    View.prototype.bind.call(this);
    this.start();

    this.btnNextStep.on('click', $.proxy(this.onBtnNextStepClick, this));
    this.startButton.on('click', $.proxy(this.onStartButton, this));
    this.reloadLink.on('click', $.proxy(this.onReloadLinkClick, this));
};

crushWheat.prototype.onLoaderComplete = function() {
    var self = this;
    $.each( this.imagesToLoad, function(id, url){
        self.images.push( self.loader.queue.getResult( id ));
    });
    console.log('images loaded');
    this.imagesAreLoaded = true;
};

crushWheat.prototype.resize = function() {
    View.prototype.resize.call(this);

    this.getSelectors();

    this.width = $(window).width();
    this.height = $(window).height();

    this.videoW = this.width;
    this.videoH = this.width / this.ratio;

    if ( this.videoH < this.height ){

        this.videoH = this.height;
        this.videoW = this.videoH * this.ratio;

    }

    $(this.canvas).css({
        width: this.videoW,
        height: this.videoH
    });

    this.canvas[0].width = this.videoW;
    this.canvas[0].height = this.videoH;


    this.currentFrame = null;
};

crushWheat.prototype.update = function() {
    if (this.imagesAreLoaded == true && this.startAnimation == true) {
        var frame = this.getFrame();
        var self = this;
        if (typeof frame != 'undefined' && frame != this.currentFrame) {
            this.clear();
            this.draw(frame);
            this.currentFrame = frame;
        }

        if (this.index == this.images.length) {
            self.return;
            this.btnNextStep.fadeIn();
            this.reloadLink.fadeIn();
        };
    }
};

crushWheat.prototype.onStartButton = function() {
    this.getSelectors();
    this.startButton.fadeOut();
    this.startAnimation = true;
};

crushWheat.prototype.onReloadLinkClick = function(e) {
    this.getSelectors();
    e.preventDefault();

    this.btnNextStep.fadeOut();
    this.reloadLink.fadeOut();
    this.index = 0;
    this.update();
    this.startAnimation = false;
    this.startButton.fadeIn();
};

crushWheat.prototype.onBtnNextStepClick = function(e) {
    var mixIngredients = app.viewController.views.mixIngredients;
    e.preventDefault();

    app.router.navigate(mixIngredients.slug);
};
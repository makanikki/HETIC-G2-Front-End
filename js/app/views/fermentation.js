var Fermentation = function() {

    this.id = "fermentation";
    this.slug = "fermentation";
    View.apply(this, arguments);

    this.imagesAreLoaded = false;

    this.imgBase = 'assets/images/fermentation/fermentation-00';

    for( var i = 0; i <= 270; i+=3){
        this.imagesToLoad[ 'frame-' + i] = this.getImgPath( i );
    }

};

Fermentation.prototype = Object.create(View.prototype);

Fermentation.prototype.animateIn = function() {

    View.prototype.animateIn.call(this);

    var self = this;

    if ( !this.loaded ) return;

    this.domElem.fadeIn(function(){
        self.onAnimateIn();
    });

};

Fermentation.prototype.animateOut = function() {

    View.prototype.animateOut.call(this);

    var self = this;

    this.domElem.fadeOut(function(){
        self.onAnimateOut();
    });

};

Fermentation.prototype.getSelectors = function() {
    this.canvas = this.domElem.find('#animation-fermentation');
    this.context = this.canvas[0].getContext('2d');
    this.btnNextStep = this.domElem.find('#next-button');
    this.reloadLink = this.domElem.find('#reload-fermentation');
};

Fermentation.prototype.bind = function() {
    var self = this;
    this.getSelectors();
    View.prototype.bind.call(this);
    this.start();

    this.reloadLink.on('click', $.proxy(this.onReloadLinkClick, this));
};

Fermentation.prototype.onLoaderComplete = function() {
    var self = this;
    $.each( this.imagesToLoad, function(id, url){
        self.images.push( self.loader.queue.getResult( id ));
    });
    this.imagesAreLoaded = true;
};

Fermentation.prototype.resize = function() {
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

Fermentation.prototype.update = function() {
    if (this.imagesAreLoaded == true) {
        var frame = this.getFrame();
        if (typeof frame != 'undefined' && frame != this.currentFrame) {
            this.clear();
            this.draw(frame);
            this.currentFrame = frame;
        }

        if (this.index == this.images.length) {
            this.animationEnded = true;
            this.return;
            this.btnNextStep.fadeIn();
            this.reloadLink.fadeIn();
        };
    }
};

Fermentation.prototype.onReloadLinkClick = function(e) {
    this.getSelectors();
    e.preventDefault();

    this.btnNextStep.fadeOut();
    this.reloadLink.fadeOut();
    this.index = 0;

    this.update();
};


var waterWheat = function() {

    this.id = "waterWheat";
    this.slug = "water-wheat";
    View.apply(this, arguments);

    this.ratio = 1920 / 1080;
    this.currentFrame = null;

    this.images = [];

    this.imagesToLoad = {};

    this.index = 0;

    this.imgBase = 'assets/images/water-wheat/ble_bac_water_00';

    for( var i = 0; i <= 299; i++ ){
        this.imagesToLoad[ 'frame-' + i] = this.getImgPath( i );
    }
};

waterWheat.prototype = Object.create(View.prototype);

waterWheat.prototype.animateIn = function() {

    View.prototype.animateIn.call(this);

    var self = this;

    if ( !this.loaded ) return;

    this.domElem.fadeIn(function(){
        self.onAnimateIn();
    });

};

waterWheat.prototype.animateOut = function() {

    View.prototype.animateOut.call(this);

    var self = this;

    this.domElem.fadeOut(function(){
        self.onAnimateOut();
    });

};

waterWheat.prototype.getSelectors = function() {
    this.canvas = this.domElem.find('#animation-water-wheat');
    this.context = this.canvas[0].getContext('2d');
    this.btnNextStep = this.domElem.find('#next-button');
    this.reloadLink = this.domElem.find('#reload-water-wheat');
};

waterWheat.prototype.bind = function() {
    this.getSelectors();
    View.prototype.bind.call(this);
    this.start();

    this.reloadLink.on('click', $.proxy(this.onReloadLinkClick, this));
};

waterWheat.prototype.getImgPath = function(i) {
    var prefix = '';

    if (i < 100) {
        prefix += '0';
    }

    if (i < 10) {
        prefix += '0';
    }

    return this.imgBase + prefix + i + '.png';
};

waterWheat.prototype.start = function() {
    $(window).on('resize', $.proxy(this.resize, this));

    this.resize();

    this.loader = new Loader();
    this.loader.addImages(this.imagesToLoad);
    this.loader._onComplete.add(this.onLoaderComplete, this);

    this.loader.start();
};

waterWheat.prototype.onLoaderComplete = function() {
    var self = this;
    $.each( this.imagesToLoad, function(id, url){
       self.images.push( self.loader.queue.getResult( id ));
    });
};

waterWheat.prototype.resize = function() {
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
}

waterWheat.prototype.clear = function() {
    this.context.clearRect( 0, 0, this.videoW, this.videoH);
};

waterWheat.prototype.getFrame = function() {
    if (this.index < 299) {
        this.index++;
    }
    console.log(this.index);
    return this.images[this.index];
};

waterWheat.prototype.draw = function( img ) {
    this.getSelectors();
    this.context.drawImage( img, 0, 0, this.videoW, this.videoH );
};

waterWheat.prototype.update = function() {
    var frame = this.getFrame();
    var self = this;
    if (typeof frame != 'undefined' && frame != this.currentFrame) {
        this.clear();
        this.draw( frame );
        this.currentFrame = frame;
    }

    if (this.index == 299) {
        self.return;
        this.btnNextStep.fadeIn();
        this.reloadLink.fadeIn();
    };
};

waterWheat.prototype.onReloadLinkClick = function(e) {
    this.getSelectors();
    e.preventDefault();

    this.btnNextStep.fadeOut();
    this.reloadLink.fadeOut();
    this.index = 0;
    console.log(this.index);
    this.update();
};

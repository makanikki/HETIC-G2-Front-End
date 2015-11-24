var cutWheat = function () {

    this.id = "cutWheat";
    this.slug = "cut-wheat";
    View.apply(this, arguments);

    this.ratio = 1920 / 1080;
    this.currentFrame = null;

    this.images = [];

    this.imagesToLoad = {};

    this.index = 0;

    this.imgBase = 'assets/images/cut-wheat/cut_ble00';

    for( var i = 0; i <= 179; i++ ){

        this.imagesToLoad[ 'frame-' + i ] = this.getImgPath( i );

    }

};

cutWheat.prototype = Object.create(View.prototype);

cutWheat.prototype.animateIn = function() {

    View.prototype.animateIn.call(this);

    var self = this;

    if ( !this.loaded ) return;

    this.domElem.fadeIn(function(){
        self.onAnimateIn();
    });

};

cutWheat.prototype.animateOut = function() {

    View.prototype.animateOut.call(this);

    var self = this;

    this.domElem.fadeOut(function(){
        self.onAnimateOut();
    });

};

cutWheat.prototype.getSelectors = function() {
    this.canvas = this.domElem.find('#animation-cut-wheat');
    this.context = this.canvas[0].getContext('2d');
    this.rangeInteraction = this.domElem.find('.range-interaction');
    this.rangeInstruction = this.domElem.find('.instructions-cut-wheat');
    this.btnNextStep = this.domElem.find('#next-button');
    this.reloadLink = this.domElem.find('.reload-cut-wheat');
};

cutWheat.prototype.bind = function() {
    this.getSelectors();
    View.prototype.bind.call(this);
    this.start();
};

cutWheat.prototype.getImgPath = function(i) {
    var prefix = '';

    if (i < 100) {
        prefix += '0';
    }

    if (i < 10) {
        prefix += '0';
    }

    return this.imgBase + prefix + i + '.png';
};

cutWheat.prototype.start = function() {
    $(window).on('resize', $.proxy(this.resize, this));

    this.resize();

    this.loader = new Loader();

    this.loader.addImages(this.imagesToLoad);

    this.loader._onComplete.add(this.onLoaderComplete, this);

    this.loader.start();
};

cutWheat.prototype.onLoaderComplete = function() {
    var self = this;
    $.each( this.imagesToLoad, function(id, url){

        self.images.push( self.loader.queue.getResult( id ) );

    });
};

cutWheat.prototype.resize = function() {
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

cutWheat.prototype.clear = function() {
    this.context.clearRect( 0,0, this.videoW, this.videoH );
};

cutWheat.prototype.getFrame = function() {
    this.index = this.rangeInteraction.val();
    return this.images[this.index];
};

cutWheat.prototype.draw = function( img ) {
    this.getSelectors();
    this.context.drawImage( img, 0, 0, this.videoW, this.videoH );
};

cutWheat.prototype.update = function() {
    var frame = this.getFrame();
    var self = this;
    if (typeof frame != 'undefined' && frame != this.currentFrame) {
        this.clear();
        this.draw( frame );
        this.currentFrame = frame;
    }

    if (this.index == 179) {
        this.rangeInteraction.fadeOut();
        this.rangeInstruction.fadeOut(function() {
            self.btnNextStep.fadeIn();
            self.reloadLink.fadeIn();

        });

    }
};








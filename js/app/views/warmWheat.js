var warmWheat = function() {

    this.id = "warmWheat";
    this.slug = "warm-wheat";
    View.apply(this, arguments);

    this.imgBase = 'assets/images/warm-wheat/on_met_le_chauffage_00';

    for( var i = 300; i <= 480; i += 3 ){
        this.imagesToLoad[ 'frame-' + i] = this.getImgPath( i );
    }

};

warmWheat.prototype = Object.create(View.prototype);

warmWheat.prototype.animateIn = function() {

    View.prototype.animateIn.call(this);

    var self = this;

    if ( !this.loaded ) return;

    this.domElem.fadeIn(function(){
        self.onAnimateIn();
    });

};

warmWheat.prototype.animateOut = function() {

    View.prototype.animateOut.call(this);

    var self = this;

    this.domElem.fadeOut(function(){
        self.onAnimateOut();
    });

};

warmWheat.prototype.getSelectors = function() {
    this.canvas = this.domElem.find('#animation-warm-wheat');
    this.context = this.canvas[0].getContext('2d');
    this.btnNextStep = this.domElem.find('#next-button');
    this.reloadLink = this.domElem.find('#reload-water-wheat');
};

warmWheat.prototype.bind = function() {
    this.getSelectors();
    View.prototype.bind.call(this);
    this.start();

    this.reloadLink.on('click', $.proxy(this.onReloadLinkClick, this));
};

warmWheat.prototype.onLoaderComplete = function() {
    var self = this;
    $.each( this.imagesToLoad, function(id, url){
       self.images.push( self.loader.queue.getResult( id ));
    });
};

warmWheat.prototype.resize = function() {
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

warmWheat.prototype.update = function() {
    var frame = this.getFrame();
    var self = this;
    if (typeof frame != 'undefined' && frame != this.currentFrame) {
        this.clear();
        this.draw( frame );
        this.currentFrame = frame;
    }

    if (this.index == this.images.length - 1) {
        //self.return;
        this.btnNextStep.fadeIn();
        this.reloadLink.fadeIn();
    };
};

warmWheat.prototype.onReloadLinkClick = function(e) {
    this.getSelectors();
    e.preventDefault();

    this.btnNextStep.fadeOut();
    this.reloadLink.fadeOut();
    this.index = 0;
    this.update();
};


var mixIngredients = function() {

    this.id = 'mixIngredients';
    this.slug = 'mix-ingredients';
    View.apply(this, arguments);

    this.startAnimation = false;

    this.imagesAreLoaded = false;

    this.imgBase = 'assets/images/mix-ingredients/mix-ingredients-00';

    for( var i = 0; i <= 333; i+=3 ){
        this.imagesToLoad[ 'frame-' + i] = this.getImgPath( i );
    }
}

mixIngredients.prototype = Object.create(View.prototype);

mixIngredients.prototype.animateIn = function() {

    View.prototype.animateIn.call(this);

    var self = this;

    if ( !this.loaded ) return;

    this.domElem.fadeIn(function(){
        self.onAnimateIn();
    });

};

mixIngredients.prototype.animateOut = function() {

    View.prototype.animateOut.call(this);

    var self = this;

    this.domElem.fadeOut(function(){
        self.onAnimateOut();
    });

};

mixIngredients.prototype.getSelectors = function() {
    this.canvas = this.domElem.find('#animation-mix-ingredients');
    this.context = this.canvas[0].getContext('2d');
    this.btnNextStep = this.domElem.find('#next-button');
    this.reloadLink = this.domElem.find('#reload-mix-ingredients');
    this.startRange = this.domElem.find('.range-interaction');
    this.informationAnimation = this.domElem.find('.information');
    this.instructionInteraction = this.domElem.find('.instructions-mix-ingredients');
};

mixIngredients.prototype.bind = function() {
    this.getSelectors();
    View.prototype.bind.call(this);
    this.start();

    this.reloadLink.on('click', $.proxy(this.onReloadLinkClick, this));
};

mixIngredients.prototype.onLoaderComplete = function() {
    var self = this;
    $.each( this.imagesToLoad, function(id, url){
        self.images.push( self.loader.queue.getResult( id ));
    });
    console.log('images loaded');
    this.imagesAreLoaded = true;
};

mixIngredients.prototype.resize = function() {
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

mixIngredients.prototype.update = function() {
    if (this.imagesAreLoaded == true && this.startRange.val() == 10) {
        this.startRange.fadeOut();
        this.instructionInteraction.fadeOut();
        var frame = this.getFrame();
        var self = this;
        if (typeof frame != 'undefined' && frame != this.currentFrame) {
            this.clear();
            this.draw(frame);
            this.currentFrame = frame;
        }

        if (this.index == 55) {
            console.log('hops');
            this.informationAnimation.html('Hops is added after water');
        };

        if (this.index == this.images.length) {
            this.btnNextStep.fadeIn();
            this.reloadLink.fadeIn();
        };
    }
}

mixIngredients.prototype.onReloadLinkClick = function(e) {
    e.preventDefault();

    this.btnNextStep.fadeOut();
    this.btnNextStep.fadeOut();
    this.reloadLink.fadeOut();
    this.startRange.val(0).change();
    this.index = 0;
    this.startAnimation = false;
    this.instructionInteraction.fadeIn();
    this.startRange.fadeIn();
    this.update();
}


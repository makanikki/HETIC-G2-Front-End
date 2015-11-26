var waterWheat = function() {

    this.id = "waterWheat";
    this.slug = "water-wheat";
    View.apply(this, arguments);

    this.animationEnded = false;
    this.scrollTriggered = false;

    this.imagesAreLoaded = false;

    this.imgBase = 'assets/images/water-wheat/ble_bac_water_00';

    for( var i = 0; i <= 299; i += 3 ){
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
    this.scrollProgress = this.domElem.find('#scroll-progress');
};

waterWheat.prototype.bind = function() {
    var self = this;
    this.getSelectors();
    View.prototype.bind.call(this);
    this.start();

    this.reloadLink.on('click', $.proxy(this.onReloadLinkClick, this));
    this.btnNextStep.on('click', $.proxy(this.onBtnNextStepClick, this));
    VirtualScroll.on(function(e) {
        self.onVirtualScroll(e);
    });
};

waterWheat.prototype.onLoaderComplete = function() {
    var self = this;
    $.each( this.imagesToLoad, function(id, url){
       self.images.push( self.loader.queue.getResult( id ));
    });
    this.imagesAreLoaded = true;
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

waterWheat.prototype.update = function() {
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
            this.scrollProgress.fadeIn();
        };
    }
};

waterWheat.prototype.onReloadLinkClick = function(e) {
    this.getSelectors();
    e.preventDefault();

    this.btnNextStep.fadeOut();
    this.reloadLink.fadeOut();
    this.index = 0;

    this.update();
};

waterWheat.prototype.onBtnNextStepClick = function(e) {
    e.preventDefault();

    var warmWheat = app.viewController.views.warmWheat;

    this.animateOut();

    app.router.navigate(warmWheat.slug);

};

waterWheat.prototype.onVirtualScroll = function(e) {
    var maximumScroll = -1000;
    // Check if the user scrolls up
    if (e.deltaY < 0) {
        if (this.animationEnded) {
            var percentage = e.y / maximumScroll * 100;
            var cssToSet = (percentage < 100) ? percentage : 100;

            this.scrollProgress.find('#progress-bar').css('height', cssToSet);
        }

        if (e.y < maximumScroll && !this.scrollTriggered) {
            this.scrollTriggered = true;
            var warmWheat = app.viewController.views.warmWheat;

            //$('#main').append(warmWheat.dom);

            //this.animateOut();
            app.router.navigate(warmWheat.slug);
        }
    }
};

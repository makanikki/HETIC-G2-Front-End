var Router = function(){

	// Create navigate event
	this._onNavigate = new signals.Signal();

	// Create routes
	this.createRoutes();

};

// Init router
Router.prototype.init = function() {

	var self = this;

	// Bind HistoryJS state change
	History.Adapter.bind(window, "statechange", function(e){

		self.onStateChange(e);

	});

	// Parse first token
	this.onStateChange();

};

// On state change
Router.prototype.onStateChange = function(e) {
	
	// Get token
	var token = this.getToken();

	// Parse token - test if it matches a route
	crossroads.parse( token );

};

// Create routes
Router.prototype.createRoutes = function() {

	var self = this;

	// Homepage
	crossroads.addRoute( '', function(){

		// Dispatch navigate event
		self._onNavigate.dispatch({
			view: 'home'
		});

		console.log( '## Navigate view home' );

	});

	crossroads.addRoute( '/cut-wheat', function() {

			self._onNavigate.dispatch({
				 view: 'cutWheat'
			});

			console.log( '## Navigate view cutWheat' );
	});

	crossroads.addRoute( '/water-wheat', function() {

		self._onNavigate.dispatch({
			view: 'waterWheat'
		});

		console.log( '## Navigate view waterWheat' );
	});

	crossroads.addRoute( '/warm-wheat', function() {

		self._onNavigate.dispatch({
			view: 'warmWheat'
		});

		console.log( '## Navigate view warmWheat' );
	});

    crossroads.addRoute( '/crush-wheat', function() {

            self._onNavigate.dispatch({
                view: 'crushWheat'
            });

            console.log('## Navigate view crushWheat');
    });

    crossroads.addRoute( '/mix-ingredients', function() {

            self._onNavigate.dispatch({
                view: 'mixIngredients'
            });

            console.log('## Navigate view mixIngredients');
    });

};

// Navigate
Router.prototype.navigate = function( href ) {
	
	History.pushState(null, null, href);

};

// Get token from History hash
Router.prototype.getToken = function() {
	
	var token = History.getState().hash;

	if ( token.indexOf('?') != -1 ){

		var tokenSplit = token.split('?');
		return tokenSplit[0];

	} else {

		return token;

	}

};

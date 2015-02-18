/*global define*/
define(function ( ) {
	'use strict';

	return {

		// Copied from senseUtils - https://github.com/skokenes/senseUtils/blob/master/README.md
		destroyObj: function ( app, qId ) {
			app.model.session.socket.send( JSON.stringify( {
				"jsonrpc": "2.0",
				"id": 2,
				"method": "DestroySessionObject",
				"handle": 1,
				"params": qId instanceof Array ? qId : [qId]
			} ) );
		}

	};

} );

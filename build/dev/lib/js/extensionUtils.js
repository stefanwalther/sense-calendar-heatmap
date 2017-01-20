/*!

* sense-calendar-heatmap - Qlik Sense Visualization Extension with a diverging color scale. The values are displayed as colored cells per day. Days are arranged into columns by week, then grouped by month and years.
*
* @version v0.2.5
* @link https://github.com/stefanwalther/qsCalendarHeatmap
* @author Stefan Walther
* @license MIT
*/


/*global define*/
define( [
	'jquery',
	'underscore'
], function ( $ /*, _*/ ) {
	'use strict';

	return {

		/**
		 * Add a style to the document's header.
		 * @param cssContent (String)
		 */
		addStyleToHeader: function ( cssContent ) {
			$( "<style>" ).html( cssContent ).appendTo( "head" );
		},

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

/*global define*/
define( [], function () {
	'use strict';

	// ****************************************************************************************
	// Calendar View Definition
	// ****************************************************************************************

	var uniqueDay = {
		ref: "props.uniqueDay",
		label: "Unique Day",
		type: "string",
		expression: "optional"
	};

	// ****************************************************************************************
	// Property Panel Definition
	// ****************************************************************************************

	// Appearance Panel
	var appearancePanel = {
		uses: "settings",
		items: {
			settings: {
				type: "items",
				label: "Settings",
				items: {
					uniqueDay: uniqueDay
				}
			}
		}
	};

	var dataPanel = {
		items: {
			data: {
				type: "items",
				label: "Data",
				items: {}
			}
		}
	};

	// Return values
	return {
		type: "items",
		component: "accordion",
		items: {
			appearance: appearancePanel

		}
	};

} );

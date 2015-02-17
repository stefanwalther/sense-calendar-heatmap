/*global define*/
define( [], function () {
	'use strict';

	// ****************************************************************************************
	// Calendar View Definition
	// ****************************************************************************************

	var uniqueDay = {
		ref: "props.uniqueDay",
		label: "Field containing the unique day",
		type: "string",
		expression: ""
	};

	var uniqueDayValue = {
		ref: "props.uniqueDayValue",
		label: "Value expression",
		type: "string",
		expression: ""
	};

	var uniqueDayTooltip = {
		ref: "props.uniqueDayTooltip",
		label: "Tooltip expression",
		type: "string",
		expression: ""
	};

	// ****************************************************************************************
	// Debug Mode
	// ****************************************************************************************
	var debugMode = {
		type: "boolean",
		ref: "isDebug",
		component: "switch",
		label: "Debug Mode",
		options: [
			{
				value: false,
				label: "Off"
			},
			{
				value: true,
				label: "On"
			}
		],
		defaultValue: false
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
				label: "Debug Mode",
				items: {
					debugMode: debugMode
				}
			}
		}
	};

	var dataPanel = {
		type: "items",
		label: "Data",
		items: {
			MyData: {
				items: {
					uniqueDay: uniqueDay,
					uniqueDayValue: uniqueDayValue,
					uniqueDayTooltip: uniqueDayTooltip

				}
			}
		}
	};

	// Return values
	return {
		type: "items",
		component: "accordion",
		items: {
			dataPanel: dataPanel,
			appearance: appearancePanel

		}
	};

} );

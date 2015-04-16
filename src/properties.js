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
		expression: "",
		show: true
	};

	var uniqueDayValue = {
		ref: "props.uniqueDayValue",
		label: "Value expression",
		type: "string",
		expression: "",
		show: true
	};

	var uniqueDayTooltip = {
		ref: "props.uniqueDayTooltip",
		label: "Tooltip expression",
		type: "string",
		expression: "",
		show: true
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
		defaultValue: false,
		show: true
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
		label: "Data",
		component: "items",
		items: {
			MyData: {
				component: "items",
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

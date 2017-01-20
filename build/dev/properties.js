/*!

* sense-calendar-heatmap - Qlik Sense Visualization Extension with a diverging color scale. The values are displayed as colored cells per day. Days are arranged into columns by week, then grouped by month and years.
*
* @version v0.2.5
* @link https://github.com/stefanwalther/qsCalendarHeatmap
* @author Stefan Walther
* @license MIT
*/


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
	
	var sundayisLastDayOfWeek = {
		ref: "props.sundayIsLastDayOfWeek",
		label: "Sunday is last day of a week",
		type: "boolean",
		defaultValue: false
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
					uniqueDayTooltip: uniqueDayTooltip,
					sundayisLastDayOfWeek: sundayisLastDayOfWeek
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

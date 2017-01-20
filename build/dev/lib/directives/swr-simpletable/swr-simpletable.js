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
	'qvangular',
	'text!./swr-simpletable.ng.html',
	'text!./swr-simpletable.css'

], function ( $, qvangular, ngTemplate, cssContent ) {
	'use strict';

	$( "<style>" ).html( cssContent ).appendTo( "head" );

	qvangular.directive( 'swrSimpleTable', [function () {

		return {
			restrict: 'EA',
			scope: {
				hyperCube: '='
			},
			template: ngTemplate,
			link: function ( /*$scope*/ ) {

				//console.log( 'swr-simpletable:data', $scope.hyperCube );

			}
		};

	}] );

} );
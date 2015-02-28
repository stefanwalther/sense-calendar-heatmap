/*global
 define,
 console
 */
/*jslint    devel:true,
 white: true
 */
define( [
		'jquery',
		'underscore',
		'angular',
		'qlik',
		'./properties',
		'./initialproperties',
		'./lib/js/extensionUtils',

		'text!./lib/css/style.css',
		'text!./swr-calendarheatmap.ng.html',

		// no return value
		'./lib/directives/swr-simpletable/swr-simpletable',
		'./lib/directives/swr-calendarview/swr-calendarview'
	],
	function ( $, _, angular, qlik, props, initProps, extensionUtils, cssContent, ngTemplate ) {
		'use strict';
		extensionUtils.addStyleToHeader( cssContent );

		function transformData ( hc ) {
			var data = [];

			if ( hc ) {
				var counter = -1;
				for ( var i = 0; i < hc.qHyperCube.qDataPages[0].qMatrix.length; i++ ) {
					counter++;
					if ( !hc.qHyperCube.qDataPages[0].qMatrix[i][0].qIsEmpty && !hc.qHyperCube.qDataPages[0].qMatrix[i][0].qIsNull ) {
						//if ( hc.qHyperCube.qDataPages[0].qMatrix[i][0].qIsEmpty === false || hc.qHyperCube.qDataPages[0].qMatrix[i][0].qIsNull === false ) {
						var dateKey = hc.qHyperCube.qDataPages[0].qMatrix[i][0].qText;
						var val = parseFloat( hc.qHyperCube.qDataPages[0].qMatrix[i][1].qNum );
						var valToolTip = (_.isEmpty( hc.qHyperCube.qDataPages[0].qMatrix[i][1].qText ) ? 'Value: ' + val : hc.qHyperCube.qDataPages[0].qMatrix[i][1].qText);
						data[counter] = {Date: dateKey, Measure: val, ToolTip: valToolTip};
					}
					//}
				}
				//console.log( data );
			}
			return data;
		}

		return {

			definition: props,
			initialProperties: initProps,
			snapshot: {canTakeSnapshot: true},
			template: ngTemplate,
			controller: ['$scope', function ( $scope ) {

				var app = qlik.currApp();
				$scope.hyperCube = null;
				$scope.data = null;

				function createHyperCube () {

					if ( $scope.hyperCube ) {
						//console.log( 'existing cube, so destroy', $scope.hyperCube );

						// destroySessionObject has been introduced in 1.1
						if ( app.destroySessionObject ) {
							app.destroySessionObject( $scope.hyperCube.qInfo.qId )
								.then( function ( reply ) {
									angular.noop();
									console.log( 'destroySessionObject result', reply );
								} );
						} else {
							extensionUtils.destroyObj( app, $scope.hyperCube.qInfo.qId );
						}
					}

					//console.log( 'uniqueDayTooltip', $scope.layout.props.uniqueDayTooltip );

					if ( $scope.layout.props && !_.isEmpty( $scope.layout.props.uniqueDay ) && !_.isEmpty( $scope.layout.props.uniqueDayValue )
					) {

						var cubeDef = {

							qDimensions: [{
								qDef: {
									qFieldDefs: [$scope.layout.props.uniqueDay],
									qSortCriterias: [
										{
											qSortByAscii: 1
										}
									]
								}
							}],
							qMeasures: [{
								qDef: {
									qDef: "=" + $scope.layout.props.uniqueDayValue
								}
							},
								{
									qDef: {
										qDef: "=" + (_.isEmpty( $scope.layout.props.uniqueDayTooltip ) ? '\'\'' : $scope.layout.props.uniqueDayTooltip)
									}
								}

							],
							qInterColumnSortOrder: [0, 1],
							qInitialDataFetch: [
								{
									qTop: 0,
									qLeft: 0,
									qHeight: 1500,
									qWidth: 3
								}
							]
						};

						app.createCube( cubeDef, function ( reply ) {
							//console.log( 'app.createCube', reply );
							$scope.hyperCube = reply;
							$scope.data = transformData( reply );
						} );
					}
				}

				$scope.$watchCollection( 'layout.props', function ( /*newVal*/ ) {
					//console.info( 'properties changed, create cube' );
					createHyperCube();
				} );

			}]
		}
			;

	} )
;

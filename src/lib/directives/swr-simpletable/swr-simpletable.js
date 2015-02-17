/*global define*/
define( [
	'qvangular',
	'text!./swr-simpletable.ng.html',
	'text!./swr-simpletable.css'

], function ( qvangular, ngTemplate, cssContent ) {
	'use strict';

	$( "<style>" ).html( cssContent ).appendTo( "head" );

	qvangular.directive( 'swrSimpleTable', [function () {

		return {
			restrict: 'EA',
			scope: {
				hyperCube: '='
			},
			template: ngTemplate,
			link: function ( $scope ) {

				console.log( 'swr-simpletable:data', $scope.hyperCube );

			}
		}

	}] );

} );
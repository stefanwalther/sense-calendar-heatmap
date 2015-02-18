/*global define*/
define( [
	'qvangular',
	'text!./swr-simpletable.ng.html',

	'css!./swr-simpletable.css'

], function ( qvangular, ngTemplate ) {
	'use strict';

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
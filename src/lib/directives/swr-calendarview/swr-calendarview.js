/*global define*/
define( [
	'jquery',
	'underscore',
	'qvangular',
	'text!./swr-calendarview.ng.html',
	'text!./swr-calendarview.css',
	'text!./colorbrewer.css',
	'./../../js/calendar',

	// no return value
	'./../../external/d3/d3.min'

], function ( $, _, qvangular, ngTemplate, cssContent, cssColorBrewer, calendar ) {
	'use strict';

	qvangular.directive( 'swrCalendarview', [function () {

		$( "<style>" ).html( cssContent ).appendTo( "head" );
		$( "<style>" ).html( cssColorBrewer ).appendTo( "head" );

		/**
		 * Returns the minimum year value.
		 * @param data
		 * @returns {Number}
		 */
		function getMinYear ( data ) {
			var s = d3.values( data )
				.sort( function ( a, b ) { return d3.ascending( a.Date, b.Date ); } )
				[0];
			return (s) ? parseInt( s.Date.substr( 0, 4 ) ) : -1;
		}

		/**
		 * Returns the maximum year value.
		 * @param data
		 * @returns {Number}
		 */
		function getMaxYear ( data ) {
			var s = d3.values( data )
				.sort( function ( a, b ) { return d3.descending( a.Date, b.Date ); } )
				[0];
			return (s) ? parseInt( s.Date.substr( 0, 4 ) ) : -1;
		}

		/**
		 * Return the absolute minimum value.
		 * @param data
		 * @returns {Number}
		 */
		function getMinValue ( data ) {
			var s = d3.values( data )
				.sort( function ( a, b ) { return d3.ascending( a.Measure, b.Measure ); } )
				[0];
			return (s) ? parseFloat( s.Measure ) : null;
		}

		/**
		 * Return the absolute maximum value.
		 * @param data
		 * @returns {Number}
		 */
		function getMaxValue ( data ) {
			var s = d3.values( data )
				.sort( function ( a, b ) { return d3.descending( a.Measure, b.Measure ); } )
				[0];
			return (s) ? parseFloat( s.Measure ) : null;
		}

		/**
		 * Returns a range of the years to display
		 * @param data
		 * @returns {Array}
		 */
		function getYearsRange ( data ) {
			var years = [];
			d3.nest()
				.key( function ( d ) { return d.Date.substr( 0, 4 ) } )
				.sortKeys( d3.ascending )
				.entries( data )
				.forEach( function ( v ) {
					years.push( parseInt( v.key ) );
				} );
			return years;
		}

		/**
		 * Render the D3 Calendar View
		 * @param objectId {string}
		 * @param cvData {object}
		 */
		function renderChart ( objectId, cvData, width ) {

			if ( !cvData || cvData.length === 0 ) {
				return;
			}

			$( '#chart_' + objectId ).empty();

			var minYear = getMinYear( cvData );
			var maxYear = getMaxYear( cvData );

			var w = width - 25,
				pw = 14,
				z = ~~((w - pw * 2) / 53),
				ph = z >> 1,
				h = z * 7;

			var yearsRange = getYearsRange( cvData );

			var vis = d3.select( '#chart_' + objectId )
				.selectAll( "svg" )
				//.data( [1990, 1994] )
				//Todo: exclude empty years by default or add at least an option for doing so
				//.data( d3.range( minYear, (maxYear + 1) ) )
				.data( yearsRange )
				.enter().append( "svg:svg" )
				.attr( "width", w )
				.attr( "height", h + ph * 2 )
				.attr( "class", "RdYlGn" )
				.append( "svg:g" )
				.attr( "transform", "translate(" + pw + "," + ph + ")" );

			vis.append( "svg:text" )
				.attr( "transform", "translate(-6," + h / 2 + ")rotate(-90)" )
				.attr( "text-anchor", "middle" )
				.text( function ( d ) { return d; } );

			vis.selectAll( "rect.D3CV_day" )
				.data( calendar.dates )
				.enter().append( "svg:rect" )
				.attr( "x", function ( d ) { return d.week * z; } )
				.attr( "y", function ( d ) { return d.day * z; } )
				.attr( "class", "D3CV_day" )
				.attr( "width", z )
				.attr( "height", z );

			vis.selectAll( "path.D3CV_month" )
				.data( calendar.months )
				.enter().append( "svg:path" )
				.attr( "class", "D3CV_month" )
				.attr( "d", function ( d ) {
					return "M" + (d.firstWeek + 1) * z + "," + d.firstDay * z
						+ "H" + d.firstWeek * z
						+ "V" + 7 * z
						+ "H" + d.lastWeek * z
						+ "V" + (d.lastDay + 1) * z
						+ "H" + (d.lastWeek + 1) * z
						+ "V" + 0
						+ "H" + (d.firstWeek + 1) * z
						+ "Z";
				} );

			var data = d3.nest()
				.key( function ( d ) { return d.Date; } )
				//.rollup(function (d) { return d[0].Measure; })
				.rollup( function ( d ) { return {"Measure": d[0].Measure, "ToolTip": d[0].ToolTip}; } )
				.map( cvData );

			var minValue = getMinValue( cvData );
			var maxValue = getMaxValue( cvData );

			// If only a single value is displayed, we have to prevent that min and max value are equal.
			if ( minValue === maxValue ) {
				minValue = minValue * 2;
				maxValue = maxValue * 2;
			}

			var divTooltip = d3.select( '#chart_' + objectId ).append( 'div' )
				.attr( 'class', 'D3CV_ToolTip' )
				.style( 'opacity', 0 );

			var divAction = d3.select( '#chart_' + objectId ).append( 'div' )
				.attr( 'class', 'D3CV_ToolTip' )
				.style( 'opacity', 0 );

			var color = d3.scale.quantize()
					//.domain([-.05, .05])
					.domain( [minValue, maxValue] )
					.range( d3.range( 9 ) )
				;

			var leftOffset = $( '#chart_' + objectId ).offset().left;
			var topOffset = $( '#chart_' + objectId ).offset().top;

			vis.selectAll( "rect.D3CV_day" )
				//.attr("class", function (d) { return "D3CV_day q" + ((d !== 'undefined' && d.Date !== 'undefined' && data[d.Date].Measure !== 'undefined') ? color(data[d.Date].Measure) : 'xx') + "-9"; })
				.attr( "class", function ( d ) {

					// In case we have selected only a single date, if we have only
					// a single items, let's not choose one of the colors but gray instead
					if ( !_.isEmpty( data[d.Date] ) ) {
						if ( Object.keys( data ).length > 1 ) {
							return "D3CV_day q" + color( data[d.Date].Measure ) + "-9";
						} else {
							return "D3CV_day D3CV_day_single";
						}
					}
					else {
						return "D3CV_day";
					}

				} )
				.on( 'click', function ( d ) {
					//console.log('Select Texts in Column' + d.Date);
					//_t.Data.SelectTextsInColumn( 0, true, d.Date );

					//console.log('Check it ...');
					//console.log(d);
					//console.log(d.Date);
					//console.log(data[d.Date]);

					//Prototype code for adding a right-click context menu to the chart.
					//divAction.transition()
					//    .duration(200)
					//    .style('opacity', .99)
					//    .style('display', 'block');
					//divAction.html('Select date <br/>Select week<br/>Select month')
					//    .style('left', (d3.event.pageX) - leftOffset + 'px')
					//    .style('top', ((d3.event.pageY) - divTooltip.attr('height') - topOffset + 5) + 'px');
				} )
				.on( 'mouseover', function ( d ) {
					//console.clear();
					//console.log(d.Date);
					//console.log(data[d.Date]);
					divTooltip.transition()
						.duration( 200 )
						.style( 'opacity', .99 )
						.style( 'display', 'block' );
					divTooltip.html( 'Date: ' + d.Date + '<br/>' + (!_.isEmpty( data[d.Date] ) ? data[d.Date].ToolTip : '') )
						.style( 'left', (d3.event.pageX) - leftOffset + 'px' )
						.style( 'top', ((d3.event.pageY) - divTooltip.attr( 'height' ) - topOffset + 5) + 'px' );
				} )
				.on( 'mouseout', function ( d ) {
					divTooltip.transition()
						.duration( 200 )
						.style( 'opacity', 0 )
						.style( 'display', 'none' );
				} )

				// Do not display the title anymore since we have the tooltip
				//.append("svg:title")
				//  .text(function (d) { return d.Date + ": " + (data[d.Date]); })

			;

		}

		return {
			restrict: 'EA',
			scope: {
				objectId: '=',
				cvData: '='
			},
			template: ngTemplate,
			link: function ( $scope, $element, $attrs ) {

				$scope.$watchCollection( 'cvData', function ( newVal ) {
					//console.log( 'swr-calendarview:newVal', newVal );
					$scope.render();
				} );

				$scope.$watch(
					function () {
						return [$element[0].offsetWidth, $element[0].offsetHeight].join( 'x' );
					},
					function ( newVal, oldVal ) {
						if ( newVal !== oldVal ) {
							$scope.render();
						}
					}
				);

				$scope.render = function () {

					//console.info( 'render Chart', $scope.objectId );
					//console.log( '-- data', $scope.cvData );

					renderChart( $scope.objectId, $scope.cvData, $element[0].offsetWidth )

				}

			}
		}

	}] );

} );
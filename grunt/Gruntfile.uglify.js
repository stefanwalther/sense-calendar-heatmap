/*global module*/
/*jshint
 camelcase: false
 */
module.exports = function ( grunt ) {
	'use strict';

	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	return {

		options: {
			mangle: true,
			beautify: false,
			preserveComments: false,
			compress: {
				drop_console: true
			}
		},
		release: {
			files: [
				{
					src: ['../dist/<%= projectConfig.general.ExtensionNamespace %><%= projectConfig.general.ExtensionNameSafe%>.js'],
					dest: '../dist/<%= projectConfig.general.ExtensionNamespace %><%= projectConfig.general.ExtensionNameSafe%>.js'
				},
				{
					src: ['../dist/properties.js'],
					dest: '../dist/properties.js'
				},
				{
					src: ['../dist/initialproperties.js'],
					dest: '../dist/initialproperties.js'
				},
				{
					src: ['../dist/lib/js/calendar.js'],
					dest: '../dist/lib/js/calendar.js'
				},
				{
					src: ['../dist/lib/js/extensionUtils.js'],
					dest: '../dist/lib/js/extensionUtils.js'
				}
			]
		}
	};
};
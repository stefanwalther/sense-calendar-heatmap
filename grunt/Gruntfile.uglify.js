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
					expand: true,
					cwd: '../dist/',
					src: ['**/*.js', '!**/*.min.js'],
					dest: '../dist/'
				}
			]
		}
	};
};
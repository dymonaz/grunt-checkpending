/*
 * grunt-checkpending
 * https://github.com/dymonaz/grunt-checkpending
 *
 * Copyright (c) 2013 Dominykas Blyžė
 * Licensed under the MIT license.
 */

'use strict';

var shell = require("shelljs");

module.exports = function (grunt) {

	grunt.registerTask('checkpending', 'Check that we have no pending changes before proceeding.', function (force) {

		if (grunt.option('no-checkpending') && !force) {
			grunt.log.writeln("Pending check overridden via command line.");
			return;
		}

		var statusOutput = shell.exec("git status -s", { silent: !!grunt.option('verbose') });
		if (statusOutput.code !== 0) {
			grunt.fail.fatal("Failed to detect the current status");
		}

		var status = statusOutput.output.trim();
		if (status !== "") {
			grunt.fail.fatal("You have pending changes.");
		}

	});
};

# Change Log

## Version 0.1.4
date: 2015-04-16
**Fixes:**
* Make the property panel "future proof" + a temporary bug fix to get the property panel also working for MS11 (unofficial internal release)

## Version 0.1.3
Date: 2015-03-13

**Fixes:**
* Fix to send the correct width to renderChart and detect when it needs to redraw due to the changes in screen size. 
	* Thanks to [qliktab](https://github.com/qliktap) (based on [PR #5](https://github.com/stefanwalther/qsCalendarHeatmap/pull/5))
* Better and correct minification of files, ensure that all console.logs are removed

## Version 0.1.2
Date: 2015-02-28

**Enhancements:**
* Supress display of empty years. 
	* Thanks to [andre-ferreira-qlik](https://github.com/andre-ferreira-qlik) ([PR #2](https://github.com/stefanwalther/qsCalendarHeatmap/pull/2))
* Fixed issue that the grunt:release task didn't remove console.xx() entries.


## Version 0.1.1
Date: 2015-02-18

* Fixes: 
	* Don't display years without data

## Version 0.1.0
Date: 2015-02-17

* Initial Commit
* Basic template and build system created using the Yeoman Generator for Qlik Sense Extensions (https://github.com/stefanwalther/generator-qsExtension)

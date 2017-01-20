# Calendar Heatmap
Qlik Sense Visualization Extension with a diverging color scale. The values are displayed as colored cells per day. Days are arranged into columns by week, then grouped by month and years.

## Screenshot

![](https://github.com/stefanwalther/sense-calendar-heatmap/raw/gh-pages/images/Calendar-Heatmap-for-Qlik-Sense_TwoInstances.png)

## Installation

1. Download the [latest version](https://github.com/stefanwalther/sense-calendar-heatmap/raw/master/build/sense-calendar-heatmap_latest.zip)
2. Qlik Sense Desktop
	* To install, copy all files in the .zip file to folder "C:\Users\%USERNAME%\Documents\Qlik\Sense\Extensions\swr-CalendarHeatmap"
3. Qlik Sense Server
	* See instructions [how to import an extension on Qlik Sense Server](http://help.qlik.com/sense/en-US/online/#../Subsystems/Qlik_Management_Console_help/Content/QMC_Resources_Extensions_AddingExtensions.htm?Highlight=extension)

There is also a [demo available](https://github.com/stefanwalther/sense-calendar-heatmap/raw/master/demo/Extension%20-%20Calendar%20View.qvf), if you want to see a working example.

## Configuration

After installing the extension the following properties can be set:

### Data Definition

Property 				| Description 						| Values
-----------------------	| ---------------------------------	| --------------------------
**Unique day**			| Field containing the unique day. Note that you just have to type in the field name without equal sign (`=`). | **Example:**<br/> `Dim1` or `[Dimension with Space]`
**Value**				| Expression which needs to result in a valid numeric number (positive or negative).<br/><br/>Note: Define the expression without a leading equal sign (`=`). | **Example:**<br/> `[round(Sum([TableX.FieldWhatever]),0.001)`
**Tooltip:**			| You can (optionally) define the tool tip display when hovering a day.

### Appearance / Debug Mode
If you want to see which data are passed to the Calendar Heatmap visualization, you can temporarily enable the Debug Mode. By doing so only the data returned from the QIX engine will be displayed in a table.

The Debug Mode can only be activated and you'll only see the resulting table in Edit Mode of Qlik Sense.

## Limitations
* For performance reasons only 1500 rows will be returned (so 1500 days).

## Ideas for Improvement
I'd like to look into the following areas to improve this Visualization Extension for Qlik Sense:

- [x] Skip rendering of years not included in the data
- [ ] Performance improvements
- [ ] Better, configurable label
- [ ] Offer also a week view and maybe other views
- [ ] Support selections (both single days, weeks and years)


## Contributing
Contributing to this project is welcome. The process to do so is outlined below:

1. Create a fork of the project
2. Work on whatever bug or feature you wish
3. Create a pull request (PR)

I cannot guarantee that I will merge all PRs but I will evaluate them all.

## Author

**Stefan Walther**
* [qlikblog.at](http://www.qlikblog.at)
* [twitter/waltherstefan](http://twitter.com/waltherstefan)
* [github.com/stefanwalther](http://github.com/stefanwalther)


## Change Log

See [CHANGELOG.md](https://github.com/stefanwalther/sense-calendar-heatmap/blob/master/CHANGELOG.md)

## License & Copyright
The software is made available "AS IS" without any warranty of any kind under the MIT License (MIT).

See [Additional license information for this solution.](https://github.com/stefanwalther/sense-calendar-heatmap/blob/master/LICENSE.md)

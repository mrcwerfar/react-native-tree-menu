'use strict';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
	StyleSheet,
	ScrollView,
	View,
	Text,
	StatusBar,
	SafeAreaView,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import TreeMenu from './components/TreeMenu';
import menuData from './mymenu.json'; // The menu structure ...

class App extends Component {
	constructor(props, context) {
		super(props, context);
	}

	onMenuItemClick(menuItem) {
		switch (menuItem.id) {
		case 'id_analytics':
			console.log(menuItem.name);
			break;
		case 'id_color_scheme':
			console.log(menuItem.name);
			break;
		case 'id_finger_print':
			console.log(menuItem.name);
			break;
		}
	}

	render() {
		let menuItemSettings = {
			itemClickHandler: item => {
				this.onMenuItemClick(item);
			},

			closeOthersOnOpen: true,

			itemIconOnLeft: true,
			itemOpenCloseIconRight: false,
			itemTextStyle: {fontSize: 25, color:'#900FFF', textAlign: 'left'},
			itemShowIcon: true,
			itemIconSize: 25,
			itemBackgroundColor: '#E0E0E0',
			itemOpenMenuIcon: 'ios-arrow-dropleft-circle',
			itemCloseMenuIcon: 'ios-arrow-dropdown-circle',       //, 'ios-arrow-dropdown-circle', 'ios-arrow-dropleft', 'ios-arrow-dropdown', 'ios-arrow-dropup';
			itemSeparator: true,
			itemBorderRadius: 3,
			itemMarginTop: 0,
			itemMarginBottom: 0,
			itemMarginLeft: 4,
			itemMarginRight: 4,
			itemSeparatorColor: '#909090',
			itemSeparatorMarginTop: 1,
			itemSeparatorMarginBottom: 1,
			itemSeparatorMarginLeft: 4,
			itemSeparatorMarginRight: 4,
			itemIndentValue: 20
		};

		return (
			<View style={{flex: 1}}>
				<StatusBar barStyle="dark-content" />
				<SafeAreaView>
					<ScrollView
						contentInsetAdjustmentBehavior="automatic"
						style={styles.scrollView}>
						<Text style={{fontSize: 30, textAlign: 'center', margin: 10}}>
							MIN MENY
						</Text>
						<TreeMenu
							menuItemSettings={menuItemSettings}
							menuObjects={menuData} />
					</ScrollView>
				</SafeAreaView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	scrollView: {
		backgroundColor: Colors.lighter,
	},
	engine: {
		position: 'absolute',
		right: 0,
	},
	body: {
		backgroundColor: Colors.white,
	},
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
		color: Colors.black,
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
		color: Colors.dark,
	},
	highlight: {
		fontWeight: '700',
	},
	footer: {
		color: Colors.dark,
		fontSize: 12,
		fontWeight: '600',
		padding: 4,
		paddingRight: 12,
		textAlign: 'right',
	},
});

export default App;

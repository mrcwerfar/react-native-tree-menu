'use strict';
/**
 * react-tree-menu test app.
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
import menuData from './mymaterialmenu.json'; // The menu structure ...

class App extends Component {
	constructor(props, context) {
		super(props, context);
	}

	onMenuItemClick(menuItem) {
		switch (menuItem.id) {
		case 'id_analytics':
			console.log("MAIN:" + menuItem.name);
			break;
		case 'id_color_scheme':
			console.log("MAIN:" + menuItem.name);
			break;
		case 'id_finger_print':
			console.log("MAIN:" + menuItem.name);
			break;
		}
	}

	render() {
		let menuItemSettings = {
			closeOthersOnOpen: true,
			itemIconOnLeft: true,
			itemOpenCloseIconRight: false,
			itemTextStyle: {
				fontSize: 18,
				color:'#000000',
				textAlign: 'left',
				marginLeft: 0
			},
			itemStyle: {
				backgroundColor: '#E0E0E0',
				marginBottom: 0,
				marginTop: 0,
				marginLeft: 10,
				marginRight: 4,
				borderRadius: 4,
				height: 50
			},
			itemShowIcon: true,
			itemIconSize: 25,
			itemIconColor: '#000',
			iconStyle: {
			},
			itemSeparator: true,
			itemSeparatorColor: '#A0A0A0',
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
							My Screen Menu
						</Text>
						<TreeMenu
							menuData={menuData}
							menuItemSettings={menuItemSettings}
							itemClickHandler = {
								(item) => { this.onMenuItemClick(item); }}
						/>
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

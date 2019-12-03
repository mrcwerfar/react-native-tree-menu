'use strict';
/**
 * react-tree-screen-menu demo app.
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
import TreeMenu from '../components/TreeMenu';
import SessionScreen from './SessionScreen';
//import menuData from '../exercisemenu.json';  //ES6

class App extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			renderSessionScreen: false,
			renderActivityScreen: false,
			renderProgramScreen: false,
		};
	}

	renderSessionScreen() {
		return (
			<View style={{flex: 1, marginTop: 0}} onLayout={(event) => this.onLayout(event)}>
				<SessionScreen/>
			</View>
		);
	}

	onMenuItemClick(menuItem) {
		switch (menuItem.id) {
		case 'id_new_session':
			console.log('CLICK:' + menuItem.name);
			// Show SessionScreen:
			this.setState({
				renderSessionScreen: true
			});

			// In case of stack navigation:
			//this.props.navigation.navigate('NewSessionScreen');
			break;
		case 'id_activity':
			console.log('CLICK:' + menuItem.name);
			this.setState({
				renderActivityScreen: true
			});
			// In case of stack navigation:
			//this.props.navigation.navigate('ActivityScreen');
			break;
		case 'id_programs':
			console.log('CLICK:' + menuItem.name);
			this.setState({
				renderProgramScreen: true
			});
			// In case of stack navigation:
			//this.props.navigation.navigate('ProgramsScreen');
			break;
		}
	}

	itemOpenCloseHandler(menuItemObject, open) {
		console.log('OpenClose:' + menuItemObject.name + ' ' + String(open));
	}

	render() {
		// Get menu data:
		const menuData = require('../exercisemenu.json');
		// Generic menu item settings:
		let menuItemSettings = {
			closeOthersOnOpen: true,
			defaultIcon: '\u25b6',  // '\u25E6', '\u25cf',
			itemOpenCloseIcon: 'right',
			itemTextStyle: {
				fontSize: 28,
				color:'#000000',
				textAlign: 'left',
				marginLeft: 0
			},
			itemStyle: {
				backgroundColor: '#E0E0E0',
				marginBottom: 0,
				marginTop: 0,
				marginLeft: 4,
				marginRight: 4,
				borderRadius: 3,
			},
			itemShowIcon: true,
			itemIconSize: 40,
			itemIconColor: '#AAA',
			itemOpenCloseIconColor: '#000',
			iconStyle: {
			},
			itemSeparator: true,
			itemSeparatorColor: '#A0A0A0',
			itemSeparatorMarginTop: 1,
			itemSeparatorMarginBottom: 1,
			itemSeparatorMarginLeft: 4,
			itemSeparatorMarginRight: 4,
			itemIndentValue: 40
		};

		if (this.state.renderSessionScreen===true) {
			return this.renderSessionScreen();
		} else {
			return (
				<View style={{flex: 1}}>
					<StatusBar barStyle="dark-content"/>
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
								itemClickHandler={(menuItemObject) => {
									this.onMenuItemClick(menuItemObject);
								}}
								itemOpenCloseHandler={(menuItemObject, open) => {
									this.itemOpenCloseHandler(menuItemObject, open);
								}}
								useCustomItemContentRenderer={false}
							/>
						</ScrollView>
					</SafeAreaView>
				</View>
			);
		}
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

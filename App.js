'use strict';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	ScrollView,
	View,
	StatusBar,
	SafeAreaView
} from 'react-native';

import {
	Colors,
} from 'react-native/Libraries/NewAppScreen';
import TreeMenu from './components/TreeMenu';

class App extends Component {
	constructor(props, context) {
		super(props, context);
	}

	onMenuItemClick(menuItem) {
		console.log(menuItem.id);

		switch (menuItem.id) {
		case 'id_analytics':
			break;
		case 'id_color_scheme':
			break;
		case 'id_finger_print':
			break;
		}
	}

	render() {
		let menuSettings = {
			menuItemClickHandler: (item)=>{this.onMenuItemClick(item);},
			textColor: '#00FF00',
			menuItemBackColor: '#E0E0E0',
			openMenuIcon: 'ios-arrow-dropleft-circle',
			closeMenuIcon: 'ios-arrow-dropdown-circle',
		};

		const menuItems = [
			{
				id: 'id_analytics',
				icon: 'md-analytics',
				name: 'Analytics',
				subItems:[
					{
						id: 'id_analytics_rename',
						icon: 'md-color-wand',
						name: 'Rename',
						subItems:[]
					},
					{
						id: 'id_analytics_copy',
						icon: 'md-airplane',
						name:'Copy',
						subItems:[]
					},{
						id: 'id_analytics_delete',
						icon: 'ios-trash',
						name: 'Delete',
						subItems:[
							{
								id: 'id_analytics_delete_1',
								name: 'No 1',
								subItems:[]
							},
							{
								id: 'id_analytics_delete_2',
								name:'No 2',
								subItems:[]
							},{
								id: 'id_analytics_delete_3',
								name: 'No 3',
								subItems:[]
							}
						]
					}
				]
			},
			{
				id: 'id_color_scheme',
				icon: 'ios-brush',
				name: 'Color scheme',
				subItems:[
					{
						id: 'id_color_scheme_edit1',
						name: 'Edit 1',
						showIcon: false,
						subItems:[]
					},
					{
						id: 'id_color_scheme_edit2',
						name:'Edit  2',
						showIcon: true,
						subItems:[]
					}
				]
			},
			{
				id: 'id_finger_print',
				icon: 'ios-finger-print',
				name: 'Authenticate',
				subItems:[
					{
						id: 'id_finger_print_set1',
						name: 'Settings 1',
						subItems:[]
					},
					{
						id: 'id_finger_print_set2',
						name:'Settings  2',
						subItems:[]
					},{
						id: 'id_finger_print_set3',
						name: 'Settings  3',
						subItems:[]
					}
				]
			}
		];

		return (
			<View style={{flex: 1}}>
				<StatusBar barStyle="dark-content" />
				<SafeAreaView>
					<ScrollView
						contentInsetAdjustmentBehavior="automatic"
						style={styles.scrollView}>

						<TreeMenu
							menuSettings={menuSettings}
							menuObjects={menuItems}>
						</TreeMenu>
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import TreeMenuItem from './TreeMenuItem';

class TreeMenu extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			reRender: false
		};

		if (this.props.menuObjects)
			this.menuObjects = this.props.menuObjects;
		else
			this.menuObjects = [];

		if (this.props.menuSettings)
			this.menuSettings = this.props.menuSettings;
		else
			this.menuSettings = {
				menuItemClickHandler: (item)=>{this.props.onMenuItemClick(item);},
				textColor: '#00FF00',
				menuItemBackColor: '#E0E0E0',
				openMenuIcon: 'ios-arrow-dropleft-circle',
				closeMenuIcon: 'ios-arrow-dropdown-circle',
			};
	}

	static renderSeparator() {
		return(
			<View
				style={{
					borderBottomColor: '#EEEEEE',
					borderBottomWidth: 1,
					marginTop: 1,
					marginBottom: 1,
					marginLeft: 5,
					marginRight: 5,
				}}
			/>
		);
	}

	renderMenu(level, menuObjects) {
		let returnValue=[];
		if (menuObjects !== undefined && menuObjects.length>0) {
			for (let i = 0; i < menuObjects.length; i++) {
				let menuObject = menuObjects[i];
				if (menuObject['openSubMenu'] === undefined)
					menuObject['openSubMenu'] = false;

				let subItems = menuObject.subItems;
				let showDropDownButton=false;
				if (subItems && subItems.length > 0)
					showDropDownButton = true;

				if (menuObject['onClick'] === undefined)
					menuObject['onClick'] = () => {this.menuSettings.menuItemClickHandler(menuObject);};

				returnValue.push(
					<View key={level*10 + i}>
						<TreeMenuItem
							menuObject={menuObject}
							indents={level}
							icon={menuObject.icon}
							openSubMenu={false}
							showMenuItemIcon={menuObject.showIcon!==undefined?menuObject.showIcon:true}
							showDropDownButton={showDropDownButton}
							openMenuIcon={this.menuSettings.openMenuIcon}
							closeMenuIcon={this.menuSettings.closeMenuIcon}
							onOpenSubMenu={
								(menuObject)=>{
									menuObject.openSubMenu = !menuObject.openSubMenu;
									this.setState(
										{
											reRender: !this.state.reRender,
										}
									);
								}
							}/>

						{TreeMenu.renderSeparator()}
					</View>
				);
				if (menuObject.openSubMenu === true) {
					if (subItems && subItems.length > 0)
						returnValue.push(this.renderMenu(level + 1, subItems));
				}
			}
		}
		if (returnValue.length===0)
			returnValue.push(<View/>);
		return returnValue;
	}

	render() {
		return (
			<View>
				{this.renderMenu(0, this.menuObjects)}
			</View>
		);
	}
}

export default TreeMenu;

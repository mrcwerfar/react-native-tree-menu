import React, {Component} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import TreeMenuItem from './TreeMenuItem';

class TreeMenu extends Component {
	constructor(props, context) {
		super(props, context);
		// Prepping;
		this.prepMenuObjects(this.props.menuObjects);

		this.state = {
			reRender: false,
		};
	}

	// Set parent of all menuObjects:
	prepMenuObjects(menuObjects) {
		for (let i = 0; i < menuObjects.length; i++) {
			this.setSubItemParent(menuObjects[i], undefined);
		}
	}

	setSubItemParent(menuObject, parent) {
		menuObject['parent'] = parent;
		if (menuObject.subItems) {
			for (let i = 0; i < menuObject.subItems.length; i++) {
				this.setSubItemParent(menuObject.subItems[i], menuObject);
			}
		}
	}

	renderSeparator() {
		return (
			<View
				style={{
					borderBottomColor: this.props.menuItemSettings.itemSeparatorColor,
					borderBottomWidth: 1,
					marginTop: this.props.menuItemSettings.itemSeparatorMarginTop,
					marginBottom: this.props.menuItemSettings.itemSeparatorMarginBottom,
					marginLeft: this.props.menuItemSettings.itemSeparatorMarginLeft,
					marginRight: this.props.menuItemSettings.itemSeparatorMarginRight,
				}}
			/>
		);
	}

	renderMenu(level, menuObjects) {
		let returnValue = [];
		if (menuObjects !== undefined && menuObjects.length > 0) {
			for (let i = 0; i < menuObjects.length; i++) {
				let menuItemObject = menuObjects[i];
				if (menuItemObject.openSubMenu === undefined) {
					menuItemObject.openSubMenu = false;
				}

				let subItems = menuItemObject.subItems;
				let showDropDownButton = false;
				if (subItems && subItems.length > 0) {
					showDropDownButton = true;
				}

				if (!menuItemObject.onClick) {
					menuItemObject.onClick = () => {
						if (menuItemObject.id) {
							console.log(menuItemObject.id);
						}
						this.props.menuItemSettings.itemClickHandler(menuItemObject);
					};
				}

				// TODO: gi unik verdi på key.
				returnValue.push(
					<View
						key={level * 10 + i}
						style = {this.props.style}>

						<TreeMenuItem
							menuItemObject={menuItemObject}
							menuItemSettings={this.props.menuItemSettings}
							indents={level}
							openSubMenu={menuItemObject.openSubMenu?menuItemObject.openSubMenu: false}
							showDropDownButton={showDropDownButton}
							showMenuItemIcon={menuItemObject.showIcon !== undefined ? menuItemObject.showIcon : true}
							onOpenSubMenu={(menuItemObject) => {
								menuItemObject.openSubMenu = !menuItemObject.openSubMenu;
								if (menuItemObject.openSubMenu) {
									// Close others:
									if (this.props.menuItemSettings.closeOthersOnOpen) {
										let itemsToCompress=this.props.menuObjects;
										// Get menuItemObjects parents subItems. If not exist, then use this.props.menuObjects:
										let menuItemObjectParent = menuItemObject.parent;
										if (menuItemObjectParent)
											itemsToCompress = menuItemObjectParent.subItems?menuItemObjectParent.subItems:[];
										for (let i = 0; i < itemsToCompress.length; i++) {
											let moItem = itemsToCompress[i];
											if (moItem !== menuItemObject)
												moItem.openSubMenu = false;
											else
												moItem.openSubMenu = true;
										}
									}
								}
								this.setState({
									reRender: !this.state.reRender,
								});
							}}
						/>
						{
							this.props.menuItemSettings.itemSeparator && this.renderSeparator()
						}
					</View>,
				);
				if (menuItemObject.openSubMenu === true) {
					if (subItems && subItems.length > 0) {
						returnValue.push(this.renderMenu(level + 1, subItems));
					}
				}
			}
		}
		if (returnValue.length === 0) {
			returnValue.push(<View/>);
		}
		return returnValue;
	}

	render() {
		return <View>{this.renderMenu(0, this.props.menuObjects)}</View>;
	}
}

TreeMenu.defaultProps = {
	menuItemSettings: {

		closeOthersOnOpen: false,

		itemIconOnLeft: true,
		itemOpenCloseIconRight: false,
		itemTextStyle: {fontSize: 20, color:'#900FFF', textAlign: 'left'},
		itemIconSize: 25,
		itemBackgroundColor: '#E0E0E0',
		itemOpenMenuIcon: 'ios-arrow-dropleft-circle',
		itemCloseMenuIcon: 'ios-arrow-dropdown-circle',       //, 'ios-arrow-dropdown-circle', 'ios-arrow-dropleft', 'ios-arrow-dropdown', 'ios-arrow-dropup';
		itemSeparator: true,
		itemBorderRadius: 5,
		itemMarginTop: 0,
		itemMarginBottom: 0,
		itemMarginLeft: 0,
		itemMarginRight: 0,
		itemSeparatorColor: '#909090',
		itemSeparatorMarginTop: 1,
		itemSeparatorMarginBottom: 1,
		itemSeparatorMarginLeft: 0,
		itemSeparatorMarginRight: 0,
		itemIndentValue: 20
	},
};

TreeMenu.propTypes = {
	menuObjects: PropTypes.array.isRequired,
	menuItemSettings: PropTypes.object.isRequired,
};

export default TreeMenu;

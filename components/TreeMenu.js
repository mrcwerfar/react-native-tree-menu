import React, {Component} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import TreeMenuItem from './TreeMenuItem';

class TreeMenu extends Component {
	constructor(props, context) {
		super(props, context);

		// Prepping;
		this.prepMenuObjects(this.props.menuObjects);
		this.setDefaultMenuItemSettingsValues();

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

	setDefaultMenuItemSettingsValues() {
		/*
		if (this.props.menuItemSettings === undefined) {
			this.props.menuItemSettings = {
				vectorIconsFamily: 'Ionicons',
			};
		}
		if (this.props.menuItemSettings.vectorIconsFamily === undefined) { this.props.menuItemSettings['vectorIconsFamily'] = 'Ionicons'; }
			if (!this.props.menuItemSettings.menuItemOpenCloseIcons) { this.props.menuItemSettings.menuItemOpenCloseIcons = ['ios-arrow-dropleft-circle','ios-arrow-dropdown-circle']; }
			if (!this.props.menuItemSettings.closeOthersOnOpen) { this.props.menuItemSettings.closeOthersOnOpen = false; }
			if (!this.props.menuItemSettings.itemIconOnLeft) { this.props.menuItemSettings.itemIconOnLeft = true; }
			if (!this.props.menuItemSettings.itemOpenCloseIconRight) { this.props.menuItemSettings.itemOpenCloseIconRight = true; }
			if (!this.props.menuItemSettings.itemTextStyle) { this.props.menuItemSettings.itemTextStyle = {}; }
			if (!this.props.menuItemSettings.itemStyle) { this.props.menuItemSettings.itemStyle = {}; }

			if (!this.props.menuItemSettings.itemShowIcon) { this.props.menuItemSettings.itemShowIcon = true; }
			if (!this.props.menuItemSettings.itemBackgroundColor) { this.props.menuItemSettings.itemBackgroundColor = '#E0E0E0'; }
			if (!this.props.menuItemSettings.itemSeparator) { this.props.menuItemSettings.itemSeparator = true; }
			if (!this.props.menuItemSettings.itemSeparatorColor) { this.props.menuItemSettings.itemSeparatorColor =  '#909090'; }
			if (!this.props.menuItemSettings.itemSeparatorMarginTop) { this.props.menuItemSettings.itemSeparatorMarginTop = 1; }
			if (!this.props.menuItemSettings.itemSeparatorMarginBottom) { this.props.menuItemSettings.itemSeparatorMarginBottom = 1; }
			if (!this.props.menuItemSettings.itemSeparatorMarginLeft) { this.props.menuItemSettings.itemSeparatorMarginLeft = 0; }
			if (!this.props.menuItemSettings.itemSeparatorMarginLeft) { this.props.menuItemSettings.itemSeparatorMarginLeft = 0; }
			if (!this.props.menuItemSettings.itemSeparatorMarginRight) { this.props.menuItemSettings.itemSeparatorMarginRight = 0; }
			if (!this.props.menuItemSettings.itemIndentValue) { this.props.menuItemSettings.itemIndentValue = 20; }
		 */
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
					borderBottomColor: this.props.menuItemSettings.itemSeparatorColor?this.props.menuItemSettings.itemSeparatorColor: '#909090',
					borderBottomWidth: 1,
					marginTop: this.props.menuItemSettings.itemSeparatorMarginTop?this.props.menuItemSettings.itemSeparatorMarginTop: 1,
					marginBottom: this.props.menuItemSettings.itemSeparatorMarginBottom?this.props.menuItemSettings.itemSeparatorMarginBottom:1,
					marginLeft: this.props.menuItemSettings.itemSeparatorMarginLeft?this.props.menuItemSettings.itemSeparatorMarginLeft:0,
					marginRight: this.props.menuItemSettings.itemSeparatorMarginRight?this.props.menuItemSettings.itemSeparatorMarginRight:0,
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
						if (!this.props.menuItemSettings.itemClickHandler)
							console.log('TreeMenu: Error: missing itemClickHandler implementation in menuItemSettings');
						else
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

		itemClickHandler: item => {
			console.log(item.id);
		},

		vectorIconsFamily: 'Ionicons',
		closeOthersOnOpen: false,

		menuItemOpenCloseIcons: ['ios-arrow-dropleft','ios-arrow-dropdown'],
		itemIconOnLeft: true,
		itemOpenCloseIconRight: false,
		itemTextStyle: {
			fontSize: 18,
			color:'#000000',
			textAlign: 'left'
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
		itemBackgroundColor: '#E0E0E0',
		//itemCloseMenuIcon: 'ios-arrow-dropdown-circle',       //, 'ios-arrow-dropdown-circle', 'ios-arrow-dropleft', 'ios-arrow-dropdown', 'ios-arrow-dropup';
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
	menuObjects:
		[
			{
				id: 'id_file',
				icon: 'ios-folder',
				name: 'File',
				subItems: [
					{
						id: 'id_file_open',
						icon: 'ios-folder-open',
						name: 'Open',
						subItems: []
					},
					{
						id: 'id_file_open_recent',
						icon: 'ios-albums',
						name: 'Open Recent',
						subItems: [
							{
								id: 'id_file_open_recent1',
								icon: 'ios-document',
								name: 'file1 ...',
								subItems: []
							},
							{
								id: 'id_file_open_recent2',
								icon: 'ios-document',
								name: 'file2 ...',
								subItems: []
							},
						]
					}
				]
			},
			{
				id: 'id_edit',
				icon: 'ios-brush',
				name: 'Edit',
				subItems: [
					{
						id: 'id_edit_copy',
						icon: 'ios-copy',
						name: 'Copy',
						subItems: []
					},
				]
			},
			{
				id: 'id_refresh',
				icon: 'ios-refresh',
				name: 'Refresh',
				subItems: [
				]
			}
		]
};

TreeMenu.propTypes = {
	menuObjects: PropTypes.array.isRequired,
	menuItemSettings: PropTypes.object.isRequired,
	style: PropTypes.object
};

export default TreeMenu;

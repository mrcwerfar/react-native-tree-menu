import React, {Component} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import TreeMenuItem from './TreeMenuItem';

class TreeMenu extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			reRender: false,
		};
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
						this.props.menuItemSettings.clickHandler(menuItemObject);
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
							openSubMenu={false}
							showDropDownButton={showDropDownButton}
							showMenuItemIcon={menuItemObject.showIcon !== undefined ? menuItemObject.showIcon : true}
							onOpenSubMenu={menuItemObject => {
								menuItemObject.openSubMenu = !menuItemObject.openSubMenu;
								this.setState({
									reRender: !this.state.reRender,
								});
							}}
						/>
						{
							this.props.menuItemSettings.drawItemSeparator && this.renderSeparator()
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
		textColor: '#900FFF',
		textSize: 20,
		iconSize: 25,
		backgroundColor: '#E0E0E0',
		openMenuIcon: 'ios-arrow-dropleft-circle',
		closeMenuIcon: 'ios-arrow-dropdown-circle',       //, 'ios-arrow-dropdown-circle', 'ios-arrow-dropleft', 'ios-arrow-dropdown', 'ios-arrow-dropup';
		drawItemSeparator: true,
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

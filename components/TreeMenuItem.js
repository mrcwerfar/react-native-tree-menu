import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableHighlight, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 *
 */
class TreeMenuItem extends Component {
	constructor(props, context) {
		super(props, context);
		if (this.props.indents) {
			this.indents = this.props.indents;
		} else {
			this.indents = 0;
		}

		this.dropDownIconName = [];
		if (this.props.menuItemSettings.closeMenuIcon) {
			this.dropDownIconName.push(this.props.menuItemSettings.openMenuIcon);
		} else {
			this.dropDownIconName.push('ios-arrow-dropleft-circle');
		}

		if (this.props.menuItemSettings.openMenuIcon) {
			this.dropDownIconName.push(this.props.menuItemSettings.closeMenuIcon);
		} else {
			this.dropDownIconName.push('ios-arrow-dropdown-circle');
		}

		if (this.props.openSubMenu !== undefined) {
			if (!this.props.openSubMenu) {
				this.state = {
					dropDownIconNameIndex: 0,
					openSubMenu: false,
				};
			} else {
				this.state = {
					dropDownIconNameIndex: 1,
					openSubMenu: true,
				};
			}
		} else {
			this.state = {
				dropDownIconNameIndex: 0,
				openSubMenu: false,
			};
		}
	}

	renderItem(menuItemObject) {
		let iconIndex = menuItemObject.openSubMenu === true ? 1 : 0;
		return (
			<View style={{flex: 1}}>
				<View
					style={{
						backgroundColor: this.props.menuItemSettings.backgroundColor,
						marginBottom: this.props.menuItemSettings.itemMarginBottom,
						marginTop: this.props.menuItemSettings.itemMarginTop,
						marginLeft: this.props.menuItemSettings.itemMarginLeft + this.props.menuItemSettings.itemIndentValue * Number(this.indents),
						marginRight: this.props.menuItemSettings.itemMarginRight,
						borderRadius: this.props.menuItemSettings.itemBorderRadius,
					}}>
					<TouchableHighlight
						value={menuItemObject.id}
						underlayColor="#00000000"
						onPress={() => {
							if (menuItemObject.onClick !== undefined) {
								menuItemObject.onClick(menuItemObject);
							}
						}}>
						<View
							style={{
								padding: 0,
								flexDirection: 'row',
								flex: 1,
								alignItems: 'center'
							}}>
							{/* Show menu item icon or not? */}
							{this.props.showMenuItemIcon && menuItemObject.icon && (
								<Icon
									style={{marginLeft: 5, marginRight: 10}}
									color="#000"
									name={menuItemObject.icon}
									size={this.props.menuItemSettings.iconSize?this.props.menuItemSettings.iconSize:35}
								/>
							)}

							<Text
								style={{
									color: this.props.menuItemSettings.textColor?this.props.menuItemSettings.textColor:'#000000',
									fontSize: this.props.menuItemSettings.textSize?this.props.menuItemSettings.textSize: 22,
									textAlign: 'left',
									flex: 1,
									flexDirection: 'row',
									marginLeft: 0,
									marginRight: 0,
									marginTop: 0,
									marginBottom: 0,
								}}
								allowFontScaling={true}>
								{menuItemObject.name}
							</Text>

							{/* Show dropdown button or not? */}
							{this.props.showDropDownButton && (
								<TouchableHighlight
									onPress={() => {
										this.props.onOpenSubMenu(menuItemObject);
									}}
									activeOpacity={0.5}
									underlayColor="#00000000">
									<Icon
										style={{marginRight: 5}}
										color="#000"
										name={this.dropDownIconName[iconIndex]}
										size={this.props.menuItemSettings.iconSize?this.props.menuItemSettings.iconSize:35}
									/>
								</TouchableHighlight>
							)}
						</View>
					</TouchableHighlight>
				</View>
			</View>
		);
	}

	render() {
		let menuItemObject = this.props.menuItemObject;
		if (menuItemObject) {
			return this.renderItem(menuItemObject);
		} else {
			return <View/>;
		}
	}
}

TreeMenuItem.defaultProps = {
	showDropDownButton: true,
	showMenuItemIcon: false,
	showSumMenu: true,
	openSubMenu: true,
	indents: 0,
};

TreeMenuItem.propTypes = {
	showDropDownButton: PropTypes.bool,
	showMenuItemIcon: PropTypes.bool,
	showSumMenu: PropTypes.bool,
	openSubMenu: PropTypes.bool,
	indents: PropTypes.number,

	menuItemObject: PropTypes.object.isRequired,
	menuItemSettings: PropTypes.object.isRequired,

	onOpenSubMenu: PropTypes.func,
};

export default TreeMenuItem;

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableHighlight, View, Text} from 'react-native';
import IconIO from 'react-native-vector-icons/Ionicons';
import IconAD from 'react-native-vector-icons/AntDesign';
import IconEI from 'react-native-vector-icons/EvilIcons';
import IconFE from 'react-native-vector-icons/Feather';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconFI from 'react-native-vector-icons/Fontisto';
import IconFO from 'react-native-vector-icons/Foundation';
import IconMA from 'react-native-vector-icons/MaterialIcons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconOC from 'react-native-vector-icons/Octicons';
import IconZO from 'react-native-vector-icons/Zocial';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';

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
		if (this.props.menuItemSettings.itemCloseMenuIcon) {
			this.dropDownIconName.push(this.props.menuItemSettings.itemOpenMenuIcon);
		} else {
			this.dropDownIconName.push('ios-arrow-dropleft-circle');
		}

		if (this.props.menuItemSettings.itemOpenMenuIcon) {
			this.dropDownIconName.push(this.props.menuItemSettings.itemCloseMenuIcon);
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

	selectIconFamily(icon) {
		let style = {marginLeft: 5, marginRight: 10};
		let size = this.props.menuItemSettings.itemIconSize ? this.props.menuItemSettings.itemIconSize : 35;
		let color = '#000';

		if (!this.props.menuItemSettings.vectorIconsFamily)
			return ( <IconIO style={style} color={color} name={icon} size={size}/> );

		switch (this.props.menuItemSettings.vectorIconsFamily) {
		case 'Ionicons': return ( <IconIO style={style} color={color} name={icon} size={size}/> );
		case 'AntDesign': return ( <IconAD style={style} color={color} name={icon} size={size}/> );
		case 'EvilIcons': return ( <IconEI style={style} color={color} name={icon} size={size}/> );
		case 'Feather': return ( <IconFE style={style} color={color} name={icon} size={size}/> );
		case 'FontAwesome': return ( <IconFA style={style} color={color} name={icon} size={size}/> );
		case 'Fontisto': return ( <IconFI style={style} color={color} name={icon} size={size}/> );
		default: return ( <IconIO style={style} color={color} name={icon} size={size}/> );
		}



	}

	renderItem(menuItemObject) {
		let iconIndex = menuItemObject.openSubMenu === true ? 1 : 0;
		return (
			<View style={{flex: 1}}>
				<View
					style={
						[this.props.menuItemSettings.itemStyle,
							{ marginLeft: this.props.menuItemSettings.itemIndentValue * Number(this.indents)}
						]}>
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
							{/* Show menu item IconIO or not? */}
							{this.props.menuItemSettings.itemShowIcon && menuItemObject.icon && (
								this.selectIconFamily(menuItemObject.icon)
							)}

							<Text
								style={[this.props.menuItemSettings.itemTextStyle, {
									flex: 1,
									flexDirection: 'row'
								}]}
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
									{
										this.selectIconFamily(this.dropDownIconName[iconIndex])
									}
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
	showSumMenu: true,
	openSubMenu: true,
	indents: 0,
};

TreeMenuItem.propTypes = {
	showDropDownButton: PropTypes.bool,
	showSumMenu: PropTypes.bool,
	openSubMenu: PropTypes.bool,
	indents: PropTypes.number,

	menuItemObject: PropTypes.object.isRequired,
	menuItemSettings: PropTypes.object.isRequired,

	onOpenSubMenu: PropTypes.func,
};

export default TreeMenuItem;

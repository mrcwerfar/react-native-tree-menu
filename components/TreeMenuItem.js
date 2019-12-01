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
import TreeMenuCustomItemContent from './TreeMenuCustomItemContent';

/**
 * react-tree-screen-menu item
 */
class TreeMenuItem extends Component {
	constructor(props, context) {
		super(props, context);
		if (this.props.indents) {
			this.indents = this.props.indents;
		} else {
			this.indents = 0;
		}

		this.dropDownIconNames = [];
		if (this.props.openMenuItemIcon) {
			this.dropDownIconNames.push(this.props.openMenuItemIcon);
		} else {
			this.dropDownIconNames.push('');
		}

		if (this.props.closeMenuItemIcon) {
			this.dropDownIconNames.push(this.props.closeMenuItemIcon);
		} else {
			this.dropDownIconNames.push('');
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

	selectIconFamily(icon, color) {
		let style = {marginLeft: 5, marginRight: 5, alignSelf: 'center'};
		let size = this.props.menuItemSettings.itemIconSize ? this.props.menuItemSettings.itemIconSize : 35;

		if (!this.props.vectorIconsFamily)
			return ( <IconIO style={style} color={color} name={icon} size={size}/> );

		switch (this.props.vectorIconsFamily) {
		case 'Ionicons': return ( <IconIO style={[style, this.props.menuItemSettings.iconStyle]} color={color} name={icon} size={size}/> );
		case 'AntDesign': return ( <IconAD style={style} color={color} name={icon} size={size}/> );
		case 'EvilIcons': return ( <IconEI style={style} color={color} name={icon} size={size}/> );
		case 'Feather': return ( <IconFE style={style} color={color} name={icon} size={size}/> );
		case 'FontAwesome': return ( <IconFA style={style} color={color} name={icon} size={size}/> );
		case 'Fontisto': return ( <IconFI style={style} color={color} name={icon} size={size}/> );
		case 'Foundation': return ( <IconFO style={style} color={color} name={icon} size={size}/> );
		case 'MaterialIcons': return ( <IconMA style={style} color={color} name={icon} size={size}/> );
		case 'MaterialCommunityIcons': return ( <IconMCI style={[style, this.props.menuItemSettings.iconStyle]}  color={color} name={icon} size={size}/> );
		case 'Octicons': return ( <IconOC style={style} color={color} name={icon} size={size}/> );
		case 'Zocial': return ( <IconZO style={style} color={color} name={icon} size={size}/> );
		case 'SimpleLineIcons': return ( <IconSLI style={style} color={color} name={icon} size={size}/> );
		default: return ( <IconIO style={style} color={color} name={icon} size={size}/> );
		}
	}

	renderItemContent(menuItemObject) {
		if (this.props.useCustomItemContentRenderer && this.props.useCustomItemContentRenderer===true) {
			return (<TreeMenuCustomItemContent menuItemObject={menuItemObject}></TreeMenuCustomItemContent>);
		} else {
			return (
				<View>
					<Text
						style={this.props.menuItemSettings.itemTextStyle}
						allowFontScaling={true}>
						{menuItemObject.name}
					</Text>
				</View>
			);
		}
	}

	renderItem(menuItemObject) {
		let defaultIcon = this.props.menuItemSettings.defaultIcon?this.props.menuItemSettings.defaultIcon:'\u25A3';
		let iconIndex = menuItemObject.openSubMenu === true ? 1 : 0;
		let indentValue = this.props.menuItemSettings.itemIndentValue?this.props.menuItemSettings.itemIndentValue:35;
		let iconSize = this.props.menuItemSettings.itemIconSize ? this.props.menuItemSettings.itemIconSize : 35;
		let initLeftMargin = this.props.menuItemSettings.itemStyle.marginLeft?this.props.menuItemSettings.itemStyle.marginLeft:0;
		let rightMargin = this.props.menuItemSettings.itemStyle.marginRight?this.props.menuItemSettings.itemStyle.marginRight:0;
		let itemOpenCloseIconColor = this.props.menuItemSettings.itemStyle.itemOpenCloseIconColor?this.props.menuItemSettings.itemStyle.itemOpenCloseIconColor:'#000';
		let itemIconColor = this.props.menuItemSettings.itemIconColor ? this.props.menuItemSettings.itemIconColor : '#AAA';
		return (
			<View style={{flex:1}}>
				<TouchableHighlight
					style={
						[this.props.menuItemSettings.itemStyle,
							{flex: 1, marginLeft: initLeftMargin + indentValue * Number(this.indents)}
						]}
					value={menuItemObject.id}
					underlayColor="#00000000"
					onPress={() => {
						if (menuItemObject.onClick !== undefined && menuItemObject.subItems && menuItemObject.subItems.length>0 ) {
							menuItemObject.onClick(menuItemObject);
						} else {
							this.props.onOpenSubMenu(menuItemObject);
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
							<View style={{width: iconSize+initLeftMargin+rightMargin}}>
								{
									this.selectIconFamily(menuItemObject.icon, itemIconColor)
								}
							</View>
						)}
						{this.props.menuItemSettings.itemShowIcon && !menuItemObject.icon && (
							<Text style={{width: iconSize+initLeftMargin+rightMargin, fontSize: iconSize, alignContent: 'center', marginLeft: 3, marginRight: 3}}>{defaultIcon}</Text>
						)}
						<View style={{flex: 1}}>
							{
								this.renderItemContent(menuItemObject)
							}
						</View>

						{/* Show dropdown button or not? */}
						{this.props.showDropDownButton && this.dropDownIconNames && this.dropDownIconNames.length === 2 && (
							<TouchableHighlight
								style={{alignItems: 'center', width: iconSize}}
								onPress={() => { this.props.onOpenSubMenu(menuItemObject); }}
								activeOpacity={0.5}
								underlayColor="#00000000">
								{
									this.selectIconFamily(this.dropDownIconNames[iconIndex], itemOpenCloseIconColor)
								}
							</TouchableHighlight>
						)}
						{!(this.props.showDropDownButton && this.dropDownIconNames && this.dropDownIconNames.length === 2) && (
							<View style={{alignItems: 'center', width: iconSize}}/>
						)}
					</View>
				</TouchableHighlight>
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
	useCustomItemContentRenderer: false,
	showSumMenu: true,
	openSubMenu: true,
	indents: 0,
	openMenuItemIcon: '',
	closeMenuItemIcon: ''
};

TreeMenuItem.propTypes = {
	showDropDownButton: PropTypes.bool,
	showSumMenu: PropTypes.bool,
	openSubMenu: PropTypes.bool,
	indents: PropTypes.number,
	vectorIconsFamily: PropTypes.string,
	openMenuItemIcon: PropTypes.string,
	closeMenuItemIcon: PropTypes.string,
	menuItemObject: PropTypes.object.isRequired,
	menuItemSettings: PropTypes.object.isRequired,
	onOpenSubMenu: PropTypes.func,
	useCustomItemContentRenderer: PropTypes.bool,
};

export default TreeMenuItem;

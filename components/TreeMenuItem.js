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
		if (this.props.indents)
			this.indents = this.props.indents;
		else
			this.indents = 0;

		this.dropDownIconName = [];
		if (this.props.closeMenuIcon)
			this.dropDownIconName.push(this.props.openMenuIcon);
		else
			this.dropDownIconName.push('ios-arrow-dropleft-circle'); //, 'ios-arrow-dropdown-circle', 'ios-arrow-dropleft', 'ios-arrow-dropdown', 'ios-arrow-dropup';

		if (this.props.openMenuIcon)
			this.dropDownIconName.push(this.props.closeMenuIcon);
		else
			this.dropDownIconName.push('ios-arrow-dropdown-circle');

		if (this.props.openSubMenu !== undefined) {
			if (!this.props.openSubMenu) {
				this.state = {
					dropDownIconNameIndex: 0,
					openSubMenu: false
				};
			} else {
				this.state = {
					dropDownIconNameIndex: 1,
					openSubMenu: true
				};
			}
		} else {
			this.state = {
				dropDownIconNameIndex: 0,
				openSubMenu: false
			};
		}
	}

	renderItem(menuObject) {
		let iconIndex = menuObject.openSubMenu===true?1:0;
		return (
			<View style={{flex:1}}>
				<View
					style={{
						backgroundColor: '#EDEDED',
						marginBottom: 2,
						marginTop: 0,
						marginLeft: 10 + 20 * Number(this.indents),
						marginRight: 10,
						borderRadius: 10
					}}>

					<TouchableHighlight
						value={menuObject.id}
						underlayColor='#00000000'
						onPress = {
							() => {
								if (menuObject.onClick !== undefined) {
									menuObject.onClick(menuObject);
								}
							}
						}>
						<View style={{
							padding: 0,
							flexDirection: 'row',
							flex:1
						}}>
							{/* Show menu item icon or not? */}
							{this.props.showMenuItemIcon && menuObject.icon && (
								<Icon
									style={{marginLeft: 5, marginRight:10}}
									color="#000"
									name={menuObject.icon}
									size={35}/>

							)}
							<View style={{flex: 1, flexDirection: 'column', marginLeft: 3, marginRight: 3, marginTop: 10, marginBottom: 0, textAlign: 'center' }}>
								<Text
									style={{color: '#900FFF', fontSize: 22, textAlign: 'left'}}
									allowFontScaling={false}>
									{menuObject.name}
								</Text>
							</View>

							{/* Show dropdown button or not? */}
							{ this.props.showDropDownButton && (
								<TouchableHighlight onPress={() => {this.props.onOpenSubMenu(menuObject);}} activeOpacity={0.5} underlayColor='#00000000'>
									<Icon
										style={{marginRight: 10}}
										color="#000"
										name={this.dropDownIconName[iconIndex]}
										size={35}/>
								</TouchableHighlight>
							)}
						</View>

					</TouchableHighlight>
				</View>
			</View>
		);
	}

	render() {
		let menuObject = this.props.menuObject;
		if (menuObject)
			return this.renderItem(menuObject);
		else
			return (<View/>);
	}
}

TreeMenuItem.defaultProps = {
	roundImage: false,
	roundImageBackColor: '#E5FF89',
	openSubMenu: false,
	showMenuItemIcon: false,
	indents: 0
};

TreeMenuItem.propTypes = {
	onOpenSubMenu: PropTypes.func,
	showDropDownButton: PropTypes.bool,
	showMenuItemIcon: PropTypes.bool,
	menuObject: PropTypes.object.isRequired,
	marginLeft: PropTypes.number,
	marginRight: PropTypes.number,
	titleColor: PropTypes.string,
	showSumMenu: PropTypes.bool,
	roundImage: PropTypes.bool,
	roundImageBackColor: PropTypes.string
};

export default TreeMenuItem;

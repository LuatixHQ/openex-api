import React, {PropTypes, Component} from 'react';
import LocalMovies from 'material-ui/svg-icons/maps/local-movies'
import {zIndex} from 'material-ui/styles';
import {connect} from 'react-redux';

import {Drawer} from '../../../components/Drawer';
import {List} from '../../../components/List';
import {ListItemLink} from '../../../components/list/ListItem';
import {AppBar} from '../../../components/AppBar';
import {toggleLeftBar} from '../../../actions/Application'
import {i18nRegister} from '../../../utils/Messages'

i18nRegister({
  fr: {
    'Exercises': 'Exercices'
  }
})

class LeftBar extends Component {

  handleToggle() {
    this.props.toggleLeftBar()
  }

  render() {
    return (
      <Drawer
        width={200}
        docked={false}
        open={this.props.open}
        style={{zIndex: zIndex.drawer - 100}}
        onRequestChange={this.handleToggle.bind(this)}
      >
        <AppBar
          title="OpenEx"
          onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
        />
        <List>
          <ListItemLink onClick={this.handleToggle.bind(this)} to="/exercises" label="Exercises" leftIcon={<LocalMovies />}/>
        </List>
      </Drawer>
    );
  }
}

LeftBar.propTypes = {
  toggleLeftBar: PropTypes.func,
  open: PropTypes.bool
}

const select = (state) => {
  return {
    open: state.application.getIn(['ui', 'navbar_left_open'])
  }
}

export default connect(select, {toggleLeftBar})(LeftBar)
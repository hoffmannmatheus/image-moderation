import React from 'react';
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarActionItem,
  TopAppBarTitle
} from 'rmwc/TopAppBar';
import { Select } from 'rmwc/Select';
import { Button } from 'rmwc/Button';

export default class NavBar extends React.Component {

  renderModeratorChoice() {
      let moderators = this.props.moderators || [];
      if (moderators.length == 0) {
          return (<span>No moderators</span>);
      } else {
          return (
              <Select box
                  value={this.props.moderator}
                  onChange={evt => this.props.onSetModerator(evt.target.value)}
                  label="Moderator"
                  placeholder=""
                  options={moderators.map((i) => {return {label: i, value: i}; } )}
              />
          );
      }
  }

  navigateTo(page) {
    window.location.pathname = '/ui/' + page
  }

  render() {
      return (
          <TopAppBar>
              <TopAppBarRow>
                  <TopAppBarSection alignStart>
                      <TopAppBarTitle>Image Moderator</TopAppBarTitle>
                      <Button style={{marginLeft: '15px'}} raised onClick={() => this.navigateTo('')} theme="secondary-bg on-secondary">
                        Dashboard
                      </Button>
                      <Button style={{marginLeft: '15px'}} raised onClick={() => this.navigateTo('moderate')} theme="secondary-bg on-secondary">
                        Moderation
                      </Button>
                  </TopAppBarSection>
                  <TopAppBarSection alignEnd>
                      {this.renderModeratorChoice()}
                  </TopAppBarSection>
              </TopAppBarRow>
          </TopAppBar>
      );
  }
};
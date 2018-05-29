import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import {
    TopAppBar,
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarTitle
  } from 'rmwc/TopAppBar';
import { Select } from 'rmwc/Select';


import ImageList from '../Components/ImageList';
import Moderator from '../Components/Moderator';

export default class App extends React.Component {

    componentWillMount() {
        let moderators = this.getModerators();
        this.state = {
            moderator: moderators.length > 0 ? moderators[0] : null
        }
    }

    getModerators() {
        return this.props.config && this.props.config.moderators || [];
    }

    renderModeratorChoice() {
        let moderators = this.getModerators();
        if (moderators.length == 0) {
            return (<span>No moderators</span>);
        } else {
            return (
                <Select box
                    value={this.state.moderator}
                    onChange={evt => this.setState({moderator: evt.target.value})}
                    label="Moderator"
                    placeholder=""
                    options={moderators.map((i) => {return {label: i, value: i}; } )}
                />
            );
        }
    }

    render() {
        return (
            <div>
                <TopAppBar>
                    <TopAppBarRow>
                        <TopAppBarSection alignStart>
                            <TopAppBarTitle>Image Moderator</TopAppBarTitle>
                        </TopAppBarSection>
                        <TopAppBarSection alignEnd>
                            {this.renderModeratorChoice()}
                        </TopAppBarSection>
                    </TopAppBarRow>
                </TopAppBar>
                <BrowserRouter>
                    <Switch>
                        <Route exact path={'/ui/'} render={() => (
                            <ImageList moderator={this.state.moderator} />
                        )} />
                        <Route exact path={'/ui/moderate/'} render={() => (
                            <Moderator moderator={this.state.moderator} />
                        )} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}
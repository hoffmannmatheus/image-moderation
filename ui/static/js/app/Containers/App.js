import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import {
    TopAppBar,
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarTitle
  } from 'rmwc/TopAppBar';
import { Select } from 'rmwc/Select';


import ModeratedImages from '../Components/ModeratedImages';
import Moderator from '../Components/Moderator';

export default class App extends React.Component {

    componentWillMount() {
        let moderators = this.props.config && this.props.config.moderators || [];
        this.state = {
            moderator: moderators.length > 0 ? moderators[0] : null
        }
    }

    render() {
        let moderators = this.props.config && this.props.config.moderators;
        return (
            <div className="app">
                <Body
                    moderator={this.state.moderator} />
                <NavBar
                    moderator={this.state.moderator}
                    moderators={moderators}
                    onSetModerator={(m) => this.setState({moderator: m})}/>
            </div>
        )
    }
}

class Body extends React.Component {
    render() {
        return (
            <main className="main-content">
                <BrowserRouter>
                    <Switch>
                        <Route exact path={'/ui/'} render={() => (
                            <ModeratedImages moderator={this.props.moderator} />
                        )} />
                        <Route exact path={'/ui/moderate/'} render={() => (
                            <Moderator moderator={this.props.moderator} />
                        )} />
                    </Switch>
                </BrowserRouter>
            </main>
        );
    }
};

class NavBar extends React.Component {

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

    render() {
        return (
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
        );
    }
};
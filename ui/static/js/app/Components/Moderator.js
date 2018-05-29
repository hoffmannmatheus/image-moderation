import React from 'react';
import { Link } from 'react-router-dom';

import { LinearProgress } from 'rmwc/LinearProgress';
import { Button, ButtonIcon } from 'rmwc/Button';
import { Icon } from 'rmwc/Icon';
import { 
    ImageList,
    ImageListItem,
    ImageListImage,
    ImageListSupporting,
    ImageListLabel
  } from 'rmwc/ImageList';

import api from '../Utils/api';

export default class Moderator extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentWillMount() {
        this.state = {
            moderator: this.props.moderator,
            nextImage: null,
            lastImages: [],
            error: null,
            isLoading: false,
        };
    }

    componentDidMount() {
        this.loadData();
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.moderator !== this.state.moderator) {
            this.setState({ moderator: nextProps.moderator }, () => this.loadData());
        }
    }

    loadData() {
        this.loadNextPending();
        this.loadLastImages();
    }

    loadNextPending() {
        this.setState({isLoading: true, error: null});
        let that = this;
        api.get(`/images/next/`)
            .then(function (response) {
                let error = response.status != 200;
                let nextImage = !error && response.data;
                that.setState(
                    {nextImage, error: error && response, isLoading: false}
                );
            })
            .catch(function (error) {
                console.log(error);
                that.setState({nextImage: null, error: "Unable to load images", isLoading: false});
            });
    }

    loadLastImages() {
        let that = this;
        api.get(`/moderator/${this.state.moderator}/recent/`)
            .then(function (response) {
                let error = response.status != 200;
                let lastImages = !error && response.data;
                that.setState({lastImages});
            })
            .catch(function (error) {
                console.log(error);
                that.setState({lastImages: null});
            });
    }

    handleDecision(image, isApproved) {
        let that = this;
        let body = {
            decision: isApproved ? 'approved' : 'rejected',
            moderator: this.state.moderator
        };
        api.put(`/images/${image.id}/`, body)
            .then(function (response) {
                that.loadData();
            });
    }

    render() {
        if (this.state.isLoading) {
            return <LinearProgress determinate={false}></LinearProgress>;
        } else if (this.state.error) {
            return <p className="subpageheader">{this.state.error}</p>;
        }

        return (
            <div>
                <NextImage
                    image={this.state.nextImage}
                    onDecision={(approved) => this.handleDecision(this.state.nextImage, approved) } />
                <LastImagesList
                    images={this.state.lastImages}
                    onDecision={(image, approved) => this.handleDecision(image, approved) } />
            </div>
        );
    }
};

class NextImage extends React.Component {
    render() {
        let image = this.props.image;
        if (!image) return <span>No next image</span>;
        return (
            <div className="next-image-container">
                <img className="next-image"src={image.url} />
                <div className="buttons-container">
                    <Button raised
                        onClick={() => this.props.onDecision(true)}>
                        <ButtonIcon use="check_circle" />
                        Approve
                    </Button>
                    <Button raised
                        style={{'marginLeft': '35px'}}
                        onClick={() => this.props.onDecision(false)}>
                        <ButtonIcon use="highlight_off" />
                        Reject
                    </Button>
                </div>
            </div>
        );
    }
};

class LastImagesList extends React.Component {
    render() {
        let images = this.props.images;
        if (!Array.isArray(images) || images.length == 0) return <span>No recent images</span>;
        return (
            <div>
                <ImageList
                    masonry
                    withTextProtection
                    style={{
                        columnCount: 5,
                        columnGap: '16px',
                        maxWidth: '1000px'
                    }}
                    >
                    {
                    images.map(image => (
                        <ImageListItem key={image.url} style={{ marginBottom: '16px' }}>
                            <ImageListImage src={image.url} />
                            <ImageListSupporting>
                                <ImageListLabel>{image.decision}</ImageListLabel>
                                {image.decision == 'rejected' &&
                                    <Icon
                                        onClick={() => this.props.onDecision(image, true)}
                                        strategy="ligature">check_circle</Icon>}
                                {image.decision == 'approved' &&
                                    <Icon
                                        onClick={() => this.props.onDecision(image, false)}
                                        strategy="ligature">highlight_off</Icon>}
                            </ImageListSupporting>
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
        );
    }
};
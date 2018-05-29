import React from 'react';
import { Link } from 'react-router-dom';
import { 
    ImageList,
    ImageListItem,
    ImageListImage,
    ImageListSupporting,
    ImageListLabel
  } from 'rmwc/ImageList';
import { LinearProgress } from 'rmwc/LinearProgress';

import api from '../Utils/api';

const FILTER_OPTIONS = ['all', 'pending', 'approved', 'rejected', 'moderated'];

export default class ModeratedImages extends React.Component {
    
    componentWillMount() {
        this.state = {
            filter: FILTER_OPTIONS[0],
            images: [],
            totalCount: 0,
            error: null,
            isLoading: false,
            hasNext: false,
            page: 1
        };
    }

    componentDidMount() {
        this.loadChannels();
    }

    loadChannels() {
        this.setState({isLoading: true});
        let that = this;
        api.get(`/images/${this.state.filter}/?page=${this.state.page}`)
            .then(function (response) {
                let error = response.status != 200;
                let images = !error && response.data.results;
                let hasNext = !error && !!response.data.next;
                let page = hasNext ? that.state.page+1 : that.state.page;
                let totalCount = !error && response.count || 0;
                console.log(response);
                that.setState(
                    {images, totalCount, error: error && response, isLoading: false, hasNext, page}
                );
            })
            .catch(function (error) {
                console.log(error);
                that.setState({images:[], totalCount: 0, error: "Unable to load images", isLoading: false});
            });
    }

    render() {
        let images = this.state.images;

        if (this.state.isLoading) {
            return <LinearProgress determinate={false}></LinearProgress>;
        } else if (this.state.error) {
            return <p className="subpageheader">{this.state.error}</p>;
        } else if (!Array.isArray(images) || images.length === 0) {
            return <p className="subpageheader">Image list empty!</p>;
        }

        return  (
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
                            <ImageListLabel>{image.timestamp}</ImageListLabel>
                        </ImageListSupporting>
                    </ImageListItem>
                ))}
            </ImageList>
        );
    }
}

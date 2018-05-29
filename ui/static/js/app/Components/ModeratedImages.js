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
import { Select } from 'rmwc/Select';
import { Grid, GridCell } from 'rmwc/Grid';
import { Button } from 'rmwc/Button';

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
        this.loadImages();
    }

    loadImages(contactImages) {
        this.setState({isLoading: true, totalCount: 0, error: null});
        let that = this;
        api.get(`/images/${this.state.filter}/?page=${this.state.page}&size=15`)
            .then(function (response) {
                let error = response.status != 200;
                let images = !error && response.data.results;
                let hasNext = !error && !!response.data.next;
                let totalCount = !error && response.data.count || 0;
                if (contactImages) images = that.state.images.concat(images);
                that.setState(
                    {images, totalCount, error: error && response, isLoading: false, hasNext}
                );
            })
            .catch(function (error) {
                console.log(error);
                that.setState({images:[], totalCount: 0, error: "Unable to load images", isLoading: false});
            });
    }

    updateFilter(newFilter) {
        this.setState(
            { filter: newFilter, page: 1 },
            () => this.loadImages()
        );
    }

    nextPage() {
        if (!this.state.hasNext) return;
        this.setState(
            { page: this.state.page + 1 },
            () => this.loadImages(true)
        );
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
            <div>
                <GridHeader
                    totalCount={this.state.totalCount} 
                    filter={this.state.filter}
                    onChangeFilter={(filter) => this.updateFilter(filter)} />
                <ImagesGrid
                    images={images}
                    hasNextPage={this.state.hasNext}
                    onNextPage={() => this.nextPage()} />
            </div>
        );
    }
}

class GridHeader extends React.Component {
    render() {
        return (
            <Grid>
                <GridCell span="6">
                    Showing {this.props.totalCount} images
                </GridCell>
                <GridCell span="6">
                    <Select box
                        value={this.props.filter}
                        onChange={evt => this.props.onChangeFilter(evt.target.value)}
                        label="Filter"
                        placeholder=""
                        options={FILTER_OPTIONS.map((i) => {return {label: i, value: i}; } )}
                    />
                </GridCell>
            </Grid>
        );
    }
}

class ImagesGrid extends React.Component {
    render() {
        let images = this.props.images;
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
                                <ImageListLabel>{image.timestamp}</ImageListLabel>
                            </ImageListSupporting>
                        </ImageListItem>
                    ))}
                </ImageList>
                {this.props.hasNextPage && 
                    <Button
                        className="load-more-button"
                        outlined
                        onClick={this.props.onNextPage}>
                        Load More
                    </Button>
                }
            </div>
        );
    }
};
import React, { Component } from "react";
// import { Scrollbars } from 'react-custom-scrollbars';
import { Scrollbars } from "react-custom-scrollbars";

import "./CustomScrollbars.scss";

class CustomScrollbars extends Component {
  ref = React.createRef();

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      // Scroll to the top when moving to another page
      const scrollbars = this.ref.current;
      if (scrollbars) {
        scrollbars.scrollToTop();
      }
    }
  }

  getScrollLeft = () => {
    const scrollbars = this.ref.current;
    return scrollbars.getScrollLeft();
  };
  getScrollTop = () => {
    const scrollbars = this.ref.current;
    return scrollbars.getScrollTop(0);
  };

  scrollToBottom = () => {
    if (!this.ref || !this.ref.current) {
      return;
    }
    const scrollbars = this.ref.current;
    const targetScrollTop = scrollbars.getScrollHeight();
    this.scrollTo(targetScrollTop);
  };

  scrollTo = (targetTop) => {
    const { quickScroll } = this.props;
    if (!this.ref || !this.ref.current) {
      return;
    }
    const scrollbars = this.ref.current;
    const originalTop = scrollbars.getScrollTop(0);
    let iteration = 0;

    const scroll = () => {
      iteration++;
      if (iteration > 30) {
        return;
      }
      scrollbars.scrollTop(originalTop * iteration);

      if (quickScroll && quickScroll === true) {
        scroll();
      } else {
        setTimeout(() => {
          scroll();
        }, 20);
      }
    };

    scroll();
  };

  renderTrackHorizontal = (props) => {
    return <div {...props} className="track-horizontal" />;
  };

  renderTrackVertical = (props) => {
    return <div {...props} className="track-vertical" />;
  };

  renderThumbHorizontal = (props) => {
    return <div {...props} className="thumb-horizontal" />;
  };

  renderThumbVertical = (props) => {
    return <div {...props} className="thumb-vertical" />;
  };

  renderNone = (props) => {
    return <div />;
  };

  render() {
    const {
      className,
      disableVerticalScroll,
      disableHorizontalScroll,
      children,
      ...otherProps
    } = this.props;
    return (
      <Scrollbars
        ref={this.ref}
        autoHide={true}
        autoHideTimeout={200}
        hideTracksWhenNotNeeded={true}
        className={
          className ? className + " custom-scrollbar" : "custom-scrollbar"
        }
        onScroll={this.handleScroll}
        onScrollFrame={this.handleScrollFrame}
        onScrollStart={this.handleScrollStart}
        onScrollStop={this.handleScrollStop}
        onUpdate={this.handleUpdate}
        renderView={this.renderView}
        renderTrackHorizontal={this.renderTrackHorizontal}
        renderTrackVertical={this.renderTrackVertical}
        renderThumbHorizontal={this.renderThumbHorizontal}
        renderThumbVertical={this.renderThumbVertical}
        autoHideDuration={200}
        thumbMinSize={30}
        universal={true}
        {...this.props}
      >
        {children}
      </Scrollbars>
    );
  }
}

export default CustomScrollbars;

'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View
} = React;
var tweenState = require('react-tween-state');


var styles = StyleSheet.create({
  background: {
    backgroundColor: '#bbbbbb',
    height: 5,
    overflow: 'hidden',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 2
  },
  fill: {
    backgroundColor: '#3b5998',
    height: 5,
    borderRadius: 2
  }
});


var ProgressBar = React.createClass({

  mixins: [tweenState.Mixin],

  getDefaultProps() {
    return {
      style: styles,
      easing: tweenState.easingTypes.easeInOutQuad,
      easingDuration: 500
    };
  },

  getInitialState() {
    return {
      progress: 0
    };
  },

  componentDidUpdate(prevProps, prevState) {
    if (this.props.progress >= 0 && this.props.progress != prevProps.progress) {
      this.update(this.props.progress);
    }
  },

  render() {

    var progress = this.getTweeningValue('progress') || this.props.progress;

    var fillWidth = progress;

    return (
      <View style={[styles.background, this.props.backgroundStyle, this.props.style]}>
        <View style={[styles.fill, this.props.fillStyle, { flex: fillWidth }]}/>
        <View style={{flex: (1 - fillWidth)}}/>
      </View>
    );
  },

  update(progress) {
    this.tweenState('progress', {
      easing: this.props.easing,
      duration: this.props.easingDuration,
      endValue: this.props.progress
    });
  }
});

ProgressBar.easingTypes = tweenState.easingTypes;

module.exports = ProgressBar;

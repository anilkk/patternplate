'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _reselect = require('reselect');

var _demo = require('../selectors/demo');

var demo = _interopRequireWildcard(_demo);

var _item = require('../selectors/item');

var items = _interopRequireWildcard(_item);

var _pattern = require('../components/pattern');

var _pattern2 = _interopRequireDefault(_pattern);

var _actions = require('../actions');

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PatternContainer = function (_React$Component) {
  _inherits(PatternContainer, _React$Component);

  function PatternContainer() {
    var _ref;

    _classCallCheck(this, PatternContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = PatternContainer.__proto__ || Object.getPrototypeOf(PatternContainer)).call.apply(_ref, [this].concat(args)));

    _this.state = { srcdoc: false };
    return _this;
  }

  _createClass(PatternContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.state.srcdoc) {
        this.props.onChange();
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (global.document) {
        var el = document.createElement('iframe');
        this.setState({ srcdoc: 'srcdoc' in el });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.timeout);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(next) {
      var _this2 = this;

      if (this.state.srcdoc && this.props.src !== next.src && next.src) {
        if (this.timeout) {
          clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(function () {
          _this2.props.onChange();
        }, 250);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;

      return _react2.default.createElement(_pattern2.default, {
        contents: this.state.srcdoc ? props.contents : null,
        docs: props.docs,
        error: props.error,
        loading: props.loading,
        opacity: props.opacity,
        src: props.src,
        type: props.type
      });
    }
  }]);

  return PatternContainer;
}(_react2.default.Component);

exports.default = (0, _reactRedux.connect)(mapState, mapDispatch)(PatternContainer);


var DEFAULT_CONTENTS = '\n# :construction: Add documentation\n\n> Undocumented software could not exist just as well.\n>\n> \u2013 The Voice of Common Sense\n\nCurrently there is no readme data for this pattern folder.\nWe left this friendly reminder for you to change that soon.\n\n---\n\nHelp us to make this message more helpful on [GitHub](https://github.com/sinnerschrader/patternplate).\n';

var NOT_FOUND = '\n# Pattern not found\n\n> Pretty sure this is not the component you are looking for.\n\nWe looked everywhere and could not find a single thing.\n\nYou might want to navigate back to [Home](/) or use the search.\n\n---\n\nHelp us to make this message more helpful on [GitHub](https://github.com/sinnerschrader/patternplate)\n';

var selectDocs = (0, _reselect.createSelector)(items.default, items.selectType, items.selectContents, function (pattern, type, contents) {
  if (type === 'not-found') {
    return NOT_FOUND;
  }
  return contents || DEFAULT_CONTENTS;
});

function mapState(state) {
  return {
    contents: state.demo.contents,
    docs: selectDocs(state),
    error: state.demo.error,
    loading: state.demo.fetching,
    opacity: state.opacity,
    src: demo.selectSrc(state),
    type: items.selectType(state)
  };
}

function mapDispatch(dispatch) {
  return (0, _redux.bindActionCreators)({
    onChange: actions.loadPatternDemo
  }, dispatch);
}
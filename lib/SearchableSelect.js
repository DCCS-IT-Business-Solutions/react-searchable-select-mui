"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Select_1 = require("@material-ui/core/Select");
var FormControl_1 = require("@material-ui/core/FormControl");
var InputLabel_1 = require("@material-ui/core/InputLabel");
var MenuItem_1 = require("@material-ui/core/MenuItem");
var TextField_1 = require("@material-ui/core/TextField");
var core_1 = require("@material-ui/core");
var ClickAwayListener_1 = require("@material-ui/core/ClickAwayListener");
var utils_1 = require("@dccs/utils");
// Needed because otherwise MUI-Select passes down props to the ClickAwayListeneder
// This Component ignores those props
// Additionally it has to be a React.Component instead of a functional component
// Since functional components can't have a "ref"
var SearchFieldWrapper = /** @class */ (function (_super) {
    __extends(SearchFieldWrapper, _super);
    function SearchFieldWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SearchFieldWrapper.prototype.render = function () {
        var _a = this.props, searchFieldPlaceholder = _a.searchFieldPlaceholder, setQuery = _a.setQuery;
        return (React.createElement(ClickAwayListener_1.default, { onClickAway: function () { return null; } },
            React.createElement(core_1.ListItem, null,
                React.createElement(TextField_1.default, { fullWidth: true, placeholder: searchFieldPlaceholder || "Search...", onChange: function (e) {
                        setQuery(e.target.value);
                    }, onKeyDown: function (e) {
                        // Prevent MUI-Autoselect while typing
                        e.stopPropagation();
                    } }))));
    };
    return SearchFieldWrapper;
}(React.Component));
function SearchableSelect(props) {
    var _a = React.useState(""), query = _a[0], setQuery = _a[1];
    React.useEffect(function () { return setQuery(""); }, []);
    var label = props.label, error = props.error, searchFieldPlaceholder = props.searchFieldPlaceholder, removeSelectionText = props.removeSelectionText, hideRemoveSelection = props.hideRemoveSelection, value = props.value, onChange = props.onChange, helperText = props.helperText, options = props.options, _b = props.grouped, grouped = _b === void 0 ? false : _b, formControlProps = props.formControlProps, formHelperTextProps = props.formHelperTextProps, showAll = props.showAll, maxVisibleOptions = props.maxVisibleOptions, others = __rest(props, ["label", "error", "searchFieldPlaceholder", "removeSelectionText", "hideRemoveSelection", "value", "onChange", "helperText", "options", "grouped", "formControlProps", "formHelperTextProps", "showAll", "maxVisibleOptions"]);
    // Customprops
    var _c = props, keyPropFn = _c.keyPropFn, valuePropFn = _c.valuePropFn;
    // Remove keyPropFn and valuePropFn to not get passed down to the select component
    delete others.keyPropFn;
    delete others.valuePropFn;
    // Customprops Undefined? Use defaults
    if (!keyPropFn && !valuePropFn) {
        keyPropFn = function (option) { return option.key; };
        valuePropFn = function (option) { return option.value; };
    }
    var defaultProps = {
        style: { minWidth: "240px" }
    };
    function renderFilteredOptions() {
        var filteredOptions = options &&
            options.filter &&
            options.filter(function (option) {
                return (!valuePropFn(option) ||
                    (valuePropFn(option) &&
                        valuePropFn(option)
                            .toString()
                            .toLowerCase()
                            .indexOf(query.toLowerCase()) !== -1));
            });
        if (!showAll) {
            filteredOptions = filteredOptions.slice(0, maxVisibleOptions || 20);
            var selectedOption = options.find(function (option) { return value === keyPropFn(option); });
            if (selectedOption) {
                if (filteredOptions.indexOf(selectedOption) === -1) {
                    filteredOptions.push(selectedOption);
                }
            }
        }
        return filteredOptions.map(function (option) {
            var searchVal = valuePropFn(option).toString();
            return (React.createElement(MenuItem_1.default, { key: keyPropFn(option), value: keyPropFn(option) }, utils_1.HighlightQuery(searchVal, query)));
        });
    }
    function renderGroupedOptions() {
        var mapableOptions = __spreadArrays(options);
        var filteredOptions = mapableOptions &&
            mapableOptions.map &&
            mapableOptions.map(function (group) {
                return ({
                    title: group.title,
                    data: group.data.filter(function (option) {
                        return (!valuePropFn(option) ||
                            (valuePropFn(option) &&
                                valuePropFn(option)
                                    .toString()
                                    .toLowerCase()
                                    .indexOf(query.toLowerCase()) !== -1));
                    })
                });
            });
        return filteredOptions.map(function (group, index) { return ([
            React.createElement(core_1.ListSubheader, { key: group.title, style: { background: '#fff' } }, group.title),
            group.data.map(function (option) {
                var searchVal = valuePropFn(option).toString();
                return (React.createElement(MenuItem_1.default, { key: keyPropFn(option), value: keyPropFn(option) }, utils_1.HighlightQuery(searchVal, query)));
            })
        ]); });
    }
    return (React.createElement(FormControl_1.default, __assign({ margin: "normal" }, formControlProps),
        label && React.createElement(InputLabel_1.default, null, label),
        React.createElement(Select_1.default, __assign({}, defaultProps, { 
            // Material UI Bug:
            // => || ""  is needed for the label to work properly.
            value: value || "", onChange: onChange, error: error, MenuProps: {
                onEnter: function () {
                    setQuery("");
                },
                onExit: function () {
                    setQuery("");
                },
                disableAutoFocusItem: true,
                MenuListProps: {
                    disableListWrap: true
                }
            } }, others),
            React.createElement(SearchFieldWrapper, { searchFieldPlaceholder: searchFieldPlaceholder, setQuery: setQuery }),
            !hideRemoveSelection && React.createElement(MenuItem_1.default, null, removeSelectionText || "Remove selection"),
            grouped ? renderGroupedOptions() : renderFilteredOptions()),
        React.createElement(core_1.FormHelperText, __assign({ error: error }, formHelperTextProps), helperText)));
}
exports.SearchableSelect = SearchableSelect;

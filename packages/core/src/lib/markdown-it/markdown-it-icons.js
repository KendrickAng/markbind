const octicons = require('@primer/octicons');
const _ = require('lodash');

module.exports = require('markdown-it-regexp')(
  /:(fa[brs]|glyphicon|octicon|octiconlight)-([a-z-]+)~?([a-z-]+)?:/,
  (match, _) => {
    let iconFontType = match[1];
    let iconFontName = match[2];
    let iconClass = match[3];

    // ensure octicons exist
    if (iconFontType === 'octicon' || iconFontType === 'octiconlight') {
      if (!octicons.hasOwnProperty(iconFontName)) {
        return `<span aria-hidden="true"></span>`;
      }
    }

    if (iconFontType === 'glyphicon') {
      return `<span aria-hidden="true" class="glyphicon glyphicon-${iconFontName}"></span>`;
    } else if (iconFontType === 'octicon') {
      return iconClass ? octicons[iconFontName].toSVG({"class": iconClass})
        : octicons[iconFontName].toSVG();
    } else if (iconFontType === 'octiconlight') {
      return iconClass ? octicons[iconFontName].toSVG({"style": "color: #fff;", "class": iconClass})
        : octicons[iconFontName].toSVG({"style": "color: #fff;"});
    } else { // If icon is a Font Awesome icon
      return `<span aria-hidden="true" class="${iconFontType} fa-${iconFontName}"></span>`;
    }
  }
);

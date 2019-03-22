import toolColors from '../../stateManagement/toolColors.js';
import { modules } from '../../store/index.js';

const cursorModule = modules.cursor;

export default class MouseCursor {
  constructor(iconGroupString, options) {
    this.iconGroupString = iconGroupString;
    this.options = Object.assign(
      {},
      cursorModule.getters.defaultOptions(),
      options
    );
  }

  get iconSVG() {
    const svgString = this._generateIconSVGString();

    return new Blob([svgString], { type: 'image/svg+xml' });
  }

  get iconWithPointerSVG() {
    const svgString = this._generateIconWithPointerSVGString();

    return new Blob([svgString], { type: 'image/svg+xml' });
  }

  get iconSVGString() {
    return this._generateIconSVGString();
  }

  get iconWithPointerString() {
    return this._generateIconWithPointerSVGString();
  }

  get mousePoint() {
    const mousePoint = this.options.mousePoint;

    return `${mousePoint.x} ${mousePoint.y}`;
  }

  _generateIconWithPointerSVGString() {
    const { mousePointerGroupString, iconSize, viewBox } = this.options;
    const scale = iconSize / Math.max(viewBox.x, viewBox.y);
    const activeColor = toolColors.getActiveColor();
    const svgSize = 16 + iconSize;

    return `
        <svg
        data-icon="cursor" role="img" xmlns="http://www.w3.org/2000/svg"
        width="${svgSize}" height="${svgSize}" viewBox="0 0 ${svgSize} ${svgSize}"
      >
        <g>
          ${mousePointerGroupString.replace(/ACTIVE_COLOR/g, `${activeColor}`)}
        </g>
        <g transform="translate(16, 16) scale(${scale})">
          ${this.iconGroupString.replace(/ACTIVE_COLOR/g, `${activeColor}`)}
        </g>
      </svg>`;
  }

  _generateIconSVGString() {
    const { iconSize, viewBox } = this.options;

    return `
      <svg
        data-icon="cursor" role="img" xmlns="http://www.w3.org/2000/svg"
        width="${iconSize}" height="${iconSize}" viewBox="0 0
        ${viewBox.x} ${viewBox.y}"
      >
        ${this.iconGroupString.replace(
          /ACTIVE_COLOR/g,
          `${toolColors.getActiveColor()}`
        )}
      </svg>`;
  }
}

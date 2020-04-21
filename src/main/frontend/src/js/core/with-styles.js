let count = 0;

function withStyles(styles) {
    return (ComposedComponent) => class WithStyles {

        static contextTypes = {
            onInsertCss: React.PropTypes.func
        };

        constructor() {
            this.refCount = 0;
            ComposedComponent.prototype.renderCss = function (css) {
                let style;
                if (React.lib.ExecutionEnvironment.canUseDOM) {
                    if (this.styleId && (style = document.getElementById(this.styleId))) {
                        if ('textContent' in style) {
                            style.textContent = css;
                        } else {
                            style.styleSheet.cssText = css;
                        }
                    } else {
                        this.styleId = `dynamic-css-${count++}`;
                        style = document.createElement('style');
                        style.setAttribute('id', this.styleId);
                        style.setAttribute('type', 'text/css');

                        if ('textContent' in style) {
                            style.textContent = css;
                        } else {
                            style.styleSheet.cssText = css;
                        }

                        document.getElementsByTagName('head')[0].appendChild(style);
                        this.refCount++;
                    }
                } else {
                    this.context.onInsertCss(css);
                }
            }.bind(this);
        }

        componentWillMount() {
            if (React.lib.ExecutionEnvironment.canUseDOM) {
                invariant(styles.use, `The style-loader must be configured with reference-counted API.`);
                styles.use();
            } else {
                this.context.onInsertCss(styles.toString());
            }
        }

        componentWillUnmount() {
            styles.unuse();
            if (this.styleId) {
                this.refCount--;
                if (this.refCount < 1) {
                    let style = document.getElementById(this.styleId);
                    if (style) {
                        style.parentNode.removeChild(style);
                    }
                }
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }

    };
}

export default withStyles;
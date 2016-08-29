import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import autobind from 'autobind-decorator';

export class Rating extends React.Component {

    static propTypes = {
        rating: PropTypes.number.isRequired,
        raters: PropTypes.number.isRequired,
        onRatingClick: PropTypes.func,
        totalStars: PropTypes.number,
        size: PropTypes.number,
        disabled: PropTypes.bool,
        showYourRating: PropTypes.bool,
    };

    static defaultProps = {
        size: 18,
        totalStars: 5,
        disabled: false,
        onRatingClick: () => { }
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            size: props.size,
            totalStars: props.totalStars,
            disabled: props.disabled,
            rating: props.rating,
            raters: props.raters,
            currentRating: props.rating,
            showYourRating: props.showYourRating
        };
    }

    componentDidMount() {
        this.wrapper = ReactDOM.findDOMNode(this.refs.wrapper);
    }

    componentWillUnmount() {
        delete this.wrapper;
    }

    @autobind
    handleClick(e) {
        if (this.state.disabled) {
            e.preventDefault();
            return;
        }

        this.setState({disabled: true});
        this.props.onRatingClick(this.state.rating);
    }

    @autobind
    handleMouseMove(e) {
        let position = this.getPosition(e);
        let stars = this.getValueFromPosition(position);
        this.setState({ rating: stars, showYourRating: true });
    }

    @autobind
    handleMouseLeave(e) {
        this.setState({ rating: this.state.currentRating, showYourRating: false });
    }

    getPosition(e) {
        return e.clientX - this.wrapper.getBoundingClientRect().left;
    }

    getValueFromPosition(pos) {
        let size = this.state.size;
        let stars = Math.ceil(pos / size);
        return stars;
    }

    getFillColor(star, rating) {
        if (star <= rating) return `cornflowerblue`;

        if (star - rating < 1) return "url(#fractionRating)";

        return "lightgray";
    }

    getSvg(rating) {
        var stars = [];
        var fraction = 0;
        for (var i = 1; i <= this.state.totalStars; i++) {
            var attrs = {};
            attrs['transform'] = `translate(${(i - 1) * 50}, 0)`;
            attrs['fill'] = this.getFillColor(i, rating);
            if (i - rating < 1) {
                fraction = (i - rating).toFixed(2);
            }

            stars.push(
                <path {...attrs}
                    key={`star-${i}`}
                    mask="url(#half-star-mask)"
                    d="m0,18.1l19.1,0l5.9,-18.1l5.9,18.1l19.1,0l-15.4,11.2l5.9,18.1l-15.4,-11.2l-15.4,11.2l5.9,-18.1l-15.4,-11.2l0,0z" />
            );
        }

        var styles = {
            width: `${stars.length * this.state.size}px`,
            height: `${this.state.size}px`
        };

        return (
            <svg style={styles}
                viewBox={`0 0 ${stars.length} 50`}
                preserveAspectRatio="xMinYMin meet"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg">
                <linearGradient id="fractionRating" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop stopColor="cornflowerblue" offset={1 - fraction}/>
                    <stop stopColor="lightgray" offset={fraction}/>
                </linearGradient>
                <g>
                    {stars.map((item) => {
                        return item;
                    }) }
                </g>
            </svg>
        );
    }

    render() {
        const {rating, raters, disabled, showYourRating} = this.state;
        let caption = !showYourRating ? `Currently rated ${rating} by ${raters} people`: `Your rate ${rating}`;
        let attrs = {};
        let ratingClass = "rating";
        if (!disabled) {
            attrs['onMouseMove'] = this.handleMouseMove;
            attrs['onMouseLeave'] = this.handleMouseLeave;
            attrs['onClick'] = this.handleClick;
            ratingClass += " active";
        }

        return (
            <div className="grey-text text-darken-1 rating-container">
                <span ref="wrapper">
                    <span className={ratingClass} {...attrs}>
                        {this.getSvg(rating) }
                    </span>
                </span>
                <span>{caption}</span>
            </div>
        );
    }
}
import classnames from 'classnames';
import React, { Component } from 'react';
import './index.scss';



class Toggle extends Component {
    constructor(props) {
        super()
        this.state = {
            enabled: props.boolean
        }
    }


    toggleSwitch = (e) => {
        e.persist();
        e.preventDefault();
        this.setState({ enabled: !this.state.enabled }
        );
        this.props.onToggle(!this.state.enabled, this.props.id)
    }

    render() {
        const { enabled } = this.state;

        const togglerClasses = classnames(
            'switch-toggle',
            `switch-toggle--${enabled ? 'on' : 'off'}`
        )

        return (
            <div className='switch switch--default' onClick={this.toggleSwitch} >
                <div className={togglerClasses}></div>
            </div>
        )
    }
}

export default Toggle;
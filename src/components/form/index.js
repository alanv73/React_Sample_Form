import TextFormField from '../text_form_field';
import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import './index.css';

class SampleForm extends Component {
    minSampleSize = 2;

    initialState = { 
        sampleSize: '',
        sampleMean: '',
        stDev: '',
        doHypothesisTest: false,
        hypMean: ''
    };
        
    constructor(props) {
        super(props);
        this.state = this.initialState;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    componentDidMount() {
        const meanLabel = document.querySelector("label[for='hypmean']");
        meanLabel.classList.add("disabled-label");
    }

    handleSubmit = e => {
        this.props.history.push('/table', this.state);
        e.preventDefault();
    }

    handleReset = e => {
        this.setState(() => this.initialState);
        this.enableHypMeanLabel(this.doHypothesisTest);
    }

    onInputChange = e => {
        const value = e.target.value;

        switch(e.target.name){
            case 'sampleSize':
                if(value !== '' && value < this.minSampleSize){
                    e.target.setCustomValidity(`Value must be greater than ${this.minSampleSize}`);
                } else {
                    if(!this.isInteger(value)){
                        e.target.setCustomValidity(`Value must be an integer`);
                    } else {
                        e.target.setCustomValidity('');
                    }
                }

                break;

            case 'sampleMean': 
            case 'hypMean':
                if(!this.isFloat(value)){
                    e.target.setCustomValidity(`Value must be a number`);
                } else {
                    e.target.setCustomValidity('');
                }

                break;

            case 'stDev':
                if(value === ''){
                    e.target.setCustomValidity('');
                } else if(value <= 0){
                    e.target.setCustomValidity('Value must be greater than 0');
                } else if(!this.isFloat(value)){
                    e.target.setCustomValidity('Value must be a number');
                } else {
                    e.target.setCustomValidity('');
                }

                break;

            default:
                e.target.setCustomValidity('');
        }

        this.setState({
            ...this.state,
            [e.target.name]: value
        });
    }

    isInteger = val => {
        return /^\+?(0|[1-9]\d*)$/.test(val);
    }

    isFloat = val => {
        return /^[-+]?[0-9]*\.?[0-9]+/.test(val);
    }

    onDoTestCheckClick = e => {
        const checked = e.target.checked;
        this.enableHypMeanLabel(checked);
        this.setState({ doHypothesisTest: checked });
    }

    enableHypMeanLabel = boolean => {
        const meanLabel = document.querySelector("label[for='hypmean']");

        if(boolean){
            meanLabel.classList.remove("disabled-label");
        } else {
            meanLabel.classList.add("disabled-label");
        }
    }

    render() {
        const { 
            sampleSize, 
            sampleMean, 
            stDev,
            doHypothesisTest,
            hypMean
         } = this.state;

         return (
                <div className="form mt-5 mx-auto w-50">
                    <form 
                        id="sample-form" 
                        method="post" 
                        onReset={this.handleReset}
                        onSubmit={this.handleSubmit}>
                        <TextFormField 
                            name="sampleSize"
                            id="size"
                            value={sampleSize}
                            onChange={this.onInputChange}
                            label="Sample size" />
                        <TextFormField 
                            name="sampleMean"
                            id="mean"
                            value={sampleMean}
                            onChange={this.onInputChange}
                            label="Sample mean" />
                        <TextFormField 
                            name="stDev"
                            id="stdev"
                            value={stDev}
                            onChange={this.onInputChange}
                            label="Standard deviation" />
                        <div className="form-check d-flex flex-row mb-0">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                checked={doHypothesisTest} 
                                onChange={this.onDoTestCheckClick}
                                id="hypTestCheck" />
                            <label 
                                className="form-check-label" 
                                htmlFor="hypTestCheck">
                                Perform hypothesis test
                            </label>
                        </div>
                        <TextFormField 
                            name="hypMean"
                            id="hypmean"
                            value={hypMean}
                            onChange={this.onInputChange}
                            disabled={!doHypothesisTest}
                            label="Hypothesized mean" />
                        <div className="mx-auto d-flex justify-content-end">
                            <Button 
                                    className="col-sm-3 mr-2"
                                    as="input" 
                                    variant="primary" 
                                    type="submit" 
                                    value="OK"
                                     />
                            
                            <Button 
                                className="col-sm-3" 
                                as="input" 
                                variant="outline-danger" 
                                type="Reset" 
                                 />
                        </div>
                    </form>
                </div>
        );
    }
}

export default SampleForm;


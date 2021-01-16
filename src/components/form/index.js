import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import './index.css';
import FormField from '../formfield';

class SampleForm extends Component {
    initialState = { 
        minSampleSize: 2,
        minStDev: 0.0,
        sampleSize: '',
        sampleMean: '',
        stDev: '',
        doHypTest: false,
        hypMean: ''
    };
        
    constructor(props) {
        super(props);
        this.state = this.initialState;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onResetClick = this.onResetClick.bind(this);
    }

    componentDidMount() {
        const meanLabel = document.querySelector("label[for='hypmean']");
        meanLabel.classList.add("disabled-label");
    }

    handleSubmit = e => {
        this.props.history.push('/table', this.state);
        e.preventDefault();
    }

    onInputChange = e => {
        const value = e.target.value;
        this.setState({
            ...this.state,
            [e.target.name]: value
        });
    }

    onDoTestCheckClick = e => {
        const checked = e.target.checked;
        this.enableHypMeanLabel(checked);
        this.setState({ doHypTest: checked });
    }

    enableHypMeanLabel(boolean) {
        const meanLabel = document.querySelector("label[for='hypmean']");

        if(boolean){
            meanLabel.classList.remove("disabled-label");
        } else {
            meanLabel.classList.add("disabled-label");
        }
    }

    onResetClick = e => {
        this.setState(() => this.initialState);
        this.enableHypMeanLabel(this.doHypTest);
    }

    render() {
        const { 
            minSampleSize, 
            minStDev,
            sampleSize, 
            sampleMean, 
            stDev,
            doHypTest,
            hypMean
         } = this.state;

         return (
                <div className="form mt-5 mx-auto w-50">
                    <form 
                        id="sample-form" 
                        method="post" 
                        onReset={this.onResetClick}
                        onSubmit={this.handleSubmit}>
                        <FormField 
                            name="sampleSize"
                            id="size"
                            value={sampleSize}
                            onChange={this.onInputChange}
                            min={minSampleSize}
                            label="Sample size" />
                        <FormField 
                            name="sampleMean"
                            id="mean"
                            value={sampleMean}
                            onChange={this.onInputChange}
                            label="Sample mean" />
                        <FormField 
                            name="stDev"
                            id="stdev"
                            value={stDev}
                            onChange={this.onInputChange}
                            step={0.000001}
                            min={minStDev}
                            label="Standard deviation" />
                        <div className="form-check d-flex flex-row mb-0">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                checked={doHypTest} 
                                onChange={this.onDoTestCheckClick}
                                id="hypTestCheck" />
                            <label 
                                className="form-check-label" 
                                htmlFor="hypTestCheck">
                                Perform hyposthesis test
                            </label>
                        </div>
                        <FormField 
                            name="hypMean"
                            id="hypmean"
                            value={hypMean}
                            onChange={this.onInputChange}
                            disabled={!doHypTest}
                            label="Hyposthesized mean" />
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


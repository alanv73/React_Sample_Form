import TextFormField from '../text_form_field';
import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import './index.css';

class SampleForm extends Component {
    minSampleSize = 2;

    validationErrors = {
        sampleSize: [],
        sampleMean: [],
        stDeviation: [],
        hypMean: []
    };

    initialState = { 
        sampleSize: '',
        sampleMean: '',
        stDeviation: '',
        doHypothesisTest: false,
        hypMean: '',
    };
        
    constructor(props) {
        super(props);
        this.state = this.initialState;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    componentDidMount() {
        this.enableHypMeanLabel(false);
    }

    handleSubmit = e => {
        e.preventDefault();
        
        const valid = this.doDataValidation();

        if(valid){
            this.props.history.push('/table', this.state);
        } else {
            this.setState({isSubmitted: true});
        }
    }

    doDataValidation = () => {
        let valid = true;
        const{
            sampleSize,
            sampleMean,
            stDeviation,
            doHypothesisTest,
            hypMean
        } = this.state;

        this.clearErrorLists();

        if(sampleSize === ''){
            this.validationErrors.sampleSize.push('This field is required');
            valid = false;
        } else {
            if(sampleSize < this.minSampleSize){
                this.validationErrors.sampleSize.push(`Value must be ${this.minSampleSize} or greater`);
                valid = false;
            }

            if(!this.isInteger(sampleSize)){
                this.validationErrors.sampleSize.push('Value must be a whole number');
                valid = false;
            }
        }
        
        if(sampleMean === ''){
            this.validationErrors.sampleMean.push('This field is required');
            valid = false;
        } else {
            if(!this.isFloat(sampleMean)){
                this.validationErrors.sampleMean.push('Value must be a number');
                valid = false;
            }
        }

        if(stDeviation === ''){
            this.validationErrors.stDeviation.push('This field is required');
            valid = false;
        } else {
            if(stDeviation <= 0){
                this.validationErrors.stDeviation.push('Value must be greater than 0');
                valid = false;
            }

            if(!this.isFloat(stDeviation)){
                this.validationErrors.stDeviation.push('Value must be a number');
                valid = false;
            }
        }

        if(doHypothesisTest){
            if(hypMean === ''){
                this.validationErrors.hypMean.push('This field is required');
                valid = false;
            } else {
                if(!this.isFloat(hypMean)){
                    this.validationErrors.hypMean.push('Value must be a number');
                    valid = false;
                }
            }
        }

        return valid;
    }

    handleReset = e => {
        this.clearErrorLists();

        this.setState(() => this.initialState);
        this.enableHypMeanLabel(this.doHypothesisTest);
    }

    onInputChange = e => {
        const value = e.target.value;

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

    clearErrorLists = () => {
        // clear error lists
        let errorLists = Object.keys(this.validationErrors);
        for(let errorList of errorLists){
            this.validationErrors[errorList] = [];
        }
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
            stDeviation,
            doHypothesisTest,
            hypMean,
            isSubmitted
         } = this.state;
         const fieldErrors = this.validationErrors;

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
                            errors={fieldErrors.sampleSize}
                            label="Sample size" />
                        <TextFormField 
                            name="sampleMean"
                            id="mean"
                            value={sampleMean}
                            onChange={this.onInputChange}
                            errors={fieldErrors.sampleMean}
                            label="Sample mean" />
                        <TextFormField 
                            name="stDeviation"
                            id="stdeviation"
                            value={stDeviation}
                            onChange={this.onInputChange}
                            errors={fieldErrors.stDeviation}
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
                            errors={fieldErrors.hypMean}
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


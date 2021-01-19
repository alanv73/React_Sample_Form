import { Component } from 'react';
import './index.css';

class OutputTable extends Component {
    state= {
            minSampleSize: '',
            sampleSize: '',
            sampleMean: '',
            stDeviation: '',
            doHyposthesisTest: false,
            hypMean: ''
        };

    componentDidMount() {
        const {
            minSampleSize,
            sampleSize,
            sampleMean,
            stDeviation,
            doHypothesisTest,
            hypMean
        } = this.props.location.state;

        this.setState({
            minSampleSize: minSampleSize, 
            sampleSize: sampleSize, 
            sampleMean: sampleMean,
            stDeviation: stDeviation,
            doHypothesisTest: doHypothesisTest,
            hypMean: hypMean
        });
    }
    render() {
        console.log(this.state);
        const {
            sampleSize,
            sampleMean,
            stDeviation,
            doHypothesisTest,
            hypMean
        } = this.state;

        return (
            <div className="mt-5 mx-auto w-50 px-5">
                <table className="table table-bordered table-striped mx-auto">
                    <thead className="thead-dark">
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className="field-title">Sample size</th>
                            <td>{sampleSize}</td>
                        </tr>
                        <tr>
                            <th className="field-title">Sample mean</th>
                            <td>{sampleMean}</td>
                        </tr>
                        <tr>
                            <th className="field-title">Standard deviation</th>
                            <td>{stDeviation}</td>
                        </tr>
                        {
                            doHypothesisTest
                            &&
                            <tr>
                                <th className="field-title">Hypothesized mean</th>
                                <td>{hypMean}</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default OutputTable;
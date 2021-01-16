import { Component } from 'react';
import './index.css';

class OutputTable extends Component {
    state= {
            minSampleSize: '',
            sampleSize: '',
            sampleMean: '',
            stDev: '',
            doHypTest: false,
            hypMean: ''
        };

    componentDidMount() {
        const {
            minSampleSize,
            sampleSize,
            sampleMean,
            stDev,
            doHypTest,
            hypMean
        } = this.props.location.state;

        this.setState({
            minSampleSize: minSampleSize, 
            sampleSize: sampleSize, 
            sampleMean: sampleMean,
            stDev: stDev,
            doHypTest: doHypTest,
            hypMean: hypMean
        });
    }
    render() {
        const {
            sampleSize,
            sampleMean,
            stDev,
            doHypTest,
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
                            <td>{stDev}</td>
                        </tr>
                        {
                            doHypTest
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
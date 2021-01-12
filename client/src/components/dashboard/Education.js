import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import {deleteEducation} from '../../actions/profile';

const Education = ({education, deleteEducation}) => {
    const educations = education.map(edu =>(
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>{edu.fieldofstudy === null ? " " : edu.fieldofstudy}</td>
            <td><Moment format='YYYY/MM/DD'>{edu.from}</Moment> - {
                edu.to === null ? "Current" : <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
            }</td>
            <td>
                <button className="btn btn-danger" onClick={ () => deleteEducation(edu._id) }>Delete</button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <h2 className="my-h2">Education Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree or Cirtificate</th>
                        <th className="hide-sm">Field of Study</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>
        </Fragment>
    );
};

Education.propTypes = {
    educations: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, {deleteEducation})(Education);
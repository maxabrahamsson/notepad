import React, { Component } from 'react';
import axios from 'axios';
import { withFirebase } from './components/Firebase';
import { withAuthentication, withAuthorization } from './components/Session';
import { API_URL } from './Config';

export default function withBackend(WrappedComponent) {
  const Backend = class extends Component {
    getDataFromDb = async () => {
      const res = await axios.post(`${API_URL}/api/getData`, {
        jwt: JSON.parse(localStorage.getItem('authUser')).jwt,
      });
      return res.data;
    };

    putDataToDB = (message) => {
      axios.post(`${API_URL}/api/putData`, {
        message,
        jwt: JSON.parse(localStorage.getItem('authUser')).jwt,
      });
    };

    deleteFromDB = (idTodelete) => {
      axios.delete(`${API_URL}/api/deleteData`, {
        data: {
          _id: idTodelete,
          jwt: JSON.parse(localStorage.getItem('authUser')).jwt,
        },
      });
    };

    updateDB = (idToUpdate, updateToApply) => {
      axios.post(`${API_URL}/api/updateData`, {
        id: idToUpdate,
        update: { message: updateToApply },
        jwt: JSON.parse(localStorage.getItem('authUser')).jwt,
      });
    };

    render() {
      return <WrappedComponent {...this.props} backend={this} />;
    }
  };

  return Backend;
}

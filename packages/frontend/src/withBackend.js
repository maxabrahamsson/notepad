import React, { Component } from 'react';
import axios from 'axios';
import { API_URL } from './Config';

export default function withBackend(WrappedComponent) {
  const Backend = class extends Component {
    getDataFromDb = async () => {
      const res = await axios.post(`${API_URL}/api/getData`, {
        jwt: JSON.parse(localStorage.getItem('authUser')).jwt,
      });
      return res.data;
    };

    putDataToDB = async (message) => {
      const res = await axios.post(`${API_URL}/api/putData`, {
        message,
        jwt: JSON.parse(localStorage.getItem('authUser')).jwt,
      });
      return res;
    };

    deleteFromDB = async (idTodelete) => {
      const res = await axios.delete(`${API_URL}/api/deleteData`, {
        data: {
          _id: idTodelete,
          jwt: JSON.parse(localStorage.getItem('authUser')).jwt,
        },
      });
      return res;
    };

    updateDB = async (idToUpdate, updateToApply) => {
      const res = await axios.post(`${API_URL}/api/updateData`, {
        id: idToUpdate,
        update: { message: updateToApply },
        jwt: JSON.parse(localStorage.getItem('authUser')).jwt,
      });
      return res;
    };

    render() {
      return <WrappedComponent {...this.props} backend={this} />;
    }
  };

  return Backend;
}

import React, { Component } from 'react';
import axios from 'axios';
import { API_URL } from './Config';

export default function withBackend(WrappedComponent) {
  const Backend = class extends Component {
    getDataFromDb = async () => {
      const res = await fetch(`${API_URL}/api/getData`);
      return res.json();
    };

    putDataToDB = (message, userId) => {
      axios.post(`${API_URL}/api/putData`, {
        message,
      });
    };

    deleteFromDB = (idTodelete, userId) => {
      axios.delete(`${API_URL}/api/deleteData`, {
        data: {
          _id: idTodelete,
        },
      });
    };

    updateDB = (idToUpdate, updateToApply) => {
      axios.post(`${API_URL}/api/updateData`, {
        id: idToUpdate,
        update: { message: updateToApply },
      });
    };

    render() {
      return <WrappedComponent {...this.props} backend={this} />;
    }
  };

  return Backend;
}

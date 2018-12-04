import React, { Component } from 'react';
import axios from 'axios';
import { API_URL } from './Config';

export default function withBackend(WrappedComponent) {
  const Backend = class extends Component {
    constructor() {
      super();
      this.API = axios.create({
        baseURL: `${API_URL}/api/note`,
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('authUser')).jwt}`,
        },
      });
    }

    getDataFromDb = async () => {
      const res = await this.API.get();
      return res.data;
    };

    putDataToDB = async (message) => {
      const res = await this.API.post('', {
        message,
      });
      return res;
    };

    deleteFromDB = async (id) => {
      const res = await this.API.delete('', {
        id,
      });
      return res;
    };

    updateDB = async (idToUpdate, updateToApply) => {
      const res = await this.API.put('', {
        id: idToUpdate,
        update: { message: updateToApply },
      });
      return res;
    };

    render() {
      return <WrappedComponent {...this.props} backend={this} />;
    }
  };

  return Backend;
}

import * as AsyncStore from '../asyncstorage';
import axios from 'axios';
import {EventRegister} from 'react-native-event-listeners';
import NetInfo from '@react-native-community/netinfo';
// import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';

let isForceLogout = true;
let isConnectedWithInternet = true;
export const client = async (
  authToken,
  endpoint,
  methodType,
  body,
  customConfig,
  isValidate,
) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  };

  // if (authToken) {
  //     headers['auth-token'] = authToken;
  // }
  if (authToken) {
    headers['Authorization'] = 'Bearer ' + authToken;
  }

  console.log('authToken:------', authToken);
  // console.log('endpoint:------', endpoint);
  // console.log('timezone:------', momentTz.tz.guess());
  const config = {
    method: methodType,
    headers: {
      ...headers,
      ...customConfig,
    },
  };

  if (body) {
    config.body = body;
  }

  return new Promise(async (resolve, reject) => {
    const unsubscribe = NetInfo.addEventListener(async state => {
      if (state.isConnected) {
        console.log('internet is connected', JSON.stringify(config));
        const response = await axios({
          method: config.method,
          url: endpoint,
          data: config?.body,
          Accept: 'application/json',
          // headers: { "Content-Type": "application/json; charset=UTF-8" },
          headers: config.headers,
          timeout: 60 * 1000,
          // params: {
          //   page: params,
          // },
        })
          .then(async result => {
            // return result;
            // if (result.data.code == 401) {
            //   if (isForceLogout) {
            //     EventRegister.emit('logout', result?.data);
            //     isForceLogout = false;
            //   }
            //   // todo will manage logout once logout api integrated
            //   return;
            // }
            
            resolve(result);
          })
          .catch(err => {
            console.log('error in axis ', JSON.stringify(err.response.data));
            if (err.response.data.code == 401) {
              if (isForceLogout) {
                EventRegister.emit('logout', err.response?.data);
                isForceLogout = false;
              }
              // todo will manage logout once logout api integrated
              return;
            }
            // resolve(JSON.stringify(err.response));

            reject(err.response);
          });
      } else {
        console.log('internet is not connected');
        if (isConnectedWithInternet) {
          setTimeout(() => {
            EventRegister.emit('isConnected', true);
          }, 2000);
          isConnectedWithInternet = false;
          setTimeout(() => {
            isConnectedWithInternet = true;
          }, 2500);
        }
        reject('');
      }
    });

    unsubscribe();
  });
};

client.get = async function (endpoint, customConfig = {}, isValidate = true) {
  let token = await AsyncStore.getData(AsyncStore.Keys.ACCESS_TOKEN);
  return client(token, endpoint, 'GET', null, customConfig, isValidate);
};

client.post = async function (
  endpoint,
  body,
  customConfig = {},
  isValidate = true,
) {
  let token = await AsyncStore.getData(AsyncStore.Keys.ACCESS_TOKEN);
  return client(token, endpoint, 'POST', body, customConfig, isValidate);
};

client.put = async function (
  endpoint,
  body,
  customConfig = {},
  isValidate = true,
) {
  let token = await AsyncStore.getData(AsyncStore.Keys.ACCESS_TOKEN);
  return client(token, endpoint, 'PUT', body, customConfig, isValidate);
};

client.delete = async function (
  endpoint,
  body,
  customConfig = {},
  isValidate = true,
) {
  let token = await AsyncStore.getData(AsyncStore.Keys.ACCESS_TOKEN);
  return client(token, endpoint, 'DELETE', body, customConfig, isValidate);
};

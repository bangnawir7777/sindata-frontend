import axios from 'axios';
export const baseURL = 'http://localhost:7777/';

export const http = async (params) => {
  try {
    params.showMessage = params.showMessage !== undefined ? params.showMessage : true;
    let auth =  JSON.parse(localStorage.getItem('sindata'));
    let config = {
      method:params.method ? params.method : 'GET',
      baseURL:baseURL,
      url:params.path ? params.path : '',
      data:params.data ? params.data : {},
      headers:{
        'Authorization': 'Bearer '+ (auth ? auth.jwt : ''),
        'Content-Type': params.content_type ? params.content_type :'application/json'
      },
    };
    // console.log('params axios ', config)
    let {data} = await axios(config);
    return data;
  } catch (err) {
    console.log(err);
    return err.response.data.message
  }
}

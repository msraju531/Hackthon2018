/* Environments setup */

const env = 'STAGE';
let url;

if (env === 'STAGE') {
    url = { 
        api_url: 'https://sdt.taec.toshiba.com/demand_upload_api/api/v1',
        //api_url: 'http://192.168.1.109:5000/api/v1',
    };
}else if (env === 'DEV') {
    url = {
        api_url:'http://192.168.1.109:5000/api/v1',
    };
}else if (env === 'PROD') {
    url = {
        api_url: 'http://192.168.1.109:5000/api/v1',
    };
}

export const config = url;


const NodeRSA = require('node-rsa');

// const key = new NodeRSA({b: 512});
// console.log(key.exportKey('public'));
// console.log(key,exportKey('private'));

//public key for encryption data
const public_key = `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKQGczpYye1x3ZnRktmoWioVdOvMSSx9
YBPQBi1Gtxt3ua2YFRU9Uew1+Y+sQalj/UwP4ozoO2OMHOL98kqIqucCAwEAAQ==
-----END PUBLIC KEY-----`;

//private key for decryption data
const private_key = `-----BEGIN RSA PRIVATE KEY-----
MIIBOwIBAAJBAKQGczpYye1x3ZnRktmoWioVdOvMSSx9YBPQBi1Gtxt3ua2YFRU9
Uew1+Y+sQalj/UwP4ozoO2OMHOL98kqIqucCAwEAAQJASxx1CcP8/BHHc5fH0opI
d7sJpq0O2SO0qn35RiR610V2vNdMayGzqdsW62fTCDQ62db7c/kgbnp/kq84s7sx
KQIhAPNGp3aoImO0sBK/9rzpA+PZcdJPwlzFvd/h0HTxpmUdAiEArJqqsc2bPC/O
KbN1jisnfhP1i/YaenMYcS6ryNk0ZNMCIEh0j6Xgd7WYeCRtdhBXmif/eE36IVo+
LsoCWHKsEjHlAiEAkbV71d/JZZTByMhbu+nITBHTXxUiIy7Yemu4zzQ1m8sCIQDn
8kMo2nRRVwL8hNe3WTvUXZ03y4LpgH6SgfoXNPH69A==
-----END RSA PRIVATE KEY-----`;
//create public and private key as a nodersa variable
const key_public = new NodeRSA(public_key);
const key_private = new NodeRSA(private_key);

//function for encryption and decryption
const encrypt = (data) =>{
    return key_public.encrypt(data,'base64');
}

const decrypt = (data) =>{
    return key_private.decrypt(data,'utf8');
}
//export the function to use other modules in the application
module.exports = { encrypt, decrypt}
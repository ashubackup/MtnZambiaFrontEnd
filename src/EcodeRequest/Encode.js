// import CryptoJS from 'crypto-js';

// const Encode = () => {
//   function encryptPayload(url, payload) {
//     const plaintext = JSON.stringify(payload);
//     const secretKeyHex = process.env.REACT_APP_SECRET_VALUE;
//     const ivHex = process.env.REACT_APP_SECRET_VALUE;
    
//     if (!secretKeyHex || !ivHex) {
//       throw new Error("Environment variables are not set correctly.");
//     }

//     const key = CryptoJS.enc.Hex.parse(secretKeyHex);
//     const iv = CryptoJS.enc.Hex.parse(ivHex);

//     const encrypted = CryptoJS.AES.encrypt(plaintext, key, { iv: iv });
//     const encryptedBase64 = encrypted.toString();

//     console.log('Encrypted Data (Base64):', encryptedBase64);

//     return fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ data: encryptedBase64 }),
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then(responseData => {
//       console.log('Server Response:', responseData);
//       return responseData;
//     })
//     .catch(error => {
//       console.error("Error:", error);
//       throw error;
//     });
//   }

//   return { encryptPayload };
// };

// export default Encode;
import CryptoJS from 'crypto-js';

const Encode = () => {
  function encryptPayload(payload) {
    const plaintext = JSON.stringify(payload);
    const secretKeyHex = process.env.REACT_APP_SECRET_VALUE;
    const ivHex = process.env.REACT_APP_SECRET_VALUE;
    
    if (!secretKeyHex || !ivHex) {
      throw new Error("Environment variables are not set correctly.");
    }

    const key = CryptoJS.enc.Hex.parse(secretKeyHex);
    const iv = CryptoJS.enc.Hex.parse(ivHex);

    const encrypted = CryptoJS.AES.encrypt(plaintext, key, { iv: iv });
    const encryptedBase64 = encrypted.toString();

    console.log('Encrypted Data (Base64):', encryptedBase64);
    
    // Return the encrypted data
    return {data : encryptedBase64};
  }

  return { encryptPayload };
};

export default Encode;

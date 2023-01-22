// const axios = require("axios");
// const API_KEY = `33025526-c7f8a1e0e4b08b9a5d2f6635c`;

// const fetchPixabayAPI = (searchTerm) => {
//   return new Promise((resolve, reject) => {
//     axios.get("https://pixabay.com/api/", {
//       params: {
//         key: API_KEY,
//         q: searchTerm,
//         image_type: "photo",
//         orientation: "horizontal",
//         safesearch: true
//       }
//     }).then(response => {
//       if (response.status === 200) {
//         resolve(response.data.hits);
//       } else {
//         reject(new Error("Failed to retrieve images"));
//       }
//     }).catch(err => {
//       reject(err);
//     });
//   });
// }
// export {fetchPixabayAPI}
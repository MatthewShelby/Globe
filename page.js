// // // var form3 = { id: "", create: "2022-09-05T15:14:34.807Z", update: "2022-09-05T15:14:34.807Z", isDelete: true, email: "string", name: "Fati", walletAddress: "0x0s5s5s554", project: "lenzo", phoneNumber: "string" }

// // // var dd = { "testValue": "string" };
// // // console.log(dd.toString())
// // // $.ajax({
// // //       type: "post",
// // //       contentType: "application/json; charset=utf-8",
// // //       url: "https://localhost:7230/api/WhiteListRecords/newRecord",
// // //       data: JSON.stringify(form3),
// // //       dataType: "json"

// // //       , success: function (res) { console.info(res) }
// // // });







// var data = {
//       id: '00', referrer: window.location.toString(), isDelete: false,
//       create: "2022-09-06T04:34:15.445Z",
//       update: "2022-09-06T04:34:15.445Z",
// }

// fetch('https://api.ipregistry.co/?key=tryout')
//       .then(function (response) {
//             return response.json();
//       })
//       .then(function (payload) {
//             //console.log(payload.location.country.name + ', ' + payload.location.city);
//             // console.info(payload);
//             // console.log(payload.location.country.name + ',   => ');



//             data.ip = payload.ip;
//             data.country = payload.location.country.name;
//             data.city = 'payload.location.city';
//             data.browser = payload.user_agent.name;
//             data.language = payload.location.language.name;
//             data.geoData = payload;
//             console.info(JSON.stringify(data));
//             $.ajax({
//                   type: "post",
//                   contentType: "application/json; charset=utf-8",
//                   url: "https://localhost:7230/api/WhiteListRecords/PostInfo",
//                   data: JSON.stringify(data),
//                   dataType: "json"

//                   , success: function (res) { console.info(res) }
//             });
//       });


// // var data = {
// //       id: '00', referrer: window.location.toString(), isDelete: false,
// //       create: "2022-09-06T04:34:15.445Z",
// //       update: "2022-09-06T04:34:15.445Z",
// // }
// // data.ip = 'payload.ip';
// // data.country = 'payload.location.country.name';
// // data.city = 'payload.location.city';
// // data.browser = 'payload.user_agent.name';
// // data.language = 'payload.location.language.name';
// // data.geoData = 'payload';
// // //data.referrer = window.location;
// // var dd = {
// //       id: "string",
// //       create: "2022-09-06T04:34:15.445Z",
// //       update: "2022-09-06T04:34:15.445Z",
// //       isDelete: true,
// //       referrer: "string",
// //       ip: "string",
// //       country: "string",
// //       city: "string",
// //       language: "string",
// //       browser: "string",
// //       geoData: "string"
// // }
// // console.info(data);
// // console.info(dd);
// // $.ajax({
// //       type: "post",
// //       contentType: "application/json; charset=utf-8",
// //       url: "https://localhost:7230/api/WhiteListRecords/PostInfo",
// //       data: JSON.stringify(data),
// //       dataType: "json"

// //       , success: function (res) { console.info(res) }
// // });


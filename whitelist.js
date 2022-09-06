function submit() {
      var email = $('#email').value;
      var wa = $('#wa').value;
      var data = {
            "id": "00",
            "create": "2022-09-06T07:10:40.533Z",
            "update": "2022-09-06T07:10:40.533Z",
            "isDelete": false,
            "email": email.toString(),
            "name": "string",
            "walletAddress": wa.toString(),
            "project": "string",
            "phoneNumber": "string"
      }
      $.ajax({
            type: "post",
            contentType: "application/json; charset=utf-8",
            url: "https://localhost:7230/api/WhiteListRecords/newRecord",
            data: JSON.stringify(data),
            dataType: "json",
            success: function (res) { console.info(res) }
      })
}
$.('#submit').addEventListener('click', submit);

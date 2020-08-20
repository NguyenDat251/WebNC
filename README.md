# Internet Banking

![Badge](https://gitlab.com/khuedoan/internet-banking/badges/master/pipeline.svg)

- [Internet Banking](#internet-banking)

  - [Hướng dẫn sử dụng api](#hướng-dẫn-sử-dụng-api)

    - [API dành cho partner](#api-dành-cho-partner)

      - [Lấy thông tin tài khoản khách hàng bằng số tài khoản](#lấy-thông-tin-tài-khoản-khách-hàng-bằng-số-tài-khoản)
      - [Chuyển tiền vào tài khoản](#nạp-tiền-vào-tài-khoản)

    - [API dành cho admin](#api-dành-cho-admin)
      - [Xem lịch sử giao dịch với ngân hàng khác](#Xem-lịch-sử-giao-dịch-với-ngân-hàng-khác)
      - [Xem danh sách ngân hàng](#Xem-danh-sách-ngân-hàng)- [Internet Banking](#internet-banking)
    - [API dành cho USER](#api-dành-cho-user)
      - [Xem lịch sử giao dịch](#Xem-lịch-sử-giao-dịch)

## Hướng dẫn sử dụng api

### API dành cho partner

```json
Danh sach tai khoan
1208068
1208054
1208047
1208096
```

#### Lấy thông tin tài khoản khách hàng bằng số tài khoản

```json
GET /api/partner-bank/info/:number
//test với number = 1
HEADER
"id": "bankdbb"
"ts": 1593249076
"sig": "2d082e16d712c8f9619e0ca3a5895ea33f02bd4b"

```

- timestamp là thời điểm gởi request, format sử dụng unix utc second, có thể xem ở [https://www.epochconverter.com/,](https://www.epochconverter.com/,) lưu ý timestamp không được **lớn hơn** hoặc nhỏ hơn quá **300**s so với thời gian thực
- partner-code là chuỗi code để xác định partner nào đã đăng kí api
- authen-hash là chuỗi hash sha1 của **(timestamp+":"+JSON.stringify(body))+":"+secret**, nếu body empty thì là **{}**,sau đó được encode hex lại và gửi đi, ví dụ ở trên
- Không yêu cầu **verify**

#### Chuyển tiền vào tài khoản

```json
POST /api/partner-bank/add-money

HEADER
"id": "bankdbb"
"ts": 1593249076
"sig": "7ae591986f04ec5afca9d66c2d051138a0ce9ab4"
"verify": "XEszjLIzEE9j9LOfEJ9NDvGchmHVyQxtOus2JMm4rsz3ycMmqyGKCB4AlohaChJoh8G5zTpvjsgmhuoGheXqwc4sdqrR3JUzvZPSHxXIVSSIzcCrzrpeFjpYR8sq6QyX2CY9MsQQIOT5IM5EsaxvQa+hbaGXYD5rLA524F7mbA4="

BODY
{"number": 6, "money":1000,"username":"abc","content":"abc"}
```

- sig là chuỗi signature được tạo bởi thuật toán **RSA** của chuỗi **secret**, xem ví dụ sau:

```javascript
sig = privateKey.sign(secretKey, "base64", "base64");
```

-number: số tài khoản.

-username: username của người gửi.

-content: nội dung gửi.

### API dành cho admin

#### Xem lịch sử giao dịch với ngân hàng khác

```json
GET / api / partner - bank / transaction
//?time=062020&from=1&to=15&name=bankdbb
```

- time: tháng muốn coi lịch sử, định dạng MMYYYY.
- from, to: ngày
- name: tên ngân hàng

#### Xem danh sách ngân hàng

```json
GET / api / partner - bank / banks
```

### API giao dịch với ngân hàng khác

#### Xem thông tin

```json
GET /api/partner-bank/info-partner/:idBank/:credit_number

```

- idBank: id ngân hàng đối tác.
  Hiện có 2 id: kianto và rsa-bank
- credit_number: số tài khoản.
  kianto: 565572661049
  rsa-bank: không cần truyền (tạm thời)

#### Chuyển tiền tới ngân hàng khác

```json
GET /api/partner-bank/send-money

body {
    "idBank": "(như trên)",
    "idUser": "(id người gửi tiền)",
    "credit_number": "(như trên)",
    "money": "(số tiền gửi)",
    "content": "(nội dung)"
}
```

### API dành cho user

#### Xem lịch sử

```json
GET api/money/historyLocal
//?id=&isAll=

```

- id: id người dùng.
- isAll: mặc định coi 30 ngày thì truyền false, coi hết thì true.

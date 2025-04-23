const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const config = {
  user: 'sa',
  password: '12345',
  server: 'localhost',
  database: 'Web_shop_BTL',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

const custom_item = [
  {
    provider: "GearVN",
    img_link: "/img/products/laptop/laptop.webp",
    info: "Asus Vivobook Go 15 E1504FA R5 7520U (NJ776W)",
    price: 15000000,
    amount: 1,
  },
  {
    provider: "COAMc  oaC",
    img_link: "/img/products/laptop/laptop.webp",
    info: "NGUYEN TAN PHUOC",
    price: 2000000000,
    amount: 1,
  },
  {
    provider: "XYZ_ABC",
    img_link: "/img/products/laptop/laptop.webp",
    info: "CAI NIT",
    price: 150000,
    amount: 1,
  }
];



app.get('/cart', async (req, res) => {
  const customerID = req.query.customer_id

  if(!customerID) {
    return res.status(400).json({ error: 'Thiếu customer_id' })
  }

  try {
    await sql.connect(config);

    const userResult = await sql.query`
      SELECT * FROM CUSTOMER WHERE CUSTOMER_ID = ${customerID}
    `;

    const cartResult = await sql.query`
      SELECT P.PROVIDER, P.IMAGE_LINK, P.PRODUCT_NAME, P.PRICE, C.AMOUNT
      FROM CART C
      JOIN PRODUCT P
      WHERE C.CUSTOMER_ID = ${customerID}
    `;

    const user = userResult.recordset[0];
    const dbitems = cartResult.recordset;

    const items = [...dbitems, ...custom_item]

    res.json({ user, items });

  } catch (err) {
      console.error(err);
      res.status(500).send('Lỗi truy vấn SQL Server');
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      await sql.connect(config);

      const result = await sql.query`
          SELECT CUSTOMER_ID, ADMIN
          FROM CUSTOMER
          WHERE EMAIL = ${email} AND PASSWORD = ${password}
      `;

      if (result.recordset.length > 0) {
          const user = result.recordset[0];
          res.json({
            success: true,
            customer_id: user.CUSTOMER_ID,
            admin: user.ADMIN
          });
      } else {
          res.json({ success: false });
      }
  } catch (err) {
      console.error('Lỗi SQL:', err);
      res.status(500).send('Lỗi server khi đăng nhập');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

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
    manufacture: "GearVN",
    img_link: "/img/products/laptop/laptop.webp",
    info: "Asus Vivobook Go 15 E1504FA R5 7520U (NJ776W)",
    price: 15000000,
    amount: 1,
  },
  {
    manufacture: "COAMc  oaC",
    img_link: "/img/products/laptop/laptop.webp",
    info: "NGUYEN TAN PHUOC",
    price: 2000000000,
    amount: 1,
  },
  {
    manufacture: "XYZ_ABC",
    img_link: "/img/products/laptop/laptop.webp",
    info: "CAI NIT",
    price: 150000,
    amount: 1,
  }
];



app.get('/cart', async (req, res) => {
  const customerID = req.query.customer_id;

  if (!customerID) {
    return res.status(400).json({ error: 'Thiếu customer_id' });
  }

  try {
    await sql.connect(config);

    const userResult = await sql.query`
      SELECT * FROM CUSTOMER WHERE CUSTOMER_ID = ${customerID}
    `;

    const cartResult = await sql.query`
      SELECT 
      P.MANUFACTURE, 
      P.IMAGE_LINK, 
      P.PRODUCT_NAME, 
      P.PRICE, 
      C.PRODUCT_ID, 
      C.AMOUNT
    FROM CART C
    JOIN PRODUCT P ON C.PRODUCT_ID = P.PRODUCT_ID
    WHERE C.CUSTOMER_ID = ${customerID}
    `;
    console.log(cartResult);

    const user = userResult.recordset[0];
    const dbitems = cartResult.recordset;

    res.json({ user, items: dbitems });

  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi truy vấn SQL Server');
  }
});




app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const email = username;

  try {
      await sql.connect(config);

      const result = await sql.query`
        SELECT CUSTOMER_ID, ADMIN, NAME
        FROM CUSTOMER
        WHERE EMAIL = ${email} AND PASSWORD = ${password}
      `;

      if (result.recordset.length > 0) {
        const user = result.recordset[0];
        res.json({
          success: true,
          customer_id: user.CUSTOMER_ID,
          admin: user.ADMIN,
          name: user.NAME
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

app.post('/add-to-cart', async (req, res) => {
  const { customer_id, product_id, amount } = req.body;

  try {
      await sql.connect(config);

      const result = await sql.query`
          SELECT * FROM CART
          WHERE CUSTOMER_ID = ${customer_id} AND PRODUCT_ID = ${product_id}
      `;

      if (result.recordset.length > 0) {
          await sql.query`
              UPDATE CART
              SET AMOUNT = AMOUNT + ${amount},
                  LAST_UPDATE = CAST(GETDATE() AS DATE)
              WHERE CUSTOMER_ID = ${customer_id} AND PRODUCT_ID = ${product_id}
          `;
      } else {
          await sql.query`
              INSERT INTO CART (CUSTOMER_ID, PRODUCT_ID, AMOUNT, LAST_UPDATE)
              VALUES (${customer_id}, ${product_id}, ${amount}, CAST(GETDATE() AS DATE))
          `;
      }

      res.json({ success: true });
  } catch (err) {
      console.error('Lỗi thêm vào giỏ hàng:', err);
      res.status(500).json({ success: false });
  }
});

app.get('/products', async (req, res) => {
  try {
      await sql.connect(config);
      const result = await sql.query(`
          SELECT TOP 12 PRODUCT_ID, PRODUCT_NAME, PRICE, IMAGE_LINK
          FROM PRODUCT
          ORDER BY NEWID()
      `);
  
      res.json({
          success: true,
          products: result.recordset
      });
  } catch (err) {
      console.error('Lỗi khi lấy sản phẩm:', err);
      res.status(500).json({
          success: false,
          message: 'Lỗi máy chủ khi truy vấn sản phẩm.'
      });
  }
});

app.get('/productsBestSeller', async (req, res) => {
  try {
      await sql.connect(config);
      const result = await sql.query(`
          SELECT TOP 3 PRODUCT_ID, PRODUCT_NAME, PRICE, IMAGE_LINK
          FROM PRODUCT ORDER BY SOLD DESC
      `);
  
      res.json({
          success: true,
          productsBestseller: result.recordset
      });
  } catch (err) {
      console.error('Lỗi khi lấy sản phẩm:', err);
      res.status(500).json({
          success: false,
          message: 'Lỗi máy chủ khi truy vấn sản phẩm.'
      });
  }
});

app.get('/productCategory', async (req, res) => {
  const { category } = req.query;

  try {
      await sql.connect(config);
      const result = await sql.query`
          SELECT * FROM PRODUCTS WHERE CATEGORY = ${category}
      `;
      res.json(result.recordset);
  } catch (err) {
      console.error('Lỗi truy vấn sản phẩm:', err);
      res.status(500).json({ error: 'Lỗi máy chủ' });
  }
});
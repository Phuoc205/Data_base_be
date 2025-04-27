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
      SELECT DISTINCT 
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
app.get('/products/laptop', async (req, res) => {
  try {
      await sql.connect(config);
      const products = await sql.query(`SELECT P.*, C.*
        FROM PRODUCT P
        JOIN CATEGORY_LAPTOP C ON P.PRODUCT_ID = C.PRODUCT_ID
        WHERE P.CATEGORY_ID = 0`);
      res.json(products.recordset);  // Trả về dữ liệu sản phẩm dưới dạng JSON
  } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Failed to fetch products' });
  }
});

app.get('/products/mouse', async (req, res) => {
  try {
      await sql.connect(config);
      const products = await sql.query(`SELECT P.*, C.*
        FROM PRODUCT P
        JOIN CATEGORY_MOUSE C ON P.PRODUCT_ID = C.PRODUCT_ID
        WHERE P.CATEGORY_ID = 1`);
      res.json(products.recordset);  // Trả về dữ liệu sản phẩm dưới dạng JSON
  } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Failed to fetch products' });
  }
});

app.get('/products/keyboard', async (req, res) => {
  try {
      await sql.connect(config);
      const products = await sql.query(`SELECT P.*, C.*
        FROM PRODUCT P
        JOIN CATEGORY_KEYBOARD C ON P.PRODUCT_ID = C.PRODUCT_ID
        WHERE P.CATEGORY_ID = 2`);
      res.json(products.recordset);  // Trả về dữ liệu sản phẩm dưới dạng JSON
  } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Failed to fetch products' });
  }
});

app.get('/products/monitor', async (req, res) => {
  try {
      await sql.connect(config);
      const products = await sql.query(`SELECT P.*, C.*
        FROM PRODUCT P
        JOIN CATEGORY_MONITOR C ON P.PRODUCT_ID = C.PRODUCT_ID
        WHERE P.CATEGORY_ID = 3`);
      res.json(products.recordset);  // Trả về dữ liệu sản phẩm dưới dạng JSON
  } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Failed to fetch products' });
  }
});

app.get('/products/headphones', async (req, res) => {
  try {
      await sql.connect(config);
      const products = await sql.query(`SELECT P.*, C.*
        FROM PRODUCT P
        JOIN CATEGORY_HEADPHONES C ON P.PRODUCT_ID = C.PRODUCT_ID
        WHERE P.CATEGORY_ID = 4`);
      res.json(products.recordset);  // Trả về dữ liệu sản phẩm dưới dạng JSON
  } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Failed to fetch products' });
  }
});

app.get('/products/casepc', async (req, res) => {
  try {
      await sql.connect(config);
      const products = await sql.query(`SELECT P.*, C.*
        FROM PRODUCT P
        JOIN CATEGORY_CASEPC C ON P.PRODUCT_ID = C.PRODUCT_ID
        WHERE P.CATEGORY_ID = 5`);
      res.json(products.recordset);  // Trả về dữ liệu sản phẩm dưới dạng JSON
  } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Failed to fetch products' });
  }
});

app.get('/products/cooler', async (req, res) => {
  try {
      await sql.connect(config);
      const products = await sql.query(`SELECT P.*, C.*
        FROM PRODUCT P
        JOIN CATEGORY_COOLER C ON P.PRODUCT_ID = C.PRODUCT_ID
        WHERE P.CATEGORY_ID = 6`);
      res.json(products.recordset);  // Trả về dữ liệu sản phẩm dưới dạng JSON
  } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Failed to fetch products' });
  }
});

app.get('/products/console', async (req, res) => {
  try {
      await sql.connect(config);
      const products = await sql.query(`SELECT P.*, C.*
        FROM PRODUCT P
        JOIN CATEGORY_CONSOLE C ON P.PRODUCT_ID = C.PRODUCT_ID
        WHERE P.CATEGORY_ID = 7`);
      res.json(products.recordset);  // Trả về dữ liệu sản phẩm dưới dạng JSON
  } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Failed to fetch products' });
  }
});

app.get('/products/table', async (req, res) => {
  try {
      await sql.connect(config);
      const products = await sql.query(`SELECT P.*, C.*
        FROM PRODUCT P
        JOIN CATEGORY_TABLE C ON P.PRODUCT_ID = C.PRODUCT_ID
        WHERE P.CATEGORY_ID = 8`);
      res.json(products.recordset);  // Trả về dữ liệu sản phẩm dưới dạng JSON
  } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Failed to fetch products' });
  }
});

app.post('/cart/update-amount', async (req, res) => {
  const { customer_id, product_id, amount } = req.body;
  try {
    await sql.connect(config);
    await sql.query`
      UPDATE CART
      SET AMOUNT = ${amount}
      WHERE CUSTOMER_ID = ${customer_id} AND PRODUCT_ID = ${product_id}
    `;
    res.send('OK');
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi update số lượng');
  }
});

app.delete('/cart/delete', async (req, res) => {
  try {
      const { customer_id, product_id } = req.body;
      await sql.connect(config);
      await sql.query`DELETE FROM CART WHERE CUSTOMER_ID = ${customer_id} AND PRODUCT_ID = ${product_id}`;
      res.json({ success: true });
  } catch (error) {
      console.error('Error deleting cart item:', error);
      res.status(500).json({ success: false });
  }
});

app.post('/cart/checkout', async (req, res) => {
  const { customer_id, items } = req.body;

  if (!customer_id || !items || !Array.isArray(items)) {
      return res.status(400).json({ success: false, message: 'Thiếu dữ liệu!' });
  }

  try {
      const pool = await sql.connect(config);

      const transaction = new sql.Transaction(pool);
      await transaction.begin();

      try {
          for (const item of items) {
              const checkResult = await transaction.request()
                  .query(`
                      SELECT IN_STOCK FROM PRODUCT WHERE PRODUCT_ID = '${item.product_id}'
                  `);

              if (checkResult.recordset.length === 0) {
                  throw new Error(`Không tìm thấy sản phẩm ${item.product_id}`);
              }

              const inStock = checkResult.recordset[0].IN_STOCK;
              if (inStock < item.amount) {
                  throw new Error(`Sản phẩm ${item.product_id} không đủ hàng (còn ${inStock})`);
              }

              await transaction.request()
                  .query(`
                      UPDATE PRODUCT
                      SET 
                          SOLD = SOLD + ${item.amount},
                          IN_STOCK = IN_STOCK - ${item.amount}
                      WHERE PRODUCT_ID = '${item.product_id}'
                  `);

              // Xóa sản phẩm khỏi CART
              await transaction.request()
                  .query(`
                      DELETE FROM CART
                      WHERE CUSTOMER_ID = '${customer_id}'
                      AND PRODUCT_ID = '${item.product_id}'
                  `);
          }

          await transaction.commit();
          res.json({ success: true, message: 'Thanh toán thành công!' });

      } catch (err) {
          await transaction.rollback();
          console.error('Lỗi khi thanh toán:', err.message);
          res.status(500).json({ success: false, message: err.message });
      }
  } catch (err) {
      console.error('Lỗi database:', err.message);
      res.status(500).json({ success: false, message: 'Lỗi server' });
  }
});

app.get('/products-list', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query(`
      SELECT PRODUCT_ID, PRODUCT_NAME, CATEGORY_ID, PRICE, IN_STOCK
      FROM PRODUCT
    `);

    res.json({
      success: true,
      products: result.recordset,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products'
    });
  }
});

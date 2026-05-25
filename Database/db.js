const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// เชื่อมต่อฐานข้อมูล
const dbPath = path.join(__dirname, 'stockmb.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    // 1. ตาราง Employee (อัปเดตให้มีฟิลด์ครบถ้วนตาม main.js)
    db.run(`CREATE TABLE IF NOT EXISTS employee (
        emp_id TEXT PRIMARY KEY,
        emp_name TEXT,
        age INTEGER,
        sex TEXT,
        phone TEXT,
        position TEXT,
        salary REAL,
        qualification TEXT,
        year_qual INTEGER,       -- เก็บปีที่จบการศึกษา
        email TEXT,              -- อีเมลพนักงาน
        username TEXT,           -- ชื่อผู้ใช้สำหรับ Login
        password TEXT,           -- รหัสผ่าน
        role TEXT DEFAULT 'Staff' -- ระดับสิทธิ์การใช้งาน
    )`);

    // 2. ตาราง Product (สินค้า)
    db.run(`CREATE TABLE IF NOT EXISTS product (
        product_id TEXT PRIMARY KEY,
        product_name TEXT,
        pro_category TEXT,
        price NUMERIC,
        quantity INTEGER,
        cat_id INTEGER,
        image TEXT 
    )`);

    // 3. ตาราง import_expenses (บันทึกรายจ่ายการนำเข้าสินค้า)
    db.run(`CREATE TABLE IF NOT EXISTS import_expenses (
        import_id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id TEXT NOT NULL,
        import_qty INTEGER NOT NULL,
        unit_cost REAL NOT NULL,
        total_cost REAL NOT NULL,
        import_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES product(product_id)
    )`, (err) => {
        if (err) {
            console.error("Error creating import_expenses table:", err.message);
        } else {
            console.log(" ตาราง import_expenses พร้อมใช้งาน (สำหรับบันทึกต้นทุนสั่งซื้อ)");
        }
    });

    // 4. ส่วนตรวจสอบและอัปเดตโครงสร้างตาราง (กรณีมีฐานข้อมูลเก่าอยู่แล้ว)
    // ตรวจสอบคอลัมน์ image ใน product
    db.run(`ALTER TABLE product ADD COLUMN image TEXT`, (err) => {
        if (err) {
            console.log("คอลัมน์ image มีอยู่ในระบบอยู่แล้ว");
        } else {
            console.log(" เพิ่มคอลัมน์ image ลงในตาราง product เรียบร้อย");
        }
    });

    // ตรวจสอบคอลัมน์ role ใน employee (เผื่อกรณีฐานข้อมูลเดิมไม่มี)
    db.run(`ALTER TABLE employee ADD COLUMN role TEXT DEFAULT 'Staff'`, (err) => {
        if (!err) console.log(" เพิ่มคอลัมน์ role ในตาราง employee เรียบร้อย");
    });

    console.log(" เชื่อมต่อฐานข้อมูลและตรวจสอบโครงสร้างตารางเรียบร้อย");
});

module.exports = db;
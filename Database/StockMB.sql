USE StockMB;
CREATE TABLE employee (
    emp_id char PRIMARY KEY,
    emp_name VARCHAR(100),
    age INT,
    sex VARCHAR(10),
    phone VARCHAR(20),
    position VARCHAR(50),
    salary DECIMAL(10,2)
);


CREATE TABLE password (
    emp_id CHAR PRIMARY KEY,
    username VARCHAR(50),
    id_password VARCHAR(100),
    FOREIGN KEY (emp_id) REFERENCES employee(emp_id)
);

CREATE TABLE qualification (
    qual_id INT PRIMARY KEY,
    qual_name VARCHAR(100),
    qual_type VARCHAR(50),
    year_qual INT
);

CREATE TABLE experience (
    ex_id INT PRIMARY KEY,
    emp_id INT,
    position VARCHAR(50),
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (emp_id) REFERENCES employee(emp_id)
);

CREATE TABLE category (
    cat_id char PRIMARY KEY,
    cat_name VARCHAR(100)
);

CREATE TABLE product (
    product_id char PRIMARY KEY,
    product_name VARCHAR(100),
    description TEXT,
    pro_category VARCHAR(50),
    price DECIMAL(10,2),
    quantity INT,
    cat_id char,
    FOREIGN KEY (cat_id) REFERENCES category(cat_id)
);

CREATE TABLE sale (
    sale_id char PRIMARY KEY,
    sale_date DATE,
    totalamount DECIMAL(10,2),
    emp_id char,
    FOREIGN KEY (emp_id) REFERENCES employee(emp_id)
);


CREATE TABLE saleitem (
    saleitem_id char PRIMARY KEY,
    sale_id char,
    product_id char,
    quantity INT,
    price DECIMAL(10,2),
    FOREIGN KEY (sale_id) REFERENCES sale(sale_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);


CREATE TABLE import (
    imp_id char PRIMARY KEY,
    imp_date DATE,
    total_amount DECIMAL(10,2),
    emp_id char,
    FOREIGN KEY (emp_id) REFERENCES employee(emp_id)
);

CREATE TABLE import_item (
    imp_id char,
    product_id char,
    quantity INT,
    cost_price DECIMAL(10,2),
    PRIMARY KEY (imp_id, product_id),
    FOREIGN KEY (imp_id) REFERENCES import(imp_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);









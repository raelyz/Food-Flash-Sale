-- INSERT INTO users (username,password,email) VALUES('aurelialim','12345','aurelia@gmail.com');
-- INSERT INTO users (username,password,email) VALUES('rlyz','12345','ray@gmail.com');
-- INSERT INTO users (username,password,email) VALUES('exhlim','12345','eugene@gmail.com');
-- INSERT INTO users (username,password,email) VALUES('alvischew','22222','alvis@gmail.com');
-- INSERT INTO users (username,password,email) VALUES('clairetay','12345','claire@gmail.com');
-- INSERT INTO users (username,password,email) VALUES('joey','12345','joey@gmail.com');
-- INSERT INTO users (username,password,email) VALUES('vincent','12345','xincent@gmail.com');
-- INSERT INTO users (username,password,email) VALUES('qundax','51234','qunda@gmail.com');

-- INSERT INTO merchant (name,password,email,address,uen,cuisine) VALUES('mcdonalds','12345','macs@gmail.com','10 Anson Road','UEN12345MACS','fast food');

-- INSERT INTO merchant (name,password,email,address,uen,cuisine) VALUES('poketheory','12345','poke@gmail.com','12 Anson Road','UEN12345POKE','Poke');

-- INSERT INTO merchant (name,password,email,address,uen,cuisine) VALUES('RyuSushi','12345','ryu@gmail.com','11 Anson Road','UEN12345RYU','japanese');

-- INSERT INTO merchant (name,password,email,address,uen,cuisine) VALUES('Astons','12345','astons@gmail.com','11 Middle Road','UEN12345ASTONS','western');

-- INSERT INTO merchant (name,password,email,address,uen,cuisine) VALUES('Paradise Dynasty','12345','paradise@gmail.com','133 Anson Road','UEN12345PS','chinese');

-- INSERT INTO merchant (name,password,email,address,uen,cuisine) VALUES('Pizza Hut','12345','pizza@gmail.com','1222 Anson Road','UEN12345PIZZ','fast food');



-- INSERT INTO category (category_name) VALUES('snacks');
-- INSERT INTO category (category_name) VALUES('light bites');
-- INSERT INTO category (category_name) VALUES('dim sum');
-- INSERT INTO category (category_name) VALUES('noodles');
-- INSERT INTO category (category_name) VALUES('junk food');
-- INSERT INTO category (category_name) VALUES('hearty meals');


INSERT INTO listing (item_name,unit_price,quantity,price_ceiling,price_floor,category_id,merchant_id,
  description,time_limit_min,live,time) VALUES('Hawaiian Pizza',10,10,8,5,1,6,'Either you hate or u love',120,true,current_timestamp);

INSERT INTO listing (item_name, unit_price,quantity,price_ceiling,price_floor,category_id,merchant_id,
  description,time_limit_min,live,time) VALUES('xiao long bao',20,10,15,10,3,5,'soupy dumplings',120,true,current_timestamp);

INSERT INTO listing (item_name, unit_price,quantity,price_ceiling,price_floor,category_id,merchant_id,
  description,time_limit_min,live,time) VALUES('Nuggets',5,10,4,2,5,1,'nuggets r life',60,true,current_timestamp);

INSERT INTO listing (item_name, unit_price,quantity,price_ceiling,price_floor,category_id,merchant_id,
  description,time_limit_min,live,time) VALUES('chicken chop',14,10,12,7,6,4,'a hearty chicken chop',180,true,current_timestamp);

INSERT INTO listing (item_name, unit_price,quantity,price_ceiling,price_floor,category_id,merchant_id,
  description,time_limit_min,live,time) VALUES('Aburi Don',20,10,15,10,6,5,'feeling torchy',180,true,current_timestamp);

INSERT INTO listing (item_name, unit_price,quantity,price_ceiling,price_floor,category_id,merchant_id,
  description,time_limit_min,live,time) VALUES('Salmon Soba',20,10,17,10,6,2,'for the health fanatic',60,true,current_timestamp);

-- INSERT INTO orders (receipt_id, listing_id,price,quantity,revenue) VALUES('1',1,5,5,5);
-- INSERT INTO orders (receipt_id, listing_id,price,quantity,revenue) VALUES('1',1,5,5,5);
-- INSERT INTO orders (receipt_id, listing_id,price,quantity,revenue) VALUES('1',1,5,5,5);

-- INSERT INTO receipt (user_id,merchant_id) VALUES(2,6);
-- INSERT INTO receipt (user_id,merchant_id) VALUES(2,6);
-- INSERT INTO receipt (user_id,merchant_id) VALUES(2,6);
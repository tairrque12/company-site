ALTER table department ADD COLUMN image_url VARCHAR(500);

UPDATE department SET image_url = '/images/robot-department.jpg' WHERE slug = 'robotics';
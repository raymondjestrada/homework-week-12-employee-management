INSERT INTO departments (dept_name)
VALUES
    ('Command'),
    ('Operations'),
    ('Sciences');

INSERT INTO roles (role_title, salary, department_id)
VALUES
    ('Captain', 200000, 1),
    ('Commander', 150000, 1),
    ('Lieutenant Commander', 100000, 1),
    ('Chief Engineer', 100000, 2),
    ('Security Chief', 100000, 2),
    ('Engineer', 50000, 2),
    ('Security Officer', 50000, 2),
    ('Chief Medical Officer', 100000, 3),
    ('Science Officer', 50000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Jean-Luc', 'Picard', 1, NULL),
    ('William', 'Riker', 2, 1),
    ('Data', "Soong", 3, 2),
    ('Geordi', 'LaForge', 4, 2),
    ('Tasha', 'Yar', 5, 2),
    ('Reginald', 'Barclay', 6, 4),
    ('Worf', 'House of Mogh', 7, 5),
    ('Beverly', 'Crusher', 8, 1),
    ('Alyssa', 'Ogawa', 9, 8);
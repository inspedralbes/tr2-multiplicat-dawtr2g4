INSERT INTO categorias(nom) VALUES  
('Nombres i Operacions'), ('Equacions'), ( 'Funcions'), ('Mesures'), ('Geometria'), ("Estadística");

INSERT INTO users(name, email, password) VALUES
("admin", "admin@gmail.com", "$2y$12$kv4uXRTwXp4MzAsDg8zNHOkJ8Qzb7LfweBWSmMa1wFTRuMyAUc.im"), -- password: adminadminadmin
("Bob", "bob@gmail.com", "$2y$12$BCW.ir.87d91zPAEiIklOORIgsK8vPu8FX4dwif/Wd8K4sH8dX8pa"), -- password: bob
("Alice", "alice@gmail.com", "$2y$12$eBlyPITjVOi/P/qh25iiXOvE7l6ygUHuJwuDHPQKDfEGQCMi3Y9sG"), -- password: alice
("Santi", "santi@gmail.com", "$2y$12$LL.VQ7Ihn/rutxFt3afP.ey0JwHk6AA6c72b5kUZYjQ0QpHiy3Up2"), -- password: santi
("Alvaro", "alvaro@gmail.com", "$2y$12$nXaOJfYfe3L8pciCK8sbu.ygIQxCxmOph7rsWsJAl4sQVZyRjPJ.6"), -- password: alvaro
("David", "david@gmail.com", "$2y$12$2T2EIVOsx/l2ke3UvoeZ/Oko1rGo.SrFt3Rf.l0aV7//Vwn8bf0Xe"), -- password: david
("Miquel", "miquel@gmail.com", "$2y$12$4uWjEHnKQkju94mlhGlid.ieDPcjGNevI5wT0hI19txA83vIymeb6"); -- password: miquel

UPDATE users SET esAdmin = true WHERE name = 'admin';

INSERT INTO preguntas(text_pregunta, dificultat, categoria_id) VALUES
-- Categoria 1: Nombres i Operacions
("Quina de les següents opcions és un nombre enter?", 1, 1),
("Si multipliquem un nombre per la seva potència de base deu, quin és el resultat?", 1, 1),
("Quin és el resultat de l'operació combinada 4 + 3 x 2?", 1, 1),
("Quin és el resultat de (2^3)^2", 2, 1),
("Si tenim una fracció 3/4, quina de les següents opcions representa una fracció equivalent?", 2, 1),
("Quin percentatge del total representa la fracció 5/20?", 2, 1),
("Si dos nombres són directament proporcionals i el primer és 3 i el segon és 12, quina serà la relació si el primer augmenta a 6?", 3, 1),
("Quin és el resultat de l'operació √(3^2 + 4^2)", 3, 1),
("En una regla de tres simple inversa, si quan tenim 4 màquines el treball es realitza en 8 hores, quantes hores necessitarem si tenim 2 màquines?", 3, 1),
-- Categoria 2: Equacions
("Què és una equació de primer grau?", 1, 2),
("Quina és la solució de l'equació x + 3 = 7?", 1, 2),
("Com podem transformar una equació a una equació equivalent?", 1, 2),
("Si 3x - 1 = 11, quin és el valor de x?", 2, 2),
("Quin és el primer pas per resoldre l'equació 2(x - 5) = 14?", 2, 2),
("Quina propietat utilitzem quan transposam termes d'una banda a l'altra en una equació?", 2, 2),
("Resol l'equació 2(x/3 + 4) = x - 2", 3, 2),
("Si 5x + 2 = 3x - 6, quina és la solució per a x?", 3, 2),
("Determina el valor de x en l'equació (x - 2)/(x + 3) = 3/(x + 3)", 3, 2);

INSERT INTO respostas(text_resposta, correcta, pregunta_id) VALUES
-- Categoria 1: Nombres i Operacions
("3/4", false, 1), ("-5", true, 1), ("0.75", false, 1), ("√2", false, 1),
("El mateix nombre", false, 2), ("Un nombre més gran", true, 2), ("Un nombre més petit", false, 2), ("Zero", false, 2),
("14", false, 3), ("10", true, 3), ("11", false, 3), ("24", false, 3),
("64", true, 4), ("16", false, 4), ("32", false, 4), ("8", false, 4),
("6/8", false, 5), ("9/12", false, 5), ("Totes les anteriors", true, 5), ("Cap de les anteriors", false, 5),
("25%", true, 6), ("20%", false, 6), ("5%", false, 6), ("50%", false, 6),
("6 i 12", false, 7), ("6 i 24", true, 7), ("3 i 24", false, 7), ("6 i 18", false, 7),
("5", true, 8), ("25", false, 8), ("7", false, 8), ("10", false, 8),
("4 hores", false, 9), ("16 hores", true, 9), ("12 hores", false, 9), ("8 hores", false, 9),
-- Categoria 2: Equacions
("Una igualtat amb variables", true, 10), ("Una pregunta matemàtica", false, 10), ("Un tipus de funció", false, 10), ("Un joc de números", false, 10),
("x = 10", false, 11), ("x = -4", false, 11), ("x = 4", true, 11), ("x = 3", false, 11),
("Canviant els nombres", false, 12), ("Fent operacions matemàtiques", true, 12), ("Adivinant", false, 12), ("Utilitzant una calculadora", false, 12),
("x = 3", false, 13), ("x = 5", false, 13), ("x = 12", false, 13), ("x = 4", true, 13),
("Distribuir el 2", true, 14), ("Sumar 5", false, 14), ("Restar 14", false, 14), ("Dividir per 2", false, 14),
("Propietat de simetria", false, 15), ("Propietat distributiva", false, 15), ("Propietat commutativa", false, 15), ("Propietat de transposició", true, 15),
("x = -10", true, 16), ("x = 10", false, 16), ("x = 2", false, 16), ("x = -2", false, 16),
("x = 4", false, 17), ("x = 1", false, 17), ("x = -1", false, 17), ("x = -4", true, 17),
("x = -5", false, 18), ("x = 2", false, 18), ("x = 5", true, 18), ("x = -2", false, 18);


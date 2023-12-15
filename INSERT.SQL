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
-- Categoria 1: Nombres i Operacions:
    -- Dificultat 1:
("Quina de les següents opcions és un nombre enter?", 1, 1),
("Si multipliquem un nombre per la seva potència de base deu, quin és el resultat?", 1, 1),
("Quin és el resultat de l'operació combinada 4 + 3 x 2?", 1, 1),
("Com es diu el resultat d'una suma?", 1, 1),
("Què obtenim quan elevem qualsevol nombre a l'exponent zero?", 1, 1),
("Si augmentem un nombre natural amb un altre natural, quina classe de nombre és el resultat?", 1, 1),
("Quin és el nom de l'operació que ens permet trobar quants cops un nombre està contingut en un altre?", 1, 1),
("Quin és el resultat de l'expressió 5^1?", 1, 1),
("Què representa el nombre 0 en l'escala dels nombres naturals?", 1, 1),
("Quin és el resultat de sumar el nombre més petit amb el nombre més gran de -3 i 2?", 1, 1),
("Quina expressió representa una potència de base deu?", 1, 1),
("Quina és la suma de 10 i la seva potència de base deu?", 1, 1),
    -- Dificultat 2:
("Quin és el resultat de (2^3)^2", 2, 1),
("Si tenim una fracció 3/4, quina de les següents opcions representa una fracció equivalent?", 2, 1),
("Quin percentatge del total representa la fracció 5/20?", 2, 1),
("Com podem expressar el nombre 0,125 com una potència de base deu?", 2, 1),
("Quina és la fracció equivalent a 50%?", 2, 1),
("Si la fracció 2/5 es representa en una recta numèrica, entre quins dos nombres enters es trobarà?", 2, 1),
("Quin és el resultat de reduir la fracció 10/25?", 2, 1),
("Si sumem 1/4 i 1/2, quina fracció obtenim?", 2, 1),
("Quin percentatge és equivalent a 3/5?", 2, 1),
("Quin nombre enter és equivalent a la fracció 150/15?", 2, 1),
("Si dividiu 1 entre 1/5, quin és el resultat?", 2, 1),
("Quin percentatge de 200 és 50?", 2, 1),
    -- Dificultat 3:
("Si dos nombres són directament proporcionals i el primer és 3 i el segon és 12, quina serà la relació si el primer augmenta a 6?", 3, 1),
("Quin és el resultat de l'operació √(3^2 + 4^2)", 3, 1),
("En una regla de tres simple inversa, si quan tenim 4 màquines el treball es realitza en 8 hores, quantes hores necessitarem si tenim 2 màquines?", 3, 1),
("Quina és la raó de la proporció directa si tenim que 4 es relaciona amb 10?", 3, 1),
("Si la relació entre dos magnituds és inversament proporcional i una s'incrementa en un factor de 2, com canvia l'altra?", 3, 1),
("Quina seria la representació decimal de la fracció 7/8?", 3, 1),
("Quin seria el resultat de multiplicar un nombre per la seva inversa?", 3, 1),
("Si tenim una proporció on a:b = 4:6, i a s'incrementa a 8, quin seria el nou valor de b?", 3, 1),
("En una escala on 1cm representa 2m, quants metres representen 5cm?", 3, 1),
("Quina és la suma dels inversos de 2 i 3?", 3, 1),
("Si 'a' és directament proporcional a 'b' i 'a = 10' quan 'b = 2', quin és el valor de 'b' quan a = 5?", 3, 1),
("En una proporció inversa, si 'a' és inversament proporcional a 'b' i 'a = 8' quan 'b = 2', quin és el valor de 'b' quan 'a = 4'?", 3, 1),

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
    -- Dificultat 1:
("3/4", false, 1), ("-5", true, 1), ("0.75", false, 1), ("√2", false, 1),
("El mateix nombre", false, 2), ("Un nombre més gran", true, 2), ("Un nombre més petit", false, 2), ("Zero", false, 2),
("14", false, 3), ("10", true, 3), ("11", false, 3), ("24", false, 3),
("Sumand", false, 4), ("Diferència", false, 4), ("Producte", false, 4), ("Suma", true, 4),
("0", false, 5), ("1", true, 5), ("El mateix nombre", false, 5), ("Infinit", false, 5),
("Un enter negatiu", false, 6), ("Un nombre irracional", false, 6), ("Un nombre natural", true, 6), ("Una fracció", false, 6),
("Suma", false, 7), ("Divisió", true, 7), ("Potenciació", false, 7), ("Resta", false, 7),
("5", true, 8), ("1", false, 8), ("0", false, 8), ("25", false, 8),
("L'origen", false, 9), ("L'últim nombre", false, 9), ("El nombre que no pertany a aquesta escala", true, 9), ("Un nombre negatiu", false, 9),
("-1", true, 10), ("-5", false, 10), ("1", false, 10), ("-1", true, 10),
("2^10", false, 11), ("25^2", false, 11), ("10^2", true, 11), ("10^1/2", false, 11),
("100", false, 12), ("110", false, 12), ("20", true, 12), ("10.1", false, 12),
    -- Dificultat 2:
("64", true, 13), ("16", false, 13), ("32", false, 13), ("8", false, 13),
("6/8", false, 14), ("9/12", false, 14), ("Totes les anteriors", true, 14), ("Cap de les anteriors", false, 14),
("25%", true, 15), ("20%", false, 15), ("5%", false, 15), ("50%", false, 15),
("10^3", false, 16), ("10^-3", true, 16), ("10^125", false, 16), ("10^-125", false, 16),
("1/2", true, 17), ("1/4", false, 17), ("1/5", false, 17), ("2/5", false, 17),
("Entre 0 i 1", true, 18), ("Entre 1 i 2", false, 18), ("Entre 2 i 3", false, 18), ("Entre 3 i 4", false, 18),
("2/5", true, 19), ("5/10", false, 19), ("5/25", false, 19), ("10/10", false, 19),
("1/6", false, 20), ("2/6", false, 20), ("3/4", true, 20), ("4/4", false, 20),
("60%", true, 21), ("30%", false, 21), ("50%", false, 21), ("75%", false, 21),
("10", true, 22), ("5", false, 22), ("15", false, 22), ("150", false, 22),
("5", true, 23), ("0.2", false, 23), ("1", false, 23), ("0.5", false, 23),
("25%", true, 24), ("125%", false, 24), ("50%", false, 24), ("75%", false, 24),
    -- Dificultat 3:
("6 i 12", false, 25), ("6 i 24", true, 25), ("3 i 24", false, 25), ("6 i 18", false, 25),
("5", true, 26), ("25", false, 26), ("7", false, 26), ("10", false, 26),
("4 hores", false, 27), ("16 hores", true, 27), ("12 hores", false, 27), ("8 hores", false, 27),
("2.5", true, 28), ("0.4", false, 28), ("6", false, 28), ("14", false, 28),
("S'incrementa en un factor de 2", false, 29), ("Disminueix a la meitat", true, 29), ("Es manté constant", false, 29), ("Disminueix en un factor de 2", false, 29),
("0.875", true, 30), ("0.9", false, 30), ("0.78", false, 30), ("0.7", false, 30),
("1", true, 31), ("0", false, 31), ("El mateix nombre", false, 31), ("Infinit", false, 31),
("9", false, 32), ("12", true, 32), ("6", false, 32), ("3", false, 32),
("10m", true, 33), ("5m", false, 33), ("2.5m", false, 33), ("20m", false, 33),
("2/3", false, 34), ("5/6", true, 34), ("6/5", false, 34), ("3/2", false, 34),
("1", true, 35), ("2", false, 35), ("4", false, 35), ("0.5", false, 35),
("1", false, 36), ("4", true, 36), ("2", false, 36), ("8", false, 36),

-- Categoria 2: Equacions
("Una igualtat amb variables", true, 37), ("Una pregunta matemàtica", false, 37), ("Un tipus de funció", false, 37), ("Un joc de números", false, 37),
("x = 10", false, 38), ("x = -4", false, 38), ("x = 4", true, 38), ("x = 3", false, 38),
("Canviant els nombres", false, 39), ("Fent operacions matemàtiques", true, 39), ("Adivinant", false, 39), ("Utilitzant una calculadora", false, 39),
("x = 3", false, 40), ("x = 5", false, 40), ("x = 12", false, 40), ("x = 4", true, 40),
("Distribuir el 2", true, 41), ("Sumar 5", false, 41), ("Restar 14", false, 41), ("Dividir per 2", false, 41),
("Propietat de simetria", false, 42), ("Propietat distributiva", false, 42), ("Propietat commutativa", false, 42), ("Propietat de transposició", true, 42),
("x = -10", true, 43), ("x = 10", false, 43), ("x = 2", false, 43), ("x = -2", false, 43),
("x = 4", false, 44), ("x = 1", false, 44), ("x = -1", false, 44), ("x = -4", true, 44),
("x = -5", false, 45), ("x = 2", false, 45), ("x = 5", true, 45), ("x = -2", false, 45);


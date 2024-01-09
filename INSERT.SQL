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
    ("Quin és el resultat de restar 63 a 100?", 1, 1),
    ("Quina és la suma dels nombres 17, 29 i 35?", 1, 1),
    ("Si divides 72 entre 9, quin és el resultat?", 1, 1),
    ("Quin és el resultat de sumar 5 vegades el nombre 9?", 1, 1),
    ("Si un paquet de llet té un preu de 2 euros i compres 3 paquets, quant pagaràs?", 1, 1),
    ("Quina és la diferència entre 95 i 47?", 1, 1),
    ("Quina és la diferència entre 145 i 89?", 1, 1),
    ("Si divideixes 180 entre 9, quin és el resultat?", 1, 1),
    ("Quina és la diferència entre 200 i 113?", 1, 1),
    ("Quin és el resultat de restar 84 a 150?", 1, 1),
    ("Si multipliques 7 per 6 i després afegeixes 9, quin és el resultat?", 1, 1),
    ("Quina és la suma dels nombres 45, 67 i 89?", 1, 1),
    ("Si divides 144 entre 12, quin és el resultat?", 1, 1),
    ("Quin és el resultat de sumar 8 vegades el nombre 6?", 1, 1),
    ("Si un paquet de galetes té un preu de 2 euros i compres 4 paquets, quant pagaràs?", 1, 1),
    ("Quin és el nombre següent en aquesta sèrie: 3, 8, 13, 18, ...?", 1, 1),
    ("Si sumes 55 i 36 i després restes 40, quin és el resultat final?", 1, 1),
    ("Quina és la diferència entre 84 i 37?", 1, 1),
    ("Si divideixes 100 entre 10, quin és el resultat?", 1, 1),
    -- Dificultat 2:
    ("Si multipliques 8 per 5 i després afegeixes 4, quin és el resultat?", 2, 1),
    ("Quin és el nombre següent en aquesta sèrie: 3, 6, 9, 12, ...?", 2, 1),

    ("Si multipliques 14 per 6 i després divides el resultat per 3, quin és el resultat final?", 2, 1),
    ("Quin és el resultat de multiplicar 14 per 9?", 2, 1),
    ("Si sumes 35 a 67 i després restes 42, quin és el resultat final?", 2, 1),
    ("Quin és el resultat de dividir 98 entre 7?", 2, 1),
    ("Si multipliques 25 per 4 i després afegeixes 12, quin és el resultat?", 2, 1),
    ("Quin és el nombre següent en aquesta sèrie: 18, 27, 36, 45, ...?", 2, 1),
    ("Si restes 88 a 150 i després divides el resultat per 4, quin és el valor final?", 2, 1),
    ("Quina és la suma dels nombres 63, 29 i 45?", 2, 1),
    ("Si divides 180 entre 12, quin és el resultat?", 2, 1),
    ("Quin és el resultat de sumar 7 vegades el nombre 11?", 2, 1),
    ("Si multipliques 11 per 8 i després divides el resultat per 2, quin és el resultat final?", 2, 1),
    -- Dificultat 3:
    ("Quina és la suma dels nombres 56, 89 i 27?", 3, 1),
    ("Quin és el resultat de sumar 36, 48 i 72?", 3, 1),
    ("Quin és el resultat de sumar 59 i 68?", 3, 1),
    ("Si multipliques 9 per 11, quin és el resultat?", 3, 1),
    ("Si divides 144 entre 8, quin és el resultat?", 3, 1),
    ("Quin és el resultat de multiplicar 37 per 8?", 3, 1),
    ("Si sumes 145 a 267 i després restes 189, quin és el resultat final?", 3, 1),
    ("Quin és el resultat de dividir 423 entre 27?", 3, 1),
    ("Si multipliques 56 per 9 i després afegeixes 78, quin és el resultat?", 3, 1),
    ("Quin és el nombre següent en aquesta sèrie: 120, 240, 360, 480, ...?", 3, 1),
    ("Si restes 568 a 987 i després divides el resultat per 3, quin és el valor final?", 3, 1),
    ("Quina és la suma dels nombres 789, 456 i 123?", 3, 1),
    ("Si divides 1200 entre 40, quin és el resultat?", 3, 1),
    ("Quin és el resultat de sumar 13 vegades el nombre 25?", 3, 1),
    ("Si multipliques 17 per 11 i després divides el resultat per 3, quin és el resultat final?", 3, 1),
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
    ("37", true, 1), ("33",false,1), ("27",false,1), ("23",false, 1),
    ("71",false,2), ("81",false,2), ("79",true,2), ("82",true, 2),
    ("6",true,3), ("8",false,3), ("7",false,3), ("9",false, 3),
    ("45",true,4), ("54",false,4), ("59",false,4), ("49",false, 4),
    ("4 euros",false,5), ("5 euros",false,5), ("6 euros",true,5), ("7 euros",false, 5),
    ("46",false,6), ("48",true,6), ("50",false,6), ("52",false, 6),
    ("56",true,7), ("54",false,7), ("58",false,7), ("60",false, 7),
    ("20",true,8), ("18",false,8), ("16",false,8), ("15",false, 8),
    ("87",true,9), ("89",false,9), ("91",false,9), ("93",false, 9),
    ("66",true,10), ("64",false,10), ("62",false,10), ("61",false, 10),
    ("45",false,11), ("48",false,11), ("51",true,11), ("54",false, 11),
    ("185",false,12), ("201",true,12), ("214",false,12), ("228",false, 12),
    ("12",true,13), ("10",false,13), ("14",false,13), ("16",false, 13),
    ("42",false,14), ("44",false,14), ("48",true,14), ("52",false, 14),
    ("6 euros",false,15), ("8 euros",true,15), ("10 euros",false,15), ("12 euros",false, 15),
    ("20",false,16), ("21",false,16), ("22",false,16), ("23",true, 16),
    ("51",true,17), ("56",false,17), ("46",false,17), ("61",false, 17),
    ("45",false,18), ("47",true,18), ("49",false,18), ("51",false, 18),
    ("10",true,19), ("8",false,19), ("12",false,19), ("6",false, 19),
    -- Dificultat 2:
    ("36",false,20), ("44",true,20), ("40",false,20), ("52",false, 20),
    ("14",true,21), ("15",false,21), ("16",false,21), ("18",true, 21),

    ("28",true,22), ("30",false,22), ("32",false,22), ("34",false, 22),
    ("126",true,23), ("128",false,23), ("130",false,23), ("132",false, 23),
    ("60",true,24), ("62",false,24), ("64",false,24), ("66",false, 24),
    ("14",true,25), ("16",false,25), ("18",false,25), ("20",false, 25),
    ("112",true,26), ("114",false,26), ("116",false,26), ("118",false, 26),
    ("54",true,27), ("56",false,27), ("58",false,27), ("60",false, 27),
    ("21",true,28), ("24",false,28), ("27",false,28), ("30",false, 28),
    ("137",true,29), ("139",false,29), ("141",false,29), ("143",false, 29),
    ("15",true,30), ("16",false,30), ("17",false,30), ("18",false, 30),
    ("9",true,31), ("10",false,31), ("11",false,31), ("12",false, 31),
    ("6",true,32), ("7",false,32), ("8",false,32), ("9",false, 32),

    -- Dificultat 3:


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


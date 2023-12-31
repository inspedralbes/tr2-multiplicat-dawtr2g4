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
    ("Si multipliques 11 per 8 i després divideixes el resultat per 2, quin és el resultat final?", 2, 1),
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
("Determina el valor de x en l'equació (x - 2)/(x + 3) = 3/(x + 3)", 3, 2),

-- Categoria 5: Geometria
    -- Dificultat 1:
("Quina és l'àrea d'un quadrat amb costats de 6 cm?", 1, 5),
("Quina és l'àrea d'un quadrat amb costats de 9 cm?", 1, 5),
("Quina és el perímetre d'un quadrat amb costats de 5 cm?", 1, 5),
("Quina és el perímetre d'un quadrat amb costats de 7 cm?", 1, 5),
("Un angle de 30º és un angle...", 1, 5),
("Un angle de 110º és un angle...", 1, 5),
("La suma dels angles interiors d'un triangle és...", 1, 5),
("La suma dels angles interiors d'un quadrilater és...", 1, 5),
    -- Dificultat 2:
("Si dues rectes són perpendiculars i es tallen, quin és l'angle que formen entre elles?", 2, 5),
("Si dues rectes són coincidents, quin és l'angle que formen entre elles?", 2, 5),
("Quina és l'àrea d'un rectangle de 3 cm de llarg i 10 cm d'ample", 2, 5),
("Quina és l'àrea d'un rectangle de 5 cm de llarg i 2 cm d'ample", 2, 5),
("Si el radi d'un cercle és de 5 cm, quin és el seu perímetre?", 2, 5),
("Si el diametre d'un cercle és de 10 cm, quin és el seu perímetre?", 2, 5),
("Quin és el perímetre d'un rectangle de 8 cm de llarg i 5 cm d'ample?", 1, 5),
("Quin és el perímetre d'un rectangle de 4 cm de llarg i 3 cm d'ample?", 1, 5),
    -- Dificultat 3:
("Els dos catets d'un triangle rectangle són de 3 cm i 4 cm. Quina és la longitud de la hipotenusa?", 3, 5),
("Els dos catets d'un triangle rectangle són de 9 cm i 12 cm. Quina és la longitud de la hipotenusa?", 3, 5),
("Si un prisma rectangular té una base de 4 cm de llarg i 3 cm d'ample i una altura de 10 cm, quin és el seu volum?", 3, 5),
("Si un prisma rectangular té una base de 5 cm de llarg i 5 cm d'ample i una altura de 4 cm, quin és el seu volum?", 3, 5),
("Si el radi d'un cercle és de 5 cm, quina és la seva àrea?", 3, 5),
("Si el radi d'un cercle és de 7 cm, quina és la seva àrea?", 3, 5),
("Donat un rombe amb diagonals de 6 cm i 8 cm, quina és la seva àrea?", 3, 5),
("Donat un rombe amb diagonals de 3 cm i 4 cm, quina és la seva àrea?", 3, 5);

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
    ("28",true,22), ("24",false,22), ("32",false,22), ("22",false, 22),
    ("115",false,23), ("120",false,23), ("126",true,23), ("132",false, 23),
    ("60",true,24), ("65",false,24), ("70",false,24), ("55",false, 24),
    ("16",false,25), ("14",true,25), ("12",false,25), ("18",false, 25),
    ("102",false,26), ("108",false,26), ("98",false,26), ("112",true, 26),
    ("50",false,27), ("54",true,27), ("62",false,27), ("48",false, 27),
    ("15",false,28), ("16",false,28), ("15.5",true,28), ("14.5",false, 28),
    ("137",true,29), ("142",false,29), ("132",false,29), ("145",false, 29),
    ("12",false,30), ("15",true,30), ("18",false,30), ("14",false, 30),
    ("64",false,31), ("71",false,31), ("84",false,31), ("77",true, 31),
    ("38",false,32), ("44",true,32), ("48",false,32), ("40",false, 32),
    -- Dificultat 3:
    ("170",false,33), ("180",false,33), ("172",true,33), ("160",false, 33),
    ("152",false,34), ("154",false,34), ("156",true,34), ("158",false, 34),
    ("127",true,35), ("126",false,35), ("128",false,35), ("125",false, 35),
    ("98",false,36), ("99",true,36), ("100",false,36), ("101",false, 36),
    ("16",false,37), ("18",true,37), ("20",false,37), ("14",false, 37),
    ("265",false,38), ("320",false,38), ("296",true,38), ("360",false, 38),
    ("300",false,39), ("188",false,39), ("256",true,39), ("172",false, 39),
    ("18",false,40), ("12",false,40), ("15.67",true,40), ("16",false, 40),
    ("496",false,41), ("522",false,41), ("538",false,41), ("582",true, 41),
    ("560",false,42), ("540",false,42), ("620",false,42), ("600",true, 42),
    ("139.67",true,43), ("138",false,43), ("144",false,43), ("147",false, 43),
    ("1412",false,44), ("1368",true,44), ("1290",false,44), ("1435",false, 44),
    ("30",true,45), ("25",false,45), ("35",false,45), ("28",false, 45),
    ("312",false,46), ("299",false,46), ("325",true,46), ("336",false, 46),
    ("55",false,47), ("62.33",true,47), ("58",false,47), ("65",false, 47),
    


-- Categoria 2: Equacions
("Una igualtat amb variables", true, 37), ("Una pregunta matemàtica", false, 37), ("Un tipus de funció", false, 37), ("Un joc de números", false, 37),
("x = 10", false, 38), ("x = -4", false, 38), ("x = 4", true, 38), ("x = 3", false, 38),
("Canviant els nombres", false, 39), ("Fent operacions matemàtiques", true, 39), ("Adivinant", false, 39), ("Utilitzant una calculadora", false, 39),
("x = 3", false, 40), ("x = 5", false, 40), ("x = 12", false, 40), ("x = 4", true, 40),
("Distribuir el 2", true, 41), ("Sumar 5", false, 41), ("Restar 14", false, 41), ("Dividir per 2", false, 41),
("Propietat de simetria", false, 42), ("Propietat distributiva", false, 42), ("Propietat commutativa", false, 42), ("Propietat de transposició", true, 42),
("x = -10", true, 43), ("x = 10", false, 43), ("x = 2", false, 43), ("x = -2", false, 43),
("x = 4", false, 44), ("x = 1", false, 44), ("x = -1", false, 44), ("x = -4", true, 44),
("x = -5", false, 45), ("x = 2", false, 45), ("x = 5", true, 45), ("x = -2", false, 45),

-- Categoria 5: Geometria
--S'HA DE CANAVIAR EL ID DE LES PREGUNTES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    -- Dificultat 1:
("12 cm²", false, 1), ("18 cm²", false, 1), ("24 cm²", false, 1), ("36 cm²", true, 1),
("36 cm²", false, 2), ("63 cm²", false, 2), ("72 cm²", false, 2), ("81 cm²", true, 2),
("10 cm", false, 3), ("15 cm", false, 3), ("20 cm", true, 3), ("25 cm", false, 3),
("21 cm", false, 4), ("28 cm", true, 4), ("35 cm", false, 4), ("49 cm", false, 4),
("Agut", true, 5), ("Recte", false, 5), ("Obtús", false, 5), ("Pla", false, 5),
("Agut", false, 5), ("Recte", false, 5), ("Obtús", true, 5), ("Pla", false, 5),
("180º", true, 7), ("200º", false, 7), ("360º", false, 7), ("380º", false, 7),
("360º", true, 8), ("380º", false, 8), ("400º", false, 8), ("480º", false, 8),
    -- Dificultat 2:
("0º", false, 1), ("30º", false, 1), ("45º", false, 1), ("90º", true, 1),
("0º", true, 2), ("30º", false, 2), ("45º", false, 2), ("90º", false, 2),
("30 cm²", true, 3), ("26 cm²", false, 3), ("28 cm²", false, 3), ("32 26 cm²", false, 3),
("14 cm²", false, 4), ("10 cm²", true, 4), ("12 cm²", false, 4), ("8 cm²", false, 4),
("10π cm", true, 5), ("25π cm", false, 5), ("15π cm", false, 5), ("14π cm", false, 5),
("10π cm", true, 5), ("20π cm", false, 5), ("100π cm", true, 5), ("120π cm", false, 5),
("26 cm", true, 7), ("40 cm", false, 7), ("25 cm", false, 7), ("64 cm", false, 7),
("14 cm", true, 8), ("25 cm", false, 8), ("12 cm", false, 8), ("16 cm", false, 8),
    -- Dificultat 3:
("4 cm", false, 1), ("5 cm", true, 1), ("6 cm", false, 1), ("7 cm", false, 1),
("24 cm", true, 2), ("21 cm", false, 2), ("18 cm", false, 2), ("15 cm", true, 2),
("120 cm³", true, 3), ("1200 cm³", false, 3), ("7000 cm³", false, 3), ("700 cm³", false, 3),
("100 cm³", true, 4), ("1000 cm³", false, 4), ("40 cm³", false, 4), ("400 cm³", false, 4),
("25π cm", true, 5), ("10π cm", false, 5), ("15π cm", false, 5), ("20π cm", false, 5),
("49π cm", true, 5), ("39π cm", false, 5), ("29π cm", false, 5), ("59π cm", false, 5),
("24 cm²", true, 7), ("48 cm²", false, 7), ("25 cm²", false, 7), ("46 cm²", false, 7),
("6 cm²", true, 8), ("8 cm²", false, 8), ("12 cm²", false, 8), ("10 cm²", false, 8);


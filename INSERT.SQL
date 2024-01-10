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

INSERT INTO preguntas(id,text_pregunta, dificultat, categoria_id) VALUES
-- Categoria 1: Nombres i Operacions:
    -- Dificultat 1:
    (1,"Quin és el resultat de restar 63 a 100?", 1, 1),
    (2,"Quina és la suma dels nombres 17, 29 i 35?", 1, 1),
    (3,"Si divides 72 entre 9, quin és el resultat?", 1, 1),
    (4,"Quin és el resultat de sumar 5 vegades el nombre 9?", 1, 1),
    (5,"Si un paquet de llet té un preu de 2 euros i compres 3 paquets, quant pagaràs?", 1, 1),
    (6,"Quina és la diferència entre 95 i 47?", 1, 1),
    (7,"Quina és la diferència entre 145 i 89?", 1, 1),
    (8,"Si divideixes 180 entre 9, quin és el resultat?", 1, 1),
    (9,"Quina és la diferència entre 200 i 113?", 1, 1),
    (10,"Quin és el resultat de restar 84 a 150?", 1, 1),
    (11,"Si multipliques 7 per 6 i després afegeixes 9, quin és el resultat?", 1, 1),
    (12,"Quina és la suma dels nombres 45, 67 i 89?", 1, 1),
    (13,"Si divides 144 entre 12, quin és el resultat?", 1, 1),
    (14,"Quin és el resultat de sumar 8 vegades el nombre 6?", 1, 1),
    (15,"Si un paquet de galetes té un preu de 2 euros i compres 4 paquets, quant pagaràs?", 1, 1),
    (16,"Quin és el nombre següent en aquesta sèrie: 3, 8, 13, 18, ...?", 1, 1),
    (17,"Si sumes 55 i 36 i després restes 40, quin és el resultat final?", 1, 1),
    (18,"Quina és la diferència entre 84 i 37?", 1, 1),
    (19,"Si divideixes 100 entre 10, quin és el resultat?", 1, 1),
    -- Dificultat 2:
    (20,"Si multipliques 8 per 5 i després afegeixes 4, quin és el resultat?", 2, 1),
    (21,"Quin és el nombre següent en aquesta sèrie: 3, 6, 9, 12, ...?", 2, 1),
    (22,"Si multipliques 14 per 6 i després divides el resultat per 3, quin és el resultat final?", 2, 1),
    (23,"Quin és el resultat de multiplicar 14 per 9?", 2, 1),
    (24,"Si sumes 35 a 67 i després restes 42, quin és el resultat final?", 2, 1),
    (25,"Quin és el resultat de dividir 98 entre 7?", 2, 1),
    (26,"Si multipliques 25 per 4 i després afegeixes 12, quin és el resultat?", 2, 1),
    (27,"Quin és el nombre següent en aquesta sèrie: 18, 27, 36, 45, ...?", 2, 1),
    (28,"Si restes 88 a 150 i després divides el resultat per 4, quin és el valor final?", 2, 1),
    (29,"Quina és la suma dels nombres 63, 29 i 45?", 2, 1),
    (30,"Si divides 180 entre 12, quin és el resultat?", 2, 1),
    (31,"Quin és el resultat de sumar 7 vegades el nombre 11?", 2, 1),
    (32,"Si multipliques 11 per 8 i després divideixes el resultat per 2, quin és el resultat final?", 2, 1),
    -- Dificultat 3:
    (33,"Quina és la suma dels nombres 56, 89 i 27?", 3, 1),
    (34,"Quin és el resultat de sumar 36, 48 i 72?", 3, 1),
    (35,"Quin és el resultat de sumar 59 i 68?", 3, 1),
    (36,"Si multipliques 9 per 11, quin és el resultat?", 3, 1),
    (37,"Si divides 144 entre 8, quin és el resultat?", 3, 1),
    (38,"Quin és el resultat de multiplicar 37 per 8?", 3, 1),
    (39,"Si sumes 145 a 267 i després restes 189, quin és el resultat final?", 3, 1),
    (40,"Quin és el resultat de dividir 423 entre 27?", 3, 1),
    (41,"Si multipliques 56 per 9 i després afegeixes 78, quin és el resultat?", 3, 1),
    (42,"Quin és el nombre següent en aquesta sèrie: 120, 240, 360, 480, ...?", 3, 1),
    (43,"Si restes 568 a 987 i després divides el resultat per 3, quin és el valor final?", 3, 1),
    (44,"Quina és la suma dels nombres 789, 456 i 123?", 3, 1),
    (45,"Si divides 1200 entre 40, quin és el resultat?", 3, 1),
    (46,"Quin és el resultat de sumar 13 vegades el nombre 25?", 3, 1),
    (47,"Si multipliques 17 per 11 i després divides el resultat per 3, quin és el resultat final?", 3, 1),
-- Categoria 2: Equacions
    -- Dificultat 1:
    (48,"Resol: 3x + 5 = 14", 1, 2),
    (49,"Quina és la solució de l'equació 2y - 8 = 10?", 1, 2),
    (50,"En l'equació 4a + 7 = 19, quin és el terme constant?", 1, 2),
    (51,"Quin és el terme amb coeficient a l'equació 3x - 2 =10?", 1 ,2),
    (52,"Resol l'expressió: 2(3x - 4) = 10.", 1 ,2),
    (53,"Quin és el resultat de 5x + 8 - 2x?", 1, 2),
    (54,"Resol 2x + 3 = 11.", 1, 2),
    (55,"Troba el valor de y en 4y -8 = 20.", 1, 2),
    (56,"En l'equacio 5p + 6 = 21, quin és el terme constant?", 1, 2),
    (57,"Quin és el terme amb coeficient a l'equació 2q - 4 = 10)", 1, 2),
    (58,"Resol l'expressió: 3(2x - 1) = 15.", 1, 2),
    (59,"Simplifica 7x + 4 - 3x?", 1, 2),
    

    -- Dificultat 2:
    (60,"Si el doble d'un número més 3 és igual a 17, quin és el número?", 2, 2),
    (61,"Si un número més en 4 és igual al doble del número, quin és el número?", 2, 2),
    (62,"Resol l'equacio 2/3x + 4 = 10", 2, 2),
    (63,"Troba el valor de x en 5(2x - 3) = 25.", 2, 2),
    (64,"Un pare té el triple de l'edat del seu fill. La suma de les seves edats és 48. Quina és l'edat del fill?", 2, 2),
    (65,"Si la meitat d'un nombre menys 8 és igual a 12, quin és el nombre?", 2, 2),
    (66,"Si el quadruple d'un nombre més 3 és igual a 27, quin és el nombre?", 2 ,2),
    (67,"Resol l'equació: 2(x/3) + 5 = 9.", 2, 2),
    (68,"Troba el valor de x en 3(4x - 2) = 30.", 2, 2),
    (69,"La suma de dos nombres és 36. Si un nombre és el doble de l'altre, quins són els nombres?", 2, 2),


    -- Dificultat 3:
    (70,"Resol l'equació 1/2x - 3 = 9", 3, 2),
    (71,"Troba el valor de x en 2x/3 + x/6 = 5", 3, 2),
    (72,"Si el doble de l'edat de Joan menys 5 és igual a la seva edat actual, quina és la seva edat?", 3, 2),
    (73,"Si un nombre augmentat en 8 és igual a tres vegades el mateix nombre, quin és el nombre?", 3, 2),
    (74,"Resol l'equació 2(x + 3) = 4x - 6", 3, 2),
    (75,"Troba el valor de x en 3(x - 2) = 9", 3, 2),
    (76,"Resol l'equació 2x - 7 = 9", 3, 3),
    (77,"Troba el valor de x en 3x - 5 = 16", 3, 3),
    (78,"El doble de l'edat d'en Pere menys 5 és igual a la seva edat actual. Quina és la seva edat?", 3, 3),
    (79,"Un nombre menys 4 és igual a tres vegades el mateix nombre, quin es el nombre?", 3, 3),
    (80,"Resol l'equació 2(x - 2) + 3x = x + 4", 3, 3),
    (81,"Troba el valor de x en 1/2(x^2 - 4) = 6)", 3, 3),


-- Categoria 5: Geometria
    -- Dificultat 1:
    (82,"Quina és l'àrea d'un quadrat amb costats de 6 cm?", 1, 5),
    (83,"Quina és l'àrea d'un quadrat amb costats de 9 cm?", 1, 5),
    (84,"Quina és el perímetre d'un quadrat amb costats de 5 cm?", 1, 5),
    (85,"Quina és el perímetre d'un quadrat amb costats de 7 cm?", 1, 5),
    (86,"Un angle de 30º és un angle...", 1, 5),
    (87,"Un angle de 110º és un angle...", 1, 5),
    (88,"La suma dels angles interiors d'un triangle és...", 1, 5),
    (89,"La suma dels angles interiors d'un quadrilater és...", 1, 5),
    -- Dificultat 2:
    (90,"Si dues rectes són perpendiculars i es tallen, quin és l'angle que formen entre elles?", 2, 5),
    (91,"Si dues rectes són coincidents, quin és l'angle que formen entre elles?", 2, 5),
    (92,"Quina és l'àrea d'un rectangle de 3 cm de llarg i 10 cm d'ample", 2, 5),
    (93,"Quina és l'àrea d'un rectangle de 5 cm de llarg i 2 cm d'ample", 2, 5),
    (94,"Si el radi d'un cercle és de 5 cm, quin és el seu perímetre?", 2, 5),
    (95,"Si el diametre d'un cercle és de 10 cm, quin és el seu perímetre?", 2, 5),
    (96,"Quin és el perímetre d'un rectangle de 8 cm de llarg i 5 cm d'ample?", 1, 5),
    (97,"Quin és el perímetre d'un rectangle de 4 cm de llarg i 3 cm d'ample?", 1, 5),
    -- Dificultat 3:
    (98,"Els dos catets d'un triangle rectangle són de 3 cm i 4 cm. Quina és la longitud de la hipotenusa?", 3, 5),
    (99,"Els dos catets d'un triangle rectangle són de 9 cm i 12 cm. Quina és la longitud de la hipotenusa?", 3, 5),
    (100,"Si un prisma rectangular té una base de 4 cm de llarg i 3 cm d'ample i una altura de 10 cm, quin és el seu volum?", 3, 5),
    (101,"Si un prisma rectangular té una base de 5 cm de llarg i 5 cm d'ample i una altura de 4 cm, quin és el seu volum?", 3, 5),
    (102,"Si el radi d'un cercle és de 5 cm, quina és la seva àrea?", 3, 5),
    (103,"Si el radi d'un cercle és de 7 cm, quina és la seva àrea?", 3, 5),
    (104,"Donat un rombe amb diagonals de 6 cm i 8 cm, quina és la seva àrea?", 3, 5),
    (105,"Donat un rombe amb diagonals de 3 cm i 4 cm, quina és la seva àrea?", 3, 5);

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

    -- Dificultat 1:
    ("x = 3", true, 48), ("x = 4", false, 48), ("x = 5", false, 48), ("x = 6", false, 48),
    ("y = 10", false, 49), ("y = 9", true, 49), ("y = 11", false, 49), ("y = 12", false, 49),
    ("14", false, 50), ("11", false, 50), ("12", true, 50), ("19", false, 50),
    ("2", false, 51), ("3", true, 51), ("5", false, 51), ("4", false, 51),
    ("x = 3", true, 52), ("6x - 8 = 12", false, 52), ("6x - 8 = 14", false, 52), ("6x - 8 = 16", false, 52),
    ("3x", false, 53), ("3x + 8", true, 53), ("3x - 8", false, 53), ("3x + 2", false, 53),
    ("x = 4", true, 54), ("x = 5", false, 54), ("x = 6", false, 54), ("x = 7", false, 54),
    ("y = 8", false, 55), ("y = 7", true, 55), ("y = 9", false, 55), ("y = 10", false, 55),
    ("8", false, 56), ("7", false, 56), ("6", true, 56), ("9", false, 56),
    ("3", false, 57), ("2", true, 57), ("4", false, 57), ("5", false, 57),
    ("x = 3", true, 58), ("x = 4", false, 58), ("x = 5", false, 58), ("x = 6", false, 58),
    ("3x", false, 59), ("4x + 4", true, 59), ("3x - 8", false, 59), ("3x + 2", false, 59),
    
    -- Dificultat 2:
    ("x = 7", true, 60), ("x = 8", false, 60), ("x = 9", false, 60), ("x = 10", false, 60),
    ("x = 5", false, 61), ("x = 6", false, 61), ("x = 4", true, 61), ("x = 8", false, 61),
    ("x = 9", false, 62), ("x = 7", false, 62), ("x = 8", false, 62), ("x = 6", true, 62),
    ("x = 3", false, 63), ("x = 5", false, 63), ("x = 4", true, 63), ("x = 6", false, 63),
    ("x = 14", false, 64), ("x = 13", false, 64), ("x = 12", true, 64), ("x = 15", false, 64),
    ("x = 32", false, 65), ("x = 40", true, 65), ("x = 39", false, 65), ("x = 42", false, 65),
    ("x = 3", false, 66), ("x = 4", false, 66), ("x = 5", false, 66), ("x = 6", true, 66),
    ("x = 4", false, 67), ("x = 5", false, 67), ("x = 6", true, 67), ("x = 7", false, 67),
    ("x = 3", true, 68), ("x = 6", false, 68), ("x = 4", false, 68), ("x = 2", false, 68),
    ("18 i 18", false, 69), ("20 i 16", false, 69), ("24 i 12", true, 69), ("30 i 6", false, 69),
    
    -- Dificultat 3:
    ("x = 24", true, 70), ("x = 26", false, 70), ("x = 20", false, 70), ("x = 22", false, 70),
    ("x = 8", false, 71), ("x = 7", false, 71), ("x = 6", true, 71), ("x = 9", false, 71),
    ("x = 3", false, 72), ("x = 4", false, 72), ("x = 5", true, 72), ("x = 6", false, 72),
    ("x = 4", true, 73), ("x = 5", false, 73), ("x = 6", false, 73), ("x = 7", false, 73),
    ("x = 7", false, 74), ("x = 4", false, 74), ("x = 5", false, 74), ("x = 6", true, 74),
    ("x = 3", false, 75), ("x = 4", false, 75), ("x = 5", true, 75), ("x = 6", false, 75),
    ("x = 10", false, 76), ("x = 8", true, 76), ("x = 6", false, 76), ("x = 7", false, 76),
    ("x = 9", false, 77), ("x = 6", false, 77), ("x = 8", false, 77), ("x = 7", true, 77),
    ("x = 4", false, 78), ("x = 5", true, 78), ("x = 6", false, 78), ("x = 7", false, 78),
    ("x = 2", false, 79), ("x = 4", false, 79), ("x = 1", false, 79), ("x = -2", true, 79),
    ("x = 3", false, 80), ("x = 2", true, 80), ("x = 4", false, 80), ("x = 5", false, 80),
    ("x = 4", true, 81), ("x = 2", false, 81), ("x = 3", false, 81), ("x = 6", false, 81),


-- Categoria 5: Geometria
    -- Dificultat 1:
    ("12 cm²", false, 82), ("18 cm²", false, 82), ("24 cm²", false, 82), ("36 cm²", true, 82),
    ("36 cm²", false, 83), ("63 cm²", false, 83), ("72 cm²", false, 83), ("81 cm²", true, 83),
    ("10 cm", false, 84), ("15 cm", false, 84), ("20 cm", true, 84), ("25 cm", false, 84),
    ("21 cm", false, 85), ("28 cm", true, 85), ("35 cm", false, 85), ("49 cm", false, 85),
    ("Agut", true, 86), ("Recte", false, 86), ("Obtús", false, 86), ("Pla", false, 86),
    ("Agut", false, 87), ("Recte", false, 87), ("Obtús", true, 87), ("Pla", false, 87),
    ("180º", true, 88), ("200º", false, 88), ("360º", false, 88), ("380º", false, 88),
    ("360º", true, 89), ("380º", false, 89), ("400º", false, 89), ("480º", false, 89),
    -- Dificultat 2:
    ("0º", false, 90), ("30º", false, 90), ("45º", false, 90), ("90º", true, 90),
    ("0º", true, 91), ("30º", false, 91), ("45º", false, 91), ("90º", false, 91),
    ("30 cm²", true, 92), ("26 cm²", false, 92), ("28 cm²", false, 92), ("32 26 cm²", false, 92),
    ("14 cm²", false, 93), ("10 cm²", true, 93), ("12 cm²", false, 93), ("8 cm²", false, 93),
    ("10π cm", true, 94), ("25π cm", false, 94), ("15π cm", false, 94), ("14π cm", false, 94),
    ("10π cm", true, 95), ("20π cm", false, 95), ("100π cm", true, 95), ("120π cm", false, 95),
    ("26 cm", true, 96), ("40 cm", false, 96), ("25 cm", false, 96), ("64 cm", false, 96),
    ("14 cm", true, 97), ("25 cm", false, 97), ("12 cm", false, 97), ("16 cm", false, 97),
    -- Dificultat 3:
    ("4 cm", false, 98), ("5 cm", true, 98), ("6 cm", false, 98), ("7 cm", false, 98),
    ("24 cm", true, 99), ("21 cm", false, 99), ("18 cm", false, 99), ("15 cm", true, 99),
    ("120 cm³", true, 100), ("1200 cm³", false, 100), ("7000 cm³", false, 100), ("700 cm³", false, 100),
    ("100 cm³", true, 101), ("1000 cm³", false, 101), ("40 cm³", false, 101), ("400 cm³", false, 101),
    ("25π cm", true, 102), ("10π cm", false, 102), ("15π cm", false, 102), ("20π cm", false, 102),
    ("49π cm", true, 103), ("39π cm", false, 103), ("29π cm", false, 103), ("59π cm", false, 103),
    ("24 cm²", true, 104), ("48 cm²", false, 104), ("25 cm²", false, 104), ("46 cm²", false, 104),
    ("6 cm²", true, 105), ("8 cm²", false, 105), ("12 cm²", false, 105), ("10 cm²", false, 105);


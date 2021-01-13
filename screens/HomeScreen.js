import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, Picker, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';

export default function HomeScreen({ navigation }) {


  let pelis = [
              { titulo: "Inception",
                descripcion: "Dom Cobb es un ladrón con una extraña habilidad para entrar a los sueños de la gente y robarles los secretos de sus subconscientes. Su habilidad lo ha vuelto muy popular en el mundo del espionaje corporativo, pero ha tenido un gran costo en la gente que ama. Cobb obtiene la oportunidad de redimirse cuando recibe una tarea imposible: plantar una idea en la mente de una persona. Si tiene éxito, será el crimen perfecto, pero un enemigo se anticipa a sus movimientos.",
                imagen: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "Interstellar",
                descripcion: "Gracias a un descubrimiento, un grupo de científicos y exploradores, encabezados por Cooper, se embarcan en un viaje espacial para encontrar un lugar con las condiciones necesarias para reemplazar a la Tierra y comenzar una nueva vida allí.",
                imagen: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "El viaje de Chihiro",
                descripcion: "Perdida en el bosque, una niña (Rumi Hîragi) de 10 años conoce animales, fantasmas y criaturas extrañas.",
                imagen: "https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "Boyhood",
                descripcion: "El proceso de maduración de un niño texano a lo largo de 12 años, mientras su madre, una mujer soltera, su hermana y él tratan de prosperar.",
                imagen: "https://m.media-amazon.com/images/M/MV5BMTYzNDc2MDc0N15BMl5BanBnXkFtZTgwOTcwMDQ5MTE@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "Eterno resplandor de una mente sin recuerdos",
                descripcion: "Parecían la pareja ideal, su primer encuentro fue mágico, pero con el paso del tiempo ella deseó nunca haberlo conocido. Su anhelo se hace realidad gracias a un polémico y radical invento. Sin embargo descubrirán que el destino no se puede controlar.",
                imagen: "https://m.media-amazon.com/images/M/MV5BMTY4NzcwODg3Nl5BMl5BanBnXkFtZTcwNTEwOTMyMw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "El gran hotel Budapest",
                descripcion: "El conserje de un elegante hotel europeo inicia una interesante amistad con un joven compañero de trabajo.",
                imagen: "https://m.media-amazon.com/images/M/MV5BMzM5NjUxOTEyMl5BMl5BanBnXkFtZTgwNjEyMDM0MDE@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "Red social",
                descripcion: "Mark Zuckerberg, un estudiante de Harvard, crea la red social que terminará convirtiéndose en Facebook, pero recibe acusaciones del cofundador y de dos hermanos que sostienen que la idea fue suya.",
                imagen: "https://m.media-amazon.com/images/M/MV5BOGUyZDUxZjEtMmIzMC00MzlmLTg4MGItZWJmMzBhZjE0Mjc1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "Memento",
                descripcion: "Un hombre con problemas de memoria usa notas, fotografías y tatuajes para hallar al asesino de su esposa.",
                imagen: "https://m.media-amazon.com/images/M/MV5BZTcyNjk1MjgtOWI3Mi00YzQwLWI5MTktMzY4ZmI2NDAyNzYzXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UY268_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "WALL·E",
                descripcion: "Luego de pasar años limpiando la Tierra desierta, el robot Wall-E conoce a EVA y la sigue por toda la galaxia.",
                imagen: "https://m.media-amazon.com/images/M/MV5BMjExMTg5OTU0NF5BMl5BanBnXkFtZTcwMjMxMzMzMw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "Batman: El caballero de la noche",
                descripcion: "La trilogía de The Dark Knight es una trilogía cinematográfica de superhéroes, basada en el personaje Batman de DC Comics. La trilogía consistió en Batman Begins, The Dark Knight, y The Dark Knight Rises, dirigidas, producidas y escritas principalmente por Christopher Nolan.",
                imagen: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "Intensamente",
                descripcion: "Las cinco emociones que conviven en el interior de una niña llamada Riley, alegría, miedo, desagrado, ira y tristeza, compiten por tomar el control de sus acciones cuando la pequeña se traslada, junto a su familia, a vivir a San Francisco. La adaptación a una nueva ciudad, una nueva escuela y unos nuevos compañeros no será sencilla para Riley.",
                imagen: "https://m.media-amazon.com/images/M/MV5BOTgxMDQwMDk0OF5BMl5BanBnXkFtZTgwNjU5OTg2NDE@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "12 años de esclavitud",
                descripcion: "Antes de la Guerra Civil en Estados Unidos, Solomon Northup, un hombre negro y libre de Saratoga Springs, Nueva York, es secuestrado y vendido como esclavo a un malévolo dueño sureño.",
                imagen: "https://m.media-amazon.com/images/M/MV5BMjExMTEzODkyN15BMl5BanBnXkFtZTcwNTU4NTc4OQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "La vida de Adèle",
                descripcion: "Una adolescente francesa forma una conexión profundamente emocional y sexual con una estudiante de arte mayor a la que conoció en un bar de lesbianas.",
                imagen: "https://m.media-amazon.com/images/M/MV5BMTQ5NTg5ODk4OV5BMl5BanBnXkFtZTgwODc4MTMzMDE@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "Bastardos sin gloria",
                descripcion: "Es el primer año de la ocupación alemana de Francia. El oficial aliado, teniente Aldo Raine, ensambla un equipo de soldados judíos para cometer actos violentos en contra de los nazis, incluyendo la toma de cabelleras. Él y sus hombres unen fuerzas con Bridget von Hammersmark, una actriz alemana y agente encubierto, para derrocar a los líderes del Tercer Reich. Sus destinos convergen con la dueña de teatro Shosanna Dreyfus, quien busca vengar la ejecución de su familia.",
                imagen: "https://m.media-amazon.com/images/M/MV5BOTJiNDEzOWYtMTVjOC00ZjlmLWE0NGMtZmE1OWVmZDQ2OWJhXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "El lobo de Wall Street",
                descripcion: "Jordan Belfort, corredor de bolsa de Nueva York, quien fundó la compañía Stratton Oakmont cuando aún era un veinteañero, desarrolla hábitos de exceso y corrupción.",
                imagen: "https://m.media-amazon.com/images/M/MV5BMjIxMjgxNTk0MF5BMl5BanBnXkFtZTgwNjIyOTg2MDE@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "Amélie",
                descripcion: "El hallazgo de un tesoro olvidado pone a una camarera parisina a cuestionar, y alterar la vida de quienes la rodean.",
                imagen: "https://m.media-amazon.com/images/M/MV5BNDg4NjM1YjMtYmNhZC00MjM0LWFiZmYtNGY1YjA3MzZmODc5XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "El secreto de sus ojos",
                descripcion: "Benjamín Espósito es un oficial de un Juzgado de Instrucción de Buenos Aires que acaba de jubilarse. Su sueño es escribir una novela y, para ello, intentará dar solución a un caso abierto desde hace varias décadas, del cual fue testigo y protagonista. Reviviendo el caso, vuelve también a su memoria el recuerdo de una mujer, a quien ha amado en silencio durante todos esos años.",
                imagen: "https://m.media-amazon.com/images/M/MV5BY2FhZGI5M2QtZWFiZS00NjkwLWE4NWQtMzg3ZDZjNjdkYTJiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UY268_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "El pianista",
                descripcion: "Un judío polaco, pianista profesional, lucha por la supervivencia en Varsovia frente a la invasión nazi. Después de, gracias a unos amigos, haber evitado la deportación, el pianista debe vivir oculto y constantemente expuesto al peligro.",
                imagen: "https://m.media-amazon.com/images/M/MV5BOWRiZDIxZjktMTA1NC00MDQ2LWEzMjUtMTliZmY3NjQ3ODJiXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UY268_CR6,0,182,268_AL_.jpg",
              },
              { titulo: "Ratatouille",
                descripcion: "Remy es un residente de París que aprecia la buena comida y tiene un paladar bastante sofisticado. Él desea convertirse en un chef para crear y disfrutar de diversas obras de arte culinarias. El único problema es que Remy es una rata. Y cuando termina en las alcantarillas debajo de uno de los restaurantes más finos de París, el roedor se siente en el lugar perfecto para convertir su sueño en una realidad.",
                imagen: "https://m.media-amazon.com/images/M/MV5BMTMzODU0NTkxMF5BMl5BanBnXkFtZTcwMjQ4MzMzMw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "Buscando a Nemo",
                descripcion: "Nemo, un pequeño pececillo, muy querido y protegido por su padre, se pierde fuera de la gran barrera del arrecife australiano, después de ser capturado por este arrecife, Nemo terminará en una pecera en Sidney. Su padre, un pez payaso, parte en su búsqueda y se embarca en una peligrosa aventura con Dory, un pez con muy poca memoria. Al mismo tiempo, Nemo y sus nuevos amigos ya traman un plan para escapar de la pecera.",
                imagen: "https://m.media-amazon.com/images/M/MV5BZTAzNWZlNmUtZDEzYi00ZjA5LWIwYjEtZGM1NWE1MjE4YWRhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "Réquiem for a dream",
                descripcion: "Una envejecida viuda se vuelve adicta a píldoras dietéticas mientras su hijo libra su propia batalla con estupefacientes.",
                imagen: "https://m.media-amazon.com/images/M/MV5BOTdiNzJlOWUtNWMwNS00NmFlLWI0YTEtZmI3YjIzZWUyY2Y3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "300",
                descripcion: "En el año 480 antes de Cristo, existe un estado de guerra entre Persia, dirigida por el rey Jerjes, y Grecia. En la batalla de la Termópilas, Leonidas, rey de la ciudad griega de Esparta, encabeza a sus 300 bravos soldados en contra del numeroso ejército persa. A pesar de que la muerte aguarda a los espartanos, su sacrificio inspira a toda Grecia para unirla en contra de su enemigo común.",
                imagen: "https://m.media-amazon.com/images/M/MV5BNWMxYTZlOTUtZDExMi00YzZmLTkwYTMtZmM2MmRjZmQ3OGY4XkEyXkFqcGdeQXVyMTAwMzUyMzUy._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "Monsters INC",
                descripcion: "Monsters, Incorporated es la fábrica de sustos más grande en el mundo de los monstruos y James P. Sullivan es uno de sus mejores asustadores. Sullivan es un monstruo grande e intimidante de piel azul, grandes manchas color púrpura y cuernos. Su asistente, mejor amigo y compañero de cuarto es Mike Wazowski, un pequeño y alegre monstruo verde con un solo ojo. Boo, una niña pequeña visita lugares en donde nunca antes había estado un ser humano.",
                imagen: "https://m.media-amazon.com/images/M/MV5BMTY1NTI0ODUyOF5BMl5BanBnXkFtZTgwNTEyNjQ0MDE@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "SAW",
                descripcion: "Adam y Lawrence se despiertan encadenados en un baño infecto con un cadáver entre ellos. Su secuestrador es un maniaco, cuyo juego consiste en forzar a sus cautivos a herirse a sí mismos o a otros para permanecer vivos.",
                imagen: "https://m.media-amazon.com/images/M/MV5BMjE4MDYzNDE1OV5BMl5BanBnXkFtZTcwNDY2OTYwNA@@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "HACIA RUTAS SALVAJES",
                descripcion: "Después de su graduación de la universidad, Christopher McCandless regala sus ahorros, se deshace de sus pertenencias y realiza un viaje a través de la vida silvestre de Alaska.",
                imagen: "https://m.media-amazon.com/images/M/MV5BMTAwNDEyODU1MjheQTJeQWpwZ15BbWU2MDc3NDQwNw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "BATMAN BEGINS",
                descripcion: "Después de la muerte de sus padres, el joven heredero Bruce Wayne se convierte en un vengador enmascarado que lucha contra las fuerzas del mal en Ciudad Gótica.",
                imagen: "https://m.media-amazon.com/images/M/MV5BZmUwNGU2ZmItMmRiNC00MjhlLTg5YWUtODMyNzkxODYzMmZlXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_UY268_CR9,0,182,268_AL_.jpg",
              },
              { titulo: "EL LABERINTO DEL FAUNO",
                descripcion: "En la España de 1944, la joven Ofelia y su madre enferma llegan al lugar en el que se encuentra el nuevo esposo de su madre, un sádico oficial del Ejército que intenta aplastar el levantamiento de una guerrilla. Mientras explora un antiguo laberinto, Ofelia conoce al fauno Pan, quien le dice que ella es una legendaria princesa perdida y debe completar tres peligrosas tareas para obtener la inmortalidad.",
                imagen: "https://m.media-amazon.com/images/M/MV5BMTU3ODg2NjQ5NF5BMl5BanBnXkFtZTcwMDEwODgzMQ@@._V1_UY268_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "EL SEÑOR DE LOS ANILLOS: LA COMUNIDAD DE ANILLO",
                descripcion: "Frodo Bolsón es un hobbit al que su tío Bilbo hace portador del poderoso Anillo Único, capaz de otorgar un poder ilimitado al que la posea, con la finalidad de destruirlo. Sin embargo, fuerzas malignas muy poderosas quieren arrebatárselo.",
                imagen: "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "LOS OTROS",
                descripcion: "Una viuda afligida descubre sucesos extraños, que apuntan hacia la presencia de fantasmas en su apartada mansión.",
                imagen: "https://m.media-amazon.com/images/M/MV5BMTc0NDQzNTA2Ml5BMl5BanBnXkFtZTcwNzI2OTQzMw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "SLUMDOG MILLIONAIRE",
                descripcion: "Mientras Jamal Malik, de 18 años de edad, responde preguntas en la versión india de '¿Quién quiere ser millonario?', escenas retrospectivas muestran cómo llegó ahí. Parte de un establo de jóvenes ladrones después de la muerte de su madre, Jamal y su hermano, Salum, sobreviven en las calles de Mumbai. A Salim le gusta la vida criminal, pero Jamal se conforma con trabajos pequeños hasta que consigue una oportunidad en el programa.",
                imagen: "https://m.media-amazon.com/images/M/MV5BZmNjZWI3NzktYWI1Mi00OTAyLWJkNTYtMzUwYTFlZDA0Y2UwXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "EL CURIOSO CASO DE BENJAMIN BUTTON",
                descripcion: "Benjamin Button nace como un hombre mayor en Nueva Orleans y rejuvenece. Poco a poco, se familiariza con la naturaleza del amor y la muerte.",
                imagen: "https://m.media-amazon.com/images/M/MV5BNjQ0NTY2ODY2M15BMl5BanBnXkFtZTgwMjE4MzkxMDE@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "MATCH POINT",
                descripcion: "Chris Wilton, un joven profesor de tenis, se obsesiona con Nola Rice, la seductora prometida de su cuñado.",
                imagen: "https://m.media-amazon.com/images/M/MV5BMjRjOTMwMDEtNTY4NS00OWRjLWI4ZWItZDgwYmZhMzlkYzgxXkEyXkFqcGdeQXVyODIxOTg5MTc@._V1_UY268_CR4,0,182,268_AL_.jpg",
              },
              { titulo: "BROKEBACK MOUNTAIN",
                descripcion: "Dos vaqueros se conocen mientras esperan ser contratados por el ranchero Joe Aguirre. Cuando su jefe los envía a cuidar ganado a la montaña Brokeback, entre ambos surge un sentimiento especial que deriva en una relación íntima.",
                imagen: "https://m.media-amazon.com/images/M/MV5BMTY5NTAzNTc1NF5BMl5BanBnXkFtZTYwNDY4MDc3._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "UP",
                descripcion: "Carl Fredricksen es un vendedor de globos de 78 años de edad dispuesto a cumplir su sueño: atar miles de globos a su casa y volar a Sudamérica. Sin embargo, descubre demasiado tarde a un joven e inesperado polizón. Lo que en principio será recelo, acabará por tornarse simpatía hacia el muchacho mientras juntos pasan fascinantes aventuras en exóticos lugares.",
                imagen: "https://m.media-amazon.com/images/M/MV5BMTk3NDE2NzI4NF5BMl5BanBnXkFtZTgwNzE1MzEyMTE@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "GRAN TORINO",
                descripcion: "Walt Kowalski es un veterano de guerra duro e inflexible apasionado por su auto, un Gran Torino del 72. La llegada de unos inmigrantes asiáticos al barrio ablanda su carácter, pero unos pandilleros generan problemas y Walt se ve envuelto en ellos.",
                imagen: "https://m.media-amazon.com/images/M/MV5BMTc5NTk2OTU1Nl5BMl5BanBnXkFtZTcwMDc3NjAwMg@@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "GLADIATOR",
                descripcion: "Máximo, general romano, desea volver a casa, pero el emperador Marco Aurelio quiere que herede el imperio. Esto hace que Cómodo ordene matar a su familia. Máximo escapa de la muerte y regresa a Roma como gladiador para vengar la muerte de su familia.",
                imagen: "https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "BIG FISH",
                descripcion: "Un joven periodista investiga la verdad sobre los increíbles relatos que le contaba su padre enfermo.",
                imagen: "https://m.media-amazon.com/images/M/MV5BMmU3NzIyODctYjVhOC00NzBmLTlhNWItMzBlODEwZTlmMjUzXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "EL SEÑOR DE LOS ANILLOS: EL RETORNO DEL REY",
                descripcion: "Frodo, Sam y Gollum se acercan al monte del Destino, donde destruirán el anillo o perecerán en el intento. Mientras, Aragorn y sus compañeros se enfrentan a las monstruosas tropas de Sauron.",
                imagen: "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "El Gran Gatsby",
                descripcion: "Nick Carraway (Tobey Maguire), nativo del Medio Oeste, llega a Nueva York en 1922 en busca del sueño americano. Nick, un aspirante a escritor, se muda al lado del millonario Jay Gatsby (Leonardo DiCaprio) y al otro lado de la bahía de su prima Daisy (Carey Mulligan) y su esposo mujeriego, Tom (Joel Edgerton). Nick se involucra en un mundo cautivador de riqueza y -- mientras observa sus ilusiones y engaños -- escribe una historia de amor imposible, sueños y tragedia.",
                imagen: "https://m.media-amazon.com/images/M/MV5BMTkxNTk1ODcxNl5BMl5BanBnXkFtZTcwMDI1OTMzOQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "The Babadook",
                descripcion: "Una viuda con problemas descubre que su hijo está diciendo la verdad acerca de un monstruo que entró a su casa a través de las páginas de un libro infantil.",
                imagen: "https://m.media-amazon.com/images/M/MV5BMTk0NzMzODc2NF5BMl5BanBnXkFtZTgwOTYzNTM1MzE@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "Roma",
                descripcion: "En la colonia Roma, de Ciudad de México, dos empleadas domésticas ayudan a una madre a criar a sus cuatro hijos durante las largas ausencias de su esposo. Una de las jóvenes, Cleo, se hace cargo de los niños como si fueran propios, a pesar de estar atravesando un momento difícil.",
                imagen: "https://m.media-amazon.com/images/M/MV5BMTU0OTc3ODk4Ml5BMl5BanBnXkFtZTgwMzM4NzI5NjM@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "Toy Story 1",
                descripcion: "Woody, el juguete favorito de Andy, se siente amenazado por la inesperada llegada de Buzz Lightyear, el guardían del espacio.",
                imagen: "https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "Toy Story 2",
                descripcion: "Andy se va de campamento y deja solos a sus juguetes. Entonces, Al McWhiggin, un compulsivo coleccionista de juguetes valiosos, encuentra a Woody y quiere quedárselo para su colección. Buzz Lightyear y los otros juguetes deberán actuar con rapidez para rescatar a Woody. Durante el rescate se enfrentarán a numerosos peligros y vivirán divertidas situaciones.",
                imagen: "https://m.media-amazon.com/images/M/MV5BMWM5ZDcxMTYtNTEyNS00MDRkLWI3YTItNThmMGExMWY4NDIwXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "Toy Story 3",
                descripcion: "Cuando su dueño Andy se prepara para ir a la universidad, el vaquero Woody, el astronauta Buzz y el resto de sus amigos juguetes comienzan a preocuparse por su incierto futuro. Todos acaban en una guardería donde comenzarán una serie de trepidantes y divertidas aventuras.",
                imagen: "https://m.media-amazon.com/images/M/MV5BMTgxOTY4Mjc0MF5BMl5BanBnXkFtZTcwNTA4MDQyMw@@._V1_UY268_CR3,0,182,268_AL_.jpg",
              },
              { titulo: "Toy Story 4",
                descripcion: "Woody siempre ha tenido claro cuál es su labor en el mundo y cuál es su prioridad: cuidar a su dueño, ya sea Andy o Bonnie. Sin embargo, Woody descubrirá lo grande que puede ser el mundo para un juguete cuando Forky se convierta en su nuevo compañero de habitación. Los juguetes se embarcarán en una aventura de la que no se olvidarán jamás.",
                imagen: "https://m.media-amazon.com/images/M/MV5BMTYzMDM4NzkxOV5BMl5BanBnXkFtZTgwNzM1Mzg2NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "Whiplash",
                descripcion: "Andrew Neiman es un joven y ambicioso baterista de jazz. Marcado por el fracaso de la carrera literaria de su padre, está obsesionado con alcanzar la cima dentro del elitista conservatorio de música de la Costa Este en el que estudia.",
                imagen: "https://m.media-amazon.com/images/M/MV5BOTA5NDZlZGUtMjAxOS00YTRkLTkwYmMtYWQ0NWEwZDZiNjEzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
              },
              { titulo: "Ex-Machina",
                descripcion: "Un joven programador que trabaja en una compañía de Internet es elegido para evaluar las capacidades y la conciencia de una hermosa y sofisticada robot.",
                imagen: "https://m.media-amazon.com/images/M/MV5BMTUxNzc0OTIxMV5BMl5BanBnXkFtZTgwNDI3NzU2NDE@._V1_UX182_CR0,0,182,268_AL_.jpg",
              }, ]




  const [peli, setPeli] = useState(pelis[0]);

  useEffect(() => {
  
  }, []);


  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <View style={styles.getStartedContainer}>

          <Text style={styles.titulo}>no se que peli ver hoy</Text>

          <TouchableOpacity
            style={styles.boton}
            onPress={() => {

              setPeli(pelis[Math.floor(Math.random() * pelis.length)])

            }}

          >
              <Text style={styles.botonTxt}>random film</Text>
          </TouchableOpacity>

          <Text style={styles.titulo}>{peli.titulo}</Text>

          <Image
              style={styles.imagen}
              source={{
                uri: peli.imagen,
              }}
          />

          <Text style={styles.descripcion}>{peli.descripcion}</Text>


        </View>

      </ScrollView>

    </View>
  );
}


HomeScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({

  descripcion:{

    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,

  },

  imagen: {
    width: 250,
    height: 250,
    borderRadius: 200,
  },

  boton:{

    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    marginTop: 20

  },

  botonTxt:{

    color: "#f2f2f2",
    fontSize: 25

  },

  titulo: {
    fontSize: 30,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },

  container: {
    flex: 1,
    backgroundColor: '#CCAFAF',
  },

  contentContainer: {
    paddingTop: 30,
  },

  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },

});

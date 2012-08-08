
// SERVER and CONF are global variables



require('../app');



SERVER.listen.apply(SERVER, CONF.server.listen);
DEBUG("Server listening: " + CONF.server.listen);


// SERVER and CONF are global variables



SERVER.listen.apply(SERVER, CONF.server.listen);
DEBUG("Server listening: " + CONF.server.listen);
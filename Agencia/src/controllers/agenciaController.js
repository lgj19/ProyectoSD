const cochesCtrl = require("./cocheController");
const hotelesCtrl = require("./hotelController");
const pedidosCtrl = require("./pedidoController");
const vuelosCtrl = require("./vuelosController");
const agenciaCtrl = {}

agenciaCtrl.createReservation = async(req, res, next) => {

const idCoche = req.body.idCoche;
const idHotel = req.body.idHotel;
const idVueloIda = req.body.idVueloIda;
const idVueloVuelta = req.body.idVueloVuelta;
const fechasCoche = req.body.fechasCoche;
const fechasHotel = req.body.fechasHotel;
var response;
    try { //RESERVAMOS COCHES
        
        if(idCoche != ''){
            req.params.id = idCoche;
            req.body.fechas = fechasCoche;
            await cochesCtrl.putFechasReservadas(req, response, next);
        }

        try { //RESERVAMOS HOTELES

            if(idHotel != ''){
                req.body.fechas = fechasHotel;
                await hotelesCtrl.putFechasReservadas(req, res, next);
                console.log("Status Hotel:", res.statusCode);
                if(res.statusCode != 200)
                    throw new Error("Error al reservar el hotel.");
            }

            try { //RESERVAMOS VUELO IDA

                if(idVueloIda != ''){
                    req.params.id = idVueloIda;
                    await vuelosCtrl.cambiarVueloEstado(req, res, next);
                    console.log("Status Vuelo Ida:", res.statusCode);
                    if(res.statusCode != 200)
                        throw new Error("Error al reservar el vuelo");
                }

                try { //RESERVAMOS VUELO VUELTA

                    if(idVueloVuelta != ''){
                        req.params.id = idVueloVuelta;
                        req.body.estado = 'RESERVADO';
                        await vuelosCtrl.cambiarVueloEstado(req, res, next);
                        console.log("Status Vuelo Vuelta:", res.statusCode);
                        if(res.statusCode != 200)
                            throw new Error("Error al reservar el vuelo");
                    }

                    try { // RESERVAMOS EL PEDIDO
                        
                        await pedidosCtrl.putPedidoUsuario(req, res, next);


                    } catch (error) { //Eliminar fechas de reserva del COCHE, HOTEL, Vuelo Ida y Vuelo Vuelta.
                        req.params.fechaIni = fechasHotel[0];
                        req.params.fechaFin = fechasHotel[1];
                        req.params.id = idHotel;
                        await hotelesCtrl.updateFechasReservadasById(req, res, next);
                        req.params.fechaIni = fechasCoche[0];
                        req.params.fechaFin = fechasCoche[1];
                        req.params.id = idCoche;
                        await cochesCtrl.updateFechasReservadasById(req, res, next);
                        req.params.id = idVueloIda;
                        req.body.estado = 'DISPONIBLE'  
                        await vuelosCtrl.cambiarVueloEstado(req, res, next);             
                        next(error);
                    }


                } catch (error) {  //Eliminar fechas de reserva del COCHE, HOTEL y Vuelo Ida.
                    req.params.fechaIni = fechasHotel[0];
                    req.params.fechaFin = fechasHotel[1];
                    req.params.id = idHotel;
                    await hotelesCtrl.updateFechasReservadasById(req, res, next);  
                    req.params.fechaIni = fechasCoche[0];
                    req.params.fechaFin = fechasCoche[1];
                    req.params.id = idCoche;
                    await cochesCtrl.updateFechasReservadasById(req, res, next);
                    req.params.id = idVueloIda;
                    req.body.estado = 'DISPONIBLE'  
                    await vuelosCtrl.cambiarVueloEstado(req, res, next);          
                    next(error);
                }


            } catch (error) {  //Eliminar fechas de reserva del COCHE y HOTEL.
                req.params.fechaIni = fechasHotel[0];
                req.params.fechaFin = fechasHotel[1];
                req.params.id = idHotel;
                await hotelesCtrl.updateFechasReservadasById(req, res, next);
                req.params.fechaIni = fechasCoche[0];
                req.params.fechaFin = fechasCoche[1];
                req.params.id = idCoche;
                await cochesCtrl.updateFechasReservadasById(req, res, next);
                next(error);
            }


        } catch (error) {  //Eliminar fechas de reserva del COCHE.
            req.params.fechaIni = fechasCoche[0];
            req.params.fechaFin = fechasCoche[1];
            req.params.id = idCoche;
            await cochesCtrl.updateFechasReservadasById(req, res, next);
            next(error);
        }


    } catch (error) {  // No se elimina nada.
        next(error);
    }

}

module.exports = agenciaCtrl;
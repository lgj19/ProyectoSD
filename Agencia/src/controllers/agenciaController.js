const axios = require('axios').default;
const https = require('https');

const cochesCtrl = require("./cocheController");
const hotelesCtrl = require("./hotelController");
const pedidosCtrl = require("./pedidoController");
const vuelosCtrl = require("./vuelosController");
const agenciaCtrl = {}
const HTTPS_AGENCIA = 'https://localhost:3000/api/agencia';
const HTTPS_COCHE = 'https://localhost:3001/api/coches';
const HTTPS_HOTEL = 'https://localhost:3002/api/hoteles';
const HTTPS_VUELO = 'https://localhost:3003/api/vuelos';
const HTTPS_BANCO = 'https://localhost:3004/api/Banco'


agenciaCtrl.createReservation = async(req, res, next) => {

const axiosInst = axios.create({
    httpsAgent: new https.Agent({  rejectUnauthorized: false }),
    headers: {'Authorization': req.headers.authorization}
});

const idCoche = req.body.idCoche;
const idHotel = req.body.idHotel;
const idVueloIda = req.body.idVueloIda;
const idVueloVuelta = req.body.idVueloVuelta;
const fechasCoche = req.body.fechasCoche;
const fechasHotel = req.body.fechasHotel;
var transOKBool = true;

    if(idCoche != '')
        await axiosInst.put(`${HTTPS_COCHE}/${idCoche}/fechasReservadas`,{ fechas: fechasCoche }).catch ((error) => {  // No se elimina nada.
            res.status(500).json({result: "Error del servidor al reservar el alquiler del coche. Reserva deshecha."});
            transOKBool = false;
        });

    if(idHotel != '')
        await axiosInst.put(`${HTTPS_HOTEL}/${idHotel}/fechasReservadas`, {fechas: fechasHotel }).catch (async () => {  //Eliminar fechas de reserva del COCHE.

            await axiosInst.put(`${HTTPS_HOTEL}/${idHotel}/fechaIni/${fechasHotel[0]}/fechaFin/${fechasHotel[1]}`);
            res.status(500).json({result: "Error del servidor al reservar la habitación de hotel. Reserva deshecha."});
            transOKBool = false;
        });

    if(idVueloIda != '')
        await axiosInst.put(`${HTTPS_VUELO}/${idVueloIda}/cambiarEstado`, {estado: 'RESERVADO' }).catch (async () => {  //Eliminar fechas de reserva del COCHE y HOTEL.

            await axiosInst.put(`${HTTPS_HOTEL}/${idHotel}/fechaIni/${fechasHotel[0]}/fechaFin/${fechasHotel[1]}`);
            await axiosInst.put(`${HTTPS_COCHE}/${idCoche}/fechaIni/${fechasCoche[0]}/fechaFin/${fechasCoche[1]}`);
            res.status(500).json({result: "Error del servidor al reservar el vuelo de ida. Reserva deshecha."});
            transOKBool = false;
        });

    if(idVueloVuelta != '')
        await axiosInst.put(`${HTTPS_VUELO}/${idVueloVuelta}/cambiarEstado`, {estado: 'RESERVADO' }).catch (async () => {  //Eliminar fechas de reserva del COCHE, HOTEL y Vuelo Ida.

            await axiosInst.put(`${HTTPS_HOTEL}/${idHotel}/fechaIni/${fechasHotel[0]}/fechaFin/${fechasHotel[1]}`);
            await axiosInst.put(`${HTTPS_COCHE}/${idCoche}/fechaIni/${fechasCoche[0]}/fechaFin/${fechasCoche[1]}`);
            await axiosInst.put(`${HTTPS_VUELO}/${idVueloIda}/cambiarEstado`, {estado: 'DISPONIBLE' });
            res.status(500).json({result: "Error del servidor al reservar el vuelo de vuelta. Reserva deshecha."});
            transOKBool = false;
        });

    await axiosInst.put(`${HTTPS_AGENCIA}/pedidos/usuario`,
        { idCoche: idCoche, idHotel: idHotel, idVueloIda: idVueloIda, idVueloVuelta: idVueloVuelta }).catch (async () => { //Eliminar fechas de reserva del COCHE, HOTEL, Vuelo Ida y Vuelo Vuelta.

         await axiosInst.put(`${HTTPS_HOTEL}/${idHotel}/fechaIni/${fechasHotel[0]}/fechaFin/${fechasHotel[1]}`);
         await axiosInst.put(`${HTTPS_COCHE}/${idCoche}/fechaIni/${fechasCoche[0]}/fechaFin/${fechasCoche[1]}`);
         await axiosInst.put(`${HTTPS_VUELO}/${idVueloIda}/cambiarEstado`, {estado: 'DISPONIBLE' });
         await axiosInst.put(`${HTTPS_VUELO}/${idVueloVuelta}/cambiarEstado`, {estado: 'DISPONIBLE' });
        res.status(500).json({result: "Error del servidor al realizar el pedido. Reserva deshecha."});
        transOKBool = false;
    });

    if(transOKBool)
        res.json({result: "Reserva creada correctamente."});
                    
}


agenciaCtrl.createPurchase = async( req, res, next) => {

    const axiosInst = axios.create({
        httpsAgent: new https.Agent({  rejectUnauthorized: false }),
        headers: {'Authorization': req.headers.authorization}
    });

    const coste = req.body.coste;
    const nombre = req.body.nombre;
    const numTarjeta = req.body.numTarjeta;
    const numSecretoTarjeta = req.body.numSecretoTarjeta;
    const idVueloIda = req.body.idVueloIda;
    const idVueloVuelta = req.body.idVueloVuelta;
    const idPedido = req.body.idPedido;
    var costeInverso;
    var transOKBool = true;

    await axiosInst.put(`${HTTPS_BANCO}/cuentas/updateMovimiento`, {coste, nombre, numTarjeta, numSecretoTarjeta})
    .catch( (error) => {
        console.log("ERROR STATUS: " + error.response.status)
            if(error.response.status == 500)
                res.status(error.response.status).json({result: "Error del servidor al realizar la compra. Compra abortada.", statusText: error.response.statusText});
            else if(error.response.status == 400)
                res.status(error.response.status).json({result: "Error en los datos de la tarjeta o saldo insuficiente. Compra abortada.", statusText: error.response.statusText});
            transOKBool = false;
        }
    );

    if(idVueloIda != '')
    await axiosInst.put(`${HTTPS_VUELO}/${idVueloIda}/cambiarEstado`, {estado: 'COMPRADO' })
    .catch (async () => {  
        console.log("acu")
        await axiosInst.put(`${HTTPS_BANCO}/cuentas/updateMovimiento`, {costeInverso, nombre, numTarjeta, numSecretoTarjeta})
        res.status(500).json({result: "Error del servidor al reservar el vuelo de ida. Compra deshecha."});
        transOKBool = false;

    });

    if(idVueloVuelta != '')
        await axiosInst.put(`${HTTPS_VUELO}/${idVueloVuelta}/cambiarEstado`, {estado: 'COMPRADO' })
        .catch (async () => { 
            console.log("Aca")
            await axiosInst.put(`${HTTPS_BANCO}/cuentas/updateMovimiento`, {costeInverso, nombre, numTarjeta, numSecretoTarjeta})
            await axiosInst.put(`${HTTPS_VUELO}/${idVueloIda}/cambiarEstado`, {estado: 'RESERVADO' });
            res.status(500).json({result: "Error del servidor al reservar el vuelo de vuelta. Compra deshecha."});
            transOKBool = false;

        });

    await axiosInst.put(`${HTTPS_AGENCIA}/pedidos/${idPedido}/cambiarEstado`, { estado: 'COMPRADO' })
        .catch (async () => {
            console.log("AQUI")
            await axiosInst.put(`${HTTPS_VUELO}/${idVueloIda}/cambiarEstado`, {estado: 'RESERVADO' });
            await axiosInst.put(`${HTTPS_VUELO}/${idVueloVuelta}/cambiarEstado`, {estado: 'RESERVADO' });
            res.status(500).json({result: "Error del servidor al realizar el pedido. Reserva deshecha."});
            transOKBool = false;
    });

    if(transOKBool)
        res.json({result: "Compra realizada con éxito."});

}

module.exports = agenciaCtrl;
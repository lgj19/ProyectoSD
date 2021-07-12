const axios = require('axios').default;
const https = require('https');

const agenciaCtrl = {}


agenciaCtrl.createReservation = async(req, res, next) => {

const axiosInst = axios.create({
    httpsAgent: new https.Agent({  rejectUnauthorized: false }),
    headers: {'Authorization': req.headers.authorization}
});
const pedido = req.body.pedido;
const idCoche = req.body.pedido.idCoche;
const idHotel = req.body.pedido.idHotel;
const idVueloIda = req.body.pedido.idVueloIda;
const idVueloVuelta = req.body.pedido.idVueloVuelta;
const fechasCoche = req.body.fechasCoche;
const fechasHotel = req.body.fechasHotel;
var transOKBool = true;

    if(idCoche != '')
        await axiosInst.put(`${config.HTTPS_COCHE}/${idCoche}/fechasReservadas`,{ fechas: fechasCoche }).catch ((error) => {  // No se elimina nada.
            res.status(500).json({result: "Error del servidor al reservar el alquiler del coche. Reserva deshecha."});
            transOKBool = false;
        });

    if(idHotel != '')
        await axiosInst.put(`${config.HTTPS_HOTEL}/${idHotel}/fechasReservadas`, {fechas: fechasHotel }).catch (async () => {  //Eliminar fechas de reserva del COCHE.

            await axiosInst.put(`${config.HTTPS_HOTEL}/${idHotel}/fechaIni/${fechasHotel[0]}/fechaFin/${fechasHotel[1]}`);
            res.status(500).json({result: "Error del servidor al reservar la habitación de hotel. Reserva deshecha."});
            transOKBool = false;
        });

    if(idVueloIda != '')
        await axiosInst.put(`${config.HTTPS_VUELO}/${idVueloIda}/cambiarEstado`, {estado: 'RESERVADO' }).catch (async () => {  //Eliminar fechas de reserva del COCHE y HOTEL.

            await axiosInst.put(`${config.HTTPS_HOTEL}/${idHotel}/fechaIni/${fechasHotel[0]}/fechaFin/${fechasHotel[1]}`);
            await axiosInst.put(`${config.HTTPS_COCHE}/${idCoche}/fechaIni/${fechasCoche[0]}/fechaFin/${fechasCoche[1]}`);
            res.status(500).json({result: "Error del servidor al reservar el vuelo de ida. Reserva deshecha."});
            transOKBool = false;
        });

    if(idVueloVuelta != '')
        await axiosInst.put(`${config.HTTPS_VUELO}/${idVueloVuelta}/cambiarEstado`, {estado: 'RESERVADO' }).catch (async () => {  //Eliminar fechas de reserva del COCHE, HOTEL y Vuelo Ida.

            await axiosInst.put(`${config.HTTPS_HOTEL}/${idHotel}/fechaIni/${fechasHotel[0]}/fechaFin/${fechasHotel[1]}`);
            await axiosInst.put(`${config.HTTPS_COCHE}/${idCoche}/fechaIni/${fechasCoche[0]}/fechaFin/${fechasCoche[1]}`);
            await axiosInst.put(`${config.HTTPS_VUELO}/${idVueloIda}/cambiarEstado`, {estado: 'DISPONIBLE' });
            res.status(500).json({result: "Error del servidor al reservar el vuelo de vuelta. Reserva deshecha."});
            transOKBool = false;
        });

    await axiosInst.post(`${config.HTTPS_AGENCIA}/pedidos`, { pedido })
      .catch (async () => { //Eliminar fechas de reserva del COCHE, HOTEL, Vuelo Ida y Vuelo Vuelta.

         await axiosInst.put(`${config.HTTPS_HOTEL}/${idHotel}/fechaIni/${fechasHotel[0]}/fechaFin/${fechasHotel[1]}`);
         await axiosInst.put(`${config.HTTPS_COCHE}/${idCoche}/fechaIni/${fechasCoche[0]}/fechaFin/${fechasCoche[1]}`);
         await axiosInst.put(`${config.HTTPS_VUELO}/${idVueloIda}/cambiarEstado`, {estado: 'DISPONIBLE' });
         await axiosInst.put(`${config.HTTPS_VUELO}/${idVueloVuelta}/cambiarEstado`, {estado: 'DISPONIBLE' });
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

    const coste = req.body.coste * -1;
    const saldoMin = req.body.coste;
    const nombre = req.body.nombre;
    const numTarjeta = req.body.numTarjeta;
    const numSecretoTarjeta = req.body.numSecretoTarjeta;
    const idVueloIda = req.body.idVueloIda;
    const idVueloVuelta = req.body.idVueloVuelta;
    const idCoche = req.body.idCoche;
    const idHotel = req.body.idHotel;
    const idPedido = req.body.idPedido;
    var costeInverso;
    var transOKBool = true;

    if(idCoche != '')
        await axiosInst.get(`${config.HTTPS_COCHE}/${idCoche}`)
        .catch(async() => {
            res.status(500).json({result: "Error del servidor al identificar el coche. Compra abortada."});
            transOKBool = false;
        });

    if(transOKBool && idHotel != '')
        await axiosInst.get(`${config.HTTPS_HOTEL}/${idHotel}`)
        .catch(async() => {
            res.status(500).json({result: "Error del servidor al identificar el hotel. Compra abortada."});
            transOKBool = false;
        });

    if(transOKBool)
      await axiosInst.put(`${config.HTTPS_BANCO}/cuentas/updateMovimiento`, {coste, saldoMin, nombre, numTarjeta, numSecretoTarjeta})
        .catch( (error) => {
            if(error.response.status == 500)
                res.status(error.response.status).json({result: "Error del servidor al realizar la compra. Compra abortada.", statusText: error.response.statusText});
            else if(error.response.status == 400)
                res.status(error.response.status).json({result: "Error en los datos de la tarjeta o saldo insuficiente. Compra abortada.", statusText: error.response.statusText});
            transOKBool = false;
        });

    if(idVueloIda != '' && transOKBool)
        await axiosInst.put(`${config.HTTPS_VUELO}/${idVueloIda}/cambiarEstado`, {estado: 'COMPRADO' })
        .catch (async () => {  
            await axiosInst.put(`${config.HTTPS_BANCO}/cuentas/updateMovimiento`, {costeInverso, nombre, numTarjeta, numSecretoTarjeta})
            res.status(500).json({result: "Error del servidor al reservar el vuelo de ida. Compra deshecha."});
            transOKBool = false;

        });

    if(idVueloVuelta != '' && transOKBool)
        await axiosInst.put(`${config.HTTPS_VUELO}/${idVueloVuelta}/cambiarEstado`, {estado: 'COMPRADO' })
        .catch (async () => { 
            await axiosInst.put(`${config.HTTPS_BANCO}/cuentas/updateMovimiento`, {costeInverso, nombre, numTarjeta, numSecretoTarjeta})
            await axiosInst.put(`${config.HTTPS_VUELO}/${idVueloIda}/cambiarEstado`, {estado: 'RESERVADO' });
            res.status(500).json({result: "Error del servidor al reservar el vuelo de vuelta. Compra deshecha."});
            transOKBool = false;

        });

    if(transOKBool)
        await axiosInst.put(`${config.HTTPS_AGENCIA}/pedidos/${idPedido}/cambiarEstado`, { estado: 'COMPRADO' })
            .catch (async () => {
                await axiosInst.put(`${config.HTTPS_VUELO}/${idVueloIda}/cambiarEstado`, {estado: 'RESERVADO' });
                await axiosInst.put(`${config.HTTPS_VUELO}/${idVueloVuelta}/cambiarEstado`, {estado: 'RESERVADO' });
                res.status(500).json({result: "Error del servidor al realizar el pedido. Reserva deshecha."});
                transOKBool = false;
        });

    if(transOKBool)
        res.json({result: "Compra realizada con éxito."});

}


agenciaCtrl.eliminateReservationTransaction = async (req, res, next) => {

    const axiosInst = axios.create({
        httpsAgent: new https.Agent({  rejectUnauthorized: false }),
        headers: {'Authorization': req.headers.authorization}
    });

    const idCoche = req.body.pedido.idCoche;
    const fechasCoche = req.body.fechasCoche;
    const idHotel = req.body.pedido.idHotel;
    const fechasHotel = req.body.fechasHotel;
    const idVueloIda = req.body.pedido.idVueloIda;
    const idVueloVuelta = req.body.pedido.idVueloVuelta;
    var transOKBool = true;

    await axiosInst.put(`${config.HTTPS_COCHE}/${idCoche}/fechaIni/${fechasCoche[0]}/fechaFin/${fechasCoche[1]}`, {})
      .catch(() => {
            res.status(500).json({result: "Error del servidor al deshacer la reserva del coche. Eliminación abortada."});
            transOKBool = false;
      });

    if(transOKBool)
        await axiosInst.put(`${config.HTTPS_HOTEL}/${idHotel}/fechaIni/${fechasHotel[0]}/fechaFin/${fechasHotel[1]}`, {})
            .catch(async (error) => {
                await axiosInst.put(`${config.HTTPS_COCHE}/${idCoche}/fechasReservadas`, {fechas: fechasCoche});
                res.status(error.response.status).json({result: "Error del servidor al deshacer la reserva del hotel. Eliminación abortada."});
                transOKBool = false;
        });

    if(transOKBool)
        await axiosInst.put(`${config.HTTPS_VUELO}/${idVueloIda}/cambiarEstado`, {estado: 'DISPONIBLE' })
            .catch (async () => { 
                await axiosInst.put(`${config.HTTPS_COCHE}/${idCoche}/fechasReservadas`, {fechas: fechasCoche});
                await axiosInst.put(`${config.HTTPS_HOTEL}/${idHotel}/fechasReservadas`, {fechas: fechasHotel});
                res.status(500).json({result: "Error del servidor al deshacer la reserva del vuelo de ida. Eliminación abortada."});
                transOKBool = false;
        });

    if(transOKBool)
        await axiosInst.put(`${config.HTTPS_VUELO}/${idVueloVuelta}/cambiarEstado`, {estado: 'DISPONIBLE' })
            .catch (async () => { 
                await axiosInst.put(`${config.HTTPS_COCHE}/${idCoche}/fechasReservadas`, {fechas: fechasCoche});
                await axiosInst.put(`${config.HTTPS_HOTEL}/${idHotel}/fechasReservadas`, {fechas: fechasHotel});
                await axiosInst.put(`${config.HTTPS_VUELO}/${idVueloIda}/cambiarEstado`, {estado: 'RESERVADO' });
                res.status(500).json({result: "Error del servidor al deshacer la reserva del vuelo de vuelta. Eliminación abortada."});
                transOKBool = false;
        });
    

    if(transOKBool)
        await axiosInst.delete(`${config.HTTPS_AGENCIA}/pedidos/usuario`)
          .catch(async() => {
            await axiosInst.put(`${config.HTTPS_COCHE}/${idCoche}/fechasReservadas`, {fechas: fechasCoche});
            await axiosInst.put(`${config.HTTPS_HOTEL}/${idHotel}/fechasReservadas`, {fechas: fechasHotel});
            await axiosInst.put(`${config.HTTPS_VUELO}/${idVueloIda}/cambiarEstado`, {estado: 'RESERVADO' });
            await axiosInst.put(`${config.HTTPS_VUELO}/${idVueloVuelta}/cambiarEstado`, {estado: 'RESERVADO' });
            res.status(500).json({result: "Error del servidor al deshacer la reserva del paquete del pedido. Eliminación abortada."});
            transOKBool = false;
        });

    if(transOKBool)
        res.json({result: "Eliminación de la reserva realizada correctamente."});


}

module.exports = agenciaCtrl;
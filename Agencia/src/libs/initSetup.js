const Role = require('../models/Role')
const RoleCtrl = {}


//Esto sirve para crear los roles en caso de que no se hayan creado en la BD.
RoleCtrl.createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount();
        
        if(count > 0) return;

        const values = await Promise.all([
            new Role({ name: "user"}).save(),
            new Role({ name: "admin"}).save()
        ]);

        console.log(values);

    } catch(error) {
        console.log(error)
    }
}

module.exports = RoleCtrl;
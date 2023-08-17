const bcrypt = require('bcrypt')

//crear el hash - lo usamos en register
exports.creatHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

//generar la funcion para comprar - lo usamos en login
exports.isValidPassword = (password, user) => bcrypt.compareSync(password, user.password)
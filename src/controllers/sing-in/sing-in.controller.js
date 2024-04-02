const SignInModel = require('../../models/sign-in/sign-in.model');
const { comparePassword } = require('../../config/bcrypt');
const jwt = require('../../config/jwt');
const { loginIn } = require('../../config/Socket.io/ioEvent');

//Controlador para iniciar sesion
async function login(req, res) {
	try {
		const { userName, password } = req.body;
		const user = await SignInModel.login(userName);

		if (!user) {
			return res.json({ data: 'User no found' });
		}

		const storedHashedPassword = user.password;
		const isPasswordMatch = await comparePassword(password, storedHashedPassword);

		if (isPasswordMatch) {
			// Contraseña válida, genera un token JWT
			const idCardWorker = user.idCardWorker;
			const idRole = user.idRole;
			const token = jwt.generateJwtToken(idCardWorker, idRole);

			loginIn({ message: `${userName} ha iniciado sesion` })
			// Devuelve el token en la respuesta
			res.json({ data: 'Inicio de sesión exitoso', token });
		} else {
			// Contraseña inválida
			res.status(401).json({ error: 'Credenciales incorrectas' });
		}
	} catch (err) {
		console.log({ data: `Error interno del servidor: ${err}` });
		res.status(500).json({ error: 'Error interno del servidor' });
	};
};

//Controlador para obtener la información de bienvenidad según el id del empleado
async function infoBienvenida(req, res) {
	try {
		const { idCardWorker } = req.params;
		const info = await SignInModel.welcomeInfo(idCardWorker);
		res.json({ data: info })
	} catch (err) {
		console.log({ data: `Internal Server Error: ${err}` });
	}
};

module.exports = {
	login,
	infoBienvenida
}
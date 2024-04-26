/**
 * Controller function for retrieving a hello message.
 * It sends a JSON response with a hello message indicating the server is up and running.
 * 
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
const helloMsg = (req, res) => {
	res.json({ message: "Hello from todos API"})
}

export { helloMsg }
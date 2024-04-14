const helloMsg = (req, res) => {
	res.json({ message: "Hello from todos API"})
}

export { helloMsg }
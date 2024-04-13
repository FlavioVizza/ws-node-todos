const helloMsg = (req, res) => {
	res.json({ message: "Hello from API"})
}

export { helloMsg }
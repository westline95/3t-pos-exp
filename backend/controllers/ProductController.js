const getData = async (req, res) => {
    const data = await ProdCategory.findAll().catch(err => res.status(500).json({message: err.message}))
    res.status(200).json({list: data})
}

export default getData;
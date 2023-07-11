exports.getProducts =async (req, res) => {
    try {
        const {
            docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            totalDocs } = await productModel.findOne({ _id: pid })
        res.status(200).send({
            status: 'success',
            payload: docs
        })
    } catch (error) {
        console.log(error)
    }
}
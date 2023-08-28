import { Router, Request, Response } from 'express'
import productController from './controllers/product.controller'

const productRoutes = Router()
const productCtrl = new productController()


productRoutes.post('/createProduct', async(req: Request, res: Response) => {
    const product = req.body

    try {
        const response = await productCtrl.createProduct(product)
        return res.status( response.code ).json( response )
    } catch(err:any) {
        return res.status( err.code ? err.code : 500 ).json( err )
    }
})

productRoutes.get('/getProduct', async( req: Request, res: Response ) => {

    try {
        const response = await productCtrl.getproducts()
        return res.status( response.code ).json( response )
    } catch( err:any ) {
        return res.status( err.code ? err.code : 500 ).json( err )
    }
})

productRoutes.get('/getProductName', async( req: Request, res: Response) => {
    const data = req.params.data

    try {
        const response = await productCtrl.getproductByName(data)
        return res.status( response.code ).json( response )
    } catch( err:any ) {
        return res.status( err.code ? err.code : 500 ).json( err )
    }
})

productRoutes.get('/getProductCategory', async( req: Request, res: Response) => {
    const data = req.params.category

    try {
        const response = await productCtrl.getproductByName(data)
        return res.status( response.code ).json( response )
    } catch( err:any ) {
        return res.status( err.code ? err.code : 500 ).json( err )
    }
})

export default productRoutes
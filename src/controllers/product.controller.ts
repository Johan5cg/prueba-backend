import logger from '../../lib/logger';
import IProduct from '../interfaces/product.interface';
import IResponse from '../interfaces/response.interface';
import productModel from '../models/product.model';

export default class productController {

    createProduct (product: IProduct): Promise<IResponse> {
        return new Promise ((resolve, reject) => {
            (async() => {
                try {
                    if(product) {
                        return reject ({ ok: false, message: 'esté producto ya existe', response: null, code: 400 })
                    }

                    const productCreate = await productModel.create(product)
                    return resolve({ ok: true, message: 'producto creado', response: productCreate, code: 201 })
                } catch ( err: any ) {
                    return reject({ ok: false, message: 'error ocurrido', response: err, code: 500 })
                }
            }) ()
        })
    }

    getproducts(): Promise<IResponse> {
        return new Promise((resolve, reject) => {
            (async() => {
                try {
                    const productsDB = await productModel.find({})
                    if ( productsDB.length < 1 ) {
                        return reject({ ok: false, message: 'No hay productos', response: null, code: 404 })
                    }

                    const response = {
                        products: productsDB,
                        total: productsDB.length
                    }

                    return resolve({ ok: true, message: 'Productos recuperados', response: response, code: 200 })
                } catch( err: any ) {
                    return reject({ ok: false, message: 'error ocurred', response: err, code: 500 })
                }
            }) ()
        })
    }

    getproductByName( name: string ): Promise<IResponse> {
        return new Promise((resolve, reject) => {
            (async() => {
                try {
                    const productFinded = await productModel.findOne({ name: name }).select('name')

                    if ( !productFinded ) {
                        return reject({ ok: false, message: 'Producto no existente', response: null, code: 404 })
                    }

                    return resolve({ ok: true, message: 'producto encontrado', response: productFinded, code: 200 })
                } catch ( err: any ) {
                    return reject({ ok: false, message: 'error en el servidor', response: err, code: 500 })
                }
            }) ()
        })
    }

    getproductByCategory( category: string ): Promise<IResponse> {
        return new Promise((resolve, reject) => {
            (async() => {
                try {
                    const productFinded = await productModel.findOne({ category: category }).select('category')

                    if ( !productFinded ) {
                        return reject({ ok: false, message: 'Producto no existente', response: null, code: 404 })
                    }

                    return resolve({ ok: true, message: 'producto encontrado', response: productFinded, code: 200 })
                } catch ( err: any ) {
                    return reject({ ok: false, message: 'error en el servidor', response: err, code: 500 })
                }
            }) ()
        })
    }

    populateProducts(): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const products = [
                    {
                        name: 'Samsung Galaxy',
                        category: 'electronics'
                    },
                    {
                        name: 'Motorola V3',
                        category: 'electronics'
                    },
                    {
                        name: 'Iphone 12',
                        category: 'electronics'
                    },
                    {
                        name: 'Skippy',
                        category: 'grocery_store'
                    }
                ]

                const data = await productModel.find({})

                if (data && data.length < 1) {
                    for( let product of products) {
                        try {
                            await this.createProduct(product)
                            logger.info(`Product created ${product}`)
                        } catch(e) {
                            logger.error(e)
                            return reject(false)
                        }
                    }
                }
                return resolve(true)
            } catch(e) {
                logger.error(e)
                return reject(false)
            }
        })
    }

}
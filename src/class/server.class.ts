import http from 'http'
import express from 'express'
import config from 'config'
import MongoConn from '../../lib/mongodb';

export default class Server {
    private port: number
    private httpServer: http.Server
    private mongodb: MongoConn
    public app: express.Application
    private static _instance: Server

    constructor() {
        this.port = config.get('api.port')
        this.app = express()
        this.httpServer = new http.Server(this.app)
        this.mongodb = MongoConn.instance
    }

    public static get instance() {
        return this._instance || ( this._instance = new this() )
    }

    start() {
        try {
            this.httpServer.listen(this.port)
            console.log(`listen on port ${this.port}`)
        } catch(err) {
            console.log(err)
        }
    }
}
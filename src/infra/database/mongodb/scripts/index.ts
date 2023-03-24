import { MongoClient, Db } from "mongodb"

(async () => {

    const mongo_uri =  "mongodb+srv://adm:npL4eiXsfVFk4ErJ@primary.xajv0.mongodb.net"

    const connection = await MongoClient.connect(mongo_uri)
    if (!connection){
        throw new Error("Connection failed with database in:" + mongo_uri)
    }

    try {

        const database = connection.db("comandas");

        await Promise.all([
            createIndexes(database)
        ])

    } catch (e) {
        console.log(e)
    } finally {
        connection.close()
        process.exit()
    }
})()



async function createIndexes(database : Db) {
    await Promise.all([
        CreateIndexForInvetory(),
        CreateIndexForAuthenticates(),
        CreateIndexForCompanies(),
        CreateIndexForEvents()
    ])
    
    function CreateIndexForAuthenticates() {
        return database.collection('authenticates').createIndexes([
            {
                name: 'id_idx',
                key: { 'id': 1 },
                unique: true
            },
            {
                name: 'credencials_idx',
                key: { 'cnpj': 1, 'email': 1 },
                unique : true
            },
            {
                name: 'associeteded_id_idx',
                key: { 'associeteded_id': 1 },
                unique: true
            },
        ])
    }

    function CreateIndexForInvetory() {
        return database.collection('inventories').createIndexes([
            {
                name: 'id_idx',
                key: { 'id': 1},
                unique: true
            },
            {
                name: 'texts_idx',
                key: { 'name': 'text', 'description': 'text' }
            },
            {
                name: 'company_id_idx',
                key: { 'company_id': 1 }
            }
        ])
    }

    function CreateIndexForCompanies() {
        return database.collection('companies').createIndexes([
            {
                name: 'id_idx',
                key: { 'id': 1},
                unique: true
            },
            {
                name: 'name_fantasy_idx',
                key: { 'name_fantasy': 'text' }
            },
            {
                name: 'credencials_idx',
                key: { 'cnpj': 1, 'email': 1 },
                unique : true
            }
        ])
    }

    function CreateIndexForEvents() {
        return database.collection('events').createIndexes([
            {
                name: 'id_idx',
                key: { 'id': 1},
                unique: true
            },
            {
                name: 'texts_idx',
                key: { 'name': 'text', 'description': 'text' }
            },
            {
                name: 'company_id_idx',
                key: { 'company_id': 1 }
            }
        ])
    }
}

const fs = require('fs');
let stocks = [];

function cekData() {
    data = fs.readFileSync('./dataStocks/stocks.js', 'utf8');
    stocks = JSON.parse(data);
    return stocks
}

function generateId() {
    cekData()
    let lastId;
    if (stocks.length > 0) {
        lastId = stocks[stocks.length - 1].id;
    } else {
        lastId = 0;
    }
    const newId = parseInt(lastId) + 1;
    return newId;
};

function changeId(data) {
    const id = data.id;
    const newData = {
        id,
        ...data
    };
    return newData
}

function saveData(stock) {
    if (!fs.existsSync("./dataStocks/stocks.js")) {
        fs.writeFileSync("./dataStocks/stocks.js", JSON.stringify(stocks))
        return stock
    } else {
        fs.writeFileSync("./dataStocks/stocks.js", JSON.stringify(stocks))
        return stock
    }
}

function postStock(body, callback) {
    if (!fs.existsSync("dataStocks/stocks.js")) {
        fs.mkdirSync("./dataStocks")
        const stock = JSON.parse(body);
        stock.id = 1;
        stocks.push(changeId(stock));
        console.log(changeId(stock))
        saveData(changeId(stock))
        const result = {
            message: 'Stock berhasil ditambahkan',
            body: changeId(stock)
        };
        callback(result);
    } else if (fs.existsSync("dataStocks/stocks.js")) {
        const data = fs.readFileSync("dataStocks/stocks.js", 'utf8');
        if (data.length < 1) {
            const stock = JSON.parse(body);
            stock.id = `1`;
            stocks.push(changeId(stock));
            console.log(changeId(stock))
            saveData(changeId(stock))
            const result = {
                message: 'Stock berhasil ditambahkan',
                body: changeId(stock)
            };
            callback(result);
        } else {
            cekData()
            const stock = JSON.parse(body);
            stock.id = generateId();
            stocks.push(changeId(stock));
            console.log(changeId(stock))
            saveData(changeId(stock))
            const result = {
                message: 'Stock berhasil ditambahkan',
                body: changeId(stock)
            };
            callback(result);
        }
    }
    else {
        cekData()
        const stock = JSON.parse(body);
        stock.id = generateId();
        stocks.push(changeId(stock));
        console.log(changeId(stock))
        saveData(changeId(stock))
        const result = {
            message: 'Stock berhasil ditambahkan',
            body: changeId(stock)
        };
        callback(result);
    }
}

function getStocks(callback) {
    cekData()
    const result = {
        stocks
    };
    callback(result);
}

function updateStock(body, callback) {
    cekData();
    const stock = JSON.parse(body);
    const index = stocks.findIndex((s) => s.id === stock.id);
    if (index >= 0) {
        stocks[index] = stock;
        saveData();
        const result = {
            message: 'Data stock berhasil diupdate',
            body: stock
        };
        callback(result);
    } else {
        const result = {
            message: 'Data stock tidak ditemukan'
        };
        callback(result);
    }
}
function deleteStock(body, callback) {
    cekData();
    const stock = JSON.parse(body);
    const index = stocks.findIndex((s) => s.id === stock.id);
    if (index >= 0) {
        stocks.splice(index, 1);
        saveData();
        const result = {
            message: 'Data stock berhasil dihapus',
            body: stock
        };
        callback(result);
    } else {
        const result = {
            message: 'Data stock tidak ditemukan'
        };
        callback(result);
    }
}
function deleteOne({ id }, callback) {
    cekData();
    const index = stocks.findIndex((s) => s.id === id);
    if (index >= 0) {
        stocks.splice(index, 1);
        saveData();
        const result = {
            message: `Data stock dengan id ${id} berhasil dihapus`,
        };
        callback(result);
    } else {
        const result = {
            message: 'Data stock tidak ditemukan',
        };
        callback(result);
    }
}


function getOne({ id }, callback) {
    cekData();
    const stock = stocks.find((s) => s.id === id);
    if (stock) {
        const result = {
            message: 'Data stock berhasil ditemukan',
            body: stocks.find(item => item.id === id)
        };
        callback(result);
    } else {
        const result = {
            message: 'Data stock tidak ditemukan'
        };
        callback(result);
    }
}

module.exports = {
    postStock,
    getStocks,
    updateStock,
    deleteStock,
    getOne,
    deleteOne
}
const e = require('express');
const BaseError=require('./base_error.js');
class Api404Error extends BaseError{
    constructor(name,statuCode=404,description='Not found',isOperational=true);
}
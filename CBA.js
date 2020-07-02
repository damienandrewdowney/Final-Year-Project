'use strict'
// https://restfulapi.net/http-status-codes/


// Import router package
const router = require('express').Router();
const validator = require('validator');
const { sql, dbConnPoolPromise, buildSelect } = require('../database/db.js');

// Define SQL statements here for use in function below
// These are parameterised queries note @named parameters.
// Input parameters are parsed and set before queries are executed

// for json path - Tell MS SQL to return results as JSON
const SQL_SELECT_ALL = 'SELECT * FROM X00158259.CBA';
// without_array_wrapper - use for single result

const SQL_SELECT_BY_ID = 'SELECT * FROM X00158259.CBA WHERE id = @id for json path, without_array_wrapper;';

// Second statement (Select...) returns inserted record identified by id = SCOPE_IDENTITY()
//need to look at changing next few lines
const SQL_INSERT = 'INSERT INTO X00158259.CBA (CBAId, studentId, schoolSubject, CBANumber, teacher, descriptor, comment) VALUES (@CBAId, @studentId, @schoolSubject, @CBANumber, @teacher, @descriptor, @comment); SELECT * from X00158259.CBA WHERE id = SCOPE_IDENTITY();';


/**
 * GET a list of all or if search criteria is set filter 
 * Address http://server:port/CBA
 * @search (optional) passed as parameter via url
 * @return JSON object
 */
router.get('/', async (req, res) => {
    let parsedSQL = SQL_SELECT_ALL + buildSelect(req);
    try {
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // execute query
            .query(parsedSQL);

        // Send HTTP reponse
        // JSON data from SQL is contained in first element of recordset
        res.status(200);
        res.json(result.recordset[0]);
    } catch(err) {
        res.status(500);
        res.send(err.message);
    }
});

/**
 * GET single by id
 * Address http://server:port/CBA/:id
 * @id passed as parameter via url
 * @return JSON object
 */
router.get('/:id', async (req, res) => {
    // Read value of parameter from the request url
    const CBAId = req.params.id;

    /**
     * Validate input - important as bad input could crash the server or lead to an attack
     * See CBA to validator npm package (at top) for docs
     * If validation fails return an error message
     */
    if (!validator.isNumeric(CBAId, { no_symbols: true })) {
        res.json({ "error": "invalid id parameter" });
        return false;
    }

    /**
     * If validation passed execute query and return result
     * Single CBA with matching id is returned
     */
    try {
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // set id parameter(s) in query
            .input('id', sql.Int, CBAId)
            // execute query
            .query(SQL_SELECT_BY_ID);

        // Send HTTP reponse
        // JSON data from SQL is contained in first element of recordset
        res.status(200);
        res.json(result.recordset[0]);
    } catch(err) {
        res.status(500);
        res.send(err.message);
    }
});

/**
 * Validate request data for both post/insert and put/update
 * @param http request
 * @param isUpdate validate id for update
 * @return errors if any
 */
function validate(req, isUpdate) {
    // Validate - erros string, initally empty, will store any errors
    let errors = "";

    if (isUpdate) {
        // Make sure that id is just a number - note that values are read from request body
        const id = req.body.id;
        if (!validator.isNumeric(String(id), { no_symbols: true })) {
            errors += "invalid id; ";
        }
    }

    // Make sure that topic id is just a number - note that values are read from request body
    const topicId = req.body.topicId;
    if (!validator.isNumeric(String(topicId), { no_symbols: true })) {
        errors += "invalid topic id; ";
    }

    // Escape text and potentially bad characters
    const schoolSubject = validator.escape(req.body.schoolSubject);
    if (schoolSubject === "") {
        errors += "invalid subject; ";
    }

    if (req.body.description) {
        const descriptor = validator.escape(req.body.descriptor);
        if (descriptor === "") {
            errors += "invalid descriptor; ";
        }
    }
    return errors;
}

/**
 * POST - Insert a new CBA
 * This async function processes a HTTP post request
 */
router.post('/', async (req, res) => {
    // Validate - erros string, initally empty, will store any errors
    let errors = validate(req);

    // If errors send details in response
    if (errors != "") {
        // return http response 400 (bad request) with errors if validation failed
        res.status(400);
        res.json({ "error": errors });
        return false;
    }
/*
    // If no errors, insert
    try {
        // Get a DB connection and execute SQL
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // set parameter(s) in query
            .input('topicId', sql.Int, req.body.topicId)
            .input('linkDate', sql.Date, validator.escape(req.body.linkDate || ''))
            .input('linkName', sql.NVarChar, validator.escape(req.body.linkName || ''))
            .input('description', sql.NVarChar, validator.escape(req.body.description || ''))
            .input('notes', sql.NVarChar, req.body.notes || '')
            .input('linkURL', sql.NVarChar, req.body.linkURL ||'')
            // Execute Query
            .query(SQL_INSERT);

        // If successful, return inserted link via HTTP
        res.status(201);
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

 * PUT - Update an existing link
 * This async function processes a HTTP put request
 */
/*
router.put('/', async (req, res) => {

    // Validate - erros string, initally empty, will store any errors
    let errors = validate(req, true);

    // If errors send details in response
    if (errors != "") {
        // return http response 400 (bad request) with errors if validation failed
        res.status(400);
        res.json({ "error": errors });
        return false;
    }

    // If no errors, update
    try {
        // Get a DB connection and execute SQL
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // set parameter(s) in query
            .input('topicId', sql.Int, req.body.topicId)
            .input('linkDate', sql.Date, validator.escape(req.body.linkDate))
            .input('linkName', sql.NVarChar, validator.escape(req.body.linkName))
            .input('description', sql.NVarChar, validator.escape(req.body.description || ''))
            .input('notes', sql.NVarChar, req.body.notes)
            .input('linkURL', sql.NVarChar, req.body.linkURL)
            .input('id', sql.Int, req.body.id)
            // Execute Query
            .query(SQL_UPDATE);

        // If successful, return inserted Link via HTTP
        res.status(200);
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

 * DELETE single link by id
 * Address http://server:port/link/:id
 * @id passed as parameter via url
 */
/*
router.delete('/:id', async (req, res) => {
    // Read value of parameter from the request url
    const linkId = req.params.id;

     * Validate input - important as bad input could crash the server or lead to an attack
     * See link to validator npm package (at top) for docs
     * If validation fails return an error message
     */
    /*
    if (!validator.isNumeric(linkId, { no_symbols: true })) {
        res.json({ "error": "invalid id parameter" });
        return false;
    }

    // If validation passed delete link with matching id
    try {
        // Get a DB connection and execute SQL
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // set id parameter(s) in query
            .input('id', sql.Int, linkId)
            // Execute Query
            .query(SQL_DELETE);

        // If successful, return OK
        res.status(200);
        res.end();
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});
*/
});
module.exports = router;

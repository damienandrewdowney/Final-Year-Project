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
const SQL_SELECT_ALL = 'SELECT * FROM X00158259.Results';
// without_array_wrapper - use for single result

const SQL_SELECT_BY_ID = 'SELECT * FROM X00158259.Results WHERE id = @id for json path, without_array_wrapper;';

// Second statement (Select...) returns inserted record identified by id = SCOPE_IDENTITY()
//need to look at changing next few lines
const SQL_INSERT = 'INSERT INTO X00158259.Results (ResultEntry, studentId, examType, schoolSubject, result, teacher, comment) VALUES (@ResultEntry, @studentId, @examType, @schoolSubject, @result, @teacher, @comment); SELECT * from X00158259.Results WHERE id = SCOPE_IDENTITY();';


/**
 * GET a list of all or if search criteria is set filter
 * Address http://server:port/Results
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
 * Address http://server:port/Result/:id
 * @id passed as parameter via url
 * @return JSON object
 */
router.get('/:id', async (req, res) => {
    // Read value of parameter from the request url
    const ResultEntry = req.params.id;

    /**
     * Validate input - important as bad input could crash the server or lead to an attack
     * See Result to validator npm package (at top) for docs
     * If validation fails return an error message
     */
    if (!validator.isNumeric(ResultEntry, { no_symbols: true })) {
        res.json({ "error": "invalid id parameter" });
        return false;
    }

    /**
     * If validation passed execute query and return result
     * Single Result with matching id is returned
     */
    try {
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // set id parameter(s) in query
            .input('id', sql.Int, ResultEntry)
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
 * POST - Insert a new Result
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
});
module.exports = router;
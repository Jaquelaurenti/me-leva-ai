const express = require('express');
const routesUsers = express.Router();
const  verifyJWT = require('../../src/utils/VerifyToken');

// importando o controller 
const UserController = require('../controllers/UserController');
/**
 * @swagger
 * path:
 *  /users/:
 *    get:
 *      tags:
 *          - Users
 *      summary: Lista de Usuários
 *           
 *      responses:
 *        "200":
 *          description: Ok
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/User'
 *               
 */
 routesUsers.get('', verifyJWT, UserController.index);
/**
 * @swagger
 * path:
 *  /users/{id}:
 *    get:
 *      tags:
 *          - Users
 *      summary: Usuário por Id
 * 
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id do Usuário
 *            required: true
 *            schema:
 *              type: string
 *           
 *      responses:
 *        "200":
 *          description: Ok
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/User'
 */
 routesUsers.get('/:id',UserController.show);
/**
 * @swagger
 * path:
 *  /login:
 *    get:
 *      tags:
 *          - Users
 *      summary: Logon do Usuário
 * 
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id do Usuário
 *            required: true
 *            schema:
 *              type: string
 *           
 *      responses:
 *        "200":
 *          description: Ok
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Logon'
 *        "400":
 *          description: Bad Request
 */
 routesUsers.post('/login', UserController.logon);

/**
 * @swagger
 * path:
 *  /users/:
 *    post:
 *      tags:
 *          - Users
 *      summary: Adiciona um Usuário
 *
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *           
 *      responses:
 *        "200":
 *          description: Ok
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/User'
 *       
 *        "500":
 *          description: Erro        
 */
 routesUsers.post('', UserController.store);
/**
 * @swagger
 * path:
 *  /users/{id}:
 *    put:
 *      tags:
 *          - Users
 * 
 *      summary: Altera um Usuário
 * 
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id do Usuário
 *            required: true
 *            schema:
 *              type: string
 *
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *           
 *      responses:
 *        "200":
 *          description: Ok
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/User'
 *       
 *        "500":
 *          description: Erro        
 */
 routesUsers.put('/:id',UserController.update);
/**
 * @swagger
 * path:
 *  /users/{id}:
 *    delete:
 *      tags:
 *          - Users
 * 
 *      summary: Deleta um Usuário
 * 
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id do Usuário
 *            required: true
 *            schema:
 *              type: string
 *
 *      responses:
 *        "200":
 *          description: Ok
  *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/User'
 *       
 *        "500":
 *          description: Erro        
 */
 routesUsers.delete('/:id', UserController.destroy);



module.exports = routesUsers;

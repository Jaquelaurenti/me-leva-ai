const express = require('express');
const routerUser = express.Router();

const { userController } = require('../controllers');

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
routerUser.get('', userController.index);
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
routerUser.get('/:id', userController.index);
/**
 * @swagger
 * path:
 *  /users/logon/{id}:
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
routerUser.get('/logon/:id', userController.logon);

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
routerUser.post('', userController.store);
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
routerUser.put('/:id', userController.update);
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
routerUser.delete('/:id', userController.destroy);

module.exports = routerUser;

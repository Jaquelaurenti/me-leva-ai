const express = require('express');
const routesRide = express.Router();
// importando o controller 
const RideController = require('../controllers/RideController');

/**
 * @swagger
 * path:
 *  /rides/:
 *    post:
 *      tags:
 *          - Rides
 *      summary: Adiciona uma Corrida
 *
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Ride'
 *           
 *      responses:
 *        "200":
 *          description: Ok
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Ride'
 *       
 *        "500":
 *          description: Erro        
 */
 routesRide.post('/rides', RideController.ask);
/**
 * @swagger
 * path:
 *  /rides:
 *    get:
 *      tags:
 *          - Rides
 *      summary: Lista de Corridas
 *           
 *      responses:
 *        "200":
 *          description: Ok
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Ride'
 */
 routesRide.get('/rides',RideController.history);
/**
 * @swagger
 * path:
 *  /rides/{id}:
 *    get:
 *      tags:
 *          - Rides
 *      summary: Corrida por Id
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id da Corrida
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
 *                  $ref: '#/components/schemas/Ride'
 */
 routesRide.get('/rides/:id',RideController.status);

/**
 * @swagger
 * path:
 *  /rides/users/{id}:
 *    get:
 *      tags:
 *          - Rides
 *      summary: Lista de corridas do Usuário
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
 *                  $ref: '#/components/schemas/Ride'
 */
 routesRide.get('/rides/users/:id',RideController.userHistory);



/**
 * @swagger
 * path:
 *  /rides/{id}:
 *    patch:
 *      tags:
 *          - Rides
 * 
 *      summary: Atualiza Horário de Início ou Fim da Corrida
 * 
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id da Corrida
 *            required: true
 *            schema:
 *              type: string
 *
 *      requestBody:
 *          required: true
 *          description: Tipo da ação ('start ou finish')
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties: 
 *                          type:
 *                              type: string
 *                          
 *           
 *      responses:
 *        "200":
 *          description: Ok
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Ride'
 *       
 *        "500":
 *          description: Erro        
 */
 routesRide.patch('/rides/:id',RideController.updateStatus);


module.exports = routesRide;

const express = require('express');
const routesVehicle = express.Router();

// importando o controller 
const VehicleController = require('../controllers/VehicleController');

/**
 * @swagger
 * path:
 *  /vehicles/:
 *    get:
 *      tags:
 *          - Vehicles
 *      summary: Lista de Veículos
 *           
 *      responses:
 *        "200":
 *          description: Ok
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Vehicle'
 *               
 */
 routesVehicle.get('/vehicles', VehicleController.index);
/**
 * @swagger
 * path:
 *  /vehicles/:
 *    post:
 *      tags:
 *          - Vehicles
 *      summary: Adiciona um Veículo
 *
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Vehicle'
 *           
 *      responses:
 *        "200":
 *          description: Ok
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Vehicle'
 *       
 *        "500":
 *          description: Erro        
 */
 routesVehicle.post('/vehicles', VehicleController.store);
/**
 * @swagger
 * path:
 *  /vehicles/{id}:
 *    get:
 *      tags:
 *          - Vehicles
 *      summary: Veículo por Id
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id do Veículo
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
 *                  $ref: '#/components/schemas/Vehicle'
 */
 routesVehicle.get('/vehicles/:id',VehicleController.show);
/**
 * @swagger
 * path:
 *  /vehicles/{id}:
 *    put:
 *      tags:
 *          - Vehicles
 * 
 *      summary: Altera um Veículo
 * 
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id do Veículo
 *            required: true
 *            schema:
 *              type: string
 *
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Vehicle'
 *           
 *      responses:
 *        "200":
 *          description: Ok
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Vehicle'
 *       
 *        "500":
 *          description: Erro        
 */
 routesVehicle.put('/vehicles/:id',VehicleController.update);
/**
 * @swagger
 * path:
 *  /vehicles/{id}:
 *    delete:
 *      tags:
 *          - Vehicles
 * 
 *      summary: Deleta um Veículo
 * 
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id do Veículo
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
 *                  $ref: '#/components/schemas/Vehicle'
 *       
 *        "500":
 *          description: Erro        
 */
 routesVehicle.delete('/vehicles/:id', VehicleController.destroy);

module.exports = routesVehicle;

const express = require('express');
const routerVehicle = express.Router();
const { vehicleController } = require('../controllers');
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
routerVehicle.get('', vehicleController.index);
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
routerVehicle.post('', vehicleController.store);
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
routerVehicle.get('/:id',vehicleController.show);
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
routerVehicle.put('/:id',vehicleController.update);
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
routerVehicle.delete('/:id', vehicleController.destroy);

module.exports = routerVehicle;
 
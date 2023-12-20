/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.TallerMecanicoSpring.TM.rest;

import com.TallerMecanicoSpring.TM.model.Servicio;
import com.TallerMecanicoSpring.TM.model.Vehiculo;
import com.TallerMecanicoSpring.TM.service.VehiculoService;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author maite
 */
@RestController
@RequestMapping("/vehiculo/")
public class VehiculoRest {
    @Autowired
    private VehiculoService vehiculoService;
    
    @GetMapping
    private ResponseEntity<List<Vehiculo>> getAllVehiculos(){
        return ResponseEntity.ok(this.vehiculoService.findAll());
    }

    @GetMapping("get/{id}")
    private ResponseEntity<Optional<Vehiculo>> findById(@PathVariable("id") Long id){
        return ResponseEntity.ok(this.vehiculoService.findById(id));
    }

    //GetByCliente
    @GetMapping("getByClient/{idCliente}")
    private ResponseEntity<List<Vehiculo>> getVehiculoPorCliente(@PathVariable("idCliente") Long id){
        return ResponseEntity.ok(this.vehiculoService.getByClient(id));
    }
    
    @PostMapping("filtrar/")
    private ResponseEntity<List<Vehiculo>> filrarVehiculos(@RequestBody Vehiculo v){
        return ResponseEntity.ok(this.vehiculoService.filtarVehiculos(v));
    }
    
    @PostMapping("save/")
    private ResponseEntity<Vehiculo> crearVehiculo(@RequestBody Vehiculo v){
//        return ResponseEntity.ok(this.vehiculoService.save(v));
        try{
            Vehiculo vehiculoGuardado = this.vehiculoService.save(v);
            return ResponseEntity.created(new URI("/vehiculo/"+vehiculoGuardado.getId())).body(vehiculoGuardado);
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    @PutMapping("update/")
    private ResponseEntity<Vehiculo> updateVehiculo(@RequestBody Vehiculo v){
        return ResponseEntity.ok(this.vehiculoService.updateVehiculo(v));
    }
    
    @DeleteMapping("delete/{id}")
    private ResponseEntity<Boolean> deleteById(@PathVariable("id") Long id){
        this.vehiculoService.deleteById(id);
        return ResponseEntity.ok(!(this.vehiculoService.getById(id) != null));
    }
    
    
}

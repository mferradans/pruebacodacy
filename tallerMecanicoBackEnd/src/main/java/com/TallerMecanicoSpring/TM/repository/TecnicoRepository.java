/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.TallerMecanicoSpring.TM.repository;

import com.TallerMecanicoSpring.TM.model.Tecnico;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author maite
 */
public interface TecnicoRepository extends JpaRepository<Tecnico, Long>{
    
   // Iterable<Tecnico> findByLegajo(String legajo);
}

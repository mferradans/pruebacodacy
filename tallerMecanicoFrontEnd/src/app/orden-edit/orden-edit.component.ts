import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { OrdenService } from '../services/orden.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Orden } from '../model/orden';
import { ClienteService } from '../services/cliente.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../model/cliente';
import { Tecnico } from '../model/tecnico';
import { Vehiculo } from '../model/vehiculo';
import { Servicio } from '../model/servicio';
import { MatTableDataSource } from '@angular/material/table';
import { ServicioService } from '../services/servicio.service';
import { OrdenSaveRq } from '../model/OrdenSaveRq';
import { DetalleOrden } from '../model/detalleOrden';

@Component({
  selector: 'app-orden-edit',
  templateUrl: './orden-edit.component.html',
  styleUrls: ['./orden-edit.component.css']
})
export class OrdenEditComponent implements OnInit{
  
  idOrden;
  orden: Orden;
  formularioOrden: FormGroup;
  columnasServicios = ['descripcion','nombre','precio','acciones'];
  dataServicios: Servicio[];
  total;

  @Input('dataSourceOrdenes') dataSourceOrdenes: any[];
  @Output() editarClicked: EventEmitter<number> = new EventEmitter<number>();
  @Output() actualizarOrdenes: EventEmitter<any> = new EventEmitter<any>();
  columnasOrdenes = ['cliente', 'vehiculo','fechaIngreso','tecnico','estado','acciones'];

  constructor(
    private ordenService: OrdenService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private servicioService: ServicioService
  ){
    this.formularioOrden = this.fb.group({
      cliente: [ new Cliente(), [Validators.required]],
      tecnico: [ new Tecnico(), [Validators.required]],
      vehiculo: [ new Vehiculo(), [Validators.required]],
      servicio: [this.fb.array([]), [Validators.required]],
      descripcion: ['',[Validators.required,Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {
   // this.route.params.subscribe(params => {
      //this.idOrden = params['id'];
      //this.getOrden(this.idOrden);
      // Aquí puedes realizar acciones con el valor de idOrden
   // }); 
   // this.getServicios(); 
  }

  getOrden(id){
    this.ordenService.getOrdenById(id).subscribe(
      (data)=>{
          if (data){
            this.orden=data;
            this.setFormData();
            console.log('Data: ',data);
          }
      },
      (error)=>{
        console.log('error: ', error);
      }
    );
  }

  setFormData(){
    this.formularioOrden.get('cliente').setValue(this.orden.vehiculo.cliente);
    this.formularioOrden.get('tecnico').setValue(this.orden.tecnico);
    this.formularioOrden.get('vehiculo').setValue(this.orden.vehiculo);
    this.formularioOrden.get('descripcion').setValue(this.orden.descripcion);
    const servicioFormArray = this.formularioOrden.get('servicio') as FormArray;
    servicioFormArray.clear();

    // Llena el FormArray 'servicio' con los servicios de la orden
    this.orden.detallesOrden.forEach(detalle => {
      servicioFormArray.push(detalle.servicio);
    });

    this.formularioOrden.get('servicio').setValue(servicioFormArray);
    
  }

  getNombreCliente(): string{
    let nombreCliente: string = this.formularioOrden.get('cliente').value.nombre + ", " + this.formularioOrden.get('cliente').value.apellido;
    return nombreCliente;
  }

  addServicio(){}

  getServicios(){
    this.servicioService.getAllServicio().subscribe(
      (data)=>{ 
        this.dataServicios = data
      }, (error)=>{
        console.log('Error: ', error)
      }
    );
  }

  guardarOrdentrabajo(){



    /*let rq: OrdenSaveRq = new OrdenSaveRq();

    rq.idOrden=this.orden.id;
    rq.idVehiculo = this.orden.vehiculo.id;
    rq.idTecnico = this.formularioOrden.get('tecnico').value.id;
    */ 

  }

  removeServicio(id){

  }

  onEditar(id){
    this.editarClicked.emit(id);
    //this.router.navigate([`orden/${id}`])
  }

  iniciarOrden(o:Orden){
    this.ordenService.iniciarOrden(o).subscribe({
      next:(data)=>{
        if(data){
          console.log('Se actualizo el estado');
          this.actualizarOrdenes.emit();
        } else{
          console.log('NO hay data = error');
        }
      }
    });
  }

  cancelarOrden(o:Orden){
    this.ordenService.cancelarOrden(o).subscribe({
      next:(data)=>{
        if(data){
          console.log('Se actualizo el estado');
          this.actualizarOrdenes.emit();
        } else{
          console.log('NO hay data = error');
        }
      }
    });
  }

  finalizarOrden(o:Orden){
    this.ordenService.finalizarOrden(o).subscribe({
      next:(data)=>{
        if(data){
          console.log('Se actualizo el estado');
          this.actualizarOrdenes.emit();
        } else{
          console.log('NO hay data = error');
        }
      }
    });
  }

  imprimirFactura(o:Orden){
    this.ordenService.generarFactura(o).subscribe({
      next:(data)=>{
        if(data){
          console.log('factura: ', data);
          this.router.navigate([`/factura`], {
            state: { data: data },
          });
          //this.router.navigateByUrl(, { skipLocationChange: true });
        } else{
          console.log('NO hay data = error');
        }
      }
    });
    
  }
}

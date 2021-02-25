import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { disableDebugTools } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Medico } from '../models/Medico';
import { MedicoService } from '../services/Medico.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

 titleMedico = 'Médicos';

 public selectedMedico: Medico;
 public medicoForm: FormGroup;


 public medicos: Medico[];
 /* [
   {id:'1',nome:'Luiz'   , especialidade:'Cardiologista', crm:'4325325', telefone:'646346343'},
   {id:'2',nome:'João'   , especialidade:'Clinico Geral', crm:'4325325', telefone:'646346343'},
   {id:'3',nome:'Cloves' , especialidade:'Psiquiatra', crm:'4325325', telefone:'646346343'}, 
   {id:'4',nome:'Cleytin', especialidade:'Podologista', crm:'4325325', telefone:'646346343'}, 
   {id:'5',nome:'Chico'  , especialidade:'Otorrinolaringologista', crm:'4325325', telefone:'646346343'}
  ]*/
  

  public modalRef: BsModalRef;

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }


  createForm(){
    this.medicoForm = this.fb.group({
        id:[''],
        nome: ['', Validators.required],
        especialidade: ['', /*Validators.required*/],
        crm: ['', Validators.required],
        telefone: ['', Validators.required]
    });
  }

  selectMedico(medico: Medico){
    this.selectedMedico = medico;
    this.medicoForm.patchValue(medico)
  }

  back(){
    this.selectedMedico = null;
    this.LoadMedico()
  }

  submit(){
    console.log(this.medicoForm.value);
    this.saveMedico(this.medicoForm.value);
    
  }



  saveMedico(medico: Medico){
    this.medicoService.edit(medico).subscribe(
      (retorno: Medico) => {
      this.back();
        console.log(retorno);
      },
      (error: any) => {
        console.log(error);
      }

    )
  }

  LoadMedico(){
    this.medicoService.getAll().subscribe(
      (medicos: Medico[]) => {
        this.medicos = medicos;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  deleteMedico(id: number){
    this.medicoService.delete(id).subscribe(
      (modal: any) => {
      this.LoadMedico();
        console.log(modal);
      },
      (error: any) =>{
        
        console.log(error);
      }
    );
  }

  constructor(private fb: FormBuilder, private modalService:BsModalService, private medicoService: MedicoService) { 
    this.createForm();
  }

  ngOnInit(): void {
    this.LoadMedico();
  }

}




